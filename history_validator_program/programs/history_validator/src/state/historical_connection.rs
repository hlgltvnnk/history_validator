use super::DISCRIMINATOR_LENGTH;
use anchor_lang::prelude::*;

#[account]
pub struct Connection {
    /// Account version
    pub version: u16,

    /// Seed bump for PDA
    pub bump: u8,

    /// Sequentioal connection id
    pub id: u64,

    /// Pubkey of event to which this connection belongs
    pub event: Pubkey,

    /// Pubkey of fact to which this connection belongs
    pub fact: Pubkey,

    /// Amount of evaluations
    pub approvals: u32,

    /// Amount of evaluations
    pub denials: u32,
}

impl Connection {
    pub const LEN: usize = DISCRIMINATOR_LENGTH + (2 + 1 + 8 + 32 + 32 + 4 + 4);
    pub const VERSION: u16 = 1;
}
