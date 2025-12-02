import Image from "next/image";
import { 
  Heart, 
  Globe, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Users, 
  Sparkles,
  Leaf
} from "lucide-react";
import { SVGProps } from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <Image
          src="/images/about/hero.png"
          alt="Fashion Studio"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
            Redefining Fashion
          </h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl animate-slide-up drop-shadow-md">
            Where elegance meets sustainability. Discover the story behind Clothera.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-right">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-[var(--color-secondary)] rounded-full"></div>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Founded in 2023, Clothera began with a simple sketch and a bold idea: to create fashion that doesn&apos;t compromise on quality or ethics.
            </p>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              What started in a small workshop has grown into a global community of style enthusiasts who believe that what you wear should tell a story. We collaborate with artisans from around the world to bring you unique, timeless pieces that transcend trends.
            </p>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl animate-slide-left hover:scale-[1.02] transition-transform duration-500">
            <Image
              src="/images/about/story.png"
              alt="Our Story - Crafting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[var(--color-background-light)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Our Purpose
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Driven by values, guided by style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[var(--color-border-light)]">
              <div className="w-14 h-14 bg-[var(--color-accent-light)] rounded-full flex items-center justify-center mb-6 text-[var(--color-secondary-dark)]">
                <TargetIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">Our Mission</h3>
              <p className="text-[var(--color-text-secondary)]">
                To empower individuals to express their unique identity through high-quality, sustainable fashion that is accessible to all.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[var(--color-border-light)]">
              <div className="w-14 h-14 bg-[var(--color-accent-light)] rounded-full flex items-center justify-center mb-6 text-[var(--color-secondary-dark)]">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">Our Vision</h3>
              <p className="text-[var(--color-text-secondary)]">
                To become the global standard for ethical luxury, proving that style and sustainability can coexist in perfect harmony.
              </p>
            </div>

            {/* Values Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[var(--color-border-light)]">
              <div className="w-14 h-14 bg-[var(--color-accent-light)] rounded-full flex items-center justify-center mb-6 text-[var(--color-secondary-dark)]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">Our Values</h3>
              <p className="text-[var(--color-text-secondary)]">
                Integrity in every stitch, inclusivity in every design, and respect for our planet in every decision we make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-primary)] mb-16">
          Why Choose Clothera?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Leaf, title: "Sustainable", desc: "Eco-friendly materials" },
            { icon: ShieldCheck, title: "Quality First", desc: "Hand-picked fabrics" },
            { icon: Truck, title: "Fast Shipping", desc: "Global delivery" },
            { icon: Clock, title: "24/7 Support", desc: "Always here for you" },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-[var(--color-primary-light)] text-white rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team / Community Section */}
      <section className="py-20 bg-[var(--color-primary)] text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] w-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <Image
                src="/images/about/team.png"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">
                Join the Movement
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Clothera is more than just a brand; it&apos;s a community of creators, dreamers, and doers. Our team is dedicated to pushing the boundaries of what&apos;s possible in fashion.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Users className="w-5 h-5 text-[var(--color-secondary)]" />
                  <span>10k+ Community</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-[var(--color-secondary)]" />
                  <span>500+ Designs</span>
                </div>
              </div>
              <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-[var(--color-secondary)]/50">
                Meet the Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper component for the Target icon since it's not in the initial import list
function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
