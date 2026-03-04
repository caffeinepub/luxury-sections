import { Skeleton } from "@/components/ui/skeleton";
import { Activity, ArrowRight, Crown, Layers, Package } from "lucide-react";
import { useInstalledSections, useMerchantStats } from "../hooks/useQueries";
import { getSectionImage } from "../utils/sectionImage";

type Page = "dashboard" | "sections" | "plan" | "support";

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { data: stats, isLoading: statsLoading } = useMerchantStats();
  const { data: installed, isLoading: installedLoading } =
    useInstalledSections();

  const isPro = stats?.planType === "pro";

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <p
          className="font-body text-xs tracking-luxury font-medium mb-2"
          style={{ color: "oklch(0.72 0.12 75)" }}
        >
          OVERVIEW
        </p>
        <h1
          className="font-display text-3xl font-semibold tracking-luxury-xs"
          style={{ color: "oklch(0.94 0.02 75)" }}
        >
          Dashboard
        </h1>
        <p
          className="font-body text-sm mt-1"
          style={{ color: "oklch(0.50 0.01 75)" }}
        >
          demo-store.myshopify.com
        </p>
      </div>

      {/* Stats bar */}
      <div
        data-ocid="dashboard.stats.panel"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {/* Total installed */}
        <div className="luxury-card rounded-sm p-5">
          {statsLoading ? (
            <Skeleton
              className="h-16 w-full"
              style={{ background: "oklch(0.15 0 0)" }}
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-body text-xs tracking-luxury font-medium"
                  style={{ color: "oklch(0.50 0.01 75)" }}
                >
                  SECTIONS INSTALLED
                </span>
                <Layers size={16} style={{ color: "oklch(0.72 0.12 75)" }} />
              </div>
              <div
                className="font-display text-4xl font-bold"
                style={{ color: "oklch(0.92 0.02 75)" }}
              >
                {stats ? Number(stats.totalInstalled) : 0}
              </div>
              <div
                className="font-body text-xs mt-1"
                style={{ color: "oklch(0.45 0.01 75)" }}
              >
                of 5 available
              </div>
            </>
          )}
        </div>

        {/* Plan type */}
        <div className="luxury-card rounded-sm p-5">
          {statsLoading ? (
            <Skeleton
              className="h-16 w-full"
              style={{ background: "oklch(0.15 0 0)" }}
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-body text-xs tracking-luxury font-medium"
                  style={{ color: "oklch(0.50 0.01 75)" }}
                >
                  CURRENT PLAN
                </span>
                <Crown size={16} style={{ color: "oklch(0.72 0.12 75)" }} />
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="font-display text-4xl font-bold capitalize"
                  style={{ color: "oklch(0.92 0.02 75)" }}
                >
                  {stats?.planType ?? "Free"}
                </div>
                {isPro && (
                  <span
                    className="font-body text-xs px-2 py-0.5 rounded-sm font-semibold tracking-luxury-xs"
                    style={{
                      background: "oklch(0.72 0.12 75 / 0.15)",
                      color: "oklch(0.72 0.12 75)",
                      border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                    }}
                  >
                    ACTIVE
                  </span>
                )}
              </div>
              <div
                className="font-body text-xs mt-1"
                style={{ color: "oklch(0.45 0.01 75)" }}
              >
                {isPro ? "$5/month" : "Free forever"}
              </div>
            </>
          )}
        </div>

        {/* Billing status */}
        <div className="luxury-card rounded-sm p-5">
          {statsLoading ? (
            <Skeleton
              className="h-16 w-full"
              style={{ background: "oklch(0.15 0 0)" }}
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-body text-xs tracking-luxury font-medium"
                  style={{ color: "oklch(0.50 0.01 75)" }}
                >
                  BILLING STATUS
                </span>
                <Activity size={16} style={{ color: "oklch(0.72 0.12 75)" }} />
              </div>
              <div
                className="font-display text-4xl font-bold capitalize"
                style={{ color: "oklch(0.92 0.02 75)" }}
              >
                {stats?.billingStatus === "active" ? "Active" : "Inactive"}
              </div>
              <div
                className="font-body text-xs mt-1"
                style={{
                  color:
                    stats?.billingStatus === "active"
                      ? "oklch(0.72 0.12 75)"
                      : "oklch(0.45 0.01 75)",
                }}
              >
                {stats?.billingStatus === "active"
                  ? "Subscription active"
                  : "No active subscription"}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          onClick={() => onNavigate("sections")}
          className="luxury-card rounded-sm p-5 text-left group flex items-center justify-between"
        >
          <div>
            <div
              className="font-display text-base font-semibold mb-1 tracking-luxury-xs"
              style={{ color: "oklch(0.90 0.02 75)" }}
            >
              Browse Sections
            </div>
            <div
              className="font-body text-xs"
              style={{ color: "oklch(0.50 0.01 75)" }}
            >
              Explore and install premium sections
            </div>
          </div>
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
            style={{ color: "oklch(0.72 0.12 75)" }}
          />
        </button>

        <button
          type="button"
          onClick={() => onNavigate("plan")}
          className="luxury-card rounded-sm p-5 text-left group flex items-center justify-between"
        >
          <div>
            <div
              className="font-display text-base font-semibold mb-1 tracking-luxury-xs"
              style={{ color: "oklch(0.90 0.02 75)" }}
            >
              Manage Plan
            </div>
            <div
              className="font-body text-xs"
              style={{ color: "oklch(0.50 0.01 75)" }}
            >
              Upgrade to Pro for all 5 sections
            </div>
          </div>
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
            style={{ color: "oklch(0.72 0.12 75)" }}
          />
        </button>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center gap-4 mb-5">
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.72 0.12 75 / 0.12)" }}
          />
          <p
            className="font-body text-xs tracking-luxury font-medium"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            INSTALLED SECTIONS
          </p>
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.72 0.12 75 / 0.12)" }}
          />
        </div>

        {installedLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-16 w-full rounded-sm"
                style={{ background: "oklch(0.13 0 0)" }}
              />
            ))}
          </div>
        ) : !installed || installed.length === 0 ? (
          <div
            className="luxury-card rounded-sm p-12 flex flex-col items-center justify-center text-center"
            data-ocid="sections.empty_state"
          >
            <Package
              size={32}
              className="mb-4"
              style={{ color: "oklch(0.72 0.12 75 / 0.4)" }}
            />
            <h3
              className="font-display text-base font-semibold mb-2 tracking-luxury-xs"
              style={{ color: "oklch(0.65 0.01 75)" }}
            >
              No sections installed yet
            </h3>
            <p
              className="font-body text-sm mb-5"
              style={{ color: "oklch(0.45 0.01 75)" }}
            >
              Browse the section library and install your first premium section.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("sections")}
              className="btn-gold flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-luxury-sm rounded-sm"
            >
              BROWSE SECTIONS
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {installed.map((section) => (
              <div
                key={section.id}
                className="luxury-card rounded-sm p-4 flex items-center gap-4"
              >
                {/* Mini preview */}
                <img
                  src={getSectionImage(section.name)}
                  alt={section.name}
                  className="w-16 h-10 object-cover rounded-sm flex-shrink-0"
                  style={{
                    border: "1px solid oklch(0.72 0.12 75 / 0.2)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className="font-display text-sm font-semibold tracking-luxury-xs truncate"
                    style={{ color: "oklch(0.90 0.02 75)" }}
                  >
                    {section.name}
                  </div>
                  <div
                    className="font-body text-xs"
                    style={{ color: "oklch(0.50 0.01 75)" }}
                  >
                    {section.category}
                  </div>
                </div>
                {section.isPro && (
                  <span
                    className="font-body text-xs px-2 py-0.5 rounded-sm font-semibold tracking-luxury-xs flex-shrink-0"
                    style={{
                      background: "oklch(0.72 0.12 75 / 0.12)",
                      color: "oklch(0.72 0.12 75)",
                      border: "1px solid oklch(0.72 0.12 75 / 0.25)",
                    }}
                  >
                    PRO
                  </span>
                )}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "oklch(0.65 0.15 145)" }}
                  title="Installed"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
