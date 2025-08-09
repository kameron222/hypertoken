# 🚀 HyperToken Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- Vercel account (free tier works)
- Solana CLI installed
- Your Solana program deployed (Program ID: `GhcYkFTMaRGPDbij2ok3fM33T4QhCYUWKNocWfVwZx4S`)

## 🎯 Quick Deployment

### 1. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

### 2. Set Environment Variables

In your Vercel dashboard, add these environment variables:

```env
NEXT_PUBLIC_PROGRAM_ID=GhcYkFTMaRGPDbij2ok3fM33T4QhCYUWKNocWfVwZx4S
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### 3. Alternative: Deploy to Other Platforms

#### Netlify
```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=out
```

#### Railway
```bash
# Connect your GitHub repo to Railway
# Railway will auto-deploy on push
```

## 🔧 Environment Configuration

### Development
Create `.env.local` in the frontend directory:
```env
NEXT_PUBLIC_PROGRAM_ID=GhcYkFTMaRGPDbij2ok3fM33T4QhCYUWKNocWfVwZx4S
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### Production
Set these in your hosting platform:
```env
NEXT_PUBLIC_PROGRAM_ID=GhcYkFTMaRGPDbij2ok3fM33T4QhCYUWKNocWfVwZx4S
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

## 🎨 Customization

### Update Program ID
If you deploy your own Solana program:
1. Update `NEXT_PUBLIC_PROGRAM_ID` with your new program ID
2. Redeploy the frontend

### Change RPC Endpoint
For production, consider using:
- `https://api.mainnet-beta.solana.com` (Mainnet)
- `https://solana-api.projectserum.com` (Alternative RPC)

## 📊 Analytics & Monitoring

### Add Analytics
```bash
# Install analytics
npm install @vercel/analytics

# Add to your app
import { Analytics } from '@vercel/analytics/react';
```

### Error Monitoring
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in next.config.js
```

## 🔒 Security Checklist

- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] CORS configured (if needed)
- [ ] Rate limiting (if needed)
- [ ] Error monitoring enabled

## 🚀 Post-Deployment

### 1. Test Your App
- [ ] Connect wallet
- [ ] Create a token
- [ ] View portfolio
- [ ] Check all pages load

### 2. SEO Optimization
- [ ] Add meta tags
- [ ] Configure sitemap
- [ ] Add robots.txt

### 3. Performance
- [ ] Enable compression
- [ ] Optimize images
- [ ] Enable caching

## 📈 Scaling Considerations

### For High Traffic
- Use CDN (Vercel/Netlify provide this)
- Consider database for user data
- Implement caching strategies

### For Production
- Move to mainnet
- Add proper error handling
- Implement user authentication
- Add admin dashboard

## 🆘 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache
   rm -rf .next
   npm run build
   ```

2. **Environment Variables Not Working**
   - Check variable names (must start with `NEXT_PUBLIC_`)
   - Redeploy after adding variables

3. **Wallet Connection Issues**
   - Ensure RPC URL is correct
   - Check network (devnet/mainnet)

### Support
- Check browser console for errors
- Verify Solana program is deployed
- Test with different wallets

## 🎉 Success!

Your HyperToken app is now live! Share your URL and start creating tokens on Solana! 🦀
