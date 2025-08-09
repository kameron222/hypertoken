'use client';

interface RecentToken {
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

interface RecentTokenCardProps {
  token: RecentToken;
  showCreator?: boolean;
}

export function RecentTokenCard({ token, showCreator = false }: RecentTokenCardProps) {
  const isPositive = token.change24h ? token.change24h >= 0 : false;
  
  return (
    <div className="card-modern hover-glow group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-black font-bold text-lg">
            {token.symbol.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{token.name}</h3>
            <p className="text-sm text-white/60">{token.symbol}</p>
          </div>
        </div>
        {token.change24h !== undefined && (
          <div className={`px-4 py-2 rounded-full text-sm font-bold ${
            isPositive 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
          </div>
        )}
      </div>
      
      <div className="space-y-4 mb-6">
        {token.price !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Price</span>
            <span className="text-white font-bold text-lg">${token.price.toFixed(6)}</span>
          </div>
        )}
        
        {token.supply && (
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Supply</span>
            <span className="text-white">{parseFloat(token.supply).toLocaleString()}</span>
          </div>
        )}
        
        {showCreator && token.creator && (
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Creator</span>
            <span className="text-white text-sm">
              {token.creator.slice(0, 8)}...{token.creator.slice(-8)}
            </span>
          </div>
        )}
        
        {token.createdAt && (
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Created</span>
            <span className="text-white text-sm">
              {new Date(token.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 btn-primary text-sm py-2">
          View
        </button>
        <button className="flex-1 btn-secondary text-sm py-2">
          Trade
        </button>
      </div>
    </div>
  );
}
