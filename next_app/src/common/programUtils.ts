import { web3, BN, AnchorError } from "@project-serum/anchor";
import { PublicKey, TransactionError } from "@solana/web3.js";

import {
    HistoryValidatorProgram,
    ReporterTypeVariants,
} from "../../lib";
import { ReporterRank,
        Reporter,
        ReporterState,
        Event,
        Fact,
        UserType,
        EvidenceType,
        Evidence,
        EvaluationType
    } from "./types";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

export enum Status {
    NONE = 0,
    OK = 1,
    ERROR = 2,
}

export interface ProgramStatus {
    status: Status,
    error?: string,
    errorCode?: number,
};

const toProgramReporterType = (type: ReporterRank) => {
    switch (type) {
        case ReporterRank.Validator: {
            return ReporterTypeVariants[0];
        }
        case ReporterRank.Connoisseur: {
            return ReporterTypeVariants[1];
        }
        case ReporterRank.Expert: {
            return ReporterTypeVariants[2];
        }
        default: {
            //TODO: ERROR
            return ReporterTypeVariants[0];
        }
    };
}

const fromProgramEvidenceType = (type: string) => {
    switch (type) {
        case "Proof":
            return EvidenceType.Proof;
        case "Refutation":
            return EvidenceType.Refutation;
        default:
            return EvidenceType.None;
    }
};

const toProgramEvidenceType = (type: string) => {
    switch (type) {
        case EvidenceType.Proof:
            return "Proof";
        case EvidenceType.Refutation:
            return "Refutation";
        default:
            throw (Error("Invalid evidence type"))
    }
};


export async function createAssociation(program: HistoryValidatorProgram, name: string) {

    await program?.createAssociation(name).then(() => {
        // const association = program.findAssociationAddress(name)[0];
    }, (e) => {
        const error = e as AnchorError;
        console.error(error)
    });
};

export async function createReporter(
    program: HistoryValidatorProgram,
    association: string,
    pubKey: string,
    name: string,
    reporterType: ReporterRank) {

    const authority = new web3.PublicKey(pubKey);
    const assosciationAcc = program.findAssociationAddress(association)[0];
    const status = { status: Status.NONE, error: undefined };

    await program?.createReporter(assosciationAcc, authority, name,
        toProgramReporterType(reporterType)).then(() => {
            const adress = program.findReporterAddress(assosciationAcc, authority)[0];
            status.status = Status.OK;
        }, (e) => {
            const error = e as AnchorError;
            console.error(error)
            status.status = Status.ERROR;
            status.error = e;
        });

    return status;
}

export async function fetchReporters(
    program: HistoryValidatorProgram,
    association: string): Promise<Reporter[]> {

    const data = await program?.program.account.reporter.all();
    const assosciationAcc = program.findAssociationAddress(association)[0];
    const result: Reporter[] = [];

    data.forEach((d) => {
        if (d.account.associaion.equals(assosciationAcc)) {
            result.push({
                pubKey: d.account.authority.toString(),
                name: d.account.name,
                type: d.account.reporterType.expert ? ReporterRank.Expert :
                    (d.account.reporterType.connoisseur ? ReporterRank.Connoisseur : ReporterRank.Validator),
                state: d.account.status.active ? ReporterState.Active :
                    (d.account.status.inactive ? ReporterState.Inactive : ReporterState.Blocked),
            });
        }
    });

    return result;
};

export async function createEvent(
    program: HistoryValidatorProgram,
    association: string,
    reporter: PublicKey,
    title: string,
    location: string,
    description: string,
    startDate: number,
    endData?: number) {

    if (!endData)
        endData = 0;
    const associationKey = program.findAssociationAddress(association)[0];
    const reporterKey = program.findReporterAddress(associationKey, reporter)[0];
    const startBN = new BN(startDate);
    const endBN = new BN(endData);

    const status = { status: Status.NONE, error: undefined };
    await program.createEvent(associationKey,
        reporterKey, title, startBN,
        endBN, location, description).then(() => {
            status.status = Status.OK;
        }, (e) => {
            const error = e as AnchorError;
            console.error(error)
            status.status = Status.ERROR;
            status.error = e;
        });

    return status;
}

