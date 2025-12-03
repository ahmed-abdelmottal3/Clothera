'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Search, LogOut, LogIn } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useAuth, useLogout } from '@/hooks/auth';
import { useCart } from '@/hooks/useCart';
import { ThemeToggle } from './ThemeToggle';


const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/products' },
  { label: 'Categories', href: '/categories' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, checkAuth } = useAuth();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
    
    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuth]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Clothera
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`transition-colors font-medium ${
                  isActive 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Expandable Search - Desktop */}
          <div className="hidden md:flex items-center">
            <div className={`flex items-center transition-all duration-300 ${
              isSearchOpen ? 'w-64' : 'w-10'
            }`}>
              {isSearchOpen ? (
                <div className="flex items-center relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-8 pr-4 py-1.5 rounded-full border border-input bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                </div>
              ) : (
                <button
                  onClick={toggleSearch}
                  className="p-2 hover:bg-surface rounded-full transition-colors"
                  title="Search"
                >
                  <Search className="h-5 w-5 text-text-primary" />
                </button>
              )}
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
          
          
          <Link href="/cart" className="relative p-2 hover:bg-surface rounded-full transition-colors" title="Cart">
            <ShoppingCart className="h-5 w-5 text-text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-text-inverse text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          
          {/* Conditional auth buttons */}
          {!isAuthenticated ? (
            <Link href="/sign-in" className="p-2 hover:bg-surface rounded-full transition-colors" title="Sign In">
              <LogIn className="h-5 w-5 text-text-primary" />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/profile" 
                className="p-2 hover:bg-surface rounded-full transition-colors"
                title="Profile"
              >
                <User className="h-5 w-5 text-text-primary" />
              </Link>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-2 hover:bg-surface rounded-full transition-colors disabled:opacity-50"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-text-primary" />
              </button>
            </div>
          )}

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
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-4 py-2 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`block transition-colors font-medium ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-text-secondary hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* Mobile Auth Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            {!isAuthenticated ? (
              <Link 
                href="/sign-in" 
                className="flex items-center gap-2 text-text-secondary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            ) : (
              <>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 text-text-secondary hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 text-text-secondary hover:text-primary disabled:opacity-50 w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
