'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ClientOnly } from './ClientOnly';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Create', href: '/create' },
  { name: 'Portfolio', href: '/portfolio' },
];

function NavigationContent() {
  const { connected } = useWallet();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-black font-bold text-lg float">
                🦀
              </div>
              <div className="absolute inset-0 gradient-primary rounded-xl opacity-20 blur-xl"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">HyperToken</h1>
              <p className="text-xs text-white/60">Solana Token Creator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-gradient'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 gradient-primary rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {connected && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-white/60">
                <div className="w-2 h-2 gradient-primary rounded-full pulse"></div>
                <span>Connected</span>
              </div>
            )}
            <div className="hover-scale">
              <WalletMultiButton className="btn-secondary" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass p-2 rounded-lg border border-white/20"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden glass-card rounded-xl mt-4 mb-4 slide-in">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-gradient bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export function Navigation() {
  return (
    <ClientOnly
      fallback={
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-black font-bold text-lg float">
                    🦀
                  </div>
                  <div className="absolute inset-0 gradient-primary rounded-xl opacity-20 blur-xl"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">HyperToken</h1>
                  <p className="text-xs text-white/60">Solana Token Creator</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative text-sm font-medium transition-all duration-300 text-white/70 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Wallet Connection */}
              <div className="flex items-center space-x-4">
                <div className="hover-scale">
                  <button className="btn-secondary">
                    Loading...
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      }
    >
      <NavigationContent />
    </ClientOnly>
  );
}
