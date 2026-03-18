"use client";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "40px", background: "#0a1628",
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: "72px",
        fontWeight: 300, color: "rgba(184,148,95,0.2)", marginBottom: "24px",
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: "28px",
        fontWeight: 400, color: "#f5f0e8", margin: "0 0 16px",
      }}>
        Page Not Found
      </h1>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
        fontWeight: 300, color: "rgba(245,240,232,0.5)", marginBottom: "40px",
      }}>
        The page you are looking for does not exist.
      </p>
      <a href="/" style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500,
        letterSpacing: "3px", textTransform: "uppercase", color: "#b8945f",
        padding: "14px 36px", border: "1px solid rgba(184,148,95,0.4)",
        textDecoration: "none",
      }}>
        Return Home
      </a>
    </div>
  );
}
