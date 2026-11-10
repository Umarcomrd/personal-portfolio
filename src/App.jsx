/**
 * ============================================================================
 * UMAR ABUBAKAR - PERSONAL PORTFOLIO APPLICATION
 * ============================================================================
 * Sleek Modern Dark Tech personal portfolio built with React 19 and Tailwind CSS.
 * 
 * Features:
 * - Authentic, official brand SVG logos for all listed technologies & skills.
 * - Glassmorphic UI cards with subtle brand-colored ambient glows on hover.
 * - Interactive Hero with live "Available for opportunities" pulsing status pill.
 * - Ambient radial aura behind the circular portrait with floating tech badges.
 * - Modern connected SIWES Roadmap timeline with active phase tracking (Month 3–4).
 * - Projects showcase with glowing hover borders, "Featured SIWES" badge & dual links.
 * - Quick click-to-copy phone and email badges with instant feedback toast.
 * - Direct contact form with dual Web3Forms API background dispatch & mailto fallback.
 * - Dynamic Dark / Light theme toggle preserving high contrast and brand gold tokens.
 */

import { useState, useEffect, useRef } from "react";
import umarPhoto from "./assets/umar.jpg";

// Authentic Brand Icons
import {
  SiJavascript,
  SiReact,
  SiPhp,
  SiMysql,
  SiHtml5,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiXampp,
  SiNgrok
} from "react-icons/si";

import {
  FaCss3Alt,
  FaDatabase,
  FaCheck,
  FaCopy,
  FaArrowRight,
  FaDownload,
  FaWhatsapp,
  FaLinkedinIn,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaArrowUpRightFromSquare
} from "react-icons/fa6";

import {
  TbBrandVscode,
  TbSql,
  TbDevices,
  TbShieldLock,
  TbSparkles
} from "react-icons/tb";

// ============================================================================
// DESIGN SYSTEM TOKENS & CONSTANTS
// ============================================================================

/** Standard max-width container boundary for main content layout */
const CONTAINER = "1180px";

/** Dark mode color theme palette */
const DARK = {
  NAVY: "#0A1929",       // Main background
  NAVY_LIGHT: "#122943", // Card / component background
  NAVY_CARD: "#152E4B",  // Highlight panel background
  GOLD: "#D4A73A",       // Primary accent gold
  GOLD_SOFT: "#B8934A",  // Secondary muted gold
  INK: "#EDE8DC",        // Primary text color (light cream)
  SLATE: "#8D9AAE",      // Muted body text / subheadings
  LINE: "#25405E",       // Borders and dividers
};

/** Light mode color theme palette */
const LIGHT = {
  NAVY: "#F7F5F0",       // Main background (warm white)
  NAVY_LIGHT: "#FFFFFF", // Card / component background
  NAVY_CARD: "#FFFFFF",  // Highlight panel background
  GOLD: "#C08A1E",       // Primary accent gold
  GOLD_SOFT: "#A6771A",  // Secondary muted gold
  INK: "#1B2430",        // Primary text color (dark charcoal)
  SLATE: "#5B6472",      // Muted body text / subheadings
  LINE: "#E1DCD0",       // Borders and dividers
};

// ============================================================================
// PROFILE & CONTACT DATA CONFIGURATION
// ============================================================================

/** Personal contact information and social profile links */
const USER_INFO = {
  name: "Umar Abubakar",
  role: "Full-Stack Developer",
  status: "Available for opportunities",
  email: "ug23sccs1044@gsu.edu.ng",
  phone: "+234 7072105145",
  rawPhone: "2347072105145",
  location: "Gombe State, Nigeria",
  cvUrl: "/Umar_Abubakar_CV.pdf",
  socials: {
    whatsapp: "https://api.whatsapp.com/send/?phone=%2B2347072105145&text=Hello+Umar%21+I+saw+your+portfolio+and+would+like+to+discuss+further.",
    linkedin: "https://www.linkedin.com/in/umar-babawuro-abubakar-a1597b435/",
    github: "https://github.com/Umarcomrd",
    twitter: "https://x.com/design30354",
  },
  web3formsKey: "YOUR_WEB3FORMS_KEY"
};

// ============================================================================
// AUTHENTIC SKILLS & TECHNOLOGY DATA
// ============================================================================

