use super::DISCRIMINATOR_LENGTH;
use anchor_lang::prelude::*;

#[account]
pub struct Association {
    /// Account version
    pub version: u16,

    /// Seed bump for PDA
    pub bump: u8,

    /// Association id
    pub id: [u8; 32],

    /// Reporter amount
    pub reporters: u64,

    /// Event amount
    pub events: u64,

    /// Fact amount
    pub facts: u64,

    /// Pubkey of association authority
    pub authority: Pubkey,
}

impl Association {
    pub const LEN: usize = DISCRIMINATOR_LENGTH + (2 + 1 + 8 + 8 + 8 + 8 + 32);
    pub const VERSION: u16 = 1;
}
