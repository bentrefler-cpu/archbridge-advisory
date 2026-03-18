"use client";
import { useState, useEffect, useRef, useMemo } from "react";

// ── Constants ──────────────────────────────────────────
const SECTIONS = ["home", "about", "advisory", "team", "contact"];
const NAV_ITEMS = ["About", "Advisory", "Team", "Contact"];
const EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";
const GOLD = "#b8945f";
const NAVY = "#0a1628";
const IVORY = "#f5f0e8";
const DEEP = "#0e1d33";
const VARUN_IMG = "data:image/jpeg;base64,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";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ── Global Styles (static, injected once) ─────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  ::selection { background: rgba(184,148,95,0.3); color: ${IVORY}; }
  input, textarea { border-radius: 0; -webkit-appearance: none; }
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-nav-toggle { display: flex !important; }
  }
  @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
`;

// ── Shared style fragments ────────────────────────────
const font = { serif: "'Cormorant Garamond', serif", sans: "'DM Sans', sans-serif" };

const labelStyle = (color = GOLD) => ({
  fontFamily: font.sans, fontSize: "10px", fontWeight: 500,
  letterSpacing: "4px", textTransform: "uppercase", color, marginBottom: "20px",
});

const bodyText = (color, size = "15px") => ({
  fontFamily: font.sans, fontSize: size, fontWeight: 300, color, lineHeight: 2.0,
});

// ── Navigation ────────────────────────────────────────
function Nav({ active, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? "16px 40px" : "28px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(10,22,40,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: `padding 0.4s ${EASE}, background 0.4s ${EASE}, border-color 0.4s ${EASE}`,
      borderBottom: scrolled ? "1px solid rgba(184,148,95,0.15)" : "1px solid transparent",
    }}>
      <div onClick={() => scrollTo("home")} style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: font.serif, fontSize: "22px", fontWeight: 600, color: IVORY, letterSpacing: "3px", textTransform: "uppercase" }}>Archbridge</span>
        <span style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 400, color: GOLD, letterSpacing: "5px", textTransform: "uppercase", marginTop: "-2px" }}>Advisory</span>
      </div>

      <div style={{ display: "flex", gap: "36px", alignItems: "center" }} className="desktop-nav">
        {NAV_ITEMS.map((item, i) => {
          const isActive = active === item.toLowerCase();
          const isHovered = hoveredNav === i;
          return (
            <span key={item} onClick={() => scrollTo(item.toLowerCase())}
              onMouseEnter={() => setHoveredNav(i)} onMouseLeave={() => setHoveredNav(null)}
              style={{
                fontFamily: font.sans, fontSize: "11px", fontWeight: 400,
                color: isActive || isHovered ? GOLD : "rgba(245,240,232,0.65)",
                letterSpacing: "2.5px", textTransform: "uppercase", cursor: "pointer",
                transition: `color 0.3s ${EASE}`, paddingBottom: "4px",
                borderBottom: isActive ? `1px solid ${GOLD}` : "1px solid transparent",
              }}>
              {item}
            </span>
          );
        })}
      </div>

      <div className="mobile-nav-toggle" onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: "none", cursor: "pointer", flexDirection: "column", gap: "5px" }}>
        <span style={{ width: "24px", height: "1.5px", background: IVORY, transition: `transform 0.3s ${EASE}`, transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
        <span style={{ width: "24px", height: "1.5px", background: IVORY, transition: `opacity 0.3s ${EASE}`, opacity: menuOpen ? 0 : 1 }} />
        <span style={{ width: "24px", height: "1.5px", background: IVORY, transition: `transform 0.3s ${EASE}`, transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
      </div>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,0.98)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "32px", zIndex: 999 }}>
          <div onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "28px", right: "40px", cursor: "pointer", color: IVORY, fontSize: "28px", fontWeight: 300 }}>×</div>
          {NAV_ITEMS.map((item) => (
            <span key={item} onClick={() => { scrollTo(item.toLowerCase()); setMenuOpen(false); }}
              style={{ fontFamily: font.serif, fontSize: "28px", fontWeight: 400, color: IVORY, letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer" }}>
              {item}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Section wrapper with IntersectionObserver ─────────
function Section({ children, id, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`, ...style }}>
      {children}
    </section>
  );
}

