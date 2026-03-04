import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  Crown,
  Eye,
  Loader2,
  Lock,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Section } from "../backend.d";
import {
  useAllSections,
  useInstallSection,
  useMerchant,
  useRemoveSection,
} from "../hooks/useQueries";
import { getSectionImage } from "../utils/sectionImage";

type FilterType = "all" | "free" | "pro";
type Page = "dashboard" | "sections" | "plan" | "support";

interface SectionsPageProps {
  onNavigate: (page: Page) => void;
}

interface PreviewModalProps {
  section: Section;
  isInstalled: boolean;
  isProLocked: boolean;
  isInstalling: boolean;
  isRemoving: boolean;
  onClose: () => void;
  onInstall: (section: Section) => void;
  onRemove: (section: Section) => void;
  onUpgrade: () => void;
}

function PreviewModal({
  section,
  isInstalled,
  isProLocked,
  isInstalling,
  isRemoving,
  onClose,
  onInstall,
  onRemove,
  onUpgrade,
}: PreviewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    /* biome-ignore lint/a11y/useKeyWithClickEvents: overlay close handled via Escape key */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "oklch(0.08 0 0 / 0.85)",
        backdropFilter: "blur(8px)",
      }}
      onClick={handleOverlayClick}
      data-ocid="sections.preview.modal"
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: propagation stop only */}
      <div
        className="relative w-full max-w-2xl rounded-sm overflow-hidden animate-fade-slide-up"
        style={{
          background: "oklch(0.11 0 0)",
          border: "1px solid oklch(0.72 0.12 75 / 0.25)",
          boxShadow:
            "0 0 60px oklch(0.72 0.12 75 / 0.12), 0 24px 48px oklch(0 0 0 / 0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          data-ocid="sections.preview.close_button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-200"
          style={{
            background: "oklch(0.16 0 0)",
            border: "1px solid oklch(0.72 0.12 75 / 0.2)",
            color: "oklch(0.65 0.01 75)",
          }}
          aria-label="Close preview"
        >
          <X size={14} />
        </button>

        {/* Preview image */}
        <div
          className="relative w-full"
          style={{ aspectRatio: "16/10", overflow: "hidden" }}
        >
          <img
            src={getSectionImage(section.name)}
            alt={`${section.name} preview`}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay at bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, oklch(0.11 0 0) 0%, transparent 60%)",
            }}
          />
          {/* Tier badge in image */}
          <div className="absolute top-4 left-4 flex gap-2">
            {section.isPro ? (
              <span
                className="px-2.5 py-1 rounded-sm font-body text-xs font-bold tracking-luxury-xs"
                style={{
                  background: "oklch(0.72 0.12 75)",
                  color: "oklch(0.08 0 0)",
                }}
              >
                PRO
              </span>
            ) : (
              <span
                className="px-2.5 py-1 rounded-sm font-body text-xs font-bold tracking-luxury-xs"
                style={{
                  background: "oklch(0.52 0.14 165)",
                  color: "oklch(0.08 0 0)",
                }}
              >
                FREE
              </span>
            )}
            {isInstalled && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 rounded-sm font-body text-xs font-semibold"
                style={{
                  background: "oklch(0.52 0.14 165 / 0.2)",
                  color: "oklch(0.72 0.15 145)",
                  border: "1px solid oklch(0.52 0.14 165 / 0.4)",
                }}
              >
                <CheckCircle size={11} />
                INSTALLED
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category + tags */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span
              className="font-body text-xs px-2.5 py-1 rounded-sm tracking-luxury-xs font-medium"
              style={{
                background: "oklch(0.72 0.12 75 / 0.1)",
                color: "oklch(0.72 0.12 75)",
                border: "1px solid oklch(0.72 0.12 75 / 0.2)",
              }}
            >
              {section.category}
            </span>
            {section.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-body text-xs px-2 py-0.5 rounded-sm"
                style={{
                  background: "oklch(0.16 0 0)",
                  color: "oklch(0.50 0.01 75)",
                  border: "1px solid oklch(0.72 0.12 75 / 0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Name */}
          <h2
            className="font-display text-2xl font-semibold tracking-luxury-xs mb-2"
            style={{ color: "oklch(0.94 0.02 75)" }}
          >
            {section.name}
          </h2>

          {/* Description */}
          <p
            className="font-body text-sm leading-relaxed mb-6"
            style={{ color: "oklch(0.55 0.01 75)" }}
          >
            {section.description}
          </p>

          {/* CTA */}
          {isProLocked ? (
            <button
              type="button"
              data-ocid="sections.preview.primary_button"
              onClick={onUpgrade}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm font-body text-sm font-semibold tracking-luxury-xs transition-all duration-300"
              style={{
                background: "transparent",
                border: "1px solid oklch(0.72 0.12 75 / 0.4)",
                color: "oklch(0.72 0.12 75)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "oklch(0.72 0.12 75 / 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Lock size={14} />
              UPGRADE TO PRO TO UNLOCK
            </button>
          ) : isInstalled ? (
            <button
              type="button"
              data-ocid="sections.preview.primary_button"
              onClick={() => onRemove(section)}
              disabled={isRemoving}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm font-body text-sm font-semibold tracking-luxury-xs transition-all duration-300"
              style={{
                background: "transparent",
                border: "1px solid oklch(0.65 0.18 25 / 0.4)",
                color: "oklch(0.65 0.18 25)",
              }}
              onMouseEnter={(e) => {
                if (!isRemoving)
                  e.currentTarget.style.background =
                    "oklch(0.65 0.18 25 / 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {isRemoving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              {isRemoving ? "REMOVING FROM THEME..." : "REMOVE FROM THEME"}
            </button>
          ) : (
            <button
              type="button"
              data-ocid="sections.preview.primary_button"
              onClick={() => onInstall(section)}
              disabled={isInstalling}
              className="btn-gold w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm text-sm"
            >
              {isInstalling ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <CheckCircle size={14} />
              )}
              {isInstalling ? "ADDING TO THEME..." : "ADD TO MERCHANT THEME"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SectionsPage({ onNavigate }: SectionsPageProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [previewSection, setPreviewSection] = useState<Section | null>(null);

  const { data: sections, isLoading: sectionsLoading } = useAllSections();
  const { data: merchant } = useMerchant();

  const installMutation = useInstallSection();
  const removeMutation = useRemoveSection();

  const isPro = merchant?.planType === "pro";
  const installedIds = new Set(merchant?.installedSectionIds ?? []);

  const filtered = (sections ?? []).filter((s: Section) => {
    if (filter === "free") return !s.isPro;
    if (filter === "pro") return s.isPro;
    return true;
  });

  const handleInstall = async (section: Section) => {
    try {
      await installMutation.mutateAsync(section.id);
      toast.success(`"${section.name}" added to your merchant theme`);
    } catch {
      toast.error("Failed to add section. Please try again.");
    }
  };

  const handleRemove = async (section: Section) => {
    try {
      await removeMutation.mutateAsync(section.id);
      toast.success(`"${section.name}" removed from theme`);
    } catch {
      toast.error("Failed to remove section. Please try again.");
    }
  };

  const handleUpgrade = () => {
    setPreviewSection(null);
    onNavigate("plan");
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <p
          className="font-body text-xs tracking-luxury font-medium mb-2"
          style={{ color: "oklch(0.72 0.12 75)" }}
        >
          SECTION LIBRARY
        </p>
        <h1
          className="font-display text-3xl font-semibold tracking-luxury-xs"
          style={{ color: "oklch(0.94 0.02 75)" }}
        >
          Premium Sections
        </h1>
        <p
          className="font-body text-sm mt-1"
          style={{ color: "oklch(0.50 0.01 75)" }}
        >
          {sections?.length ?? 5} curated luxury sections — click any card to
          preview, then add to your merchant theme
        </p>
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 mb-8 p-1 rounded-sm w-fit"
        style={{ background: "oklch(0.12 0 0)" }}
      >
        {(["all", "free", "pro"] as FilterType[]).map((f) => (
          <button
            key={f}
            type="button"
            data-ocid="sections.filter.tab"
            onClick={() => setFilter(f)}
            className="px-5 py-2 rounded-sm font-body text-xs font-semibold tracking-luxury-sm transition-all duration-300 capitalize"
            style={{
              background: filter === f ? "oklch(0.72 0.12 75)" : "transparent",
              color: filter === f ? "oklch(0.08 0 0)" : "oklch(0.55 0.01 75)",
            }}
          >
            {f === "all" ? "All Sections" : f === "pro" ? "Pro Only" : "Free"}
          </button>
        ))}
      </div>

      {/* Sections grid */}
      {sectionsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              className="h-80 rounded-sm"
              style={{ background: "oklch(0.13 0 0)" }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="luxury-card rounded-sm p-12 flex flex-col items-center justify-center text-center"
          data-ocid="sections.empty_state"
        >
          <Crown
            size={32}
            className="mb-4"
            style={{ color: "oklch(0.72 0.12 75 / 0.4)" }}
          />
          <p
            className="font-display text-base"
            style={{ color: "oklch(0.60 0.01 75)" }}
          >
            No sections in this category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((section: Section, idx: number) => {
            const isInstalled = installedIds.has(section.id);
            const isProLocked = section.isPro && !isPro;
            const btnIdx = idx + 1;

            const isInstalling =
              installMutation.isPending &&
              installMutation.variables === section.id;
            const isRemoving =
              removeMutation.isPending &&
              removeMutation.variables === section.id;

            return (
              <div
                key={section.id}
                className="luxury-card rounded-sm overflow-hidden flex flex-col group"
              >
                {/* Preview image with hover overlay */}
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: eye button inside handles keyboard */}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "16/10" }}
                  onClick={() => setPreviewSection(section)}
                >
                  <img
                    src={getSectionImage(section.name)}
                    alt={section.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.08 0 0 / 0.85) 0%, oklch(0.08 0 0 / 0.2) 60%, transparent 100%)",
                    }}
                  />

                  {/* Preview eye button */}
                  <button
                    type="button"
                    data-ocid={`sections.preview.open_modal_button.${btnIdx}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label={`Preview ${section.name}`}
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewSection(section);
                    }}
                  >
                    <div
                      className="flex items-center gap-2 px-4 py-2.5 rounded-sm font-body text-xs font-semibold tracking-luxury-xs transition-all duration-200"
                      style={{
                        background: "oklch(0.08 0 0 / 0.8)",
                        border: "1px solid oklch(0.72 0.12 75 / 0.5)",
                        color: "oklch(0.90 0.02 75)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <Eye size={13} />
                      PREVIEW SECTION
                    </div>
                  </button>

                  {/* PRO badge */}
                  {section.isPro && (
                    <div
                      className="absolute top-3 right-3 px-2 py-0.5 rounded-sm font-body text-xs font-bold tracking-luxury-xs"
                      style={{
                        background: "oklch(0.72 0.12 75)",
                        color: "oklch(0.08 0 0)",
                      }}
                    >
                      PRO
                    </div>
                  )}

                  {/* FREE badge */}
                  {!section.isPro && (
                    <div
                      data-ocid={`sections.free_badge.${btnIdx}`}
                      className="absolute top-3 right-3 px-2 py-0.5 rounded-sm font-body text-xs font-bold tracking-luxury-xs"
                      style={{
                        background: "oklch(0.52 0.14 165)",
                        color: "oklch(0.08 0 0)",
                      }}
                    >
                      FREE
                    </div>
                  )}

                  {/* Installed check */}
                  {isInstalled && (
                    <div className="absolute top-3 left-3">
                      <CheckCircle
                        size={18}
                        style={{ color: "oklch(0.72 0.15 145)" }}
                      />
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Category + tags */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span
                      className="font-body text-xs px-2 py-0.5 rounded-sm tracking-luxury-xs"
                      style={{
                        background: "oklch(0.72 0.12 75 / 0.1)",
                        color: "oklch(0.72 0.12 75)",
                        border: "1px solid oklch(0.72 0.12 75 / 0.2)",
                      }}
                    >
                      {section.category}
                    </span>
                    {section.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="font-body text-xs px-2 py-0.5 rounded-sm"
                        style={{
                          background: "oklch(0.15 0 0)",
                          color: "oklch(0.50 0.01 75)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Name */}
                  <h3
                    className="font-display text-lg font-semibold tracking-luxury-xs mb-2"
                    style={{ color: "oklch(0.92 0.02 75)" }}
                  >
                    {section.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-body text-sm line-clamp-2 mb-4 flex-1"
                    style={{ color: "oklch(0.50 0.01 75)" }}
                  >
                    {section.description}
                  </p>

                  {/* Action button */}
                  {isProLocked ? (
                    <button
                      type="button"
                      onClick={() => onNavigate("plan")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm font-body text-xs font-semibold tracking-luxury-xs transition-all duration-300"
                      style={{
                        background: "transparent",
                        border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                        color: "oklch(0.72 0.12 75)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "oklch(0.72 0.12 75 / 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <Lock size={12} />
                      UPGRADE TO PRO
                    </button>
                  ) : isInstalled ? (
                    <button
                      type="button"
                      data-ocid={`sections.remove.button.${btnIdx}`}
                      onClick={() => handleRemove(section)}
                      disabled={isRemoving}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm font-body text-xs font-semibold tracking-luxury-xs transition-all duration-300"
                      style={{
                        background: "transparent",
                        border: "1px solid oklch(0.65 0.18 25 / 0.4)",
                        color: "oklch(0.65 0.18 25)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isRemoving) {
                          e.currentTarget.style.background =
                            "oklch(0.65 0.18 25 / 0.08)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {isRemoving ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Trash2 size={12} />
                      )}
                      {isRemoving ? "REMOVING..." : "REMOVE FROM THEME"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-ocid={`sections.install.button.${btnIdx}`}
                      onClick={() => handleInstall(section)}
                      disabled={isInstalling}
                      className="btn-gold w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-xs"
                    >
                      {isInstalling ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {isInstalling
                        ? "ADDING TO THEME..."
                        : "ADD TO MERCHANT THEME"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewSection &&
        (() => {
          const isInstalled = installedIds.has(previewSection.id);
          const isProLocked = previewSection.isPro && !isPro;
          const isInstalling =
            installMutation.isPending &&
            installMutation.variables === previewSection.id;
          const isRemoving =
            removeMutation.isPending &&
            removeMutation.variables === previewSection.id;

          return (
            <PreviewModal
              section={previewSection}
              isInstalled={isInstalled}
              isProLocked={isProLocked}
              isInstalling={isInstalling}
              isRemoving={isRemoving}
              onClose={() => setPreviewSection(null)}
              onInstall={async (s) => {
                await handleInstall(s);
                setPreviewSection(null);
              }}
              onRemove={async (s) => {
                await handleRemove(s);
                setPreviewSection(null);
              }}
              onUpgrade={handleUpgrade}
            />
          );
        })()}
    </div>
  );
}
