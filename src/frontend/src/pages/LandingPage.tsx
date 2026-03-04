import { ArrowRight, Grid3x3, TrendingUp, Zap } from "lucide-react";

interface LandingPageProps {
  onEnterDashboard: () => void;
}

const features = [
  {
    icon: Zap,
    title: "One-Click Install",
    description:
      "Add any premium section instantly to your Shopify store — no code editing, no theme modifications.",
  },
  {
    icon: Grid3x3,
    title: "5 Premium Designs",
    description:
      "Handcrafted for fashion houses, jewelry brands, and high-ticket luxury merchants worldwide.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimized",
    description:
      "Every section is engineered to elevate brand perception and drive measurable revenue growth.",
  },
];

export default function LandingPage({ onEnterDashboard }: LandingPageProps) {
  const handleMouseEnterGold = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "oklch(0.88 0.14 75)";
  };
  const handleMouseLeaveGold = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "oklch(0.72 0.12 75)";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center hero-bg overflow-hidden px-6 py-24 min-h-screen">
        {/* Grid lines overlay */}
        <div className="absolute inset-0 hero-grid-lines opacity-100 pointer-events-none" />

        {/* Decorative corner lines */}
        <div
          className="absolute top-8 left-8 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "1px solid oklch(0.72 0.12 75 / 0.4)",
            borderLeft: "1px solid oklch(0.72 0.12 75 / 0.4)",
          }}
        />
        <div
          className="absolute top-8 right-8 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "1px solid oklch(0.72 0.12 75 / 0.4)",
            borderRight: "1px solid oklch(0.72 0.12 75 / 0.4)",
          }}
        />
        <div
          className="absolute bottom-8 left-8 w-16 h-16 pointer-events-none"
          style={{
            borderBottom: "1px solid oklch(0.72 0.12 75 / 0.4)",
            borderLeft: "1px solid oklch(0.72 0.12 75 / 0.4)",
          }}
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none"
          style={{
            borderBottom: "1px solid oklch(0.72 0.12 75 / 0.4)",
            borderRight: "1px solid oklch(0.72 0.12 75 / 0.4)",
          }}
        />

        {/* Tagline */}
        <p
          className="animate-fade-slide-up font-body text-xs tracking-luxury font-medium mb-6"
          style={{ color: "oklch(0.72 0.12 75)" }}
        >
          PREMIUM SHOPIFY THEME SECTIONS
        </p>

        {/* Main heading */}
        <h1
          className="animate-fade-slide-up-delay font-display text-center font-bold leading-none mb-6"
          style={{
            fontSize: "clamp(3rem, 10vw, 7.5rem)",
            letterSpacing: "0.12em",
          }}
        >
          <span className="animate-shimmer">LUXURY</span>
          <br />
          <span
            style={{
              color: "oklch(0.94 0.02 75)",
              WebkitTextStroke: "1px oklch(0.72 0.12 75 / 0.5)",
            }}
          >
            SECTIONS
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-slide-up-delay-2 font-body text-center max-w-lg mb-12 text-base leading-relaxed"
          style={{ color: "oklch(0.65 0.01 75)" }}
        >
          Premium Shopify sections for high-end brands. Elevate your store with
          ultra-luxury, conversion-focused designs crafted for fashion, jewelry,
          and luxury retail.
        </p>

        {/* CTA */}
        <div className="animate-fade-slide-up-delay-2 flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="button"
            data-ocid="landing.enter_dashboard.primary_button"
            onClick={onEnterDashboard}
            className="btn-gold group flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-luxury-sm rounded-sm"
          >
            ENTER DASHBOARD
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          <a
            href="#features"
            className="font-body text-sm tracking-luxury-xs transition-all duration-300"
            style={{
              color: "oklch(0.72 0.12 75)",
              textDecoration: "none",
            }}
            onMouseEnter={handleMouseEnterGold}
            onMouseLeave={handleMouseLeaveGold}
          >
            VIEW SECTIONS ↓
          </a>
        </div>

        {/* Floating stat chips */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8 animate-fade-in opacity-0 [animation-delay:1s]">
          {[
            { value: "5", label: "Premium Sections" },
            { value: "1-Click", label: "Installation" },
            { value: "10K+", label: "Merchants" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display text-lg font-semibold"
                style={{ color: "oklch(0.72 0.12 75)" }}
              >
                {stat.value}
              </div>
              <div
                className="font-body text-xs tracking-luxury-xs"
                style={{ color: "oklch(0.50 0.01 75)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-background py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <div
              className="h-px flex-1"
              style={{ background: "oklch(0.72 0.12 75 / 0.2)" }}
            />
            <p
              className="font-body text-xs tracking-luxury font-medium"
              style={{ color: "oklch(0.72 0.12 75)" }}
            >
              WHY LUXURY SECTIONS
            </p>
            <div
              className="h-px flex-1"
              style={{ background: "oklch(0.72 0.12 75 / 0.2)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="luxury-card rounded-sm p-8 group cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6 rounded-sm transition-all duration-300"
                  style={{
                    background: "oklch(0.72 0.12 75 / 0.1)",
                    border: "1px solid oklch(0.72 0.12 75 / 0.25)",
                  }}
                >
                  <feature.icon
                    size={18}
                    style={{ color: "oklch(0.72 0.12 75)" }}
                  />
                </div>

                <h3
                  className="font-display text-lg font-semibold mb-3 tracking-luxury-xs"
                  style={{ color: "oklch(0.92 0.02 75)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.55 0.01 75)" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA row */}
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={onEnterDashboard}
              className="btn-gold group flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-luxury-sm rounded-sm"
            >
              EXPLORE ALL SECTIONS
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center font-body text-xs"
        style={{
          borderTop: "1px solid oklch(0.72 0.12 75 / 0.12)",
          color: "oklch(0.40 0.005 75)",
        }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-300"
          style={{ color: "oklch(0.72 0.12 75)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
