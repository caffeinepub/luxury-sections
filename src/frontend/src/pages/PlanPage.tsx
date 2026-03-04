import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, Check, Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMerchant, useUpdatePlan } from "../hooks/useQueries";

const FREE_FEATURES = [
  "2 free sections included",
  "Hero & Product sections",
  "Basic customization",
  "Community support",
  "Regular updates",
];

const PRO_FEATURES = [
  "All 5 premium sections",
  "Hero, Product, Testimonials, Brand Story, Collection Grid",
  "Advanced customization options",
  "Priority email support",
  "Early access to new sections",
];

export default function PlanPage() {
  const { data: merchant, isLoading } = useMerchant();
  const updatePlanMutation = useUpdatePlan();

  const isPro = merchant?.planType === "pro";

  const handleUpgrade = async () => {
    try {
      await updatePlanMutation.mutateAsync({
        newPlan: "pro",
        billingStatus: "active",
      });
      toast.success(
        "Successfully upgraded to Pro! All 5 sections are now available.",
      );
    } catch {
      toast.error("Failed to update plan. Please try again.");
    }
  };

  const handleDowngrade = async () => {
    try {
      await updatePlanMutation.mutateAsync({
        newPlan: "free",
        billingStatus: "inactive",
      });
      toast.success("Downgraded to Free plan.");
    } catch {
      toast.error("Failed to update plan. Please try again.");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-10">
        <p
          className="font-body text-xs tracking-luxury font-medium mb-2"
          style={{ color: "oklch(0.72 0.12 75)" }}
        >
          SUBSCRIPTION
        </p>
        <h1
          className="font-display text-3xl font-semibold tracking-luxury-xs"
          style={{ color: "oklch(0.94 0.02 75)" }}
        >
          Plan Management
        </h1>
        <p
          className="font-body text-sm mt-1"
          style={{ color: "oklch(0.50 0.01 75)" }}
        >
          Choose the plan that fits your store
        </p>
      </div>

      {isLoading ? (
        <div
          data-ocid="plan.loading_state"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[1, 2].map((i) => (
            <Skeleton
              key={i}
              className="h-96 rounded-sm"
              style={{ background: "oklch(0.13 0 0)" }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div
            data-ocid="plan.free.card"
            className="rounded-sm p-8 flex flex-col transition-all duration-300"
            style={{
              background: "oklch(0.11 0 0)",
              border: !isPro
                ? "1px solid oklch(0.72 0.12 75 / 0.4)"
                : "1px solid oklch(0.72 0.12 75 / 0.12)",
              opacity: isPro ? 0.7 : 1,
            }}
          >
            {/* Plan header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-body text-xs tracking-luxury font-medium"
                  style={{ color: "oklch(0.55 0.01 75)" }}
                >
                  FREE PLAN
                </span>
                {!isPro && (
                  <span
                    className="font-body text-xs px-2 py-0.5 rounded-sm font-semibold tracking-luxury-xs"
                    style={{
                      background: "oklch(0.72 0.12 75 / 0.15)",
                      color: "oklch(0.72 0.12 75)",
                      border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                    }}
                  >
                    CURRENT PLAN
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display text-5xl font-bold"
                  style={{ color: "oklch(0.92 0.02 75)" }}
                >
                  $0
                </span>
                <span
                  className="font-body text-sm"
                  style={{ color: "oklch(0.45 0.01 75)" }}
                >
                  /month
                </span>
              </div>
              <p
                className="font-body text-sm mt-2"
                style={{ color: "oklch(0.50 0.01 75)" }}
              >
                Get started with essential sections
              </p>
            </div>

            {/* Divider */}
            <div
              className="h-px mb-6"
              style={{ background: "oklch(0.72 0.12 75 / 0.1)" }}
            />

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check
                    size={14}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(0.65 0.01 75)" }}
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: "oklch(0.60 0.01 75)" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div
              className="w-full text-center py-3 rounded-sm font-body text-xs font-semibold tracking-luxury-sm"
              style={{
                background: "oklch(0.14 0 0)",
                color: "oklch(0.45 0.01 75)",
                border: "1px solid oklch(0.72 0.12 75 / 0.08)",
              }}
            >
              {!isPro ? "CURRENT PLAN" : "FREE TIER"}
            </div>
          </div>

          {/* Pro Plan */}
          <div
            data-ocid="plan.pro.card"
            className="rounded-sm p-8 flex flex-col relative overflow-hidden transition-all duration-300"
            style={{
              background: isPro
                ? "oklch(0.72 0.12 75 / 0.06)"
                : "oklch(0.11 0 0)",
              border: isPro
                ? "1px solid oklch(0.72 0.12 75 / 0.5)"
                : "1px solid oklch(0.72 0.12 75 / 0.3)",
              boxShadow: isPro ? "0 0 30px oklch(0.72 0.12 75 / 0.12)" : "none",
            }}
          >
            {/* Glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 40% at 50% -10%, oklch(0.72 0.12 75 / 0.08) 0%, transparent 70%)",
              }}
            />

            {/* Plan header */}
            <div className="mb-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Crown size={14} style={{ color: "oklch(0.72 0.12 75)" }} />
                  <span
                    className="font-body text-xs tracking-luxury font-medium"
                    style={{ color: "oklch(0.72 0.12 75)" }}
                  >
                    PRO PLAN
                  </span>
                </div>
                {isPro && (
                  <span
                    className="font-body text-xs px-2 py-0.5 rounded-sm font-semibold tracking-luxury-xs"
                    style={{
                      background: "oklch(0.72 0.12 75 / 0.2)",
                      color: "oklch(0.72 0.12 75)",
                      border: "1px solid oklch(0.72 0.12 75 / 0.4)",
                    }}
                  >
                    CURRENT PLAN
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display text-5xl font-bold"
                  style={{ color: "oklch(0.72 0.12 75)" }}
                >
                  $5
                </span>
                <span
                  className="font-body text-sm"
                  style={{ color: "oklch(0.55 0.01 75)" }}
                >
                  /month
                </span>
              </div>
              <p
                className="font-body text-sm mt-2"
                style={{ color: "oklch(0.55 0.01 75)" }}
              >
                Unlock the full luxury section suite
              </p>
            </div>

            {/* Divider */}
            <div
              className="h-px mb-6"
              style={{ background: "oklch(0.72 0.12 75 / 0.2)" }}
            />

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-8 relative">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check
                    size={14}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(0.72 0.12 75)" }}
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: "oklch(0.70 0.01 75)" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="relative">
              {!isPro ? (
                <button
                  type="button"
                  data-ocid="plan.upgrade.primary_button"
                  onClick={handleUpgrade}
                  disabled={updatePlanMutation.isPending}
                  className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-luxury-sm rounded-sm"
                >
                  {updatePlanMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Crown size={14} />
                  )}
                  {updatePlanMutation.isPending
                    ? "UPGRADING..."
                    : "UPGRADE NOW"}
                </button>
              ) : (
                <div>
                  <div
                    data-ocid="plan.success_state"
                    className="w-full text-center py-3.5 rounded-sm font-body text-xs font-semibold tracking-luxury-sm mb-3 flex items-center justify-center gap-2"
                    style={{
                      background: "oklch(0.72 0.12 75 / 0.15)",
                      color: "oklch(0.72 0.12 75)",
                      border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                    }}
                  >
                    <Check size={14} />
                    PRO PLAN ACTIVE
                  </div>
                  <button
                    type="button"
                    data-ocid="plan.downgrade.button"
                    onClick={handleDowngrade}
                    disabled={updatePlanMutation.isPending}
                    className="w-full text-center py-2 font-body text-xs transition-colors duration-300"
                    style={{ color: "oklch(0.45 0.01 75)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "oklch(0.65 0.18 25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "oklch(0.45 0.01 75)";
                    }}
                  >
                    {updatePlanMutation.isPending ? (
                      <span className="flex items-center justify-center gap-1">
                        <Loader2 size={12} className="animate-spin" />
                        Downgrading...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <ArrowDown size={12} />
                        Downgrade to Free
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Billing info */}
      <div
        className="mt-8 p-5 rounded-sm"
        style={{
          background: "oklch(0.11 0 0)",
          border: "1px solid oklch(0.72 0.12 75 / 0.1)",
        }}
      >
        <p
          className="font-body text-xs"
          style={{ color: "oklch(0.45 0.01 75)" }}
        >
          This is a demo application. In the production version, payments are
          processed securely through Shopify's billing API. Your subscription
          can be cancelled at any time from your Shopify admin panel.
        </p>
      </div>
    </div>
  );
}
