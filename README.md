# 🦀 HyperToken - Solana Token Creation Platform

A modern, beautiful platform for creating and managing tokens on Solana blockchain. Built with Next.js, TypeScript, and Solana Web3.js.

![HyperToken](https://img.shields.io/badge/HyperToken-Solana%20Token%20Creator-blue?style=for-the-badge&logo=solana)
![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## ✨ Features

- 🎨 **Beautiful UI** - Modern design inspired by usefelix.xyz
- ⚡ **Real-time Data** - Live market prices and blockchain data
- 🔗 **Wallet Integration** - Support for Phantom, Solflare, and more
- 🪙 **Token Creation** - Create SPL tokens on Solana
- 📊 **Portfolio Tracking** - Real-time token balances and values
- 🌐 **Live Markets** - Real-time price data from Jupiter API
- 🚀 **Production Ready** - Deployed and optimized

## 🚀 Quick Start

### Prerequisites

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

## 🚀 Deployment

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

### Option 2: Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   netlify deploy --prod --dir=out
   ```

### Option 3: Deploy to Railway

1. **Connect your GitHub repo to Railway**
2. **Railway will auto-deploy on push**

## 🎯 Features Overview

### Real-Time Market Data
- Live prices from Jupiter API
- Real-time token balances
- Market cap and volume tracking

### Token Creation
- Create SPL tokens on Solana
- Customizable token parameters
- Instant token deployment

### Portfolio Management
- Real token balances
- Portfolio value tracking
- Token transaction history

### Modern UI/UX
- Responsive design
- Dark mode with gradients
- Smooth animations
- Mobile-friendly

## 🛠 Tech Stack

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

## 🔧 Configuration

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Solana](https://solana.com/) - For the amazing blockchain platform
- [Next.js](https://nextjs.org/) - For the React framework
- [Tailwind CSS](https://tailwindcss.com/) - For the styling framework
- [Jupiter](https://jup.ag/) - For the price API
- [Anchor](https://www.anchor-lang.com/) - For the Solana development framework

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/hypertoken/issues) page
2. Create a new issue with detailed information
3. Join our Discord community

---

**Made with ❤️ for the Solana community**
