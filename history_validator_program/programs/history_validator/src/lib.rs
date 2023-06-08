use anchor_lang::prelude::*;

mod context;
mod error;
mod state;

use crate::state::*;
use context::*;

declare_id!("GQweAcDro4jXn1BLPjq6hjbi6YyZjL3aBThN8UFuBP5X");

#[program]
pub mod history_validator {

    use super::*;

    pub fn initialize_association(
        ctx: Context<InitializeAssociation>,
        association_id: [u8; 32],
        bump: u8,
    ) -> Result<()> {
        let association = &mut ctx.accounts.association;

        association.version = Association::VERSION;
        association.bump = bump;
        association.id = association_id;
        association.authority = ctx.accounts.authority.key();

        Ok(())
    }

    pub fn initialize_reporter(
        ctx: Context<InitializeReporter>,
        reporter_type: ReporterType,
        address: Pubkey,
        name: String,
        bump: u8,
    ) -> Result<()> {
        let reporter = &mut ctx.accounts.reporter;
        let association = &mut ctx.accounts.association;

        reporter.version = Reporter::VERSION;
        reporter.bump = bump;
        reporter.associaion = association.key();
        reporter.reporter_type = reporter_type;
        reporter.status = ReporterStatus::Active;
        reporter.authority = address;
        reporter.penalty_points = 0;
        reporter.name = name;

        association.reporters += 1;

        Ok(())
    }

    pub fn update_reporter_status(
        ctx: Context<InitializeReporter>,
        status: ReporterStatus,
    ) -> Result<()> {
        let reporter = &mut ctx.accounts.reporter;

        reporter.status = status;

        Ok(())
    }

    pub fn create_event(
        ctx: Context<CreateEvent>,
        title: String,
        beginning: i64,
        ending: i64,
        location: String,
        description: String,
        bump: u8,
    ) -> Result<()> {
        let event = &mut ctx.accounts.event;
        let association = &mut ctx.accounts.association;

        event.version = Event::VERSION;
        event.bump = bump;
        event.id = association.events + 1;
        event.title = title;
        event.beginning = beginning;
        event.ending = ending;
        event.reporter = ctx.accounts.reporter.key();
        event.location = location;
        event.connections = 0;
        event.description = description;
        event.associaion = association.key();

        association.events += 1;

        Ok(())
    }

    pub fn update_event(
        ctx: Context<UpdateEvent>,
        beginning: i64,
        ending: i64,
        location: String,
        description: String,
    ) -> Result<()> {
        let event = &mut ctx.accounts.event;

        event.beginning = beginning;
        event.ending = ending;
        event.location = location;
        event.description = description;

        Ok(())
    }

    pub fn create_fact(
        ctx: Context<CreateFact>,
        title: String,
        beginning: i64,
        ending: i64,
        location: String,
        description: String,
        bump: u8,
    ) -> Result<()> {
        let fact = &mut ctx.accounts.fact;
        let association = &mut ctx.accounts.association;

        fact.version = Fact::VERSION;
        fact.bump = bump;
        fact.id = association.facts + 1;
        fact.title = title;
        fact.beginning = beginning;
        fact.ending = ending;
        fact.reporter = ctx.accounts.reporter.key();
        fact.location = location;
        fact.evidences = 0;
        fact.description = description;
        fact.associaion = association.key();

        association.facts += 1;

        Ok(())
    }

    pub fn update_fact(
        ctx: Context<UpdateFact>,
        beginning: i64,
        ending: i64,
        location: String,
        description: String,
    ) -> Result<()> {
        let fact = &mut ctx.accounts.fact;

        fact.beginning = beginning;
        fact.ending = ending;
        fact.location = location;
        fact.description = description;

        Ok(())
    }

    pub fn create_connection(
        ctx: Context<CreateConnection>,
        bump: u8,
    ) -> Result<()> {
        let connection = &mut ctx.accounts.connection;
        let event = &mut ctx.accounts.event;

        connection.version = Connection::VERSION;
        connection.bump = bump;
        connection.id = event.connections + 1;
        connection.fact = ctx.accounts.fact.key();
        connection.event = event.key();

        event.connections += 1;

        Ok(())
    }

    pub fn create_evidence(
        ctx: Context<CreateEvidence>,
        evidence_type: EvidenceType,
        description: String,
        bump: u8,
    ) -> Result<()> {
        let evidence = &mut ctx.accounts.evidence;
        let fact = &mut ctx.accounts.fact;

        evidence.version = Evidence::VERSION;
        evidence.bump = bump;
        evidence.id = fact.evidences + 1;
        evidence.evidence_type = evidence_type;
        evidence.reporter = ctx.accounts.reporter.key();
        evidence.description = description;
        evidence.fact = fact.key();

        fact.evidences += 1;

        Ok(())
    }

    pub fn create_evidence_evaluation(
        ctx: Context<CreateEvidenceEvaluation>,
        evaluation_type: EvaluationType,
        description: String,
        bump: u8,
    ) -> Result<()> {
        let evaluation = &mut ctx.accounts.evaluation;
        let reporter = &mut ctx.accounts.reporter;
        let evidence = &mut ctx.accounts.evidence;

        if evaluation_type == EvaluationType::Denial {
            evidence.denials += 1;
            if evidence.denials == DENIAL_LIMIT {
                reporter.penalty_points += 1;
            }
        } else {
            evidence.approvals += 1;
        }

        evaluation.version = Evaluation::VERSION;
        evaluation.bump = bump;
        evaluation.account = evidence.key();
        evaluation.evaluation_type = evaluation_type;
        evaluation.reporter = reporter.key();
        evaluation.description = description;

        Ok(())
    }

    pub fn create_connection_evaluation(
        ctx: Context<CreateConnectionEvaluation>,
        evaluation_type: EvaluationType,
        description: String,
        bump: u8,
    ) -> Result<()> {
        let evaluation = &mut ctx.accounts.evaluation;
        let reporter = &mut ctx.accounts.reporter;
        let connection = &mut ctx.accounts.connection;

        if evaluation_type == EvaluationType::Denial {
            connection.denials += 1;
            if connection.denials == DENIAL_LIMIT {
                reporter.penalty_points += 1;
            }
        } else {
            connection.approvals += 1;
        }

        evaluation.version = Evaluation::VERSION;
        evaluation.bump = bump;
        evaluation.account = connection.key();
        evaluation.evaluation_type = evaluation_type;
        evaluation.reporter = reporter.key();
        evaluation.description = description;

        Ok(())
    }
}
