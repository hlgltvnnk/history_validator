use super::DISCRIMINATOR_LENGTH;
use anchor_lang::prelude::*;

pub const DENIAL_LIMIT: u32 = 10;

#[account]
pub struct Evaluation {
    /// Account version
    pub version: u16,

    /// Seed bump for PDA
    pub bump: u8,

    /// Evaluated account
    pub account: Pubkey,

    /// Type of the evaluation
    pub evaluation_type: EvaluationType,

    /// Pubkey of reporter for this event
    pub reporter: Pubkey,

    /// Evaluation description in JSON string
    pub description: String,
}

impl Evaluation {
    pub const LEN: usize = DISCRIMINATOR_LENGTH + (2 + 1 + 32 + 1 + 32 + 2048);
    pub const VERSION: u16 = 1;
}

#[derive(Clone, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub enum EvaluationType {
    Approval,
    Denial,
}
