import { useState, useEffect, useRef } from "react";
import umarPhoto from "./assets/umar.jpg";

const ON_ACCENT = "#0A1929"; // text color used on top of the gold accent, fixed across themes
const CONTAINER = "1180px";

const DARK = {
  NAVY: "#0A1929",
  NAVY_LIGHT: "#122943",
  NAVY_CARD: "#152E4B",
  GOLD: "#D4A73A",
  GOLD_SOFT: "#B8934A",
  INK: "#EDE8DC",
  SLATE: "#8D9AAE",
  LINE: "#25405E",
};

const LIGHT = {
  NAVY: "#F7F5F0",
  NAVY_LIGHT: "#FFFFFF",
  NAVY_CARD: "#FFFFFF",
  GOLD: "#C08A1E",
  GOLD_SOFT: "#A6771A",
  INK: "#1B2430",
  SLATE: "#5B6472",
  LINE: "#E1DCD0",
};

const skills = [
  { group: "Languages", items: ["JavaScript", "PHP", "SQL", "HTML5", "CSS3"] },
  { group: "Frontend", items: ["React", "Responsive Design", "Vanilla JS"] },
  { group: "Backend", items: ["PHP (PDO)", "MySQL", "Session Auth"] },
  { group: "Tools", items: ["Git & GitHub", "XAMPP", "ngrok", "VS Code"] },
];

const projects = [
  {
    name: "BlueWave Hotel Management System",
    role: "Primary SIWES project",
    desc: "An admin web app for running a hotel — room management, bookings, guest complaints, and staff accounts, built on PHP, MySQL and PDO.",
    tags: ["PHP", "MySQL", "PDO", "XAMPP"],
    url: "https://github.com/Umarcomrd/online-hotel-management-system-",
  },
  {
    name: "QuizWave",
    role: "Personal project",
    desc: "A timed quiz app with score tracking and category selection, built with plain HTML, CSS and JavaScript and deployed on Vercel.",
    tags: ["HTML", "CSS", "JavaScript", "Vercel"],
    url: "https://github.com/Umarcomrd/QuizWave",
  },
  {
    name: "Vegetable Joint App",
    role: "In progress, with a friend",
    desc: "A fresh-start React frontend for a produce ordering concept — currently in the research and planning phase before the build begins.",
    tags: ["React", "In progress"],
    url: null,
  },
];

const roadmap = [
  { month: "Month 1–2", title: "Foundations", desc: "Core web fundamentals and first working full-stack pieces of BlueWave." },
  { month: "Month 3–4", title: "Backend depth", desc: "PHP, MySQL and authentication flows; admin panel built out end to end." },
  { month: "Month 5", title: "Frontend frameworks", desc: "Bringing React into the toolkit, starting the Vegetable Joint app." },
  { month: "Month 6", title: "Full-stack delivery", desc: "Polishing, deploying, and presenting a complete body of SIWES work." },
];

const recentLearnings = [
  {
    tag: "Month 1",
    title: "HTML & CSS foundations",
    desc: "Structured pages with semantic elements and practiced the box model, Flexbox, and responsive layouts.",
  },
  {
    tag: "Month 2",
    title: "JavaScript fundamentals",
    desc: "Worked through objects, template literals, floating-point precision, and async behavior with setTimeout and setInterval.",
  },
  {
    tag: "Ongoing",
    title: "BlueWave admin panel",
    desc: "Building out booking, guest, and staff management screens on PHP, MySQL and PDO.",
  },
];



function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          } else {
            e.target.style.opacity = "0";
            e.target.style.transform = "translateY(16px)";
          }
        });
      },
      { threshold: 0.10 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}


function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setProgress(scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function Container({ children, style }) {
  return (
    <div className="px-6 md:px-12 lg:px-16" style={{ maxWidth: CONTAINER, margin: "0 auto", ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ n, gold, ink, line, children }) {
  return (
    <div className="flex items-baseline gap-3 mb-10">
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: gold, fontSize: "13px" }}>
        {n}
      </span>
      <span style={{ height: "1px", width: "40px", background: line }} />
      <h2 style={{ fontFamily: "'Fraunces', serif", color: ink, fontSize: "28px", fontWeight: 500 }}>
        {children}
      </h2>
    </div>
  );
}

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.15c-3.16.69-3.83-1.35-3.83-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.51-1.5 7.77-5.76 7.77-10.78C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

function MailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  );
}

function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function SunIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

function MoonIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5a8.5 8.5 0 1 0 11.2 11.2Z" />
    </svg>
  );
}

