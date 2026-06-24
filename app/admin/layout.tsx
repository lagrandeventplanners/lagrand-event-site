import Link from "next/link";
import { LayoutDashboard, PlusCircle, Globe, LogOut } from "lucide-react";
import { logoutAction } from "./login/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#05050f", display: "flex", flexDirection: "column" }}>
      {/* Top nav */}
      <header style={{
        borderBottom: "1px solid rgba(201,169,110,0.15)",
        background: "rgba(5,5,16,0.95)",
        backdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Link href="/admin" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "#C9A96E", textDecoration: "none", letterSpacing: "-0.01em" }}>
              La Grande <span style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>/ Admin</span>
            </Link>
            <nav style={{ display: "flex", gap: "0.25rem" }}>
              <Link href="/admin" style={navLink}>
                <LayoutDashboard size={14} /> Events
              </Link>
              <Link href="/admin/events/new" style={navLink}>
                <PlusCircle size={14} /> New Event
              </Link>
            </nav>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href="/" target="_blank" style={{ ...navLink, color: "rgba(245,240,232,0.35)", fontSize: "0.65rem" }}>
              <Globe size={13} /> View Site
            </Link>
            <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.08)" }} />
            <form action={logoutAction}>
              <button type="submit" style={{
                ...navLink as React.CSSProperties,
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(245,240,232,0.35)", fontSize: "0.72rem",
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
              }}>
                <LogOut size={13} /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, padding: "2rem" }}>
        {children}
      </main>
    </div>
  );
}

const navLink: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "0.4rem",
  padding: "0.35rem 0.75rem", borderRadius: "8px",
  color: "rgba(245,240,232,0.6)", textDecoration: "none",
  fontFamily: "var(--font-body)", fontSize: "0.75rem",
  fontWeight: 500, letterSpacing: "0.02em",
};
