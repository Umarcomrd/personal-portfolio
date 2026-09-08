import { useState, useEffect } from "react";
import umarPhoto from "./umar.jpg";

const NAVY = "#0A1929";
const NAVY_LIGHT = "#122943";
const NAVY_CARD = "#152E4B";
const GOLD = "#D4A73A";
const GOLD_SOFT = "#B8934A";
const INK = "#EDE8DC";
const SLATE = "#8D9AAE";
const LINE = "#25405E";

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
  },
  {
    name: "QuizWave",
    role: "Personal project",
    desc: "A timed quiz app with score tracking and category selection, built with plain HTML, CSS and JavaScript and deployed on Vercel.",
    tags: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
  {
    name: "Vegetable Joint App",
    role: "In progress, with a friend",
    desc: "A fresh-start React frontend for a produce ordering concept — currently in the research and planning phase before the build begins.",
    tags: ["React", "In progress"],
  },
];

const roadmap = [
  { month: "Month 1–2", title: "Foundations", desc: "Core web fundamentals and first working full-stack pieces of BlueWave." },
  { month: "Month 3–4", title: "Backend depth", desc: "PHP, MySQL and authentication flows; admin panel built out end to end." },
  { month: "Month 5", title: "Frontend frameworks", desc: "Bringing React into the toolkit, starting the Vegetable Joint app." },
  { month: "Month 6", title: "Full-stack delivery", desc: "Polishing, deploying, and presenting a complete body of SIWES work." },
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
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function SectionLabel({ n, children }) {
  return (
    <div className="flex items-baseline gap-3 mb-8">
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: GOLD, fontSize: "13px" }}>
        {n}
      </span>
      <span style={{ height: "1px", width: "40px", background: LINE }} />
      <h2 style={{ fontFamily: "'Fraunces', serif", color: INK, fontSize: "28px", fontWeight: 500 }}>
        {children}
      </h2>
    </div>
  );
}

