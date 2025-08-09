'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { solanaService } from '../lib/solana';

interface CreateTokenFormProps {
  isCreating: boolean;
  setIsCreating: (creating: boolean) => void;
}

export function CreateTokenForm({ isCreating, setIsCreating }: CreateTokenFormProps) {
  const { connected, publicKey } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimals: 6,
    supply: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Token name is required';
    } else if (formData.name.length > 32) {
      newErrors.name = 'Token name must be 32 characters or less';
    }

    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Token symbol is required';
    } else if (formData.symbol.length < 2 || formData.symbol.length > 10) {
      newErrors.symbol = 'Token symbol must be 2-10 characters';
    }

    if (!formData.supply.trim()) {
      newErrors.supply = 'Initial supply is required';
    } else if (isNaN(Number(formData.supply)) || Number(formData.supply) <= 0) {
      newErrors.supply = 'Initial supply must be a positive number';
    }

    if (formData.decimals < 0 || formData.decimals > 9) {
      newErrors.decimals = 'Decimals must be between 0 and 9';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsCreating(true);
    try {
      const mintAddress = await solanaService.createToken({
        name: formData.name,
        symbol: formData.symbol,
        decimals: formData.decimals,
        supply: formData.supply,
        description: formData.description,
        creator: publicKey.toString(),
      });

      alert(`Token created successfully! Mint address: ${mintAddress}`);
      
      // Reset form
      setFormData({
        name: '',
        symbol: '',
        decimals: 6,
        supply: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating token:', error);
      alert('Failed to create token. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gradient mb-2">Token Details</h3>
        <p className="text-white/60">Fill in your token information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Token Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-4 rounded-xl border bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.name ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="My Awesome Token"
            maxLength={32}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Token Symbol *
          </label>
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
            className={`w-full px-4 py-4 rounded-xl border bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.symbol ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="MAT"
            maxLength={10}
          />
          {errors.symbol && (
            <p className="text-red-400 text-sm mt-2">{errors.symbol}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Decimals
          </label>
          <input
            type="number"
            value={formData.decimals}
            onChange={(e) => handleInputChange('decimals', parseInt(e.target.value))}
            className={`w-full px-4 py-4 rounded-xl border bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.decimals ? 'border-red-500' : 'border-white/20'
            }`}
            min="0"
            max="9"
          />
          {errors.decimals && (
            <p className="text-red-400 text-sm mt-2">{errors.decimals}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Initial Supply *
          </label>
          <input
            type="text"
            value={formData.supply}
            onChange={(e) => handleInputChange('supply', e.target.value)}
            className={`w-full px-4 py-4 rounded-xl border bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.supply ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="1000000"
          />
          {errors.supply && (
            <p className="text-red-400 text-sm mt-2">{errors.supply}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full px-4 py-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
          placeholder="Describe your token..."
          rows={4}
        />
      </div>

      <div className="flex justify-center pt-8">
        <button
          type="submit"
          disabled={isCreating || !connected}
          className="btn-primary text-lg px-12 py-6 disabled:opacity-50 disabled:cursor-not-allowed hover-glow"
        >
          {isCreating ? (
            <span className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Token...</span>
            </span>
          ) : (
            'Create Token'
          )}
        </button>
      </div>
    </form>
  );
}
