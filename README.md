HyperToken - Solana Token Creation Platform

Platform for creating and managing tokens on Solana blockchain. Built with Next.js, TypeScript, and Solana Web3.js.



- Node.js 18+
- Solana CLI
- A Solana wallet (Phantom, Solflare, etc.)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hypertoken/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   # Create .env.local
   echo "NEXT_PUBLIC_PROGRAM_ID=YOUR_PROGRAM_ID" > .env.local
   echo "NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com" >> .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Visit `http://localhost:3000`
   - Connect your Solana wallet
   - Start creating tokens!

Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Set Environment Variables**
   In your Vercel dashboard, add:
   ```
   NEXT_PUBLIC_PROGRAM_ID=YOUR_PROGRAM_ID
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
   ```
Stack

### Frontend
- **Framework**: Next.js 15.0.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Wallet Integration**: Solana Wallet Adapter

### Blockchain
- **Blockchain**: Solana Web3.js, SPL Token
- **Smart Contracts**: Anchor Framework
- **RPC**: Solana Devnet/Mainnet

### APIs & Services
- **Jupiter Price API**: Live token prices
- **SPL Token Program**: Token information
- **Solana RPC**: Blockchain data

### Deployment
- **Platform**: Vercel (recommended)
- **CI/CD**: GitHub Actions
- **Environment**: Node.js 18+

## 📁 Project Structure

```
hypertoken/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── lib/            # Utility functions and services
│   │   └── styles/         # Global styles
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── programs/               # Solana smart contracts
│   └── hypertoken/        # Anchor program
├── tests/                 # Test files
└── README.md             # This file
```

Configuration

### Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
# Solana Program ID (your deployed program)
NEXT_PUBLIC_PROGRAM_ID=YOUR_PROGRAM_ID

# Solana RPC URL
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### Supported Tokens

The platform supports all SPL tokens on Solana, including:
- USDC, USDT, SOL
- Custom tokens created through the platform
- Any SPL token with proper metadata

Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

