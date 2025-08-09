'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Navigation } from '../../components/Navigation';
import { CreateTokenForm } from '../../components/CreateTokenForm';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ClientOnly } from '../../components/ClientOnly';

function CreateContent() {
  const { connected } = useWallet();
  const [isCreating, setIsCreating] = useState(false);

  if (!connected) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-4xl float">
                ➕
              </div>
              <div className="absolute inset-0 gradient-primary rounded-2xl opacity-20 blur-xl"></div>
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-4">Connect Your Wallet</h2>
            <p className="text-white/60 mb-8">Connect your Solana wallet to create tokens</p>
            <div className="btn-secondary inline-block">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 slide-in">
              Create Token
            </h1>
            <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-white/5 blur-sm">
              Create Token
            </div>
          </div>
          
          <p className="text-xl text-white/70 mb-12 slide-in">
            Launch your token on Solana in minutes
          </p>
        </div>
      </section>

      {/* Create Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="card-modern slide-in">
            <CreateTokenForm 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">Why Create on HyperToken?</h2>
            <p className="text-white/60">The most advanced token creation platform on Solana</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Instant Creation</h3>
              <p className="text-white/60">Create tokens instantly on Solana's high-speed blockchain</p>
            </div>
            
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                💰
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Low Fees</h3>
              <p className="text-white/60">Minimal transaction costs compared to other blockchains</p>
            </div>
            
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                🔒
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Secure</h3>
              <p className="text-white/60">Built on Solana's secure and decentralized network</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Create() {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen gradient-bg">
          <Navigation />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-4xl float">
                  ➕
                </div>
                <div className="absolute inset-0 gradient-primary rounded-2xl opacity-20 blur-xl"></div>
              </div>
              <h2 className="text-3xl font-bold text-gradient mb-4">Loading...</h2>
              <p className="text-white/60 mb-8">Please wait while we load the page</p>
            </div>
          </div>
        </div>
      }
    >
      <CreateContent />
    </ClientOnly>
  );
}
