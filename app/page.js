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
const VARUN_IMG = "/varun.jpg";

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
  @media (max-width: 640px) {
    [data-principal-card] { grid-template-columns: 1fr !important; }
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
    <nav role="navigation" aria-label="Main navigation" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? "16px 40px" : "28px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(10,22,40,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: `padding 0.4s ${EASE}, background 0.4s ${EASE}, border-color 0.4s ${EASE}`,
      borderBottom: scrolled ? "1px solid rgba(184,148,95,0.15)" : "1px solid transparent",
    }}>
      <div onClick={() => scrollTo("home")} style={{ cursor: "pointer", display: "flex", flexDirection: "column" }} aria-label="Archbridge Advisory - return to top">
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
              role="button" tabIndex={0} aria-label={`Navigate to ${item}`}
              onKeyDown={(e) => { if (e.key === "Enter") scrollTo(item.toLowerCase()); }}
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
        role="button" tabIndex={0} aria-label="Toggle menu" aria-expanded={menuOpen}
        onKeyDown={(e) => { if (e.key === "Enter") setMenuOpen(!menuOpen); }}
        style={{ display: "none", cursor: "pointer", flexDirection: "column", gap: "5px" }}>
        <span style={{ width: "24px", height: "1.5px", background: IVORY, transition: `transform 0.3s ${EASE}`, transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
        <span style={{ width: "24px", height: "1.5px", background: IVORY, transition: `opacity 0.3s ${EASE}`, opacity: menuOpen ? 0 : 1 }} />
        <span style={{ width: "24px", height: "1.5px", background: IVORY, transition: `transform 0.3s ${EASE}`, transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
      </div>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,0.98)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "32px", zIndex: 999 }}>
          <div onClick={() => setMenuOpen(false)} role="button" tabIndex={0} aria-label="Close menu"
            onKeyDown={(e) => { if (e.key === "Enter") setMenuOpen(false); }}
            style={{ position: "absolute", top: "28px", right: "40px", cursor: "pointer", color: IVORY, fontSize: "28px", fontWeight: 300 }}>×</div>
          {NAV_ITEMS.map((item) => (
            <span key={item} onClick={() => { scrollTo(item.toLowerCase()); setMenuOpen(false); }}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") { scrollTo(item.toLowerCase()); setMenuOpen(false); } }}
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
  const eased = 1 - Math.pow(1 - p, 3);

  const outerScale = 1 + eased * 4;
  const outerBorderOpacity = p < 0.5
    ? 0.2 + (p / 0.5) * 0.25
    : Math.max(0, 0.45 - ((p - 0.5) / 0.5) * 0.45);
  const innerScale = 1 + eased * 5.5;
  const innerBorderOpacity = p < 0.4
    ? 0.08 + (p / 0.4) * 0.15
    : Math.max(0, 0.23 - ((p - 0.4) / 0.6) * 0.23);

  const ivoryOpacity = Math.max(0, (p - 0.45) / 0.55);
  const contentOpacity = Math.max(0, 1 - p * 3);
  const contentScale = 1 + p * 0.25;
  const contentBlur = p * 5;

  return (
    <section ref={heroRef} id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "120px 40px 80px", position: "relative", overflow: "hidden", background: NAVY,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 45%, rgba(184,148,95,0.06) 0%, transparent 45%),
          radial-gradient(ellipse at 20% 50%, rgba(184,148,95,0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, rgba(184,148,95,0.03) 0%, transparent 50%)`,
        opacity: 1 - eased * 0.9,
      }} />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: IVORY, opacity: ivoryOpacity }} />

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "min(480px, 68vw)", height: "min(580px, 78vh)",
        border: `1.5px solid rgba(184,148,95,${outerBorderOpacity})`,
        borderRadius: "240px 240px 0 0", pointerEvents: "none",
        boxShadow: `0 0 ${60 + eased * 100}px rgba(184,148,95,${Math.min(0.06, eased * 0.06)})`,
        transform: `translate(-50%, -50%) scale(${outerScale})`, transformOrigin: "center 40%",
      }} />

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "min(420px, 60vw)", height: "min(520px, 70vh)",
        border: `0.75px solid rgba(184,148,95,${innerBorderOpacity})`,
        borderRadius: "210px 210px 0 0", pointerEvents: "none",
        transform: `translate(-50%, -50%) scale(${innerScale})`, transformOrigin: "center 40%",
      }} />

      <div style={{
        position: "relative", zIndex: 1, maxWidth: "700px",
        opacity: contentOpacity, transform: `scale(${contentScale})`,
        filter: contentBlur > 0.3 ? `blur(${contentBlur}px)` : "none", transformOrigin: "center center",
      }}>
        <div style={stagger(0.2)}>
          <div style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 500, letterSpacing: "6px", textTransform: "uppercase", color: GOLD, marginBottom: "48px" }}>
            Sell-Side M&A Advisory
          </div>
        </div>
        <h1 style={{ fontFamily: font.serif, fontSize: "clamp(38px, 6vw, 66px)", fontWeight: 400, color: IVORY, lineHeight: 1.12, margin: "0 0 36px", ...stagger(0.4) }}>
          Institutional Advisory{" "}<span style={{ fontStyle: "italic", color: GOLD }}>for</span><br />Exceptional Businesses
        </h1>
        <p style={{ ...bodyText("rgba(245,240,232,0.6)"), maxWidth: "420px", margin: "0 auto 56px", ...stagger(0.6) }}>
          Sell-side M&A advisory for business owners, operators, and private equity sponsors.
        </p>
        <div style={stagger(0.8)}>
          <span onClick={() => scrollTo("contact")} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") scrollTo("contact"); }}
            style={{
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

      <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", opacity: loaded && contentOpacity > 0.6 ? 0.4 : 0, transition: "opacity 0.4s ease" }}>
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
  };

  const advisors = useMemo(() => [
    { name: "Benjamin Trefler", focus: "Real Estate & Private Equity", bio: "Real estate, infrastructure, and PE-backed transactions. VP of Acquisitions, Grove Point Marinas. Previously Brookfield, Ela Capital, KPMG.", initials: "BT" },
    { name: "Ray Yang", focus: "Technology", bio: "Corporate development and strategy at Perplexity. Previously growth investing at Silver Lake, investment banking at Evercore. SoFi, Atom Finance.", initials: "RY" },
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
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={VARUN_IMG} alt={principal.name} style={{
              width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%",
              display: "block", filter: "grayscale(25%) contrast(0.95) brightness(1.05) saturate(0.85)",
              minHeight: "320px",
            }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 70%, rgba(10,22,40,0.15) 100%)" }} />
          </div>
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

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(184,148,95,0.25)", margin: "0 auto 20px" }} />
          <span style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(10,22,40,0.4)" }}>Sector & Functional Advisors</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(184,148,95,0.15)", border: "1px solid rgba(184,148,95,0.15)" }}>
          {advisors.map((a, i) => {
            const h = hoveredAdvisor === i;
            return (
              <div key={i} onMouseEnter={() => setHoveredAdvisor(i)} onMouseLeave={() => setHoveredAdvisor(null)}
                style={{ background: h ? NAVY : IVORY, padding: "32px 24px", cursor: "default", transition: `background 0.45s ${EASE}` }}>
                <div style={{
                  width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px",
                  background: h ? "rgba(184,148,95,0.15)" : NAVY,
                  transform: h ? "translateY(-3px)" : "translateY(0)",
                  transition: `background 0.45s ${EASE}, transform 0.45s ${EASE}`,
                }}>
                  <span style={{ fontFamily: font.serif, fontSize: "18px", fontWeight: 400, letterSpacing: "2px", color: h ? GOLD : "rgba(184,148,95,0.5)", transition: `color 0.45s ${EASE}` }}>{a.initials}</span>
                </div>
                <h4 style={{ fontFamily: font.serif, fontSize: "18px", fontWeight: 500, margin: "0 0 2px", color: h ? IVORY : NAVY, transition: `color 0.45s ${EASE}` }}>{a.name}</h4>
                <div style={{ fontFamily: font.sans, fontSize: "9px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>{a.focus}</div>
                <p style={{ fontFamily: font.sans, fontSize: "12.5px", fontWeight: 300, lineHeight: 1.75, margin: 0, color: h ? "rgba(245,240,232,0.7)" : "rgba(10,22,40,0.6)", transition: `color 0.45s ${EASE}` }}>{a.bio}</p>
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
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    setError("");
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mwvraboz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email us directly.");
      }
    } catch (e) {
      setError("Something went wrong. Please email us directly.");
    }
    setSending(false);
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
                <label htmlFor={field.key} style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", display: "block", marginBottom: "8px" }}>{field.label}</label>
                <input id={field.key} type={field.type} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  style={{ width: "100%", padding: "14px 16px", background: "rgba(245,240,232,0.04)", border: "1px solid rgba(184,148,95,0.15)", color: IVORY, fontFamily: font.sans, fontSize: "14px", fontWeight: 300, outline: "none", boxSizing: "border-box", transition: `border-color 0.3s ${EASE}, box-shadow 0.3s ${EASE}` }}
                  onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = "0 0 0 1px rgba(184,148,95,0.2)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(184,148,95,0.15)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", display: "block", marginBottom: "8px" }}>Message</label>
              <textarea id="message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: "100%", padding: "14px 16px", background: "rgba(245,240,232,0.04)", border: "1px solid rgba(184,148,95,0.15)", color: IVORY, fontFamily: font.sans, fontSize: "14px", fontWeight: 300, outline: "none", resize: "vertical", boxSizing: "border-box", transition: `border-color 0.3s ${EASE}, box-shadow 0.3s ${EASE}` }}
                onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = "0 0 0 1px rgba(184,148,95,0.2)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(184,148,95,0.15)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <button onClick={handleSubmit} disabled={sending}
              style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: sending ? "rgba(184,148,95,0.5)" : GOLD, background: "transparent", border: "1px solid rgba(184,148,95,0.4)", padding: "16px 36px", cursor: sending ? "default" : "pointer", alignSelf: "center", transition: `background 0.3s ${EASE}, border-color 0.3s ${EASE}, color 0.3s ${EASE}` }}
              onMouseEnter={(e) => { if (!sending) { e.target.style.background = "rgba(184,148,95,0.15)"; e.target.style.borderColor = GOLD; e.target.style.color = IVORY; } }}
              onMouseLeave={(e) => { if (!sending) { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(184,148,95,0.4)"; e.target.style.color = GOLD; } }}>
              {sending ? "Sending..." : "Send Inquiry"}
            </button>
            {error && (
              <div role="alert" style={{ fontFamily: font.sans, fontSize: "12px", fontWeight: 300, color: "#c97a5a", textAlign: "center", alignSelf: "center" }}>{error}</div>
            )}
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