export default function Portfolio() {
  useReveal();
  const [navOpen, setNavOpen] = useState(false);
  const navItems = ["About", "Skills", "Projects", "Journey", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div style={{ background: NAVY, minHeight: "100vh", color: INK }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; }
        [data-reveal] { opacity: 0; transform: translateY(16px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .navlink { position: relative; cursor: pointer; }
        .navlink::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background: ${GOLD}; transition: width 0.25s ease; }
        .navlink:hover::after { width: 100%; }
        .proj-card { transition: border-color 0.25s ease, transform 0.25s ease; }
        .proj-card:hover { border-color: ${GOLD_SOFT}; transform: translateY(-2px); }
        .tag { font-family: 'JetBrains Mono', monospace; }
        ::selection { background: ${GOLD}; color: ${NAVY}; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
      `}</style>

      {/* Nav */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(10,25,41,0.92)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${LINE}` }}
      >
        <span style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: INK }}>
          Umar Abubakar
        </span>
        <nav className="hidden md:flex gap-8">
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
        </nav>
        <button
          className="md:hidden"
          style={{ color: INK, background: "none", border: "none", fontSize: "20px" }}
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle menu"
        >
          {navOpen ? "✕" : "☰"}
        </button>
      </header>
      {navOpen && (
        <div className="md:hidden flex flex-col px-6 py-4 gap-4" style={{ background: NAVY_LIGHT, borderBottom: `1px solid ${LINE}` }}>
          {navItems.map((item) => (
            <span key={item} style={{ color: SLATE, fontSize: "15px" }} onClick={() => scrollTo(item.toLowerCase())}>
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden" }} className="pt-20 md:pt-28 pb-16">
        <div className="px-6 md:pl-12" style={{ maxWidth: "620px", position: "relative", zIndex: 2 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: GOLD, fontSize: "13px", marginBottom: "18px" }}>
            Full-stack developer
          </p>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.08, fontWeight: 500, color: INK }}>
            Building a full-stack
            <br />
            foundation, one project
            <br />
            at a time.
          </h1>
          <p style={{ color: SLATE, fontSize: "17px", maxWidth: "440px", marginTop: "24px", lineHeight: 1.6 }}>
            I'm Umar — I build admin systems, tools and small apps with PHP, MySQL and
            React, currently deep in a six-month placement at GOSIDEC.
          </p>
          <div className="flex gap-4 mt-10 flex-wrap">
            <button
              onClick={() => scrollTo("projects")}
              style={{ background: GOLD, color: NAVY, padding: "12px 24px", fontSize: "14px", fontWeight: 600, border: "none", borderRadius: "2px", cursor: "pointer" }}
            >
              View projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{ background: "transparent", color: INK, padding: "12px 24px", fontSize: "14px", border: `1px solid ${LINE}`, borderRadius: "2px", cursor: "pointer" }}
            >
              Get in touch
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-16" style={{ maxWidth: "420px" }}>
            {[
              { n: "6", label: "Months in training" },
              { n: "3", label: "Projects built" },
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

        {/* Photo — full-bleed to the right edge on desktop. Swap the src for wherever the image lives in your project. */}
        <div
          className="hidden md:block"
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "40%", zIndex: 1 }}
        >
          <img
            src={umarPhoto}
            alt="Umar Abubakar"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg, ${NAVY} 0%, transparent 22%)`,
            }}
          />
        </div>

        {/* Photo — contained version for mobile */}
        <div className="md:hidden px-6 mt-10" style={{ maxWidth: "320px" }}>
          <div style={{ aspectRatio: "4 / 5", borderRadius: "4px", overflow: "hidden", border: `1px solid ${LINE}` }}>
            <img
              src={umarPhoto}
              alt="Umar Abubakar"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 md:px-12 py-20 max-w-4xl" data-reveal>
        <SectionLabel n="01">About</SectionLabel>
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
            <p className="tag" style={{ color: GOLD, fontSize: "12px", marginBottom: "10px" }}>
              CURRENT STATUS
            </p>
            <p style={{ color: INK, fontSize: "14px", lineHeight: 1.7 }}>
              SIWES placement — GOSIDEC
              <br />
              Gombe State, Nigeria
              <br />
              Working toward: full-stack proficiency
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-6 md:px-12 py-20 max-w-4xl" data-reveal>
        <SectionLabel n="02">Skills</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-8">
          {skills.map((s) => (
            <div key={s.group}>
              <p className="tag" style={{ color: GOLD_SOFT, fontSize: "12px", marginBottom: "12px" }}>
                {s.group.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="tag"
                    style={{ border: `1px solid ${LINE}`, color: INK, fontSize: "13px", padding: "6px 12px", borderRadius: "2px" }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 md:px-12 py-20 max-w-4xl" data-reveal>
        <SectionLabel n="03">Projects</SectionLabel>
        <div className="flex flex-col gap-5">
          {projects.map((p) => (
            <div
              key={p.name}
              className="proj-card"
              style={{ border: `1px solid ${LINE}`, borderRadius: "3px", padding: "26px" }}
            >
              <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "21px", color: INK }}>{p.name}</h3>
                <span className="tag" style={{ color: GOLD, fontSize: "12px" }}>{p.role}</span>
              </div>
              <p style={{ color: SLATE, fontSize: "15px", lineHeight: 1.65, marginBottom: "14px" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="tag" style={{ fontSize: "11px", color: SLATE, border: `1px solid ${LINE}`, padding: "3px 9px", borderRadius: "2px" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey / Roadmap */}
      <section id="journey" className="px-6 md:px-12 py-20 max-w-4xl" data-reveal>
        <SectionLabel n="04">Journey</SectionLabel>
        <div className="flex flex-col">
          {roadmap.map((r, i) => (
            <div key={r.month} className="flex gap-6" style={{ paddingBottom: i === roadmap.length - 1 ? 0 : "28px" }}>
              <div className="flex flex-col items-center">
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
                {i !== roadmap.length - 1 && <span style={{ width: "1px", flex: 1, background: LINE, marginTop: "6px" }} />}
              </div>
              <div style={{ paddingBottom: "6px" }}>
                <p className="tag" style={{ color: GOLD_SOFT, fontSize: "12px", marginBottom: "4px" }}>{r.month}</p>
                <p style={{ color: INK, fontSize: "16px", fontWeight: 500, marginBottom: "4px" }}>{r.title}</p>
                <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.6, maxWidth: "480px" }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-12 py-24 max-w-4xl" data-reveal>
        <SectionLabel n="05">Contact</SectionLabel>
        <p style={{ color: SLATE, fontSize: "16px", lineHeight: 1.7, maxWidth: "480px", marginBottom: "26px" }}>
          Open to conversations about opportunities, collaboration, or feedback on
          anything I've built. The best way to reach me is by email.
        </p>
        <div className="flex flex-col gap-3" style={{ fontSize: "15px" }}>
          <a href="mailto:ug23sccs1044@gsu.edu.ng" style={{ color: INK, textDecoration: "none", borderBottom: `1px solid ${LINE}`, paddingBottom: "10px", width: "fit-content" }}>
            ug23sccs1044@gsu.edu.ng
          </a>
          <a href="https://github.com/Umarcomrd" target="_blank" rel="noreferrer" style={{ color: INK, textDecoration: "none", borderBottom: `1px solid ${LINE}`, paddingBottom: "10px", width: "fit-content" }}>
            github.com/Umarcomrd
          </a>
        </div>
      </section>

      <footer className="px-6 md:px-12 py-8" style={{ borderTop: `1px solid ${LINE}` }}>
        <p style={{ color: SLATE, fontSize: "12px" }}>© 2026 Umar Abubakar. Built with React.</p>
      </footer>
    </div>
  );
}
