'use client';

interface StatsProps {
  stats: {
    tokenCount: number;
    totalVolume: number;
    activeTokens: number;
  };
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="card-modern text-center hover-glow">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
          🪙
        </div>
        <div className="text-4xl font-bold text-gradient mb-2">{stats.tokenCount.toLocaleString()}</div>
        <div className="text-white/60 text-sm">Tokens Created</div>
      </div>
      
      <div className="card-modern text-center hover-glow">
        <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
          📊
        </div>
        <div className="text-4xl font-bold text-gradient-secondary mb-2">${stats.totalVolume.toLocaleString()}</div>
        <div className="text-white/60 text-sm">Total Volume</div>
      </div>
      
      <div className="card-modern text-center hover-glow">
        <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
          ⚡
        </div>
        <div className="text-4xl font-bold text-gradient mb-2">{stats.activeTokens.toLocaleString()}</div>
        <div className="text-white/60 text-sm">Active Tokens</div>
      </div>
    </div>
  );
}