/** Core featured technologies with authentic official brand logos */
const featuredTech = [
  {
    name: "JavaScript",
    desc: "Core scripting, asynchronous logic, DOM manipulation & ES6+ modular code",
    color: "#F7DF1E",
    brandClass: "tech-js",
    logo: <SiJavascript size={44} color="#F7DF1E" />
  },
  {
    name: "React",
    desc: "Component-driven frontend architecture, hooks, state management & reactive UI",
    color: "#61DAFB",
    brandClass: "tech-react",
    logo: <SiReact size={44} color="#61DAFB" />
  },
  {
    name: "PHP",
    desc: "Server-side architecture, secure session authentication, and PDO data layers",
    color: "#777BB4",
    brandClass: "tech-php",
    logo: <SiPhp size={50} color="#777BB4" />
  },
  {
    name: "MySQL",
    desc: "Relational database schema modeling, indexing, foreign keys & complex SQL queries",
    color: "#00758F",
    brandClass: "tech-mysql",
    logo: <SiMysql size={50} color="#00758F" />
  }
];

/** Categorized list of technical skills with authentic brand icons */
const skillCategories = [
  {
    group: "Languages",
    items: [
      { name: "JavaScript", icon: <SiJavascript size={15} color="#F7DF1E" /> },
      { name: "PHP", icon: <SiPhp size={18} color="#777BB4" /> },
      { name: "SQL", icon: <TbSql size={16} color="#00758F" /> },
      { name: "HTML5", icon: <SiHtml5 size={16} color="#E34F26" /> },
      { name: "CSS3", icon: <FaCss3Alt size={16} color="#1572B6" /> }
    ]
  },
  {
    group: "Frontend",
    items: [
      { name: "React", icon: <SiReact size={16} color="#61DAFB" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={16} color="#06B6D4" /> },
      { name: "Responsive Design", icon: <TbDevices size={16} color="#D4A73A" /> },
      { name: "Vanilla JS", icon: <SiJavascript size={15} color="#F7DF1E" /> }
    ]
  },
  {
    group: "Backend & Database",
    items: [
      { name: "PHP (PDO)", icon: <SiPhp size={18} color="#777BB4" /> },
      { name: "MySQL", icon: <SiMysql size={18} color="#00758F" /> },
      { name: "Database Modeling", icon: <FaDatabase size={14} color="#8D9AAE" /> },
      { name: "Session Auth", icon: <TbShieldLock size={16} color="#D4A73A" /> }
    ]
  },
  {
    group: "Tools & Workflow",
    items: [
      { name: "Git", icon: <SiGit size={16} color="#F05032" /> },
      { name: "GitHub", icon: <SiGithub size={16} color="currentColor" /> },
      { name: "VS Code", icon: <TbBrandVscode size={16} color="#007ACC" /> },
      { name: "XAMPP", icon: <SiXampp size={16} color="#FB7A24" /> },
      { name: "ngrok", icon: <SiNgrok size={16} color="#1F1E37" /> }
    ]
  }
];

// ============================================================================
// PROJECTS, JOURNEY & LEARNING DATA
// ============================================================================

/** Featured portfolio projects */
const projects = [
  {
    name: "BlueWave Hotel Management System",
    role: "Primary SIWES Project",
    isFeatured: true,
    desc: "A full-stack hotel operations platform modernized with a modular React frontend and secure PHP/MySQL backend — features real-time room inventory, reactive booking workflows, guest complaint resolution, and role-based staff administration with prepared PDO statements.",
    tags: ["React", "PHP", "MySQL", "PDO", "REST API", "Session Auth"],
    githubUrl: "https://github.com/Umarcomrd/online-hotel-management-system-",
    liveUrl: null,
  },
  {
    name: "QuizWave",
    role: "Personal Project",
    isFeatured: false,
    desc: "An interactive timed JavaScript quiz app featuring in-browser Web Audio sound effects, keyboard shortcuts, confetti celebration, and responsive question navigation.",
    tags: ["HTML5", "CSS3", "JavaScript", "Web Audio API", "Vercel"],
    githubUrl: "https://github.com/Umarcomrd/quizwave",
    liveUrl: "https://umar-comrd-teal.vercel.app/",
  },
  {
    name: "Vegetable Joint App",
    role: "Collaborative Project",
    isFeatured: false,
    statusBadge: "Frontend Completed",
    desc: "A multi-seller B2B/B2C agricultural marketplace connecting Nigerian farmers directly with buyers and restaurants. Built with React 18, React Router, modular component architecture, multi-vendor cart splitting, payment & failure handling workflows, and automated Vitest testing suites.",
    tags: ["React 18", "React Router", "Vite", "Vitest", "Context API"],
    githubUrl: "https://github.com/Aminullah-01/vegetable-joint-App",
    liveUrl: null,
  },
];

