import { PublicKey } from "@solana/web3.js";

// enums
export enum PageVariant {
    Events,
    Facts,
    Reporter,
};

export enum EvaluationType {
    None,
    Like,
    Dislike,
}

export enum UserType {
    User = 'User',
    Reporter = 'Reporter',
    Admin = 'Admin',
};

export enum ReporterRank {
    Empty = '',
    Validator = 'Validator',
    Connoisseur = 'Connoisseur',
    Expert = 'Expert',
}

export enum ReporterState {
    None = '',
    Inactive = 'Incavtive',
    Active = 'Active',
    Blocked = 'Blocked',
}

export enum EvidenceType {
    None = '',
    Proof = 'Proof',
    Refutation = 'Refutation',
}

// Types
export interface Reporter {
    pubKey: string,
    name: string,
    type: ReporterRank,
    state: ReporterState,
}

export interface Event {
    title: string,
    location: string,
    description: string,
    startDate: number,
    endDate?: number,
    id: string,
    factsAmount: string,
    reporter: string,
}

export interface Fact {
    id: string,
    title: string,
    startDate: number,
    endDate?: number,
    reporter: string,
    location: string,
    description: string,
    evidencesAmount: number,
}

export interface Evidence {
    description: string,
    reporter: string,
    evidenceType: EvidenceType,
    approvals: number,
    denials: number,
    id: string,
}

export interface Evaluation {
    likes: number,
    dislikes: number,
};

// Components props
export interface IDialogProps {
    open: boolean;
    onHandleClose: () => void;
};

export interface IFactDialogProps extends IDialogProps {
    event?: string,
}

export interface IEvidenceDialogProps extends IDialogProps {
    factID: string,
}
