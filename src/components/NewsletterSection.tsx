'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription logic
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-black rounded-3xl px-6 py-10 md:px-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                  STAY UP TO DATE ABOUT OUR LATEST OFFERS
                </h2>
              </div>
              
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-colors"
                  >
                    Subscribe to Newsletter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
