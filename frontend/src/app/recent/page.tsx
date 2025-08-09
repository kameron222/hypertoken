'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '../../components/Navigation';
import { RecentTokenCard } from '../../components/RecentTokenCard';

interface Token {
  mint: string;
  name: string;
  symbol: string;
  price?: number;
  change24h?: number;
  balance?: string;
  supply?: string;
  creator?: string;
  createdAt?: number;
}

export default function RecentTokens() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'trending' | 'new'>('all');

  useEffect(() => {
    loadRecentTokens();
  }, []);

  const loadRecentTokens = async () => {
    setLoading(true);
    try {
      // Mock data for recently created tokens
      const mockTokens: Token[] = [
        {
          mint: 'recent1',
          name: 'Meme Coin Alpha',
          symbol: 'MCA',
          price: 0.000123,
          change24h: 45.67,
          supply: '1000000000',
          creator: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          createdAt: Date.now() - 3600000, // 1 hour ago
        },
        {
          mint: 'recent2',
          name: 'DeFi Protocol Token',
          symbol: 'DFPT',
          price: 0.0456,
          change24h: 12.34,
          supply: '10000000',
          creator: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
          createdAt: Date.now() - 7200000, // 2 hours ago
        },
        {
          mint: 'recent3',
          name: 'Gaming Token Beta',
          symbol: 'GTB',
          price: 0.00234,
          change24h: -5.67,
          supply: '50000000',
          creator: '3xNweLHLqrxmofj8X1JpJ8vKqKqKqKqKqKqKqKqKqKqK',
          createdAt: Date.now() - 10800000, // 3 hours ago
        },
        {
          mint: 'recent4',
          name: 'Utility Token Gamma',
          symbol: 'UTG',
          price: 0.00156,
          change24h: 8.90,
          supply: '25000000',
          creator: '5xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          createdAt: Date.now() - 14400000, // 4 hours ago
        },
        {
          mint: 'recent5',
          name: 'Community Token Delta',
          symbol: 'CTD',
          price: 0.000789,
          change24h: 23.45,
          supply: '75000000',
          creator: '8xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          createdAt: Date.now() - 18000000, // 5 hours ago
        },
        {
          mint: 'recent6',
          name: 'Innovation Token Echo',
          symbol: 'ITE',
          price: 0.00345,
          change24h: -2.34,
          supply: '15000000',
          creator: '2xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          createdAt: Date.now() - 21600000, // 6 hours ago
        },
      ];

      setTokens(mockTokens);
    } catch (error) {
      console.error('Error loading recent tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTokens = tokens.filter(token => {
    if (filter === 'trending') {
      return token.change24h && token.change24h > 10;
    }
    if (filter === 'new') {
      return token.createdAt && (Date.now() - token.createdAt) < 3600000; // Last hour
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-black font-bold text-2xl float">
                🔍
              </div>
              <div className="absolute inset-0 gradient-primary rounded-full opacity-20 blur-xl"></div>
            </div>
            <div className="mt-6 text-white text-xl loading-dots">Loading Recent Tokens</div>
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
              Recent Tokens
            </h1>
            <p className="text-xl text-white/70 slide-in">
              Discover the latest tokens created on Solana
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1 bg-white/5 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-primary text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              All Tokens
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all duration-300 ${
                filter === 'trending'
                  ? 'bg-primary text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all duration-300 ${
                filter === 'new'
                  ? 'bg-primary text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Just Created
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                🪙
              </div>
              <div className="text-4xl font-bold text-gradient mb-2">{filteredTokens.length}</div>
              <div className="text-white/60 text-sm">Total Tokens</div>
            </div>
            
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                💰
              </div>
              <div className="text-4xl font-bold text-gradient-secondary mb-2">
                ${(filteredTokens.reduce((sum, token) => sum + (token.price || 0), 0) / filteredTokens.length).toFixed(6)}
              </div>
              <div className="text-white/60 text-sm">Average Price</div>
            </div>
            
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                📊
              </div>
              <div className="text-4xl font-bold text-gradient mb-2">
                ${filteredTokens.reduce((sum, token) => {
                  const supply = parseFloat(token.supply || '0');
                  const price = token.price || 0;
                  return sum + (supply * price);
                }, 0).toFixed(2)}
              </div>
              <div className="text-white/60 text-sm">Total Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokens Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gradient mb-4">
                {filter === 'trending' ? 'Trending Tokens' : 
                 filter === 'new' ? 'Recently Created' : 'All Recent Tokens'}
              </h2>
              <p className="text-white/60">{filteredTokens.length} token{filteredTokens.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>
          
          {filteredTokens.length === 0 ? (
            <div className="text-center">
              <div className="w-24 h-24 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-4xl mx-auto mb-6">
                🔍
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Tokens Found</h3>
              <p className="text-white/60 mb-8">No tokens match your current filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTokens.map((token, index) => (
                <div key={token.mint} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <RecentTokenCard 
                    token={token} 
                    showCreator={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Load More */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <button className="btn-primary text-lg px-8 py-4">
            Load More Tokens
          </button>
        </div>
      </section>
    </div>
  );
}
