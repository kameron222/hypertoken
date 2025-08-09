'use client';

interface UserToken {
  symbol: string;
  balance: number;
  mintAddress: string;
  price?: number;
  change24h?: number;
}

interface TokenCardProps {
  token: UserToken;
}

export function TokenCard({ token }: TokenCardProps) {
  const isPositive = (token.change24h || 0) >= 0;
  const tokenValue = (token.balance || 0) * (token.price || 0);
  
  return (
    <div className="card-modern hover-glow group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-black font-bold text-lg">
            {token.symbol.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{token.symbol}</h3>
            <p className="text-sm text-white/60">Your Token</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-bold ${
          isPositive 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {isPositive ? '+' : ''}{(token.change24h || 0).toFixed(2)}%
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Balance</span>
          <span className="text-white font-bold text-lg">{token.balance.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Price</span>
          <span className="text-white">${(token.price || 0).toFixed(6)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Value</span>
          <span className="text-white">${tokenValue.toLocaleString()}</span>
        </div>
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
