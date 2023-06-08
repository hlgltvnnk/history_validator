import { Program, web3, BN, AnchorProvider, Wallet } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";

import { IDL, HistoryValidator } from "./idl/history_validator";

import { EvidenceType, ReporterType, EvaluationType } from ".";
import { bufferFromString } from "./buffer";

import { Connection } from "@solana/web3.js";


export class HistoryValidatorProgram {
  program: Program<HistoryValidator>;
  programId: web3.PublicKey;
  wallet: Wallet;

  constructor (
    historyValidatorProgramId: string | web3.PublicKey,
    targetUrl: string,
    wallet: Wallet) {
    const connection = new Connection(targetUrl, 'confirmed')
    const provider = new AnchorProvider(
      connection, wallet, {
      preflightCommitment: 'confirmed'
    }
    );

    this.programId =
      typeof historyValidatorProgramId === "string"
        ? new web3.PublicKey(historyValidatorProgramId)
        : historyValidatorProgramId;

    this.wallet = wallet;
    this.program = new Program(IDL, this.programId, provider);
  }

  public findAssociationAddress(id: string) {
    return web3.PublicKey.findProgramAddressSync(
      [bufferFromString("association"), bufferFromString(id, 32)],
      this.programId
    );
  }

  public findReporterAddress(association: web3.PublicKey, authority: web3.PublicKey,) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("reporter"),
        association.toBytes(),
        authority.toBytes()
      ],
      this.programId
    );
  }

  public findEventAddress(association: web3.PublicKey, id: BN) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("historical_event"),
        association.toBytes(), new Uint8Array(id.toArray("le", 8)),
      ],
      this.programId
    );
  }

  public findFactAddress(association: web3.PublicKey, id: BN) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("historical_fact"),
        association.toBytes(),
        new Uint8Array(id.toArray("le", 8)),
      ],
      this.programId
    );
  }

  public findConnectionAddress(event: web3.PublicKey, id: BN) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("historical_connection"),
        event.toBytes(),
        new Uint8Array(id.toArray("le", 8))
      ],
      this.programId
    );
  }

  public findEvidenceAddress(fact: web3.PublicKey, id: BN) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("evidence"),
        fact.toBytes(),
        new Uint8Array(id.toArray("le", 8))
      ],
      this.programId
    );
  }

  public findEvidenceEvaluationAddress(reporter: web3.PublicKey, evidence: web3.PublicKey,) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("evidence_evaluation"),
        reporter.toBytes(),
        evidence.toBytes(),
      ],
      this.programId
    );
  }

  public findConnectionEvaluationAddress(reporter: web3.PublicKey, connection: web3.PublicKey,) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("reporter"),
        reporter.toBytes(),
        connection.toBytes(),
      ],
      this.programId
    );
  }

  public async createAssociation(id: string) {
    const [association, bump] = this.findAssociationAddress(id);
    let association_id = bufferFromString(id, 32).toJSON().data;

    const tx = await this.program.rpc.initializeAssociation(association_id, bump, {
      accounts: {
        authority: this.wallet.publicKey,
        association,
        systemProgram: web3.SystemProgram.programId,
      }
    });

    return tx;
  }

  public async createReporter(association: web3.PublicKey, authority: web3.PublicKey, name: string, type: keyof typeof ReporterType) {
    const [reporter, bump] = this.findReporterAddress(association, authority);

    const tx = await this.program.rpc.initializeReporter(ReporterType[type], authority, name, bump, {
      accounts: {
        authority: this.wallet.publicKey,
        association,
        reporter,
        systemProgram: web3.SystemProgram.programId,
      }
    });

    return tx;
  }

  public async createEvent(
    association: web3.PublicKey,
    reporter: web3.PublicKey,
    title: string,
    beginning: BN,
    ending: BN,
    location: string,
    description: string) {

    const eventId = (await this.program.account.association.fetch(association)).events.addn(1);
    const [event, bump] = this.findEventAddress(association, eventId);


    const args = [
      title,
      beginning,
      ending,
      location,
      description,
      bump,
    ];

    const tx = await this.program.rpc.createEvent(...args, {
      accounts: {
        authority: this.wallet.publicKey,
        association,
        reporter,
        event,
        systemProgram: web3.SystemProgram.programId,
      }
    });

    return tx;
  }

  public async createFact(
    association: web3.PublicKey,
    reporter: web3.PublicKey,
    title: string,
    beginning: BN,
    ending: BN,
    location: string,
    description: string) {
    const factId = (await this.program.account.association.fetch(association)).facts.addn(1);
    const [fact, bump] = this.findFactAddress(association, factId);

    const args = [
      title,
      beginning,
      ending,
      location,
      description,
      bump,
    ];

    const tx = await this.program.rpc.createFact(...args, {
      accounts: {
        authority: this.wallet.publicKey,
        association,
        reporter,
        fact,
        systemProgram: web3.SystemProgram.programId,
      }
    });

    return tx;
  }

  public async createConnection(association: web3.PublicKey, reporter: web3.PublicKey, event: web3.PublicKey, fact: web3.PublicKey) {
    const connectionId = (await this.program.account.event.fetch(event)).connections.addn(1);
    const [connection, bump] = this.findConnectionAddress(event, connectionId);

    const tx = await this.program.rpc.createConnection(bump, {
      accounts: {
        authority: this.wallet.publicKey,
        association,
        reporter,
        event,
        fact,
        connection,
        systemProgram: web3.SystemProgram.programId,
      }
    });

    return tx;
  }

  public async createEvidence(
    association: web3.PublicKey,
    reporter: web3.PublicKey,
    fact: web3.PublicKey,
    type: keyof typeof EvidenceType,
    description: string) {
    const evidenceId = (await this.program.account.fact.fetch(fact)).evidences.addn(1);
    const [evidence, bump] = this.findEvidenceAddress(fact, evidenceId);

    const args = [
      EvidenceType[type],
      description,
      bump,
    ];

    const tx = await this.program.rpc.createEvidence(...args, {
      accounts: {
        authority: this.wallet.publicKey,
        association,
        reporter,
        fact,
        evidence,
        systemProgram: web3.SystemProgram.programId,
      }
    });

    return tx;
  }

  public async createEvidenceEvaluation(
    association: web3.PublicKey,
    evidence: web3.PublicKey,
    reporter: web3.PublicKey,
    fact: web3.PublicKey,
    type: keyof typeof EvaluationType,
    description: string
  ) {
    const [evaluation, bump] = this.findEvidenceEvaluationAddress(reporter, evidence);

    const args = [
      EvaluationType[type],
      description,
      bump,
    ];

    const tx = await this.program.rpc.createEvidenceEvaluation(...args, {
      accounts: {
        authority: this.wallet.publicKey,
        association,
        reporter,
        fact,
        evidence,
        evaluation,
        systemProgram: web3.SystemProgram.programId,
      }
    });

    return tx;
  }

  public async createConnectionEvaluation(
    association: web3.PublicKey,
    connection: web3.PublicKey,
    reporter: web3.PublicKey,
    event: web3.PublicKey,
    type: keyof typeof EvaluationType,
    description: string
  ) {
    const [evaluation, bump] = this.findConnectionEvaluationAddress(reporter, connection);

    const args = [
      EvaluationType[type],
      description,
      bump,
    ];

    const tx = await this.program.rpc.createConnectionEvaluation(...args, {
      accounts: {
        authority: this.wallet.publicKey,
        association,
        reporter,
        event,
        connection,
        evaluation,
        systemProgram: web3.SystemProgram.programId,
      }
    });

    return tx;
  }
}
