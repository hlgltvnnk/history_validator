// ReporterType
export const ReporterType = {
  Validator: { validator: {} },
  Connoisseur: { connoisseur: {} },
  Expert: { expert: {} },
} as const;

export type ReporterTypeKeys = keyof typeof ReporterType;

export const ReporterTypeVariants = Object.keys(ReporterType) as Readonly<
  ReporterTypeKeys[]
>;

// ReporterStatus
export const ReporterStatus = {
  Inactive: { inactive: {} },
  Active: { active: {} },
  Blocked: { blocked: {} },
} as const;

export type ReporterStatusKeys = keyof typeof ReporterStatus;

export const ReporterStatusVariants = Object.keys(ReporterStatus) as Readonly<
  ReporterStatusKeys[]
>;

// EvidenceType
export const EvidenceType = {
  Proof: { proof: {} },
  Refutation: { refutation: {} },
} as const;

export type EvidenceTypeKeys = keyof typeof EvidenceType;

export const EvidenceTypeVariants = Object.keys(EvidenceType) as Readonly<
  EvidenceTypeKeys[]
>;

// EvaluationTypeType
export const EvaluationType = {
  Approval: { approval: {} },
  Denial: { denial: {} },
} as const;

export type EvaluationTypeKeys = keyof typeof EvaluationType;

export const EvaluationTypeVariants = Object.keys(EvaluationType) as Readonly<
  EvaluationTypeKeys[]
>;
