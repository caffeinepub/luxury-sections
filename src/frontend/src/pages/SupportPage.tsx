import { ArrowRight, BookOpen, Layers, Mail, Server } from "lucide-react";

const quickStartSteps = [
  {
    step: "01",
    title: "Install the App",
    description:
      "Install Luxury Sections from the Shopify App Store. The app will request the necessary permissions to manage your theme.",
  },
  {
    step: "02",
    title: "Browse the Gallery",
    description:
      "Navigate to the Sections Library tab to browse all available premium sections. Preview each one to find the perfect fit.",
  },
  {
    step: "03",
    title: "One-Click Install",
    description:
      "Click the Install button on any section. It will be automatically injected into your theme using Shopify's Theme App Extensions.",
  },
  {
    step: "04",
    title: "Customize in Theme Editor",
    description:
      "Open your Shopify Theme Editor (Online Store → Customize) and find the newly installed section under Add Section. Customize colors, text, and layout via the schema controls.",
  },
  {
    step: "05",
    title: "Publish Your Changes",
    description:
      "Once you're happy with the customization, publish your theme to make the new luxury section live on your storefront.",
  },
];

const archFeatures = [
  {
    icon: Server,
    title: "ICP / Motoko Backend",
    description:
      "The app backend runs on the Internet Computer (ICP) using Motoko, providing decentralized, scalable storage for merchant data, section catalogs, and billing state. No traditional servers required.",
  },
  {
    icon: Layers,
    title: "React Frontend",
    description:
      "The merchant dashboard is built with React 19 + TypeScript on Caffeine's ICP-native frontend platform. Real-time state updates via React Query with no page reloads.",
  },
  {
    icon: BookOpen,
    title: "Theme App Extensions",
    description:
      "Sections are delivered as Shopify Theme App Extensions — Liquid templates with schema-driven customization. They appear natively inside the Theme Editor without modifying theme.liquid.",
  },
];

export default function SupportPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-10">
        <p
          className="font-body text-xs tracking-luxury font-medium mb-2"
          style={{ color: "oklch(0.72 0.12 75)" }}
        >
          HELP & DOCS
        </p>
        <h1
          className="font-display text-3xl font-semibold tracking-luxury-xs"
          style={{ color: "oklch(0.94 0.02 75)" }}
        >
          Support & Documentation
        </h1>
        <p
          className="font-body text-sm mt-1"
          style={{ color: "oklch(0.50 0.01 75)" }}
        >
          Everything you need to get started with Luxury Sections
        </p>
      </div>

      {/* Architecture section */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.72 0.12 75 / 0.12)" }}
          />
          <p
            className="font-body text-xs tracking-luxury font-medium"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            ARCHITECTURE OVERVIEW
          </p>
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.72 0.12 75 / 0.12)" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {archFeatures.map((feature) => (
            <div key={feature.title} className="luxury-card rounded-sm p-6">
              <div
                className="w-9 h-9 flex items-center justify-center mb-5 rounded-sm"
                style={{
                  background: "oklch(0.72 0.12 75 / 0.1)",
                  border: "1px solid oklch(0.72 0.12 75 / 0.25)",
                }}
              >
                <feature.icon
                  size={16}
                  style={{ color: "oklch(0.72 0.12 75)" }}
                />
              </div>
              <h3
                className="font-display text-base font-semibold mb-2 tracking-luxury-xs"
                style={{ color: "oklch(0.90 0.02 75)" }}
              >
                {feature.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.50 0.01 75)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start guide */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.72 0.12 75 / 0.12)" }}
          />
          <p
            className="font-body text-xs tracking-luxury font-medium"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            QUICK START GUIDE
          </p>
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.72 0.12 75 / 0.12)" }}
          />
        </div>

        <div className="space-y-3">
          {quickStartSteps.map((step, idx) => (
            <div
              key={step.step}
              className="luxury-card rounded-sm p-5 flex items-start gap-5"
            >
              {/* Step number */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div
                  className="font-display text-xl font-bold"
                  style={{ color: "oklch(0.72 0.12 75 / 0.5)" }}
                >
                  {step.step}
                </div>
                {idx < quickStartSteps.length - 1 && (
                  <div
                    className="w-px h-4"
                    style={{ background: "oklch(0.72 0.12 75 / 0.15)" }}
                  />
                )}
              </div>

              {/* Content */}
              <div>
                <h4
                  className="font-display text-sm font-semibold mb-1 tracking-luxury-xs"
                  style={{ color: "oklch(0.90 0.02 75)" }}
                >
                  {step.title}
                </h4>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.50 0.01 75)" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.72 0.12 75 / 0.12)" }}
          />
          <p
            className="font-body text-xs tracking-luxury font-medium"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            CONTACT SUPPORT
          </p>
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.72 0.12 75 / 0.12)" }}
          />
        </div>

        <div className="luxury-card rounded-sm p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Icon */}
          <div
            className="w-14 h-14 flex items-center justify-center rounded-sm flex-shrink-0"
            style={{
              background: "oklch(0.72 0.12 75 / 0.1)",
              border: "1px solid oklch(0.72 0.12 75 / 0.25)",
            }}
          >
            <Mail size={24} style={{ color: "oklch(0.72 0.12 75)" }} />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3
              className="font-display text-lg font-semibold mb-1 tracking-luxury-xs"
              style={{ color: "oklch(0.90 0.02 75)" }}
            >
              Email Support
            </h3>
            <p
              className="font-body text-sm mb-4"
              style={{ color: "oklch(0.50 0.01 75)" }}
            >
              Our team responds within 24 hours on business days.
            </p>
            <a
              href="mailto:contact@luxurysections.app"
              className="inline-flex items-center gap-2 font-body text-sm font-medium transition-all duration-300 group"
              style={{ color: "oklch(0.72 0.12 75)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "oklch(0.88 0.14 75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "oklch(0.72 0.12 75)";
              }}
            >
              contact@luxurysections.app
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* CTA */}
          <a
            href="mailto:contact@luxurysections.app"
            className="btn-gold flex-shrink-0 flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-luxury-sm rounded-sm"
          >
            SEND EMAIL
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="mt-12 py-8 text-center font-body text-xs"
        style={{
          borderTop: "1px solid oklch(0.72 0.12 75 / 0.1)",
          color: "oklch(0.35 0.005 75)",
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
