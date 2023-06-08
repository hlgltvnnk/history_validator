use super::DISCRIMINATOR_LENGTH;
use anchor_lang::prelude::*;

// Penalty points limit for fictitious information
pub const PENALTY_LIMIT: u8 = 5;

#[account]
pub struct Reporter {
    /// Account version
    pub version: u16,

    /// Seed bump for PDA
    pub bump: u8,

    /// Pubkey of reporter address
    pub associaion: Pubkey,

    /// Reporter type
    pub reporter_type: ReporterType,

    /// Reporter account status
    pub status: ReporterStatus,

    /// Pubkey of reporter address
    pub authority: Pubkey,

    /// Penalty points for fictitious information
    pub penalty_points: u8,

    /// Reporter name
    pub name: String,
}

impl Reporter {
    pub const LEN: usize = DISCRIMINATOR_LENGTH + (2 + 1 + 32 + 1 + 1 + 32 + 1 + 128);
    pub const VERSION: u16 = 1;
}

#[derive(Clone, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub enum ReporterType {
    /// This type of reporter can only evaluate evidences
    Validator,

    /// This type of reporter can сreate and evaluate evidences
    Connoisseur,

    /// This type of reporter is entitled to all actions
    Expert,
}

#[derive(Clone, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub enum ReporterStatus {
    /// Reporter is not active
    Inactive,

    /// Reporter is active and can report
    Active,

    /// Reporter has been blocked
    Blocked,
}
