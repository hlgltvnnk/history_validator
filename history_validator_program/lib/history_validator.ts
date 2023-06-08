import { Program, web3, BN, AnchorProvider } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";

import { IDL } from "./idl/history_validator";
import { EvidenceType, ReporterType, EvaluationType } from ".";
import { bufferFromString, addrToSeeds } from "./buffer";


export function initHistoryValidator(
  validatorProgramId: string | web3.PublicKey,
  provider?: AnchorProvider
) {
  const programId =
    typeof validatorProgramId === "string"
      ? new web3.PublicKey(validatorProgramId)
      : validatorProgramId;

  const program = new Program(IDL, programId, provider);

  // seeds = [b"association".as_ref(), &association_id.to_le_bytes()],
  async function findAssociationAddress(id: string) {
    return web3.PublicKey.findProgramAddressSync(
      [bufferFromString("association"), bufferFromString(id, 32),],
      programId
    );
  }

  // seeds = [b"reporter".as_ref(), association.key().as_ref(), authority.key().as_ref()],
  async function findReporterAddress(association: web3.PublicKey, authority: web3.PublicKey,) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("reporter"),
        association.toBytes(),
        authority.toBytes()
      ],
      programId
    );
  }

  // seeds = [b"historical_event".as_ref(), association.key().as_ref(), title.as_ref()],
  async function findEventAddress(association: web3.PublicKey, id: BN) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("historical_event"),
        association.toBytes(),
        new Uint8Array(id.toArray("le", 8)),
      ],
      programId
    );
  }

  // seeds = [b"historical_fact".as_ref(), association.key().as_ref(), title.as_ref()],
  async function findFactAddress(association: web3.PublicKey, id: BN) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("historical_fact"),
        association.toBytes(),
        new Uint8Array(id.toArray("le", 8)),
      ],
      programId
    );
  }

  // seeds = [b"historical_connection".as_ref(), event.key().as_ref(), &connection_id.to_le_bytes()],
  async function findConnectionAddress(event: web3.PublicKey, id: BN) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("historical_connection"),
        event.toBytes(),
        new Uint8Array(id.toArray("le", 8))
      ],
      programId
    );
  }

  // seeds = [b"evidence".as_ref(), fact.key().as_ref(), &evidence_id.to_le_bytes()],
  async function findEvidenceAddress(fact: web3.PublicKey, id: BN) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("evidence"),
        fact.toBytes(),
        new Uint8Array(id.toArray("le", 8))
      ],
      programId
    );
  }

  // seeds = [b"evidence_evaluation".as_ref(), reporter.key().as_ref(), evidence.key().as_ref()],
  async function findEvidenceEvaluationAddress(reporter: web3.PublicKey, evidence: web3.PublicKey,) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("evidence_evaluation"),
        reporter.toBytes(),
        evidence.toBytes(),
      ],
      programId
    );
  }

  // seeds = [b"connection_evaluation".as_ref(), reporter.key().as_ref(), connection.key().as_ref()],
  async function findConnectionEvaluationAddress(reporter: web3.PublicKey, connection: web3.PublicKey,) {
    return web3.PublicKey.findProgramAddressSync(
      [
        bufferFromString("reporter"),
        reporter.toBytes(),
        connection.toBytes(),
      ],
      programId
    );
  }

  async function createAssociation(id: string) {
    const [association, bump] = await findAssociationAddress(id);

    program.rpc.initializeAssociation(id, bump, {
      accounts: {
        authority: provider.wallet.publicKey,
        association,
        systemProgram: web3.SystemProgram.programId,
      }
    });
  }

  async function createReporter(association: web3.PublicKey, authority: web3.PublicKey, name: string, type: keyof typeof ReporterType) {
    const [reporter, bump] = await findReporterAddress(association, authority);

    program.rpc.initializeReporter(ReporterType[type], name, bump, {
      accounts: {
        authority: provider.wallet.publicKey,
        association,
        reporter,
        systemProgram: web3.SystemProgram.programId,
      }
    });
  }

  async function createEvent(
    association: web3.PublicKey,
    reporter: web3.PublicKey,
    title: string,
    beginning: BN,
    ending: BN,
    location: string,
    description: string) {
    const [event, bump] = await findEventAddress(association, title);

    const args = [
      title,
      beginning,
      ending,
      location,
      description,
      bump,
    ];

    program.rpc.createEvent(...args, {
      accounts: {
        authority: provider.wallet.publicKey,
        association,
        reporter,
        event,
        systemProgram: web3.SystemProgram.programId,
      }
    });
  }

  async function createFact(
    association: web3.PublicKey,
    reporter: web3.PublicKey,
    title: string,
    beginning: BN,
    ending: BN,
    location: string,
    description: string) {
    const [fact, bump] = await findFactAddress(association, title);

    const args = [
      title,
      beginning,
      ending,
      location,
      description,
      bump,
    ];

    program.rpc.createFact(...args, {
      accounts: {
        authority: provider.wallet.publicKey,
        association,
        reporter,
        fact,
        systemProgram: web3.SystemProgram.programId,
      }
    });
  }

  async function createConnection(association: web3.PublicKey, event: web3.PublicKey, reporter: web3.PublicKey, fact: web3.PublicKey, id: BN) {
    const [connection, bump] = await findConnectionAddress(event, id);

    program.rpc.createConnection(id, bump, {
      accounts: {
        authority: provider.wallet.publicKey,
        association,
        reporter,
        event,
        fact,
        connection,
        systemProgram: web3.SystemProgram.programId,
      }
    });
  }

  async function createEvidence(
    association: web3.PublicKey,
    reporter: web3.PublicKey,
    fact: web3.PublicKey,
    id: BN,
    type: keyof typeof EvidenceType,
    description: string) {
    const [evidence, bump] = await findEvidenceAddress(fact, id);

    const args = [
      id,
      EvidenceType[type],
      description,
      bump,
    ];

    program.rpc.createEvidence(...args, {
      accounts: {
        authority: provider.wallet.publicKey,
        association,
        reporter,
        fact,
        evidence,
        systemProgram: web3.SystemProgram.programId,
      }
    });
  }

  async function createEvidenceEvaluation(
    association: web3.PublicKey,
    evidence: web3.PublicKey,
    reporter: web3.PublicKey,
    fact: web3.PublicKey,
    type: keyof typeof EvaluationType,
    description: string
  ) {
    const [evaluation, bump] = await findEvidenceEvaluationAddress(reporter, evidence);

    const args = [
      EvaluationType[type],
      description,
      bump,
    ];

    program.rpc.createEvidenceEvaluation(...args, {
      accounts: {
        authority: provider.wallet.publicKey,
        association,
        reporter,
        fact,
        evidence,
        evaluation,
        systemProgram: web3.SystemProgram.programId,
      }
    });
  }

  async function createConnectionEvaluation(
    association: web3.PublicKey,
    connection: web3.PublicKey,
    reporter: web3.PublicKey,
    event: web3.PublicKey,
    type: keyof typeof EvaluationType,
    description: string
  ) {
    const [evaluation, bump] = await findConnectionEvaluationAddress(reporter, connection);

    const args = [
      EvaluationType[type],
      description,
      bump,
    ];

    program.rpc.createConnectionEvaluation(...args, {
      accounts: {
        authority: provider.wallet.publicKey,
        association,
        reporter,
        event,
        connection,
        evaluation,
        systemProgram: web3.SystemProgram.programId,
      }
    });
  }

  return {
    ...program,
    programId,
    idl: IDL,
    pda: {
      findAssociationAddress,
      findEvidenceAddress,
      findFactAddress,
      findReporterAddress,
      findEventAddress,
      findConnectionAddress,
      findEvidenceEvaluationAddress,
      findConnectionEvaluationAddress
    },
    report: {
      createAssociation,
      createReporter,
      createEvent,
      createFact,
      createConnection,
      createEvidence,
      createEvidenceEvaluation,
      createConnectionEvaluation
    }
  };
}
