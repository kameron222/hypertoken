'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Navigation } from '../../components/Navigation';
import { TokenCard } from '../../components/TokenCard';
import { solanaService } from '../../lib/solana';
import { ClientOnly } from '../../components/ClientOnly';

interface UserToken {
  symbol: string;
  balance: number;
  mintAddress: string;
  price?: number;
  change24h?: number;
}

function PortfolioContent() {
  const { connected, publicKey } = useWallet();
  const [userTokens, setUserTokens] = useState<UserToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [totalChange24h, setTotalChange24h] = useState(0);

  useEffect(() => {
    if (connected && publicKey) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, [connected, publicKey]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const tokens = await solanaService.getUserTokens(publicKey!.toString());
      const markets = await solanaService.getMarkets();
      
      // Combine user tokens with market data
      const enrichedTokens = tokens.map(token => {
        const market = markets.find(m => m.symbol === token.symbol);
        return {
          ...token,
          price: market?.price || 0,
          change24h: market?.change24h || 0
        };
      });

      setUserTokens(enrichedTokens);
      
      // Calculate total portfolio value
      const total = enrichedTokens.reduce((sum, token) => {
        return sum + (token.balance * (token.price || 0));
      }, 0);
      setTotalValue(total);

      // Calculate total 24h change
      const totalChange = enrichedTokens.reduce((sum, token) => {
        return sum + ((token.balance * (token.price || 0)) * (token.change24h || 0) / 100);
      }, 0);
      setTotalChange24h(totalChange);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-4xl float">
                💼
              </div>
              <div className="absolute inset-0 gradient-primary rounded-2xl opacity-20 blur-xl"></div>
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-4">Connect Your Wallet</h2>
            <p className="text-white/60 mb-8">Connect your Solana wallet to view your portfolio</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-black font-bold text-2xl float">
                💼
              </div>
              <div className="absolute inset-0 gradient-primary rounded-full opacity-20 blur-xl"></div>
            </div>
            <div className="mt-6 text-white text-xl loading-dots">Loading Portfolio</div>
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 slide-in">
              Your Portfolio
            </h1>
            <p className="text-xl text-white/70 slide-in">
              Manage your Solana tokens and track your investments
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                💰
              </div>
              <div className="text-4xl font-bold text-gradient mb-2">${totalValue.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Total Portfolio Value</div>
            </div>
            
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                📈
              </div>
              <div className={`text-4xl font-bold mb-2 ${totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalChange24h >= 0 ? '+' : ''}${totalChange24h.toLocaleString()}
              </div>
              <div className="text-white/60 text-sm">24h Change</div>
            </div>
            
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                🪙
              </div>
              <div className="text-4xl font-bold text-gradient-secondary mb-2">{userTokens.length}</div>
              <div className="text-white/60 text-sm">Tokens Owned</div>
            </div>
          </div>
        </div>
      </section>

      {/* User Tokens */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">Your Tokens</h2>
            <p className="text-white/60">Track your token holdings and performance</p>
          </div>
          
          {userTokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userTokens.map((token, index) => (
                <div key={token.mintAddress} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TokenCard token={token} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-4xl mx-auto mb-6">
                🪙
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Tokens Found</h3>
              <p className="text-white/60 mb-8">You don't have any tokens in your wallet yet</p>
              <button 
                onClick={() => window.location.href = '/create'}
                className="btn-primary text-lg px-8 py-4"
              >
                Create Your First Token
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function Portfolio() {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen gradient-bg">
          <Navigation />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-black font-bold text-2xl float">
                  💼
                </div>
                <div className="absolute inset-0 gradient-primary rounded-full opacity-20 blur-xl"></div>
              </div>
              <div className="mt-6 text-white text-xl loading-dots">Loading Portfolio</div>
            </div>
          </div>
        </div>
      }
    >
      <PortfolioContent />
    </ClientOnly>
  );
}