function GoldRule() {
  return <div style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: "0 auto" }} />;
}

function SectionLabel({ text }) {
  return <div style={labelStyle()}>{text}</div>;
}

// ── Hero ──────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          const vh = window.innerHeight;
          const raw = Math.max(0, -rect.top / (vh * 0.5));
          setScrollProgress(Math.min(raw, 1));
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stagger = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 1s ${EASE} ${delay}s, transform 1s ${EASE} ${delay}s`,
  });

  const p = scrollProgress;
  // Smooth ease-out curve (fast start, gentle finish)
  const eased = 1 - Math.pow(1 - p, 3);

  // Arch: scales up, border peaks mid-scroll then fades
  const outerScale = 1 + eased * 4;
  const outerBorderOpacity = p < 0.5
    ? 0.2 + (p / 0.5) * 0.25
    : Math.max(0, 0.45 - ((p - 0.5) / 0.5) * 0.45);
  const innerScale = 1 + eased * 5.5;
  const innerBorderOpacity = p < 0.4
    ? 0.08 + (p / 0.4) * 0.15
    : Math.max(0, 0.23 - ((p - 0.4) / 0.6) * 0.23);

  // Simple clean transition: navy holds longer, then fades to ivory
  const ivoryOpacity = Math.max(0, (p - 0.45) / 0.55);

  // Content: scales up, blurs, and fades (approaching viewer)
  const contentOpacity = Math.max(0, 1 - p * 3);
  const contentScale = 1 + p * 0.25;
  const contentBlur = p * 5;

  return (
    <section ref={heroRef} id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "120px 40px 80px", position: "relative", overflow: "hidden", background: NAVY,
    }}>
      {/* Subtle ambient glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 45%, rgba(184,148,95,0.06) 0%, transparent 45%),
          radial-gradient(ellipse at 20% 50%, rgba(184,148,95,0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, rgba(184,148,95,0.03) 0%, transparent 50%)`,
        opacity: 1 - eased * 0.9,
      }} />

      {/* Clean ivory wash (single layer, no gold bloom) */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: IVORY,
        opacity: ivoryOpacity,
      }} />

      {/* Outer arch */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "min(480px, 68vw)", height: "min(580px, 78vh)",
        border: `1.5px solid rgba(184,148,95,${outerBorderOpacity})`,
        borderRadius: "240px 240px 0 0",
        pointerEvents: "none",
        boxShadow: `0 0 ${60 + eased * 100}px rgba(184,148,95,${Math.min(0.06, eased * 0.06)})`,
        transform: `translate(-50%, -50%) scale(${outerScale})`,
        transformOrigin: "center 40%",
      }} />

      {/* Inner arch (parallax) */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "min(420px, 60vw)", height: "min(520px, 70vh)",
        border: `0.75px solid rgba(184,148,95,${innerBorderOpacity})`,
        borderRadius: "210px 210px 0 0",
        pointerEvents: "none",
        transform: `translate(-50%, -50%) scale(${innerScale})`,
        transformOrigin: "center 40%",
      }} />

      {/* Content: scales up and fades toward viewer */}
      <div style={{
        position: "relative", zIndex: 1, maxWidth: "700px",
        opacity: contentOpacity,
        transform: `scale(${contentScale})`,
        filter: contentBlur > 0.3 ? `blur(${contentBlur}px)` : "none",
        transformOrigin: "center center",
      }}>
        <div style={stagger(0.2)}>
          <div style={{
            fontFamily: font.sans, fontSize: "9px", fontWeight: 500,
            letterSpacing: "6px", textTransform: "uppercase", color: GOLD, marginBottom: "48px",
          }}>
            Sell-Side M&A Advisory
          </div>
        </div>
        <h1 style={{
          fontFamily: font.serif, fontSize: "clamp(38px, 6vw, 66px)", fontWeight: 400,
          color: IVORY, lineHeight: 1.12, margin: "0 0 36px", ...stagger(0.4),
        }}>
          Institutional Advisory{" "}<span style={{ fontStyle: "italic", color: GOLD }}>for</span><br />Exceptional Businesses
        </h1>
        <p style={{ ...bodyText("rgba(245,240,232,0.6)"), maxWidth: "420px", margin: "0 auto 56px", ...stagger(0.6) }}>
          Sell-side M&A advisory for business owners, operators, and private equity sponsors.
        </p>
        <div style={stagger(0.8)}>
          <span onClick={() => scrollTo("contact")} style={{
            fontFamily: font.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase",
            color: GOLD, cursor: "pointer", padding: "14px 36px", border: "1px solid rgba(184,148,95,0.4)",
            transition: `background 0.3s ${EASE}, border-color 0.3s ${EASE}, color 0.3s ${EASE}`, display: "inline-block",
          }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(184,148,95,0.15)"; e.target.style.borderColor = GOLD; e.target.style.color = IVORY; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(184,148,95,0.4)"; e.target.style.color = GOLD; }}>
            Begin a Conversation
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
        opacity: loaded && contentOpacity > 0.6 ? 0.4 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, ${GOLD}, transparent)`, animation: "pulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────
function About() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const stats = [{ value: "Investors", label: "& Operators" }, { value: "Senior-Led", label: "Every Engagement" }, { value: "Deliberate", label: "Pace & Process" }];

  return (
    <Section id="about" style={{ background: IVORY, padding: "clamp(100px, 12vw, 160px) 40px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
        <SectionLabel text="Our Firm" />
        <h2 style={{ fontFamily: font.serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: NAVY, lineHeight: 1.3, margin: "0 0 28px" }}>
          Built by Buyers.<br /><span style={{ fontStyle: "italic", color: GOLD }}>Advising Sellers.</span>
        </h2>
        <GoldRule />
        <p style={{ ...bodyText("rgba(10,22,40,0.75)"), margin: "40px 0 0", textAlign: "center", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
          Archbridge Advisory is an investor- and operator-led sell-side advisory firm. We have spent our careers acquiring, financing, and operating businesses for institutional sponsors. We know what buyers look for, how they underwrite, and where deals break down. That perspective is what we bring to every sell-side engagement.
        </p>
        <p style={{ ...bodyText("rgba(10,22,40,0.75)"), margin: "24px auto 0", textAlign: "center", maxWidth: "600px" }}>
          We take a limited number of mandates and maintain a deliberate pace. Every engagement is senior-led from origination through close. We position businesses the way buyers evaluate acquisitions, because that is how we have evaluated them ourselves.
        </p>
      </div>

      <div style={{ maxWidth: "720px", margin: "64px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px", background: "rgba(184,148,95,0.2)", border: "1px solid rgba(184,148,95,0.2)" }}>
        {stats.map((stat, i) => {
          const h = hoveredStat === i;
          return (
            <div key={i} onMouseEnter={() => setHoveredStat(i)} onMouseLeave={() => setHoveredStat(null)}
              style={{ background: h ? NAVY : IVORY, padding: "32px 24px", textAlign: "center", cursor: "default", transition: `background 0.45s ${EASE}` }}>
              <div style={{ fontFamily: font.serif, fontSize: "20px", fontWeight: 600, color: h ? IVORY : NAVY, marginBottom: "6px", transition: `color 0.45s ${EASE}` }}>{stat.value}</div>
              <div style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase", color: h ? "rgba(245,240,232,0.6)" : "rgba(10,22,40,0.5)", transition: `color 0.45s ${EASE}` }}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ── Experience ────────────────────────────────────────
function Experience() {
  const [hoveredSector, setHoveredSector] = useState(null);
  const [hoveredFirm, setHoveredFirm] = useState(null);

  const firms = useMemo(() => [
    { name: "BROOKFIELD", subtitle: "Asset Management", ns: { fontFamily: font.sans, fontSize: "15px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase" }, ss: { fontFamily: font.sans, fontSize: "8px", fontWeight: 400, letterSpacing: "2.5px", textTransform: "uppercase", marginTop: "2px" } },
    { name: "TorQuest", subtitle: "Partners", ns: { fontFamily: font.serif, fontSize: "20px", fontWeight: 600, letterSpacing: "1px" }, ss: { fontFamily: font.sans, fontSize: "8px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px" } },
    { name: "NBF", subtitle: "National Bank Financial", ns: { fontFamily: font.sans, fontSize: "22px", fontWeight: 700, letterSpacing: "3px" }, ss: { fontFamily: font.sans, fontSize: "7px", fontWeight: 400, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px" } },
    { name: "KPMG", subtitle: null, ns: { fontFamily: font.sans, fontSize: "22px", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase" } },
    { name: "pwc", subtitle: null, ns: { fontFamily: font.sans, fontSize: "24px", fontWeight: 500, letterSpacing: "1px", textTransform: "lowercase" } },
  ], []);

  const sectors = [
    { value: "$3.2B+", label: "Real Estate & Infrastructure" },
    { value: "$1.8B+", label: "Industrials & Manufacturing" },
    { value: "$1.4B+", label: "Logistics & Transportation" },
    { value: "$900M+", label: "Technology & Business Services" },
  ];

  return (
    <div style={{ background: DEEP, padding: "56px 40px 64px", borderTop: "1px solid rgba(184,148,95,0.06)", borderBottom: "1px solid rgba(184,148,95,0.06)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>Where Our Team Has Worked</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "8px 0", marginBottom: "48px" }}>
          {firms.map((firm, i) => (
            <div key={i} onMouseEnter={() => setHoveredFirm(i)} onMouseLeave={() => setHoveredFirm(null)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px 28px", minWidth: "110px", cursor: "default", opacity: hoveredFirm === i ? 0.9 : 0.35, transition: `opacity 0.4s ${EASE}` }}>
              <div style={{ color: IVORY, ...firm.ns, lineHeight: 1 }}>{firm.name}</div>
              {firm.subtitle && <div style={{ color: IVORY, ...firm.ss }}>{firm.subtitle}</div>}
            </div>
          ))}
        </div>
        <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,148,95,0.25), transparent)", margin: "0 auto 36px" }} />
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <span style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>Combined Transaction Experience</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px", background: "rgba(184,148,95,0.08)" }}>
          {sectors.map((sector, i) => {
            const h = hoveredSector === i;
            return (
              <div key={i} onMouseEnter={() => setHoveredSector(i)} onMouseLeave={() => setHoveredSector(null)}
                style={{ background: h ? "rgba(184,148,95,0.1)" : DEEP, padding: "32px 20px", textAlign: "center", cursor: "default", transition: `background 0.4s ${EASE}` }}>
                <div style={{ fontFamily: font.serif, fontSize: "28px", fontWeight: 400, color: GOLD, lineHeight: 1, marginBottom: "10px", transition: `transform 0.4s ${EASE}`, transform: h ? "translateY(-3px) scale(1.05)" : "translateY(0) scale(1)" }}>{sector.value}</div>
                <div style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 400, letterSpacing: "1.5px", textTransform: "uppercase", lineHeight: 1.4, color: h ? "rgba(245,240,232,0.85)" : "rgba(245,240,232,0.4)", transition: `color 0.4s ${EASE}` }}>{sector.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Advisory ──────────────────────────────────────────
function Advisory() {
  const [hoveredPhase, setHoveredPhase] = useState(null);
  const phases = useMemo(() => [
    { num: "01", title: "Assessment & Positioning", text: "Financial quality, revenue mix, competitive position, and buyer landscape. We align on objectives, set valuation expectations, and map the path to market." },
    { num: "02", title: "Materials Preparation", text: "Confidential information memorandum, management presentation, financial model, and supporting exhibits. The business is positioned the way buyers underwrite acquisitions." },
    { num: "03", title: "Buyer Outreach & Process", text: "Targeted buyer universe ranked by strategic fit, acquisition capacity, and certainty of close. Outreach is controlled, sequential, and under NDA to maximize competitive tension." },
    { num: "04", title: "Negotiation & Execution", text: "LOIs evaluated on total consideration, terms, certainty, and post-close implications. We control information flow, coordinate diligence, and negotiate through definitive agreements to close." },
  ], []);

  return (
    <Section id="advisory" style={{ background: NAVY, padding: "clamp(80px, 10vw, 140px) 40px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionLabel text="Our Process" />
          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: IVORY, lineHeight: 1.3, margin: "0 0 24px" }}>
            Structured Execution,<br /><span style={{ fontStyle: "italic", color: GOLD }}>Disciplined Outcomes</span>
          </h2>
          <GoldRule />
          <p style={{ ...bodyText("rgba(245,240,232,0.55)"), maxWidth: "480px", margin: "32px auto 0" }}>
            Consistent methodology. Execution tailored to the business, the sector, and the buyer landscape.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {phases.map((phase, i) => {
            const h = hoveredPhase === i;
            return (
              <div key={i} onMouseEnter={() => setHoveredPhase(i)} onMouseLeave={() => setHoveredPhase(null)}
                style={{
                  display: "grid", gridTemplateColumns: "60px 1fr", gap: "24px",
                  padding: "36px 16px", margin: "0 -16px", borderTop: "1px solid rgba(184,148,95,0.12)",
                  alignItems: "start", cursor: "default", borderRadius: "2px",
                  background: h ? "rgba(184,148,95,0.08)" : "transparent",
                  borderLeft: h ? "2px solid rgba(184,148,95,0.5)" : "2px solid transparent",
                  transition: `background 0.4s ${EASE}, border-color 0.4s ${EASE}`,
                }}>
                <span style={{
                  fontFamily: font.serif, fontSize: "32px", fontWeight: 300, lineHeight: 1, display: "inline-block",
                  color: h ? GOLD : "rgba(184,148,95,0.35)",
                  transform: h ? "translateX(4px)" : "translateX(0)",
                  transition: `color 0.4s ${EASE}, transform 0.4s ${EASE}`,
                }}>{phase.num}</span>
                <div>
                  <h3 style={{ fontFamily: font.serif, fontSize: "22px", fontWeight: 500, color: IVORY, margin: "0 0 12px" }}>{phase.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "14px", fontWeight: 300, lineHeight: 1.8, margin: 0, color: h ? "rgba(245,240,232,0.85)" : "rgba(245,240,232,0.5)", transition: `color 0.4s ${EASE}` }}>{phase.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ── Team ──────────────────────────────────────────────
function Team() {
  const [hoveredAdvisor, setHoveredAdvisor] = useState(null);

  const principal = {
    name: "Varun Bhambhani", title: "Founder & Managing Principal",
    bio: "Varun leads Archbridge Advisory with over a decade of experience executing and overseeing private equity transactions across the full deal lifecycle. He held senior positions at TorQuest Partners, Brookfield Asset Management, and National Bank Financial, spanning acquisitions, portfolio management, and M&A execution. He began his career at PwC Canada. CPA certified.",
    initials: "VB",
  };

  const advisors = useMemo(() => [
    { name: "Benjamin Trefler", focus: "Real Estate & Private Equity", bio: "Real estate, infrastructure, and PE-backed transactions. VP of Acquisitions, Grove Point Marinas. Previously Brookfield, Ela Capital, KPMG.", initials: "BT" },
    { name: "Coming Soon", focus: "Industrials & Manufacturing", bio: "Sector-specific advisors with direct operating and transaction experience.", initials: "—", placeholder: true },
    { name: "Ray Yang", focus: "Technology", bio: "Corporate development and strategy at Perplexity. Previously growth investing at Silver Lake, investment banking at Evercore. SoFi, Atom Finance.", initials: "RY" },
    { name: "Coming Soon", focus: "Healthcare & Consumer", bio: "Sector-specific advisors with direct operating and transaction experience.", initials: "—", placeholder: true },
  ], []);

  return (
    <Section id="team" style={{ background: IVORY, padding: "clamp(80px, 10vw, 140px) 40px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionLabel text="Our Team" />
          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: NAVY, lineHeight: 1.3, margin: "0 0 24px" }}>
            Senior Professionals,<br /><span style={{ fontStyle: "italic", color: GOLD }}>Direct Involvement</span>
          </h2>
          <GoldRule />
        </div>

        {/* Principal card */}
        <div style={{
          maxWidth: "780px", margin: "0 auto 72px", background: NAVY,
          display: "grid", gridTemplateColumns: "240px 1fr", overflow: "hidden",
        }} data-principal-card="">
          {/* Photo */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={VARUN_IMG} alt={principal.name} style={{
              width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%",
              display: "block", filter: "grayscale(25%) contrast(0.95) brightness(1.05) saturate(0.85)",
              minHeight: "320px",
            }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 70%, rgba(10,22,40,0.15) 100%)" }} />
          </div>
          {/* Text */}
          <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 500, letterSpacing: "3.5px", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>
              {principal.title}
            </div>
            <h3 style={{ fontFamily: font.serif, fontSize: "28px", fontWeight: 500, color: IVORY, margin: "0 0 20px" }}>
              {principal.name}
            </h3>
            <div style={{ width: "28px", height: "1px", background: "rgba(184,148,95,0.3)", marginBottom: "20px" }} />
            <p style={{ fontFamily: font.sans, fontSize: "13.5px", fontWeight: 300, color: "rgba(245,240,232,0.6)", lineHeight: 1.85, margin: 0 }}>
              {principal.bio}
            </p>
          </div>
        </div>

        {/* Mobile override for stacked layout */}
        <style>{`
          @media (max-width: 640px) {
            [data-principal-card] { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(184,148,95,0.25)", margin: "0 auto 20px" }} />
          <span style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(10,22,40,0.4)" }}>Sector & Functional Advisors</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "rgba(184,148,95,0.15)", border: "1px solid rgba(184,148,95,0.15)" }}>
          {advisors.map((a, i) => {
            const h = hoveredAdvisor === i;
            const p = a.placeholder;
            return (
              <div key={i} onMouseEnter={() => setHoveredAdvisor(i)} onMouseLeave={() => setHoveredAdvisor(null)}
                style={{ background: h ? NAVY : IVORY, padding: "32px 24px", cursor: "default", transition: `background 0.45s ${EASE}` }}>
                <div style={{
                  width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px",
                  background: h ? "rgba(184,148,95,0.15)" : p ? "rgba(10,22,40,0.04)" : NAVY,
                  transform: h ? "translateY(-3px)" : "translateY(0)",
                  transition: `background 0.45s ${EASE}, transform 0.45s ${EASE}`,
                }}>
                  <span style={{ fontFamily: font.serif, fontSize: "18px", fontWeight: 400, letterSpacing: "2px", color: h ? GOLD : p ? "rgba(10,22,40,0.15)" : "rgba(184,148,95,0.5)", transition: `color 0.45s ${EASE}` }}>{a.initials}</span>
                </div>
                <h4 style={{ fontFamily: font.serif, fontSize: "18px", fontWeight: 500, margin: "0 0 2px", fontStyle: p ? "italic" : "normal", color: h ? IVORY : p ? "rgba(10,22,40,0.3)" : NAVY, transition: `color 0.45s ${EASE}` }}>{a.name}</h4>
                <div style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: "12px", opacity: p && !h ? 0.5 : 1, transition: `opacity 0.45s ${EASE}` }}>{a.focus}</div>
                <p style={{ fontFamily: font.sans, fontSize: "12.5px", fontWeight: 300, lineHeight: 1.75, margin: 0, color: h ? "rgba(245,240,232,0.7)" : p ? "rgba(10,22,40,0.3)" : "rgba(10,22,40,0.6)", transition: `color 0.45s ${EASE}` }}>{a.bio}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ── Contact ───────────────────────────────────────────
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mwvraboz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      // silently handle
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="contact" style={{ background: NAVY, padding: "clamp(80px, 10vw, 140px) 40px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <SectionLabel text="Contact" />
        <h2 style={{ fontFamily: font.serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: IVORY, lineHeight: 1.3, margin: "0 0 24px" }}>
          Begin a <span style={{ fontStyle: "italic", color: GOLD }}>Conversation</span>
        </h2>
        <GoldRule />
        <p style={{ ...bodyText("rgba(245,240,232,0.55)"), margin: "32px auto 48px", maxWidth: "440px" }}>All inquiries are confidential.</p>

        {!submitted ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
            {[{ key: "name", label: "Name", type: "text" }, { key: "email", label: "Email", type: "email" }].map((field) => (
              <div key={field.key}>
                <label style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", display: "block", marginBottom: "8px" }}>{field.label}</label>
                <input type={field.type} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  style={{ width: "100%", padding: "14px 16px", background: "rgba(245,240,232,0.04)", border: "1px solid rgba(184,148,95,0.15)", color: IVORY, fontFamily: font.sans, fontSize: "14px", fontWeight: 300, outline: "none", boxSizing: "border-box", transition: `border-color 0.3s ${EASE}, box-shadow 0.3s ${EASE}` }}
                  onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = "0 0 0 1px rgba(184,148,95,0.2)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(184,148,95,0.15)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", display: "block", marginBottom: "8px" }}>Message</label>
              <textarea rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: "100%", padding: "14px 16px", background: "rgba(245,240,232,0.04)", border: "1px solid rgba(184,148,95,0.15)", color: IVORY, fontFamily: font.sans, fontSize: "14px", fontWeight: 300, outline: "none", resize: "vertical", boxSizing: "border-box", transition: `border-color 0.3s ${EASE}, box-shadow 0.3s ${EASE}` }}
                onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = "0 0 0 1px rgba(184,148,95,0.2)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(184,148,95,0.15)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <button onClick={handleSubmit} disabled={sending}
              style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: GOLD, background: "transparent", border: "1px solid rgba(184,148,95,0.4)", padding: "16px 36px", cursor: sending ? "default" : "pointer", alignSelf: "center", opacity: sending ? 0.6 : 1, transition: `background 0.3s ${EASE}, border-color 0.3s ${EASE}, color 0.3s ${EASE}, opacity 0.3s ${EASE}` }}
              onMouseEnter={(e) => { if (!sending) { e.target.style.background = "rgba(184,148,95,0.15)"; e.target.style.borderColor = GOLD; e.target.style.color = IVORY; } }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(184,148,95,0.4)"; e.target.style.color = GOLD; }}>
              {sending ? "Sending..." : "Send Inquiry"}
            </button>
          </div>
        ) : (
          <div style={{ padding: "48px", border: "1px solid rgba(184,148,95,0.2)" }}>
            <div style={{ fontFamily: font.serif, fontSize: "22px", fontWeight: 400, color: IVORY, marginBottom: "12px" }}>Thank you.</div>
            <p style={{ fontFamily: font.sans, fontSize: "14px", fontWeight: 300, color: "rgba(245,240,232,0.55)", lineHeight: 1.7, margin: 0 }}>We will be in touch shortly.</p>
          </div>
        )}

        <div style={{ marginTop: "64px", paddingTop: "40px", borderTop: "1px solid rgba(184,148,95,0.1)", display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginBottom: "8px" }}>Email</div>
            <div style={{ fontFamily: font.sans, fontSize: "14px", fontWeight: 300, color: "rgba(245,240,232,0.75)" }}>info@archbridgeadvisory.com</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginBottom: "8px" }}>Locations</div>
            <div style={{ fontFamily: font.sans, fontSize: "14px", fontWeight: 300, color: "rgba(245,240,232,0.75)" }}>New York &ensp;·&ensp; Toronto</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Footer ────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#070e1a", padding: "56px 40px 48px", textAlign: "center", borderTop: "1px solid rgba(184,148,95,0.08)" }}>
      <div style={{ fontFamily: font.serif, fontSize: "14px", fontWeight: 500, color: "rgba(245,240,232,0.25)", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>Archbridge Advisory</div>
      <div style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 300, color: "rgba(245,240,232,0.15)", letterSpacing: "1px" }}>© {new Date().getFullYear()} Archbridge Advisory. All rights reserved.</div>
    </footer>
  );
}

// ── Main App ──────────────────────────────────────────
export default function ArchbridgeAdvisory() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        const sections = SECTIONS.map((id) => {
          const el = document.getElementById(id);
          if (!el) return { id, top: 0 };
          return { id, top: el.getBoundingClientRect().top };
        });
        const current = sections.reduce((closest, section) =>
          section.top <= 200 && section.top > closest.top ? section : closest,
          { id: "home", top: -Infinity }
        );
        setActiveSection(current.id);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ margin: 0, padding: 0, background: NAVY, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{GLOBAL_CSS}</style>
      <Nav active={activeSection} scrolled={scrolled} />
      <Hero />
      <About />
      <Experience />
      <Advisory />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
