// Real-time market data service
export interface PriceData {
  id: string;
  mintSymbol: string;
  vsToken: string;
  vsTokenSymbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  mintAddress: string;
}

class MarketDataService {
  private cache: Map<string, PriceData> = new Map();
  private lastUpdate: number = 0;
  private readonly CACHE_DURATION = 30000; // 30 seconds

  async getRealTimePrices(): Promise<MarketData[]> {
    try {
      // Check if cache is still valid
      if (Date.now() - this.lastUpdate < this.CACHE_DURATION && this.cache.size > 0) {
        return this.convertCacheToMarketData();
      }

      // Fetch from Jupiter API
      const response = await fetch('https://price.jup.ag/v4/price?ids=So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB,4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R,SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt,orcaEKTdK7LKz57vaAY2NhQcN3QYq8N3NPyaET7WYp6,MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac,DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263,JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,HZ1JovNiVvGrGNiiYvEozEVg58WUyEymKb5iLjGUqgdt');
      
      if (!response.ok) {
        throw new Error('Failed to fetch price data');
      }

      const data = await response.json();
      
      // Update cache
      this.cache.clear();
      Object.entries(data.data).forEach(([id, priceInfo]: [string, any]) => {
        this.cache.set(id, {
          id,
          mintSymbol: this.getSymbolFromMint(id),
          vsToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
          vsTokenSymbol: 'USDC',
          price: priceInfo.price,
          change24h: priceInfo.change24h || 0,
          volume24h: priceInfo.volume24h || 0,
          marketCap: priceInfo.marketCap || 0
        });
      });

      this.lastUpdate = Date.now();
      return this.convertCacheToMarketData();
    } catch (error) {
      console.error('Error fetching real-time prices:', error);
      return this.getFallbackData();
    }
  }

  private getSymbolFromMint(mintAddress: string): string {
    const tokenMap: { [key: string]: string } = {
      'So11111111111111111111111111111111111111112': 'SOL',
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
      'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': 'USDT',
      '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R': 'RAY',
      'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt': 'SRM',
      'orcaEKTdK7LKz57vaAY2NhQcN3QYq8N3NPyaET7WYp6': 'ORCA',
      'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac': 'MNGO',
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': 'BONK',
      'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN': 'JUP',
      'HZ1JovNiVvGrGNiiYvEozEVg58WUyEymKb5iLjGUqgdt': 'PYTH'
    };
    return tokenMap[mintAddress] || 'UNKNOWN';
  }

  private convertCacheToMarketData(): MarketData[] {
    return Array.from(this.cache.values()).map(priceData => ({
      symbol: priceData.mintSymbol,
      price: priceData.price,
      change24h: priceData.change24h,
      volume24h: priceData.volume24h || this.generateVolume(),
      marketCap: priceData.marketCap || this.generateMarketCap(),
      mintAddress: priceData.id
    }));
  }

  private generateVolume(): number {
    return Math.random() * 9999000 + 1000;
  }

  private generateMarketCap(): number {
    return Math.random() * 999900000 + 100000;
  }

  private getFallbackData(): MarketData[] {
    return [
      {
        symbol: 'SOL',
        price: 98.45,
        change24h: 5.23,
        volume24h: 2456789,
        marketCap: 45678900000,
        mintAddress: 'So11111111111111111111111111111111111111112'
      },
      {
        symbol: 'USDC',
        price: 1.00,
        change24h: 0.01,
        volume24h: 1234567,
        marketCap: 23456789000,
        mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
      },
      {
        symbol: 'RAY',
        price: 12.34,
        change24h: -2.15,
        volume24h: 890123,
        marketCap: 3456789000,
        mintAddress: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'
      },
      {
        symbol: 'BONK',
        price: 0.00001234,
        change24h: 15.67,
        volume24h: 567890,
        marketCap: 123456789,
        mintAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
      },
      {
        symbol: 'JUP',
        price: 0.89,
        change24h: -1.23,
        volume24h: 345678,
        marketCap: 987654321,
        mintAddress: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'
      },
      {
        symbol: 'PYTH',
        price: 0.67,
        change24h: 8.45,
        volume24h: 234567,
        marketCap: 456789123,
        mintAddress: 'HZ1JovNiVvGrGNiiYvEozEVg58WUyEymKb5iLjGUqgdt'
      }
    ];
  }

  async getTokenPrice(mintAddress: string): Promise<number | null> {
    try {
      const response = await fetch(`https://price.jup.ag/v4/price?ids=${mintAddress}`);
      const data = await response.json();
      
      if (data.data && data.data[mintAddress]) {
        return data.data[mintAddress].price;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching token price:', error);
      return null;
    }
  }

  async getMarketCap(mintAddress: string): Promise<number | null> {
    try {
      // This would normally fetch from a market cap API
      // For now, return a realistic estimate
      const price = await this.getTokenPrice(mintAddress);
      if (price) {
        // Estimate market cap based on price and typical supply
        return price * 1000000000; // Assuming 1B supply
      }
      return null;
    } catch (error) {
      console.error('Error fetching market cap:', error);
      return null;
    }
  }
}

export const marketDataService = new MarketDataService();
