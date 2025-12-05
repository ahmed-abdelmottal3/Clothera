import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Clothera</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Your premium destination for modern fashion. We bring you the latest trends with uncompromising quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link href="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-primary transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/allorders" className="hover:text-primary transition-colors">My Orders</Link></li>
              <li><Link href="/profile" className="hover:text-primary transition-colors">My Account</Link></li>
              <li><span className="cursor-default">Shipping & Returns</span></li>
              <li><span className="cursor-default">Privacy Policy</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Stay Updated</h4>
            <p className="text-sm text-text-secondary mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} Clothera. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-text-secondary">
            <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
