import {
  Crown,
  HelpCircle,
  Layers,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useMerchant } from "../../hooks/useQueries";

type Page = "dashboard" | "sections" | "plan" | "support";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "sections", label: "Sections", icon: Layers },
  { id: "plan", label: "Plan", icon: Crown },
  { id: "support", label: "Support", icon: HelpCircle },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  isOpen,
  onToggle,
}: SidebarProps) {
  const { data: merchant } = useMerchant();
  const isPro = merchant?.planType === "pro";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Escape") onToggle();
          }}
          role="presentation"
        />
      )}

      {/* Mobile toggle button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-9 h-9 rounded-sm transition-all duration-300"
        style={{
          background: isOpen ? "oklch(0.72 0.12 75 / 0.15)" : "oklch(0.12 0 0)",
          border: "1px solid oklch(0.72 0.12 75 / 0.25)",
          color: "oklch(0.72 0.12 75)",
        }}
        onClick={onToggle}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col sidebar-transition
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
        `}
        style={{
          width: "240px",
          background: "oklch(0.09 0 0)",
          borderRight: "1px solid oklch(0.72 0.12 75 / 0.15)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-6 py-7"
          style={{ borderBottom: "1px solid oklch(0.72 0.12 75 / 0.12)" }}
        >
          {/* Monogram */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-sm flex-shrink-0"
            style={{
              background: "oklch(0.72 0.12 75)",
              boxShadow: "0 0 16px oklch(0.72 0.12 75 / 0.4)",
            }}
          >
            <span
              className="font-display text-sm font-bold"
              style={{ color: "oklch(0.08 0 0)", letterSpacing: "0.05em" }}
            >
              LS
            </span>
          </div>
          <div>
            <div
              className="font-display text-sm font-semibold tracking-luxury-xs leading-tight"
              style={{ color: "oklch(0.92 0.02 75)" }}
            >
              Luxury Sections
            </div>
            <div
              className="font-body text-xs"
              style={{ color: "oklch(0.50 0.01 75)" }}
            >
              Shopify App
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-ocid={`nav.${item.id}.link`}
                onClick={() => {
                  onNavigate(item.id);
                  if (isOpen) onToggle();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-all duration-300 group"
                style={{
                  background: isActive
                    ? "oklch(0.72 0.12 75 / 0.12)"
                    : "transparent",
                  border: isActive
                    ? "1px solid oklch(0.72 0.12 75 / 0.3)"
                    : "1px solid transparent",
                  color: isActive
                    ? "oklch(0.72 0.12 75)"
                    : "oklch(0.60 0.01 75)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "oklch(0.85 0.02 75)";
                    e.currentTarget.style.background =
                      "oklch(0.72 0.12 75 / 0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "oklch(0.60 0.01 75)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <item.icon size={16} className="flex-shrink-0" />
                <span className="font-body text-sm tracking-luxury-xs font-medium">
                  {item.label}
                </span>
                {isActive && (
                  <div
                    className="ml-auto w-1 h-1 rounded-full"
                    style={{ background: "oklch(0.72 0.12 75)" }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Plan badge */}
        <div className="px-4 pb-6">
          <div
            className="rounded-sm p-3 flex items-center gap-3"
            style={{
              background: isPro
                ? "oklch(0.72 0.12 75 / 0.08)"
                : "oklch(0.14 0 0)",
              border: isPro
                ? "1px solid oklch(0.72 0.12 75 / 0.3)"
                : "1px solid oklch(0.72 0.12 75 / 0.1)",
            }}
          >
            <Crown
              size={14}
              style={{
                color: isPro ? "oklch(0.72 0.12 75)" : "oklch(0.50 0.01 75)",
              }}
            />
            <div>
              <div
                className="font-body text-xs font-semibold tracking-luxury-xs"
                style={{
                  color: isPro ? "oklch(0.72 0.12 75)" : "oklch(0.55 0.01 75)",
                }}
              >
                {isPro ? "PRO PLAN" : "FREE PLAN"}
              </div>
              <div
                className="font-body text-xs"
                style={{ color: "oklch(0.40 0.005 75)" }}
              >
                {isPro ? "$5/month" : "Upgrade available"}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
