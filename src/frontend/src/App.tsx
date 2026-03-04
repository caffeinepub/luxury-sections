import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import PlanPage from "./pages/PlanPage";
import SectionsPage from "./pages/SectionsPage";
import SupportPage from "./pages/SupportPage";

type Page = "dashboard" | "sections" | "plan" | "support";
type View = "landing" | Page;

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEnterDashboard = () => {
    setView("dashboard");
  };

  const handleNavigate = (page: Page) => {
    setView(page);
    setSidebarOpen(false);
  };

  if (view === "landing") {
    return (
      <>
        <LandingPage onEnterDashboard={handleEnterDashboard} />
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "oklch(0.12 0 0)",
              border: "1px solid oklch(0.72 0.12 75 / 0.3)",
              color: "oklch(0.90 0.02 75)",
            },
          }}
        />
      </>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "oklch(0.08 0 0)" }}
    >
      <Sidebar
        currentPage={view as Page}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto pl-0 md:pl-0">
        {/* Top bar */}
        <div
          className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 md:pl-8"
          style={{
            background: "oklch(0.08 0 0 / 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid oklch(0.72 0.12 75 / 0.1)",
          }}
        >
          {/* Spacer for mobile menu button */}
          <div className="w-10 md:w-0" />
          <div className="flex-1 flex justify-center md:justify-start">
            <p
              className="font-body text-xs tracking-luxury font-medium"
              style={{ color: "oklch(0.45 0.01 75)" }}
            >
              LUXURY SECTIONS · DEMO MODE
            </p>
          </div>
          <div
            className="font-body text-xs px-2.5 py-1 rounded-sm"
            style={{
              background: "oklch(0.72 0.12 75 / 0.1)",
              color: "oklch(0.72 0.12 75)",
              border: "1px solid oklch(0.72 0.12 75 / 0.2)",
            }}
          >
            demo-store.myshopify.com
          </div>
        </div>

        {/* Page content */}
        <div className="md:pl-0">
          {view === "dashboard" && (
            <DashboardPage onNavigate={handleNavigate} />
          )}
          {view === "sections" && <SectionsPage onNavigate={handleNavigate} />}
          {view === "plan" && <PlanPage />}
          {view === "support" && <SupportPage />}
        </div>
      </main>

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.12 0 0)",
            border: "1px solid oklch(0.72 0.12 75 / 0.3)",
            color: "oklch(0.90 0.02 75)",
            fontFamily: "'DM Sans', sans-serif",
          },
        }}
      />
    </div>
  );
}
