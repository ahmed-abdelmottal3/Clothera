'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Clothera
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-text-secondary hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-text-secondary hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/categories" className="text-text-secondary hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/about" className="text-text-secondary hover:text-primary transition-colors">
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-1.5 rounded-full border border-input bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>
          
          <Link href="/cart" className="relative p-2 hover:bg-surface rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5 text-text-primary" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
          
          <Link href="/sign-in" className="p-2 hover:bg-surface rounded-full transition-colors">
            <User className="h-5 w-5 text-text-primary" />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-surface rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface p-4 space-y-4">
          <Link href="/" className="block text-text-secondary hover:text-primary">Home</Link>
          <Link href="/products" className="block text-text-secondary hover:text-primary">Shop</Link>
          <Link href="/categories" className="block text-text-secondary hover:text-primary">Categories</Link>
          <Link href="/about" className="block text-text-secondary hover:text-primary">About</Link>
        </div>
      )}
    </nav>
  );
}