export async function fetchEvents(
    program: HistoryValidatorProgram,
    association: string) {

    const assosciationAcc = program.findAssociationAddress(association)[0];
    const data = await program.program.account.event.all();

    const result: Event[] = [];

    data.forEach((ev) => {
        if (ev.account.associaion.equals(assosciationAcc)) {
            result.push({
                title: ev.account.title,
                location: ev.account.location,
                description: ev.account.description,
                startDate: ev.account.beginning.toNumber(),
                endDate: ev.account.ending.toNumber(),
                id: ev.account.id.toString(),
                factsAmount: ev.account.connections.toString(),
                reporter: ev.account.reporter.toString(),
            });
        }
    });

    return result;
}

export async function createFact(
    program: HistoryValidatorProgram,
    association: string,
    reporter: PublicKey,
    title: string,
    location: string,
    description: string,
    startDate: number,
    endData?: number) {

    if (!endData)
        endData = 0;
    const associationKey = program.findAssociationAddress(association)[0];
    const reporterKey = program.findReporterAddress(associationKey, reporter)[0];

    const startBN = new BN(startDate);
    const endBN = new BN(endData);

    const status = { status: Status.NONE, error: undefined };
    await program.createFact(associationKey,
        reporterKey, title, startBN,
        endBN, location, description).then(() => {
            status.status = Status.OK;
        }, (e) => {
            const error = e as AnchorError;
            console.error(error)
            status.status = Status.ERROR;
            status.error = e;
        });

    return status;
}

export async function fetchFacts(
    program: HistoryValidatorProgram,
    association: string) {
    const data = await program.program.account.fact.all();
    const assosciationAcc = program.findAssociationAddress(association)[0];

    const result: Fact[] = [];

    data.forEach((f) => {
        if (f.account.associaion.equals(assosciationAcc)) {
            result.push({
                title: f.account.title,
                location: f.account.location,
                description: f.account.description,
                startDate: f.account.beginning.toNumber(),
                endDate: f.account.ending.toNumber(),
                id: f.account.id.toString(),
                evidencesAmount: f.account.evidences.toNumber(),
                reporter: f.account.reporter.toString(),
            });
        }
    });
    return result;
}

export async function createEvidence(
    program: HistoryValidatorProgram,
    association: string,
    reporter: PublicKey,
    factId: string,
    type: EvidenceType,
    description: string,) {

    const associationKey = program.findAssociationAddress(association)[0];
    const reporterKey = program.findReporterAddress(associationKey, reporter)[0];
    const factKey = program.findFactAddress(associationKey, new BN(factId))[0];

    const status = { status: Status.NONE, error: undefined };

    await program.createEvidence(associationKey,
        reporterKey, factKey, toProgramEvidenceType(type), description).then(() => {
            status.status = Status.OK;
        }, (e) => {
            const error = e as AnchorError;
            console.error(error)
            status.status = Status.ERROR;
            status.error = e;
        });

    return status;
}

export async function fetchEvidences(
    program: HistoryValidatorProgram,
    association: string,
    factId: string) {

    const data = await program.program.account.evidence.all();
    const associationKey = program.findAssociationAddress(association)[0];
    const factKey = program.findFactAddress(associationKey, new BN(factId))[0];

    const result: Evidence[] = [];

    data.forEach((ev) => {
        if (!ev.account.fact.equals(factKey)) return;
        result.push({
            description: ev.account.description,
            reporter: ev.account.reporter.toString(),
            evidenceType: ev.account.evidenceType.proof ? EvidenceType.Proof : EvidenceType.Refutation,
            approvals: ev.account.approvals,
            denials: ev.account.denials,
            id: ev.account.id.toString(),
        });
    });
    return result;
}

