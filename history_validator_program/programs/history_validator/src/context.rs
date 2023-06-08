use anchor_lang::prelude::*;

use crate::{error::ErrorCode, id, state::*};

#[derive(Accounts)]
#[instruction(association_id: [u8; 32], bump: u8)]
pub struct InitializeAssociation<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        owner = id(),
        seeds = [b"association".as_ref(), &association_id],
        bump,
        space = Association::LEN + ACCOUNT_RESERVE_SPACE
    )]
    pub association: Account<'info, Association>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bump: u8, address: Pubkey)]
pub struct InitializeReporter<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        init,
        payer = authority,
        owner = id(),
        seeds = [b"reporter".as_ref(), association.key().as_ref(), address.as_ref()],
        bump,
        space = Reporter::LEN + ACCOUNT_RESERVE_SPACE
    )]
    pub reporter: Account<'info, Reporter>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateReporterStatus<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        mut,
        owner = id(),
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct CreateEvent<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        owner = id(),
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        constraint = reporter.reporter_type == ReporterType::Expert @ ErrorCode::InsufficientQualifications,
        constraint = reporter.penalty_points != PENALTY_LIMIT || reporter.status != ReporterStatus::Blocked @ ErrorCode::BlockedReporter,
        constraint = reporter.status != ReporterStatus::Inactive @ ErrorCode::InactiveReporter,
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    #[account(
        init,
        payer = authority,
        owner = id(),
        seeds = [b"historical_event".as_ref(), association.key().as_ref(), &(association.events + 1).to_le_bytes()],
        bump,
        space = Event::LEN + ACCOUNT_RESERVE_SPACE
    )]
    pub event: Account<'info, Event>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateEvent<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        owner = id(),
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        constraint = reporter.key() == event.reporter @ ErrorCode::InvalidReporter,
        constraint = reporter.penalty_points != PENALTY_LIMIT || reporter.status != ReporterStatus::Blocked @ ErrorCode::BlockedReporter,
        constraint = reporter.status != ReporterStatus::Inactive @ ErrorCode::InactiveReporter,
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    #[account(
        mut,
        owner = id(),
        constraint = event.connections == 0 @ ErrorCode::LateUpdate,
        seeds = [b"historical_event".as_ref(), association.key().as_ref(), &event.id.to_le_bytes()],
        bump = event.bump,
    )]
    pub event: Account<'info, Event>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct CreateFact<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        owner = id(),
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        constraint = reporter.reporter_type == ReporterType::Expert @ ErrorCode::InsufficientQualifications,
        constraint = reporter.penalty_points != PENALTY_LIMIT || reporter.status != ReporterStatus::Blocked @ ErrorCode::BlockedReporter,
        constraint = reporter.status != ReporterStatus::Inactive @ ErrorCode::InactiveReporter,
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    #[account(
        init,
        payer = authority,
        owner = id(),
        seeds = [b"historical_fact".as_ref(), association.key().as_ref(), &(association.facts + 1).to_le_bytes()],
        bump,
        space = Fact::LEN + ACCOUNT_RESERVE_SPACE
    )]
    pub fact: Account<'info, Fact>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateFact<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        owner = id(),
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        constraint = reporter.key() == fact.reporter @ ErrorCode::InvalidReporter,
        constraint = reporter.penalty_points != PENALTY_LIMIT || reporter.status != ReporterStatus::Blocked @ ErrorCode::BlockedReporter,
        constraint = reporter.status != ReporterStatus::Inactive @ ErrorCode::InactiveReporter,
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    #[account(
        mut,
        owner = id(),
        constraint = fact.evidences == 0 @ ErrorCode::LateUpdate,
        seeds = [b"historical_fact".as_ref(), association.key().as_ref(), &fact.id.to_le_bytes()],
        bump = fact.bump,
    )]
    pub fact: Account<'info, Fact>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct CreateConnection<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        owner = id(),
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        constraint = reporter.reporter_type == ReporterType::Expert @ ErrorCode::InsufficientQualifications,
        constraint = reporter.penalty_points != PENALTY_LIMIT || reporter.status != ReporterStatus::Blocked @ ErrorCode::BlockedReporter,
        constraint = reporter.status != ReporterStatus::Inactive @ ErrorCode::InactiveReporter,
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    #[account(
        mut,
        owner = id(),
        seeds = [b"historical_event".as_ref(), association.key().as_ref(), &event.id.to_le_bytes()],
        bump = event.bump,
    )]
    pub event: Account<'info, Event>,

    #[account(
        owner = id(),
        seeds = [b"historical_fact".as_ref(), association.key().as_ref(), &fact.id.to_le_bytes()],
        bump = fact.bump,
    )]
    pub fact: Account<'info, Fact>,

    #[account(
        init,
        payer = authority,
        owner = id(),
        seeds = [b"historical_connection".as_ref(), event.key().as_ref(), &(event.connections + 1).to_le_bytes()],
        bump,
        space = Connection::LEN + ACCOUNT_RESERVE_SPACE
    )]
    pub connection: Account<'info, Connection>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct CreateEvidence<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        owner = id(),
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        constraint = reporter.reporter_type == ReporterType::Expert || reporter.reporter_type == ReporterType::Connoisseur @ ErrorCode::InsufficientQualifications,
        constraint = reporter.penalty_points != PENALTY_LIMIT || reporter.status != ReporterStatus::Blocked @ ErrorCode::BlockedReporter,
        constraint = reporter.status != ReporterStatus::Inactive @ ErrorCode::InactiveReporter,
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    #[account(
        mut,
        owner = id(),
        seeds = [b"historical_fact".as_ref(), association.key().as_ref(), &fact.id.to_le_bytes()],
        bump = fact.bump,
    )]
    pub fact: Account<'info, Fact>,

    #[account(
        init,
        payer = authority,
        owner = id(),
        seeds = [b"evidence".as_ref(), fact.key().as_ref(), &(fact.evidences + 1).to_le_bytes()],
        bump,
        space = Evidence::LEN + ACCOUNT_RESERVE_SPACE
    )]
    pub evidence: Account<'info, Evidence>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct CreateEvidenceEvaluation<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        owner = id(),
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        mut,
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        constraint = reporter.penalty_points != PENALTY_LIMIT || reporter.status != ReporterStatus::Blocked @ ErrorCode::BlockedReporter,
        constraint = reporter.status != ReporterStatus::Inactive @ ErrorCode::InactiveReporter,
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    #[account(
        owner = id(),
        seeds = [b"historical_fact".as_ref(), association.key().as_ref(), &fact.id.to_le_bytes()],
        bump = fact.bump,
    )]
    pub fact: Account<'info, Fact>,

    #[account(
        mut,
        owner = id(),
        seeds = [b"evidence".as_ref(), fact.key().as_ref(), &evidence.id.to_le_bytes()],
        bump = evidence.bump,
    )]
    pub evidence: Account<'info, Evidence>,

    #[account(
        init,
        payer = authority,
        owner = id(),
        seeds = [b"evidence_evaluation".as_ref(), reporter.key().as_ref(), evidence.key().as_ref()],
        bump,
        space = Evaluation::LEN + ACCOUNT_RESERVE_SPACE
    )]
    pub evaluation: Account<'info, Evaluation>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct CreateConnectionEvaluation<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        owner = id(),
        seeds = [b"association".as_ref(), &association.id],
        bump = association.bump,
    )]
    pub association: Account<'info, Association>,

    #[account(
        mut,
        owner = id(),
        has_one = authority @ ErrorCode::AuthorityMismatch,
        constraint = reporter.penalty_points != PENALTY_LIMIT || reporter.status != ReporterStatus::Blocked @ ErrorCode::BlockedReporter,
        constraint = reporter.status != ReporterStatus::Inactive @ ErrorCode::InactiveReporter,
        seeds = [b"reporter".as_ref(), association.key().as_ref(), reporter.authority.as_ref()],
        bump = reporter.bump,
    )]
    pub reporter: Account<'info, Reporter>,

    #[account(
        owner = id(),
        seeds = [b"historical_event".as_ref(), association.key().as_ref(), &event.id.to_le_bytes()],
        bump = event.bump,
    )]
    pub event: Account<'info, Event>,

    #[account(
        mut,
        owner = id(),
        seeds = [b"historical_connection".as_ref(), event.key().as_ref(), &connection.id.to_le_bytes()],
        bump = connection.bump,
    )]
    pub connection: Account<'info, Connection>,

    #[account(
        init,
        payer = authority,
        owner = id(),
        seeds = [b"connection_evaluation".as_ref(), reporter.key().as_ref(), connection.key().as_ref()],
        bump,
        space = Evaluation::LEN + ACCOUNT_RESERVE_SPACE
    )]
    pub evaluation: Account<'info, Evaluation>,

    pub system_program: Program<'info, System>,
}
