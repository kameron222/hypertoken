import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Hypertoken } from "../target/types/hypertoken";
import { PublicKey, Keypair, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { assert } from "chai";

describe("hypertoken", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Hypertoken as Program<Hypertoken>;
  
  let tokenFactory: PublicKey;
  let mint: PublicKey;
  let tokenAccount: PublicKey;
  let user: Keypair;

  beforeEach(async () => {
    user = Keypair.generate();
    
    // Airdrop SOL to user
    const signature = await provider.connection.requestAirdrop(user.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.confirmTransaction(signature);

    // Create token factory
    tokenFactory = Keypair.generate().publicKey;
  });

  it("Can initialize token factory", async () => {
    await program.methods
      .initializeTokenFactory()
      .accounts({
        tokenFactory: tokenFactory,
        authority: user.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    const tokenFactoryAccount = await program.account.tokenFactory.fetch(tokenFactory);
    assert.equal(tokenFactoryAccount.authority.toString(), user.publicKey.toString());
    assert.equal(tokenFactoryAccount.tokenCount.toNumber(), 0);
  });

  it("Can create a new token", async () => {
    // First initialize token factory
    await program.methods
      .initializeTokenFactory()
      .accounts({
        tokenFactory: tokenFactory,
        authority: user.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    // Create new token
    mint = Keypair.generate().publicKey;
    tokenAccount = await getAssociatedTokenAddress(mint, user.publicKey);

    const name = "Test Token";
    const symbol = "TEST";
    const uri = "https://example.com/metadata.json";
    const decimals = 6;
    const initialSupply = new anchor.BN(1000000);

    await program.methods
      .createToken(name, symbol, uri, decimals, initialSupply)
      .accounts({
        tokenFactory: tokenFactory,
        mint: mint,
        tokenAccount: tokenAccount,
        authority: user.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .signers([user])
      .rpc();

    // Verify token factory was updated
    const tokenFactoryAccount = await program.account.tokenFactory.fetch(tokenFactory);
    assert.equal(tokenFactoryAccount.tokenCount.toNumber(), 1);

    // Verify mint was created
    const mintAccount = await program.provider.connection.getAccountInfo(mint);
    assert.isNotNull(mintAccount);
  });

  it("Fails to create token with invalid name", async () => {
    // First initialize token factory
    await program.methods
      .initializeTokenFactory()
      .accounts({
        tokenFactory: tokenFactory,
        authority: user.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    // Try to create token with empty name
    mint = Keypair.generate().publicKey;
    tokenAccount = await getAssociatedTokenAddress(mint, user.publicKey);

    try {
      await program.methods
        .createToken("", "TEST", "https://example.com/metadata.json", 6, new anchor.BN(1000000))
        .accounts({
          tokenFactory: tokenFactory,
          mint: mint,
          tokenAccount: tokenAccount,
          authority: user.publicKey,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .signers([user])
        .rpc();
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Invalid token name");
    }
  });

  it("Fails to create token with invalid symbol", async () => {
    // First initialize token factory
    await program.methods
      .initializeTokenFactory()
      .accounts({
        tokenFactory: tokenFactory,
        authority: user.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    // Try to create token with empty symbol
    mint = Keypair.generate().publicKey;
    tokenAccount = await getAssociatedTokenAddress(mint, user.publicKey);

    try {
      await program.methods
        .createToken("Test Token", "", "https://example.com/metadata.json", 6, new anchor.BN(1000000))
        .accounts({
          tokenFactory: tokenFactory,
          mint: mint,
          tokenAccount: tokenAccount,
          authority: user.publicKey,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .signers([user])
        .rpc();
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Invalid token symbol");
    }
  });

  it("Fails to create token with invalid decimals", async () => {
    // First initialize token factory
    await program.methods
      .initializeTokenFactory()
      .accounts({
        tokenFactory: tokenFactory,
        authority: user.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    // Try to create token with invalid decimals
    mint = Keypair.generate().publicKey;
    tokenAccount = await getAssociatedTokenAddress(mint, user.publicKey);

    try {
      await program.methods
        .createToken("Test Token", "TEST", "https://example.com/metadata.json", 10, new anchor.BN(1000000))
        .accounts({
          tokenFactory: tokenFactory,
          mint: mint,
          tokenAccount: tokenAccount,
          authority: user.publicKey,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .signers([user])
        .rpc();
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Invalid decimals");
    }
  });
});