export default function Portfolio() {
  useReveal();
  const scrollProgress = useScrollProgress();
  const [navOpen, setNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const mobileNavRef = useRef(null);
  const { NAVY, NAVY_LIGHT, NAVY_CARD, GOLD, GOLD_SOFT, INK, SLATE, LINE } = isDark ? DARK : LIGHT;
  const navItems = ["About", "Skills", "Projects", "Learnings", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  // Close the mobile nav when tapping outside of it.
  useEffect(() => {
    if (!navOpen) return;
    const onClickOutside = (e) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [navOpen]);

  const handleContactSubmit = () => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${contactForm.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${contactForm.message}\n\n— ${contactForm.name}${contactForm.email ? ` (${contactForm.email})` : ""}`
    );
    window.location.href = `mailto:ug23sccs1044@gsu.edu.ng?subject=${subject}&body=${body}`;
  };

  const isContactFormValid = contactForm.name.trim() && contactForm.email.trim() && contactForm.message.trim();

  const ThemeToggle = ({ style }) => (
    <button
      onClick={() => setIsDark(!isDark)}
      className="icon-btn"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        border: `1px solid ${LINE}`,
        color: SLATE,
        background: "transparent",
        cursor: "pointer",
        ...style,
      }}
    >
      {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </button>
  );

  return (
    <div style={{ background: NAVY, minHeight: "100vh", color: INK, transition: "background 0.3s ease, color 0.3s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; }
        section[id] { scroll-margin-top: 84px; }
        [data-reveal] { opacity: 0; transform: translateY(16px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .navlink { position: relative; cursor: pointer; }
        .navlink::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background: ${GOLD}; transition: width 0.25s ease; }
        .navlink:hover::after { width: 100%; }
        .proj-card { transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease; text-decoration: none; }
        .proj-card.is-linked { cursor: pointer; }
        .proj-card:hover { border-color: ${GOLD_SOFT}; transform: translateY(-3px); box-shadow: 0 16px 32px rgba(0,0,0,0.18); }
        .proj-arrow { display: inline-flex; color: ${SLATE}; transition: transform 0.25s ease, color 0.25s ease; }
        .proj-card:hover .proj-arrow { transform: translate(2px, -2px); color: ${GOLD}; }
        .chip { font-family: 'JetBrains Mono', monospace; background: rgba(128,128,128,0.08); transition: background 0.2s ease, border-color 0.2s ease; }
        .chip:hover { background: rgba(212,167,58,0.12); border-color: ${GOLD_SOFT}; }
        .skill-card { transition: border-color 0.25s ease, transform 0.25s ease, background 0.3s ease; }
        .skill-card:hover { border-color: ${GOLD_SOFT}; transform: translateY(-2px); }
        .roadmap-card { transition: border-color 0.25s ease, transform 0.25s ease; }
        .roadmap-card:hover { border-color: ${GOLD_SOFT}; transform: translateY(-2px); }
        .learn-card { transition: border-color 0.25s ease, transform 0.25s ease; }
        .learn-card:hover { border-color: ${GOLD_SOFT}; transform: translateY(-2px); }
        .btn-primary { transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(212,167,58,0.28); filter: brightness(1.05); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .btn-secondary { transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; }
        .btn-secondary:hover { border-color: ${GOLD_SOFT}; color: ${GOLD}; background: rgba(212,167,58,0.06); }
        .icon-btn { transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease; }
        .icon-btn:hover { border-color: ${GOLD_SOFT}; color: ${GOLD}; background: rgba(212,167,58,0.08); transform: translateY(-2px); }
        .contact-row { transition: background 0.2s ease, border-color 0.2s ease, padding-left 0.2s ease; }
        .contact-row:hover { background: rgba(212,167,58,0.06); border-color: ${GOLD_SOFT}; padding-left: 18px; }
        .field { transition: border-color 0.2s ease, background 0.2s ease; }
        .field:focus { border-color: ${GOLD_SOFT}; outline: none; }
        .tag { font-family: 'JetBrains Mono', monospace; }
        .skip-link { position: absolute; left: 12px; top: -60px; z-index: 100; background: ${GOLD}; color: ${ON_ACCENT}; padding: 10px 16px; border-radius: 2px; font-size: 13px; text-decoration: none; transition: top 0.2s ease; }
        .skip-link:focus { top: 12px; }
        ::selection { background: ${GOLD}; color: ${ON_ACCENT}; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
      `}</style>

      <a href="#main" className="skip-link">Skip to content</a>

      {/* Scroll progress */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: 0, height: "2px", width: `${scrollProgress}%`, background: GOLD, zIndex: 60, transition: "width 0.1s linear" }}
      />

      {/* Nav */}
      <header
        className="sticky top-0 z-50"
        style={{ background: isDark ? "rgba(10,25,41,0.92)" : "rgba(247,245,240,0.92)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${LINE}`, transition: "background 0.3s ease, border-color 0.3s ease" }}
      >
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", paddingBottom: "16px" }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: INK }}>
            Umar Abubakar
          </span>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <span
                key={item}
                className="navlink"
                style={{ fontSize: "14px", color: SLATE }}
                onClick={() => scrollTo(item.toLowerCase())}
              >
                {item}
              </span>
            ))}
            <ThemeToggle />
            <a
              href="https://github.com/Umarcomrd"
              target="_blank"
              rel="noreferrer"
              className="icon-btn"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", border: `1px solid ${LINE}`, color: SLATE }}
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-secondary"
              style={{ background: "transparent", color: INK, padding: "9px 18px", fontSize: "13px", border: `1px solid ${LINE}`, borderRadius: "2px", cursor: "pointer" }}
            >
              Let's talk
            </button>
          </nav>
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              style={{ color: INK, background: "none", border: "none", fontSize: "20px" }}
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle menu"
            >
              {navOpen ? "✕" : "☰"}
            </button>
          </div>
        </Container>
      </header>
      {navOpen && (
        <div ref={mobileNavRef} className="md:hidden flex flex-col px-6 py-4 gap-4" style={{ background: NAVY_LIGHT, borderBottom: `1px solid ${LINE}` }}>
          {navItems.map((item) => (
            <span key={item} style={{ color: SLATE, fontSize: "15px", cursor: "pointer" }} onClick={() => scrollTo(item.toLowerCase())}>
              {item}
            </span>
          ))}
          <a href="https://github.com/Umarcomrd" target="_blank" rel="noreferrer" style={{ color: SLATE, fontSize: "15px" }}>
            GitHub
          </a>
        </div>
      )}

      <main id="main">
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden" }} className="pt-16 md:pt-20 pb-16">
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${LINE} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            opacity: isDark ? 0.3 : 0.55,
            maskImage: "radial-gradient(ellipse 55% 55% at 15% 30%, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 55% 55% at 15% 30%, black 40%, transparent 80%)",
          }}
        />
        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-14">
            <div style={{ maxWidth: "560px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", color: GOLD, fontSize: "13px", marginBottom: "18px" }}>
                Full-stack developer
              </p>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(38px, 5vw, 58px)", lineHeight: 1.1, fontWeight: 500, color: INK }}>
                Building a full-stack
                <br />
                foundation, one project
                
                <br />
                at a time.
              </h1>
              <p style={{ color: SLATE, fontSize: "17px", maxWidth: "460px", marginTop: "24px", lineHeight: 1.6 }}>
                I'm Umar — I build admin systems, tools and small apps with PHP, MySQL and
                React, currently deep in a six-month placement at GOSIDEC.
              </p>
              <div className="flex gap-4 mt-10 flex-wrap items-center">
                <button
                  onClick={() => scrollTo("projects")}
                  className="btn-primary"
                  style={{ background: GOLD, color: ON_ACCENT, padding: "12px 24px", fontSize: "14px", fontWeight: 600, border: "none", borderRadius: "2px", cursor: "pointer" }}
                >
                  View projects
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="btn-secondary"
                  style={{ background: "transparent", color: INK, padding: "12px 24px", fontSize: "14px", border: `1px solid ${LINE}`, borderRadius: "2px", cursor: "pointer" }}
                >
                  Get in touch
                </button>
                <a
                  href="https://github.com/Umarcomrd"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-btn"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "50%", border: `1px solid ${LINE}`, color: SLATE }}
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-16" style={{ maxWidth: "420px" }}>
                {[
                  { n: "6", label: "Months in training" },
                  { n: String(projects.length), label: "Projects built" },
                  { n: "2", label: "Core stacks" },
                ].map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: "34px", color: INK, fontWeight: 500 }}>
                      {s.n}+
                    </p>
                    <p style={{ color: SLATE, fontSize: "13px", marginTop: "4px", lineHeight: 1.4 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Circular portrait */}
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: "clamp(220px, 24vw, 340px)",
                  height: "clamp(220px, 24vw, 340px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `3px solid ${GOLD}`,
                  boxShadow: isDark
                    ? `0 0 0 10px rgba(212,167,58,0.07), 0 25px 60px rgba(0,0,0,0.45)`
                    : `0 0 0 10px rgba(192,138,30,0.08), 0 20px 50px rgba(0,0,0,0.12)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: NAVY_CARD,
                }}
              >
                {imgError ? (
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(48px, 6vw, 72px)", color: GOLD }}>
                    UA
                  </span>
                ) : (
                  <img
                    src={umarPhoto}
                    alt="Umar Abubakar"
                    onError={() => setImgError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <section id="about" className="py-20" data-reveal>
        <Container>
          <SectionLabel n="01" gold={GOLD} ink={INK} line={LINE}>About</SectionLabel>
          <div className="grid md:grid-cols-5 gap-10">
            <p style={{ color: SLATE, fontSize: "16px", lineHeight: 1.75, gridColumn: "span 3" }}>
              I'm working toward becoming a full-stack developer, guided by a structured
              six-month roadmap through my SIWES placement. My work so far has moved from
              PHP and MySQL fundamentals into React — building admin systems, small tools,
              and side projects along the way, and documenting the process as I go.
            </p>
            <div
              style={{ gridColumn: "span 2", background: NAVY_CARD, border: `1px solid ${LINE}`, padding: "22px", borderRadius: "3px" }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: "12px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: GOLD, display: "inline-block" }} />
                <p className="tag" style={{ color: GOLD, fontSize: "12px" }}>
                  CURRENT STATUS
                </p>
              </div>
              <p style={{ color: INK, fontSize: "14px", lineHeight: 1.7 }}>
                SIWES placement — GOSIDEC
                <br />
                Gombe State, Nigeria
                <br />
                Working toward: full-stack proficiency
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20" data-reveal>
        <Container>
          <SectionLabel n="02" gold={GOLD} ink={INK} line={LINE}>Skills</SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((s) => (
              <div
                key={s.group}
                className="skill-card"
                style={{ border: `1px solid ${LINE}`, borderRadius: "3px", padding: "20px" }}
              >
                <p className="tag" style={{ color: GOLD_SOFT, fontSize: "12px", marginBottom: "14px" }}>
                  {s.group.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="chip"
                      style={{ border: `1px solid ${LINE}`, color: INK, fontSize: "13px", padding: "6px 12px", borderRadius: "2px" }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20" data-reveal>
        <Container>
          <SectionLabel n="03" gold={GOLD} ink={INK} line={LINE}>Projects</SectionLabel>
          <div className="grid lg:grid-cols-3 gap-6">
            {projects.map((p, i) => {
              const CardTag = p.url ? "a" : "div";
              const cardProps = p.url
                ? { href: p.url, target: "_blank", rel: "noreferrer" }
                : {};
              return (
                <CardTag
                  key={p.name}
                  {...cardProps}
                  className={`proj-card flex flex-col${p.url ? " is-linked" : ""}`}
                  style={{ border: `1px solid ${LINE}`, borderRadius: "3px", padding: "24px", background: NAVY_LIGHT, color: "inherit" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag" style={{ color: LINE, fontSize: "13px" }}>{String(i + 1).padStart(2, "0")}</span>
                    {p.url ? (
                      <span className="proj-arrow"><ArrowIcon /></span>
                    ) : (
                      <span className="tag" style={{ color: LINE, fontSize: "11px" }}>SOON</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "19px", color: INK, marginBottom: "6px" }}>{p.name}</h3>
                  <span className="tag" style={{ color: GOLD, fontSize: "12px", marginBottom: "12px" }}>{p.role}</span>
                  <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.65, marginBottom: "16px", flexGrow: 1 }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="chip" style={{ fontSize: "11px", color: SLATE, border: `1px solid ${LINE}`, padding: "3px 9px", borderRadius: "2px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </CardTag>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Journey / Roadmap */}
      <section id="journey" className="py-20" data-reveal>
        <Container>
          <SectionLabel n="04" gold={GOLD} ink={INK} line={LINE}>Journey</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-5">
            {roadmap.map((r, i) => (
              <div
                key={r.month}
                className="roadmap-card"
                style={{ border: `1px solid ${LINE}`, borderRadius: "3px", padding: "22px", background: NAVY_LIGHT, position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
                <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
                  <span
                    className="tag"
                    style={{ color: GOLD_SOFT, fontSize: "11px", border: `1px solid ${LINE}`, padding: "2px 9px", borderRadius: "2px" }}
                  >
                    {r.month}
                  </span>
                  <span className="tag" style={{ color: LINE, fontSize: "13px" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p style={{ color: INK, fontSize: "17px", fontWeight: 500, marginBottom: "6px" }}>{r.title}</p>
                <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Recent Learnings (logbook highlights) */}
      <section id="learnings" className="py-20" data-reveal>
        <Container>
          <SectionLabel n="05" gold={GOLD} ink={INK} line={LINE}>Recent learnings</SectionLabel>
          <div className="grid sm:grid-cols-3 gap-5">
            {recentLearnings.map((l) => (
              <div
                key={l.title}
                className="learn-card"
                style={{ border: `1px solid ${LINE}`, borderRadius: "3px", padding: "22px", background: NAVY_LIGHT }}
              >
                <span
                  className="tag"
                  style={{ color: GOLD_SOFT, fontSize: "11px", border: `1px solid ${LINE}`, padding: "2px 9px", borderRadius: "2px", display: "inline-block", marginBottom: "12px" }}
                >
                  {l.tag}
                </span>
                <p style={{ color: INK, fontSize: "16px", fontWeight: 500, marginBottom: "6px" }}>{l.title}</p>
                <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.6 }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24" data-reveal>
        <Container>
          <SectionLabel n="06" gold={GOLD} ink={INK} line={LINE}>Contact</SectionLabel>
          <div className="grid md:grid-cols-5 gap-10">
            <div style={{ gridColumn: "span 3" }}>
              <div className="flex items-center gap-2" style={{ marginBottom: "22px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#5FBF77", display: "inline-block" }} />
                <p className="tag" style={{ color: SLATE, fontSize: "12px" }}>Open to opportunities and collaboration</p>
              </div>

              <div className="flex flex-col gap-3" style={{ marginBottom: "22px" }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="field"
                  style={{ background: "transparent", border: `1px solid ${LINE}`, borderRadius: "3px", padding: "12px 14px", color: INK, fontSize: "14px" }}
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="field"
                  style={{ background: "transparent", border: `1px solid ${LINE}`, borderRadius: "3px", padding: "12px 14px", color: INK, fontSize: "14px" }}
                />
                <textarea
                  placeholder="What would you like to say?"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="field"
                  style={{ background: "transparent", border: `1px solid ${LINE}`, borderRadius: "3px", padding: "12px 14px", color: INK, fontSize: "14px", resize: "vertical" }}
                />
                <button
                  onClick={handleContactSubmit}
                  disabled={!isContactFormValid}
                  className="btn-primary"
                  style={{ background: GOLD, color: ON_ACCENT, padding: "12px 24px", fontSize: "14px", fontWeight: 600, border: "none", borderRadius: "2px", cursor: "pointer", alignSelf: "flex-start" }}
                >
                  Send message
                </button>
                <p style={{ color: SLATE, fontSize: "12px" }}>Opens your email client with the message pre-filled.</p>
              </div>

              <div className="flex flex-col gap-2" style={{ fontSize: "15px" }}>
                <a
                  href="mailto:ug23sccs1044@gsu.edu.ng"
                  className="contact-row flex items-center gap-3"
                  style={{ color: INK, textDecoration: "none", border: `1px solid ${LINE}`, borderRadius: "3px", padding: "14px 16px" }}
                >
                  <MailIcon size={17} />
                  ug23sccs1044@gsu.edu.ng
                </a>
                <a
                  href="https://github.com/Umarcomrd"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-row flex items-center gap-3"
                  style={{ color: INK, textDecoration: "none", border: `1px solid ${LINE}`, borderRadius: "3px", padding: "14px 16px" }}
                >
                  <GithubIcon size={17} />
                  github.com/Umarcomrd
                </a>
              </div>
            </div>
            <div
              style={{ gridColumn: "span 2", background: NAVY_CARD, border: `1px solid ${LINE}`, padding: "22px", borderRadius: "3px", height: "fit-content" }}
            >
              <p className="tag" style={{ color: GOLD, fontSize: "12px", marginBottom: "12px" }}>
                QUICK FACTS
              </p>
              <p style={{ color: INK, fontSize: "14px", lineHeight: 1.9 }}>
                Based in Gombe State, Nigeria
                <br />
                Usually replies within a day
                <br />
                Open to remote opportunities
              </p>
            </div>
          </div>
        </Container>
      </section>
      </main>

      <footer className="py-8" style={{ borderTop: `1px solid ${LINE}` }}>
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ color: SLATE, fontSize: "12px" }}>© 2026 Umar Abubakar. Built with React.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Umarcomrd" target="_blank" rel="noreferrer" style={{ color: SLATE }} className="icon-btn" aria-label="GitHub">
              <GithubIcon size={16} />
            </a>
            <a href="mailto:ug23sccs1044@gsu.edu.ng" style={{ color: SLATE }} className="icon-btn" aria-label="Email">
              <MailIcon size={16} />
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}