/** 6-month placement roadmap with progress states */
const roadmap = [
  {
    month: "Month 1–2",
    title: "Foundations & Architecture",
    status: "completed",
    badge: "Completed",
    desc: "Mastered core web fundamentals, semantic markup, responsive CSS, and initiated the database architecture for BlueWave."
  },
  {
    month: "Month 3–4",
    title: "Frontend Frameworks & React",
    status: "completed",
    badge: "Completed",
    desc: "Mastered modern React, component architecture, state hooks, and client-side routing by completing the frontend for the Vegetable Joint marketplace app."
  },
  {
    month: "Month 5",
    title: "Backend Depth & Auth Systems",
    status: "completed",
    badge: "Completed",
    desc: "Deep dive into PHP PDO prepared statements, relational schema design, role-based authentication, and admin workflow completion."
  },
  {
    month: "Month 6",
    title: "Full-Stack Delivery & Polish",
    status: "active",
    badge: "Current Phase",
    desc: "Migrated BlueWave hotel frontend to modern React, unified full-stack integration with PHP PDO backend, performance optimization, and SIWES defense polish."
  },
];

/** Highlight entries from recent technical learning logbook */
const recentLearnings = [
  {
    tag: "Month 1–2",
    title: "Semantic HTML & Responsive Layouts",
    desc: "Engineered responsive grid structures, mastered CSS Flexbox alignment, and established accessible document hierarchy.",
  },
  {
    tag: "Month 3–4",
    title: "Frontend Architecture & React",
    desc: "Engineered modern React SPA architecture, custom hooks, dynamic multi-vendor cart state, and comprehensive Vitest test suites for Vegetable Joint.",
  },
  {
    tag: "Month 5–6 (Current)",
    title: "BlueWave React Migration & Full-Stack Auth",
    desc: "Migrated legacy frontend to modular React components, integrated reactive booking states with PHP PDO APIs, and hardened role-based session controls.",
  },
];

// ============================================================================
// CUSTOM HELPER HOOKS
// ============================================================================

/** Custom Hook: useReveal triggers scroll-reveal animation */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.10 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/** Custom Hook: useScrollProgress calculates page scroll percentage */
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

// ============================================================================
// REUSABLE LAYOUT & HEADER COMPONENTS
// ============================================================================

/** Layout Container enforcing horizontal padding and max container width */
function Container({ children, style, className = "" }) {
  return (
    <div className={`px-6 md:px-12 lg:px-16 ${className}`} style={{ maxWidth: CONTAINER, margin: "0 auto", ...style }}>
      {children}
    </div>
  );
}

