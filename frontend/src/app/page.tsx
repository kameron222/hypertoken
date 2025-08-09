'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Stats } from '../components/Stats';
import { MarketCard } from '../components/MarketCard';
import { marketDataService, MarketData } from '../lib/marketData';
import { solanaService } from '../lib/solana';
import { ClientOnly } from '../components/ClientOnly';

function HomeContent() {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [stats, setStats] = useState({
    tokenCount: 0,
    totalVolume: 0,
    activeTokens: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load real-time market data
      const marketData = await marketDataService.getRealTimePrices();
      setMarkets(marketData);
      
      // Load factory stats
      const factoryInfo = await solanaService.getTokenFactoryInfo();
      setStats(factoryInfo);
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  if (loading && markets.length === 0) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-black font-bold text-2xl float">
                🦀
              </div>
              <div className="absolute inset-0 gradient-primary rounded-full opacity-20 blur-xl"></div>
            </div>
            <div className="mt-6 text-white text-xl loading-dots">Loading Market Data</div>
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
              HyperToken
            </h1>
            <p className="text-xl text-white/70 slide-in">
              Create, trade, and manage tokens on Solana
            </p>
            <div className="flex justify-center gap-4 mt-8 slide-in">
              <button 
                onClick={() => window.location.href = '/create'}
                className="btn-primary text-lg px-8 py-4"
              >
                Create Token
              </button>
              <button 
                onClick={() => window.location.href = '/portfolio'}
                className="btn-secondary text-lg px-8 py-4"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Stats stats={stats} />
        </div>
      </section>

      {/* Live Markets Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">Live Markets</h2>
            <p className="text-white/60 mb-4">Real-time token prices and market data</p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/40">
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
              <button 
                onClick={handleRefresh}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {markets.map((market, index) => (
              <div key={market.mintAddress} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MarketCard market={market} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">Why Choose HyperToken?</h2>
            <p className="text-white/60">The most advanced token platform on Solana</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-modern text-center hover-glow">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Lightning Fast</h3>
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

export default function Home() {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen gradient-bg">
          <Navigation />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-black font-bold text-2xl float">
                  🦀
                </div>
                <div className="absolute inset-0 gradient-primary rounded-full opacity-20 blur-xl"></div>
              </div>
              <div className="mt-6 text-white text-xl loading-dots">Loading HyperToken</div>
            </div>
          </div>
        </div>
      }
    >
      <HomeContent />
    </ClientOnly>
  );
}
