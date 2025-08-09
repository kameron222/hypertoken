use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use anchor_spl::associated_token::AssociatedToken;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod hypertoken {
    use super::*;

    pub fn initialize_token_factory(ctx: Context<InitializeTokenFactory>) -> Result<()> {
        let token_factory = &mut ctx.accounts.token_factory;
        token_factory.authority = ctx.accounts.authority.key();
        token_factory.token_count = 0;
        Ok(())
    }

    pub fn create_token(
        ctx: Context<CreateToken>,
        name: String,
        symbol: String,
        uri: String,
        decimals: u8,
        initial_supply: u64,
    ) -> Result<()> {
        let token_factory = &mut ctx.accounts.token_factory;
        let mint = &mut ctx.accounts.mint;
        let token_account = &ctx.accounts.token_account;
        let authority = &ctx.accounts.authority;

        // Validate inputs
        require!(name.len() > 0, ErrorCode::InvalidName);
        require!(symbol.len() > 0, ErrorCode::InvalidSymbol);
        require!(decimals <= 9, ErrorCode::InvalidDecimals);
        require!(initial_supply > 0, ErrorCode::InvalidSupply);

        // Initialize the mint
        let cpi_accounts = token::InitializeMint {
            mint: mint.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::initialize_mint(cpi_ctx, decimals, &authority.key(), Some(&authority.key()))?;

        // Mint initial supply to the creator
        let cpi_accounts = token::MintTo {
            mint: mint.to_account_info(),
            to: token_account.to_account_info(),
            authority: authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::mint_to(cpi_ctx, initial_supply)?;

        // Update token factory
        token_factory.token_count += 1;

        // Emit event
        emit!(TokenCreated {
            mint: mint.key(),
            name,
            symbol,
            uri,
            decimals,
            initial_supply,
            creator: authority.key(),
        });

        Ok(())
    }

    pub fn update_token_metadata(
        ctx: Context<UpdateTokenMetadata>,
        name: String,
        symbol: String,
        uri: String,
    ) -> Result<()> {
        // Only the mint authority can update metadata
        require!(
            ctx.accounts.mint.mint_authority.unwrap() == ctx.accounts.authority.key(),
            ErrorCode::Unauthorized
        );

        // Update metadata logic would go here
        // For now, we'll just emit an event
        emit!(TokenMetadataUpdated {
            mint: ctx.accounts.mint.key(),
            name,
            symbol,
            uri,
            updater: ctx.accounts.authority.key(),
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeTokenFactory<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + TokenFactory::INIT_SPACE
    )]
    pub token_factory: Account<'info, TokenFactory>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateToken<'info> {
    #[account(mut)]
    pub token_factory: Account<'info, TokenFactory>,
    #[account(
        init,
        payer = authority,
        mint::decimals = 6,
        mint::authority = authority.key(),
    )]
    pub mint: Account<'info, Mint>,
    #[account(
        init,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = authority,
    )]
    pub token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[derive(Accounts)]
pub struct UpdateTokenMetadata<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    pub authority: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct TokenFactory {
    pub authority: Pubkey,
    pub token_count: u64,
}

#[event]
pub struct TokenCreated {
    pub mint: Pubkey,
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub decimals: u8,
    pub initial_supply: u64,
    pub creator: Pubkey,
}

#[event]
pub struct TokenMetadataUpdated {
    pub mint: Pubkey,
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub updater: Pubkey,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid token name")]
    InvalidName,
    #[msg("Invalid token symbol")]
    InvalidSymbol,
    #[msg("Invalid decimals (must be <= 9)")]
    InvalidDecimals,
    #[msg("Invalid initial supply")]
    InvalidSupply,
    #[msg("Unauthorized")]
    Unauthorized,
}