/** Section Label Component */
function SectionLabel({ n, gold, ink, line, children }) {
  return (
    <div className="flex items-baseline gap-3 mb-10">
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: gold, fontSize: "13px", fontWeight: 600 }}>
        {n}
      </span>
      <span style={{ height: "1px", width: "40px", background: line }} />
      <h2 style={{ fontFamily: "'Fraunces', serif", color: ink, fontSize: "30px", fontWeight: 500 }}>
        {children}
      </h2>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function Portfolio() {
  useReveal();
  const scrollProgress = useScrollProgress();

  // Component States
  const [navOpen, setNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [copiedField, setCopiedField] = useState(null); // 'phone' | 'email' | null

  // Contact Form States
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const mobileNavRef = useRef(null);

  // Active theme palette tokens
  const { NAVY, NAVY_LIGHT, NAVY_CARD, GOLD, GOLD_SOFT, INK, SLATE, LINE } = isDark ? DARK : LIGHT;

  const navItems = ["Home", "About", "Skills", "Projects", "Journey", "Learnings", "Contact"];

  const scrollTo = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setNavOpen(false);
  };

  /** Copy text to clipboard with feedback badge */
  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField((curr) => (curr === fieldName ? null : curr));
    }, 2200);
  };

  /** Close mobile navigation drawer when clicking outside */
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

  /** Contact form submit handler with Web3Forms & mailto fallback */
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const apiKey = USER_INFO.web3formsKey;
    const isRealKey = apiKey && apiKey !== "YOUR_WEB3FORMS_KEY" && apiKey.trim().length > 10;

    if (isRealKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: apiKey.trim(),
            name: contactForm.name,
            email: contactForm.email,
            subject: contactForm.subject || `New Portfolio Message from ${contactForm.name}`,
            message: contactForm.message,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setSubmitStatus("success");
          setContactForm({ name: "", email: "", subject: "", message: "" });
        } else {
          setSubmitStatus("error");
        }
      } catch {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const subject = encodeURIComponent(contactForm.subject || `Portfolio inquiry from ${contactForm.name}`);
      const body = encodeURIComponent(
        `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
      );
      window.location.href = `mailto:${USER_INFO.email}?subject=${subject}&body=${body}`;
      setSubmitStatus("success");
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }
  };

  const isContactFormValid = contactForm.name.trim() && contactForm.email.trim() && contactForm.message.trim();

  return (
    <div data-theme={isDark ? "dark" : "light"} style={{ background: NAVY, minHeight: "100vh", color: INK, transition: "background 0.3s ease, color 0.3s ease" }}>
      {/* Skip to Content */}
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Top Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${GOLD}, #FFF0C2)`,
          zIndex: 60,
          transition: "width 0.1s linear"
        }}
      />

      {/* Navigation Header */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: isDark ? "rgba(10, 25, 41, 0.85)" : "rgba(247, 245, 240, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${LINE}`,
          transition: "background 0.3s ease, border-color 0.3s ease"
        }}
      >
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", paddingBottom: "16px" }}>
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo("home")}>
            <span style={{ color: GOLD, fontWeight: 700, fontSize: "20px" }}>&lt;/&gt;</span>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: "21px", color: INK, fontWeight: 600 }}>
              {USER_INFO.name}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <span
                key={item}
                className="navlink font-medium"
                style={{ fontSize: "14px", color: SLATE }}
                onClick={() => scrollTo(item.toLowerCase())}
              >
                {item}
              </span>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="icon-btn"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* GitHub Quick Link */}
            <a
              href={USER_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              className="icon-btn"
              aria-label="GitHub Profile"
            >
              <SiGithub size={17} />
            </a>

            {/* Let's Talk CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary-gold"
              style={{ padding: "9px 20px", fontSize: "13px" }}
            >
              Let's talk
            </button>
          </nav>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="icon-btn"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              style={{ color: INK, background: "none", border: "none", fontSize: "22px", cursor: "pointer" }}
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle menu"
            >
              {navOpen ? "✕" : "☰"}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      {navOpen && (
        <div
          ref={mobileNavRef}
          className="md:hidden flex flex-col px-6 py-5 gap-4"
          style={{ background: NAVY_LIGHT, borderBottom: `1px solid ${LINE}` }}
        >
          {navItems.map((item) => (
            <span
              key={item}
              style={{ color: INK, fontSize: "16px", fontWeight: 500, cursor: "pointer" }}
              onClick={() => scrollTo(item.toLowerCase())}
            >
              {item}
            </span>
          ))}
          <div className="pt-3 border-t flex items-center gap-4" style={{ borderColor: LINE }}>
            <a href={USER_INFO.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm" style={{ color: SLATE }}>
              <SiGithub size={16} /> GitHub
            </a>
            <a href={USER_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm" style={{ color: SLATE }}>
              <FaLinkedinIn size={16} /> LinkedIn
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main id="main">

        {/* HERO SECTION */}
        <section id="home" style={{ position: "relative", overflow: "hidden" }} className="pt-16 md:pt-24 pb-20">
          {/* Subtle Modern Grid Background Pattern */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(${LINE} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              opacity: isDark ? 0.35 : 0.6,
              maskImage: "radial-gradient(ellipse 65% 65% at 50% 35%, black 30%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 35%, black 30%, transparent 85%)",
              pointerEvents: "none"
            }}
          />

          <Container style={{ position: "relative", zIndex: 2 }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-14 lg:gap-16">
              
              {/* Left Column: Headline & Action Buttons */}
              <div style={{ maxWidth: "600px" }}>
                
                {/* Status Pill Badge */}
                <div className="mb-5">
                  <div className="status-pill">
                    <span className="status-dot"></span>
                    <span>{USER_INFO.status}</span>
                  </div>
                </div>

                <p style={{ fontFamily: "'JetBrains Mono', monospace", color: GOLD, fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", marginBottom: "16px" }}>
                  {USER_INFO.role.toUpperCase()}
                </p>

                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(38px, 5vw, 56px)", lineHeight: 1.15, fontWeight: 500, color: INK }}>
                  Building a full-stack foundation,{" "}
                  <span className="gold-gradient-text font-semibold">one project at a time.</span>
                </h1>

                <p style={{ color: SLATE, fontSize: "17px", maxWidth: "500px", marginTop: "22px", lineHeight: 1.65 }}>
                  I'm Umar — I build reliable admin systems, responsive tools, and modern web applications with PHP, MySQL, and React, currently deep in a 6-month placement at GOSIDEC.
                </p>

                {/* Hero Action Button Group */}
                <div className="flex gap-4 mt-10 flex-wrap items-center">
                  <a
                    href={USER_INFO.cvUrl}
                    download="Umar_Abubakar_CV.pdf"
                    className="btn-glass-secondary"
                  >
                    <FaDownload size={14} style={{ color: GOLD }} />
                    <span>Download CV</span>
                  </a>

                  <a
                    href={USER_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp-modern"
                  >
                    <FaWhatsapp size={17} />
                    <span>WhatsApp Me</span>
                  </a>

                  <button
                    onClick={() => scrollTo("contact")}
                    className="btn-primary-gold"
                  >
                    <span>Get in touch</span>
                    <FaArrowRight size={13} />
                  </button>
                </div>

                {/* Key Metrics / Highlights Grid */}
                <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t" style={{ borderColor: LINE, maxWidth: "440px" }}>
                  {[
                    { n: "6+", label: "Months in training" },
                    { n: String(projects.length), label: "Projects built" },
                    { n: "2+", label: "Core stacks" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: INK, fontWeight: 600 }}>
                        {s.n}
                      </p>
                      <p style={{ color: SLATE, fontSize: "13px", marginTop: "2px", lineHeight: 1.4 }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Circular Portrait with Ambient Aura & Floating Tech Badges */}
              <div style={{ flexShrink: 0, position: "relative" }} className="avatar-glow">
                
                {/* Floating Tech Pill 1: React */}
                <div className="floating-tech-pill" style={{ top: "10%", right: "-10%" }}>
                  <SiReact size={16} color="#61DAFB" />
                  <span>React</span>
                </div>

                {/* Floating Tech Pill 2: PHP / MySQL */}
                <div className="floating-tech-pill" style={{ bottom: "12%", left: "-12%", animationDelay: "2s" }}>
                  <SiPhp size={18} color="#777BB4" />
                  <span style={{ color: SLATE }}>/</span>
                  <SiMysql size={18} color="#00758F" />
                  <span>Backend</span>
                </div>

                {/* Portrait Circle */}
                <div
                  style={{
                    width: "clamp(230px, 25vw, 340px)",
                    height: "clamp(230px, 25vw, 340px)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `3px solid ${GOLD}`,
                    boxShadow: isDark
                      ? `0 0 0 10px rgba(212, 167, 58, 0.08), 0 25px 60px rgba(0, 0, 0, 0.5)`
                      : `0 0 0 10px rgba(192, 138, 30, 0.08), 0 20px 50px rgba(0, 0, 0, 0.14)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: NAVY_CARD,
                    position: "relative",
                    zIndex: 2
                  }}
                >
                  {imgError ? (
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(48px, 6vw, 72px)", color: GOLD }}>
                      UA
                    </span>
                  ) : (
                    <img
                      src={umarPhoto}
                      alt={USER_INFO.name}
                      onError={() => setImgError(true)}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    />
                  )}
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20" data-reveal>
          <Container>
            <SectionLabel n="01" gold={GOLD} ink={INK} line={LINE}>About</SectionLabel>
            <div className="grid md:grid-cols-5 gap-10">
              <div style={{ gridColumn: "span 3" }}>
                <p style={{ color: SLATE, fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
                  I'm dedicated to becoming a proficient full-stack developer, guided by a structured six-month technical roadmap through my SIWES placement at GOSIDEC in Gombe State, Nigeria.
                </p>
                <p style={{ color: SLATE, fontSize: "16px", lineHeight: 1.8 }}>
                  My path combines deep backend fundamentals using PHP (PDO) and relational MySQL database design with modern reactive frontend interfaces in React. I place strong emphasis on clean code structure, practical user experiences, and documenting my progress with live projects.
                </p>
              </div>

              {/* Status Card */}
              <div
                className="glass-card p-6 rounded-xl flex flex-col justify-between"
                style={{ gridColumn: "span 2" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="status-dot"></span>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", color: GOLD, fontSize: "12px", fontWeight: 600 }}>
                      CURRENT STATUS
                    </p>
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: 600, color: INK, marginBottom: "8px" }}>
                    SIWES Placement
                  </h4>
                  <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.6 }}>
                    Organization: <strong style={{ color: INK }}>GOSIDEC</strong>
                    <br />
                    Location: <strong style={{ color: INK }}>{USER_INFO.location}</strong>
                    <br />
                    Objective: Full-Stack Engineering Proficiency
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t flex items-center justify-between" style={{ borderColor: LINE }}>
                  <span style={{ fontSize: "12px", color: SLATE, fontFamily: "'JetBrains Mono', monospace" }}>
                    Track: Backend & React
                  </span>
                  <TbSparkles size={18} style={{ color: GOLD }} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SKILLS SECTION WITH AUTHENTIC BRAND LOGOS */}
        <section id="skills" className="py-20" data-reveal>
          <Container>
            <SectionLabel n="02" gold={GOLD} ink={INK} line={LINE}>Skills</SectionLabel>

            <div className="mb-12">
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: INK, fontWeight: 600 }}>
                Technical Stack & Skills
              </h3>
              <p style={{ color: SLATE, fontSize: "15px", marginTop: "6px" }}>
                Authentic technologies and tools I utilize for full-stack delivery
              </p>
            </div>

            {/* Featured Brand Cards Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
              
              {/* Left Column: 4 Featured Brand Cards with authentic brand logos */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
                {featuredTech.map((sk) => (
                  <div
                    key={sk.name}
                    className={`skill-hero-card ${sk.brandClass} flex flex-col items-center justify-center p-8 text-center`}
                    style={{ minHeight: "190px" }}
                  >
                    <div className="mb-4 flex items-center justify-center" style={{ height: "52px" }}>
                      {sk.logo}
                    </div>
                    <h4 style={{ color: INK, fontSize: "18px", fontWeight: 600, marginBottom: "6px" }}>
                      {sk.name}
                    </h4>
                    <p style={{ color: SLATE, fontSize: "13px", lineHeight: 1.5 }}>
                      {sk.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column: Technical Expertise Breakdown */}
              <div
                className="lg:col-span-5 glass-card p-8 rounded-xl"
              >
                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", color: INK, fontWeight: 600, marginBottom: "14px" }}>
                  Engineering Expertise
                </h4>
                <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
                  My core stack bridges foundational computer science principles, solid backend architecture with PHP and MySQL, and interactive frontend applications powered by React and modern styling.
                </p>

                <div className="flex flex-col gap-4">
                  {skillCategories.map((c) => (
                    <div key={c.group} className="pb-3 border-b last:border-b-0" style={{ borderColor: LINE }}>
                      <span className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: GOLD, fontFamily: "'JetBrains Mono', monospace" }}>
                        {c.group}
                      </span>
                      <p style={{ color: INK, fontSize: "14px" }}>
                        {c.items.map((i) => i.name).join(" • ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Categorized Badges Grid with Authentic Mini Icons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skillCategories.map((cat) => (
                <div
                  key={cat.group}
                  className="glass-card rounded-lg p-5"
                >
                  <p style={{ color: GOLD_SOFT, fontSize: "12px", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", marginBottom: "14px", letterSpacing: "0.05em" }}>
                    {cat.group.toUpperCase()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span key={item.name} className="skill-badge">
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </Container>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20" data-reveal>
          <Container>
            <SectionLabel n="03" gold={GOLD} ink={INK} line={LINE}>Projects</SectionLabel>

            <div className="mb-10">
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: INK, fontWeight: 600 }}>
                Featured Works
              </h3>
              <p style={{ color: SLATE, fontSize: "15px", marginTop: "4px" }}>
                Selected systems and applications built during my placement and training
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <div
                  key={p.name}
                  className="proj-card"
                >
                  {/* Card Header: Project Index & Featured Ribbon */}
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ color: SLATE, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                      0{i + 1}
                    </span>
                    {p.isFeatured ? (
                      <span className="featured-ribbon">
                        <TbSparkles size={12} />
                        Featured SIWES
                      </span>
                    ) : p.statusBadge ? (
                      <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22C55E", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                        {p.statusBadge}
                      </span>
                    ) : p.liveUrl ? (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22C55E", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                        Deployed
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(212, 167, 58, 0.12)", color: GOLD, border: `1px solid ${LINE}` }}>
                        In Progress
                      </span>
                    )}
                  </div>

                  {/* Title & Role */}
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: INK, fontWeight: 600, marginBottom: "4px" }}>
                    {p.name}
                  </h3>
                  <p style={{ color: GOLD, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "14px" }}>
                    {p.role}
                  </p>

                  {/* Description */}
                  <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.65, marginBottom: "20px", flexGrow: 1 }}>
                    {p.desc}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "11px",
                          fontFamily: "'JetBrains Mono', monospace",
                          color: SLATE,
                          background: "rgba(128, 128, 128, 0.08)",
                          border: `1px solid ${LINE}`,
                          padding: "3px 8px",
                          borderRadius: "4px"
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Links */}
                  <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: LINE }}>
                    {p.githubUrl ? (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold"
                        style={{ color: INK, textDecoration: "none" }}
                      >
                        <SiGithub size={15} />
                        <span>Source Code</span>
                        <FaArrowUpRightFromSquare size={10} style={{ color: SLATE }} />
                      </a>
                    ) : (
                      <span style={{ color: SLATE, fontSize: "12px", fontStyle: "italic" }}>
                        Repo coming soon
                      </span>
                    )}

                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold"
                        style={{ color: GOLD, textDecoration: "none" }}
                      >
                        <span>Live Demo</span>
                        <FaArrowUpRightFromSquare size={10} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* SIWES JOURNEY (CONNECTED TIMELINE) */}
        <section id="journey" className="py-20" data-reveal>
          <Container>
            <SectionLabel n="04" gold={GOLD} ink={INK} line={LINE}>Journey</SectionLabel>

            <div className="mb-10">
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: INK, fontWeight: 600 }}>
                SIWES Placement Roadmap
              </h3>
              <p style={{ color: SLATE, fontSize: "15px", marginTop: "4px" }}>
                6-month progression milestones tracking my journey from fundamentals to full-stack delivery
              </p>
            </div>

            {/* Connected Timeline Container */}
            <div className="timeline-track relative">
              
              {/* Desktop Connecting Rail */}
              <div className="hidden md:block timeline-rail-desktop" style={{ background: LINE }} />

              {/* Mobile Vertical Connecting Rail */}
              <div className="md:hidden timeline-rail" style={{ background: LINE }} />

              <div className="grid md:grid-cols-4 gap-6 relative z-10 pl-10 md:pl-0">
                {roadmap.map((r, i) => {
                  const isActive = r.status === "active";
                  const isCompleted = r.status === "completed";

                  return (
                    <div
                      key={r.month}
                      className="glass-card rounded-xl p-5 flex flex-col justify-between relative"
                      style={{
                        borderColor: isActive ? GOLD : LINE,
                        boxShadow: isActive ? `0 0 20px rgba(212, 167, 58, 0.2)` : undefined
                      }}
                    >
                      {/* Top Node & Phase Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`timeline-node ${
                            isActive
                              ? "timeline-node-active"
                              : isCompleted
                              ? "timeline-node-completed"
                              : ""
                          }`}
                        >
                          {isCompleted ? <FaCheck size={12} /> : i + 1}
                        </div>
           
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: isActive
                              ? "rgba(212, 167, 58, 0.15)"
                              : isCompleted
                              ? "rgba(34, 197, 94, 0.12)"
                              : "rgba(128, 128, 128, 0.08)",
                            color: isActive ? GOLD : isCompleted ? "#22C55E" : SLATE,
                            border: `1px solid ${isActive ? GOLD : LINE}`
                          }}
                        >
                          {r.badge}
                        </span>
                      </div>

                      {/* Month & Title */}
                      <span style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: GOLD, fontWeight: 500 }}>
                        {r.month}
                      </span>
                      <h4 style={{ color: INK, fontSize: "17px", fontWeight: 600, marginTop: "4px", marginBottom: "8px" }}>
                        {r.title}
                      </h4>

                      {/* Description */}
                      <p style={{ color: SLATE, fontSize: "13px", lineHeight: 1.6, flexGrow: 1 }}>
                        {r.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </Container>
        </section>

        {/* RECENT LEARNINGS SECTION */}
        <section id="learnings" className="py-20" data-reveal>
          <Container>
            <SectionLabel n="05" gold={GOLD} ink={INK} line={LINE}>Recent Learnings</SectionLabel>

            <div className="grid sm:grid-cols-3 gap-6">
              {recentLearnings.map((l) => (
                <div
                  key={l.title}
                  className="glass-card rounded-xl p-6"
                  style={{ borderLeft: `3px solid ${GOLD}` }}
                >
                  <span
                    style={{
                      color: GOLD,
                      fontSize: "11px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      background: "rgba(212, 167, 58, 0.1)",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginBottom: "12px"
                    }}
                  >
                    {l.tag}
                  </span>
                  <h4 style={{ color: INK, fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>
                    {l.title}
                  </h4>
                  <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.6 }}>
                    {l.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        {/* CONTACT SECTION */}
        <section id="contact" className="py-24" data-reveal>
          <Container>
            <SectionLabel n="06" gold={GOLD} ink={INK} line={LINE}>Contact</SectionLabel>
            <div className="grid md:grid-cols-12 gap-10">
              
              {/* Left Column: Direct Info & Working Copy Controls */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", color: INK, fontWeight: 600, marginBottom: "12px" }}>
                    Let's Connect & Build
                  </h3>
                  <p style={{ color: SLATE, fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" }}>
                    Whether you have an inquiry, project collaboration, SIWES consultation, or software role, feel free to reach out directly.
                  </p>
                  
                  <div className="flex flex-col gap-4 mb-10">
                    
                    {/* Phone Item with Quick Copy */}
                    <div className="glass-card p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div style={{ color: GOLD }}>
                          <FaPhone size={18} />
                        </div>
                        <div>
                          <p style={{ color: SLATE, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>Phone</p>
                          <a href={`tel:${USER_INFO.phone}`} style={{ color: INK, fontWeight: 500, fontSize: "14px", textDecoration: "none" }}>
                            {USER_INFO.phone}
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(USER_INFO.phone, "phone")}
                        className="copy-badge-btn"
                        title="Copy phone number"
                      >
                        {copiedField === "phone" ? (
                          <>
                            <FaCheck size={11} style={{ color: "#22C55E" }} />
                            <span style={{ color: "#22C55E" }}>Copied</span>
                          </>
                        ) : (
                          <>
                            <FaCopy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Email Item with Quick Copy */}
                    <div className="glass-card p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div style={{ color: GOLD }}>
                          <FaEnvelope size={18} />
                        </div>
                        <div>
                          <p style={{ color: SLATE, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>Email</p>
                          <a href={`mailto:${USER_INFO.email}`} style={{ color: INK, fontWeight: 500, fontSize: "14px", textDecoration: "none" }}>
                            {USER_INFO.email}
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(USER_INFO.email, "email")}
                        className="copy-badge-btn"
                        title="Copy email address"
                      >
                        {copiedField === "email" ? (
                          <>
                            <FaCheck size={11} style={{ color: "#22C55E" }} />
                            <span style={{ color: "#22C55E" }}>Copied</span>
                          </>
                        ) : (
                          <>
                            <FaCopy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Location Item */}
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                      <div style={{ color: GOLD }}>
                        <FaLocationDot size={18} />
                      </div>
                      <div>
                        <p style={{ color: SLATE, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>Location</p>
                        <p style={{ color: INK, fontWeight: 500, fontSize: "14px" }}>
                          {USER_INFO.location}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Social Profile Links */}
                  <div>
                    <h4 style={{ fontSize: "15px", fontWeight: 600, color: INK, marginBottom: "14px" }}>
                      Follow & Socials
                    </h4>
                    <div className="flex items-center gap-3">
                      <a
                        href={USER_INFO.socials.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="social-circle-btn"
                        aria-label="WhatsApp"
                        title="Chat on WhatsApp"
                      >
                        <FaWhatsapp size={19} color="#25D366" />
                      </a>
                      <a
                        href={USER_INFO.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="social-circle-btn"
                        aria-label="LinkedIn"
                        title="Connect on LinkedIn"
                      >
                        <FaLinkedinIn size={17} color="#0A66C2" />
                      </a>
                      <a
                        href={USER_INFO.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="social-circle-btn"
                        aria-label="GitHub"
                        title="View GitHub Repositories"
                      >
                        <SiGithub size={18} />
                      </a>
                      <a
                        href={USER_INFO.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="social-circle-btn"
                        aria-label="Twitter / X"
                        title="Follow on X"
                      >
                        <FaXTwitter size={17} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Modern Glassmorphic Form */}
              <div className="md:col-span-7">
                <div className="glass-card rounded-2xl p-8 md:p-10">
                  <h4 style={{ fontSize: "20px", fontWeight: 600, color: INK, marginBottom: "6px" }}>
                    Send a Message
                  </h4>
                  <p style={{ color: SLATE, fontSize: "14px", marginBottom: "24px" }}>
                    I typically respond within 24 hours.
                  </p>

                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="field-modern"
                    />

                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="field-modern"
                    />

                    <input
                      type="text"
                      placeholder="Subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="field-modern"
                    />

                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="field-modern"
                      style={{ resize: "vertical" }}
                    />

                    <button
                      type="submit"
                      disabled={!isContactFormValid || isSubmitting}
                      className="btn-primary-gold w-full py-4 mt-2"
                      style={{ fontSize: "15px" }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    {/* Feedback Alerts */}
                    {submitStatus === "success" && (
                      <div
                        style={{
                          background: "rgba(34, 197, 94, 0.15)",
                          border: "1px solid #22C55E",
                          color: isDark ? "#86EFAC" : "#166534",
                          padding: "12px 16px",
                          borderRadius: "6px",
                          fontSize: "14px"
                        }}
                      >
                        Message sent successfully! I'll get back to you shortly.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div
                        style={{
                          background: "rgba(239, 68, 68, 0.15)",
                          border: "1px solid #EF4444",
                          color: isDark ? "#FCA5A5" : "#991B1B",
                          padding: "12px 16px",
                          borderRadius: "6px",
                          fontSize: "14px"
                        }}
                      >
                        Could not dispatch via API. Please email me directly at {USER_INFO.email} or reach out via WhatsApp!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8" style={{ borderTop: `1px solid ${LINE}` }}>
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ color: SLATE, fontSize: "13px" }}>
            © {new Date().getFullYear()} {USER_INFO.name}. Built with React & Tailwind CSS.
          </p>
          <div className="flex items-center gap-3">
            <a href={USER_INFO.socials.github} target="_blank" rel="noreferrer" style={{ color: SLATE }} className="icon-btn" aria-label="GitHub">
              <SiGithub size={16} />
            </a>
            <a href={USER_INFO.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: SLATE }} className="icon-btn" aria-label="LinkedIn">
              <FaLinkedinIn size={16} />
            </a>
            <a href={`mailto:${USER_INFO.email}`} style={{ color: SLATE }} className="icon-btn" aria-label="Email">
              <FaEnvelope size={15} />
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}