export async function createConnection(
    program: HistoryValidatorProgram,
    association: string,
    reporter: PublicKey,
    factId: string,
    eventId: string) {

    const associationKey = program.findAssociationAddress(association)[0];
    const reporterKey = program.findReporterAddress(associationKey, reporter)[0];
    const eventKey = program.findEventAddress(associationKey, new BN(eventId))[0];
    const factKey = program.findFactAddress(associationKey, new BN(factId))[0];

    const status = { status: Status.NONE, error: undefined };

    await program.createConnection(associationKey,
        reporterKey, eventKey, factKey).then(() => {
            status.status = Status.OK;
        }, (e) => {
            const error = e as AnchorError;
            console.error(error)
            status.status = Status.ERROR;
            status.error = e;
        });

    return status;
}

// export async function fetchConnecions(
//     program: HistoryValidatorProgram,
//     association: string,
//     eventId: string) {

//     const associationKey = program.findAssociationAddress(association)[0];
//     const eventKey = program.findEventAddress(associationKey, new BN(eventId))[0];
//     const data = await program.program.account.connection.all();

//     const result: Evidence[] = [];
//     data.forEach((c) => {
//         if (c.account.associaion !== associationKey && c.account.event !== eventKey)
//             return;
//         result.push({
//             description: c.account.description,
//             reporter: c.account.reporter.toString(),
//             evidenceType: fromProgramEvidenceType(c.account.evidenceType as string),
//             approvals: c.account.approvals,
//             denials: c.account.denials,
//         });
//     })
//     return result;
// }

export async function createEvaluation(
    program: HistoryValidatorProgram,
    associationName: string,
    evidenceId: string,
    reporter: PublicKey,
    factId: string,
    type: EvaluationType
) {
    const association = program.findAssociationAddress(associationName)[0];
    const fact = program.findFactAddress(association, new BN(factId))[0];
    const evidence = program.findEvidenceAddress(fact, new BN(evidenceId))[0];
    const reporterKey = program.findReporterAddress(association, reporter)[0];

    const status = { status: Status.OK, error: undefined };
    await program.createEvidenceEvaluation(association, evidence, reporterKey, fact,
        type === EvaluationType.Like ? "Approval" : "Denial", '').catch((e) => {
            const error = e as AnchorError;
            console.error(error.error.errorCode.code);
            status.status = Status.ERROR;
        });

    return status;
}

export async function fetchEvaluations(
    program: HistoryValidatorProgram,
    associationName: string,
    evidenceId: string,
    factId: string
) {
    const association = program.findAssociationAddress(associationName)[0];
    const fact = program.findFactAddress(association, new BN(factId))[0];
    const evidence = program.findEvidenceAddress(fact, new BN(evidenceId))[0];

    const data = await program.program.account.evaluation.all();

    let likes = 0;
    let dislikes = 0;

    data.forEach((e) => {
        if (!evidence.equals(e.account.account)) return;
        e.account.evaluationType.approval ? likes++ : dislikes++;
    });
    return {likes, dislikes};
}

export const getUserType = async (program: HistoryValidatorProgram,
    wallet: NodeWallet,
    associationName: string) => {

    const association = program.findAssociationAddress(associationName)[0];

    const assocData = await program?.program.account.association.fetch(association);
    if (assocData.authority.equals(wallet?.publicKey)) {
        return UserType.Admin;
    }

    const reporterAcc = program?.findReporterAddress(association, wallet?.publicKey)[0];
    const reporterData = await program?.program.account.reporter.fetch(reporterAcc);
    if (reporterData) {
        return UserType.Reporter;
    }
    else {
        return UserType.User;
    }
};

export async function getReporter(
    program: HistoryValidatorProgram,
    associationName: string,
    pubKey: PublicKey) {
    const association = program.findAssociationAddress(associationName)[0];
    const reporterAcc = program?.findReporterAddress(association, new PublicKey(pubKey))[0];

    const reporterData = await program?.program.account.reporter.fetch(reporterAcc);
    return {
        pubKey: pubKey.toString(),
        name: reporterData.name,
        type: reporterData.reporterType.expert ? ReporterRank.Expert :
            (reporterData.reporterType.connoisseur ? ReporterRank.Connoisseur : ReporterRank.Validator),
        state: reporterData.status.active ? ReporterState.Active :
            (reporterData.status.inactive ? ReporterState.Inactive : ReporterState.Blocked),
    };
}
