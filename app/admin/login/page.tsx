import { loginAction } from "./actions";
import { Lock, User, Eye } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  return (
    <div style={{
      minHeight: "100vh", background: "#050510", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundImage: "radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.06) 0%, transparent 60%), radial-gradient(ellipse at 75% 60%, rgba(88,28,235,0.05) 0%, transparent 55%)",
    }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 1.5rem" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#C9A96E", margin: "0 0 0.35rem", fontWeight: 400, letterSpacing: "-0.02em" }}>
            La Grande
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(245,240,232,0.3)", letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px", padding: "2.25rem",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
        }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#F5F0E8", margin: "0 0 0.35rem", fontWeight: 400 }}>
            Sign in
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(245,240,232,0.35)", margin: "0 0 1.75rem" }}>
            Enter your credentials to access the admin panel.
          </p>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.25rem",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              <Lock size={13} color="rgba(239,68,68,0.8)" />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(239,68,68,0.85)" }}>
                Incorrect username or password.
              </span>
            </div>
          )}

          <form action={loginAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="hidden" name="from" value={from || "/admin"} />

            {/* Username */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600, color: "rgba(245,240,232,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                <User size={11} /> Username
              </label>
              <div style={{ position: "relative" }}>
                <input
                  name="username" type="text" required autoComplete="username" autoFocus
                  placeholder="Enter username"
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px", color: "#F5F0E8", padding: "0.8rem 1rem 0.8rem 2.75rem",
                    fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
                  }}
                />
                <User size={14} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(245,240,232,0.25)", pointerEvents: "none" }} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600, color: "rgba(245,240,232,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                <Lock size={11} /> Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  name="password" type="password" required autoComplete="current-password"
                  placeholder="Enter password"
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px", color: "#F5F0E8", padding: "0.8rem 1rem 0.8rem 2.75rem",
                    fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
                  }}
                />
                <Lock size={14} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(245,240,232,0.25)", pointerEvents: "none" }} />
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: "0.5rem", width: "100%", padding: "0.9rem",
                background: "linear-gradient(135deg, #C9A96E 0%, #A07840 100%)",
                border: "none", borderRadius: "10px", color: "#050510",
                fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 700,
                letterSpacing: "0.06em", cursor: "pointer",
                boxShadow: "0 8px 24px rgba(201,169,110,0.28)",
              }}
            >
              Sign In →
            </button>
          </form>
        </div>

        {/* Credentials hint */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "0.6rem 1rem" }}>
            <Eye size={12} color="rgba(245,240,232,0.2)" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(245,240,232,0.25)" }}>
              Credentials are set in <code style={{ color: "rgba(201,169,110,0.5)", background: "rgba(201,169,110,0.06)", padding: "0.1rem 0.35rem", borderRadius: "4px" }}>.env.local</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
