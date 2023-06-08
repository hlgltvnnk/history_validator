use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Authority mismatched")]
    AuthorityMismatch,
    #[msg("Association mismatched")]
    AssociationMismatch,
    #[msg("Insufficient qualifications")]
    InsufficientQualifications,
    #[msg("Reporter has been blocked")]
    BlockedReporter,
    #[msg("Reporter is inactive")]
    InactiveReporter,
    #[msg("Reporter is snvalid")]
    InvalidReporter,
    #[msg("It is too late to update")]
    LateUpdate,
    #[msg("Non-sequential ID")]
    NonSequentialId,
    #[msg("Invalid program data account")]
    InvalidProgramData,
    #[msg("Invalid program account")]
    InvalidProgramAccount,
}

// pub fn print_error(error: ErrorCode) -> Result<()> {
//     msg!("Error: {}", error);
//     Err(error.into())
// }
