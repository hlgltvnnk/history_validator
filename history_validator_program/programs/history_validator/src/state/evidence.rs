use super::DISCRIMINATOR_LENGTH;
use anchor_lang::prelude::*;

#[account]
pub struct Evidence {
    /// Account version
    pub version: u16,

    /// Seed bump for PDA
    pub bump: u8,

    /// Sequentional evidence id
    pub id: u64,

    /// Pubkey of fact address
    pub fact: Pubkey,

    /// Type of the evidence
    pub evidence_type: EvidenceType,

    /// Pubkey of reporter for this event
    pub reporter: Pubkey,

    /// Short description in JSON string
    pub description: String,

    /// Amount of evaluations
    pub approvals: u32,

    /// Amount of evaluations
    pub denials: u32,
}

impl Evidence {
    pub const LEN: usize = DISCRIMINATOR_LENGTH + (2 + 1 + 8 + 1 + 32 + 32 + 2048 + 4 + 4);
    pub const VERSION: u16 = 1;
}

#[derive(Clone, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub enum EvidenceType {
    Proof,
    Refutation,
}
