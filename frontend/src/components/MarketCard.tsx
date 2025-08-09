'use client';

import { MarketData } from '../lib/marketData';

interface MarketCardProps {
  market: MarketData;
}

export function MarketCard({ market }: MarketCardProps) {
  const isPositive = market.change24h >= 0;
  
  return (
    <div className="card-modern hover-glow group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-black font-bold text-lg">
            {market.symbol.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{market.symbol}</h3>
            <p className="text-sm text-white/60">Live Market</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-bold ${
          isPositive 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {isPositive ? '+' : ''}{market.change24h.toFixed(2)}%
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Price</span>
          <span className="text-white font-bold text-lg">${market.price.toFixed(6)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Volume 24h</span>
          <span className="text-white">${market.volume24h.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Market Cap</span>
          <span className="text-white">${market.marketCap.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 btn-primary text-sm py-2">
          View
        </button>
        <button className="flex-1 btn-secondary text-sm py-2">
          Trade Now
        </button>
      </div>
    </div>
  );
}
