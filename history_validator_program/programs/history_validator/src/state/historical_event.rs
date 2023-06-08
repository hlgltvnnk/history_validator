use super::DISCRIMINATOR_LENGTH;
use anchor_lang::prelude::*;

#[account]
pub struct Event {
    /// Account version
    pub version: u16,

    /// Seed bump for PDA
    pub bump: u8,

    /// Sequential event id
    pub id: u64,

    /// Pubkey of associaion address
    pub associaion: Pubkey,

    /// Event title
    pub title: String,

    /// Event begining in unix
    pub beginning: i64,

    /// Event ending in unix
    pub ending: i64,

    /// Pubkey of reporter for this event
    pub reporter: Pubkey,

    /// Loсation where the event took place
    pub location: String,

    /// Amount of historical connections
    pub connections: u64,

    /// Event description in JSON string
    pub description: String,
}

impl Event {
    pub const LEN: usize = DISCRIMINATOR_LENGTH + (2 + 1 + 8 + 32 + 128 + 8 + 8 + 32 + 128 + 8 + 2048);
    pub const VERSION: u16 = 1;
}
