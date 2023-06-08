use super::DISCRIMINATOR_LENGTH;
use anchor_lang::prelude::*;

#[account]
pub struct Fact {
    /// Account version
    pub version: u16,

    /// Seed bump for PDA
    pub bump: u8,

    /// Sequential fact id
    pub id: u64,

    /// Pubkey of associaion address
    pub associaion: Pubkey,

    /// Event title
    pub title: String,

    /// Fact begining
    pub beginning: i64,

    /// Fact ending
    pub ending: i64,

    /// Pubkey of reporter for this fact
    pub reporter: Pubkey,

    /// Loсation where the fact took place
    pub location: String,

    /// Fact description in JSON string
    pub description: String,

    /// Amount of evidences
    pub evidences: u64,
}

impl Fact {
    pub const LEN: usize =
        DISCRIMINATOR_LENGTH + (2 + 1 + 8 + 128 + 32 + 8 + 8 + 32 + 128 + 2048 + 8);
    pub const VERSION: u16 = 1;
}
