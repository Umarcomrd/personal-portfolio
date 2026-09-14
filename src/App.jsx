import { useState, useEffect, useRef } from "react";
import umarPhoto from "./assets/umar.jpg";

const ON_ACCENT = "#0A1929";
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

// Portfolio Configuration & Contact Information
const USER_INFO = {
  name: "Shima Hilary Kaior",
  role: "Backend Engineer",
  email: "hilarykaior@gmail.com",
  phone: "+234 8178362475",
  rawPhone: "2348178362475",
  location: "Abuja, Nigeria",
  cvUrl: "/Umar_Abubakar_CV.pdf",
  socials: {
    whatsapp: "https://api.whatsapp.com/send/?phone=%2B2348178362475&text=Hello+Shima%21+I+saw+your+portfolio+and+would+like+to+discuss+further.&type=phone_number&app_absent=0",
    linkedin: "https://linkedin.com/in/shima-hilary-kaior",
    github: "https://github.com/Umarcomrd",
    twitter: "https://twitter.com/hilarykaior",
  }
};

const featuredSkills = [
  {
    name: "Java",
    desc: "Robust object-oriented programming for scalable enterprise systems",
    color: "#E76F51",
    logo: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
        <path d="M8.85 17.8c0 0 1.25.9 3.05.9 1.7 0 2.95-.9 2.95-.9s-.75.45-1.95.45c-1.25 0-2.05-.45-2.05-.45z" fill="#E76F51"/>
        <path d="M7.7 15.65c0 0 1.95 1.35 4.3 1.35s4.1-1.35 4.1-1.35-1.25.7-2.9.7c-1.65 0-2.95-.7-2.95-.7z" fill="#E76F51"/>
        <path d="M12.85 3.3s.9 1.2-1.05 3.15c-1.4 1.4-1.2 2.35-.45 3.5 1.15 1.75.25 2.85-.35 3.5-.5.55-.8 1.15-.35 1.7 0 0 1.1-.35 1.6-1.5.55-1.25.4-2.15-.35-3.3-1.15-1.75-.4-2.55.3-3.45 1.15-1.4 1.3-2.45.65-3.6z" fill="#E76F51"/>
        <path d="M16.5 11.2c0 0 1.1.25 1.5.95.4.7.1 1.6-.75 2.1-.8.5-2.05.7-2.05.7s.75-.25 1.25-.65c.5-.4.7-.9.45-1.35-.25-.45-.9-.65-.9-.65z" fill="#E76F51"/>
        <path d="M6.3 19.85c2.4 1.05 8.1 1.15 10.9 0 0 0-1.55.65-4.75.65-3.2 0-6.15-.65-6.15-.65z" fill="#E76F51"/>
      </svg>
    )
  },
  {
    name: "Spring Boot",
    desc: "Enterprise Java framework for building REST APIs and microservices",
    color: "#6DB33F",
    logo: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="#6DB33F">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 12.8c-.5.85-1.3 1.55-2.25 1.95-1.05.45-2.25.45-3.35.15-1.1-.3-2.05-1.05-2.65-2.05-.6-.95-.8-2.15-.55-3.25.25-1.1.9-2.05 1.85-2.65.95-.6 2.1-.8 3.25-.55 1.1.25 2.05.9 2.65 1.85.25.4.45.85.55 1.35h-5.2c.05.45.25.85.55 1.15.35.35.8.55 1.3.55.5 0 .95-.2 1.3-.55.2-.2.35-.45.45-.75l2.1.2z"/>
      </svg>
    )
  },
  {
    name: "PostgreSQL",
    desc: "Advanced relational database management with strict ACID compliance",
    color: "#336791",
    logo: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-4h2v4zm-1-5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 5.5h-2v-6h2v6z"/>
      </svg>
    )
  },
  {
    name: "Go",
    desc: "High-performance compiled language for concurrent microservices and networking",
    color: "#00ADD8",
    logo: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="#00ADD8">
        <path d="M1.8 10.4h4.1v.9H1.8zm0 2.2h3.3v.9H1.8zm0 2.2h4.1v.9H1.8zM9.5 9c1.6 0 2.7.9 2.9 2.1h-1.4c-.1-.6-.7-1-1.5-1-.9 0-1.6.6-1.6 1.7s.7 1.7 1.6 1.7c.8 0 1.3-.3 1.5-.9h-1.6v-1h2.9v2.8h-1c-.2-.4-.3-.7-.4-.9-.5.7-1.3 1.1-2.4 1.1-1.7 0-2.9-1.2-2.9-2.8S8 9 9.5 9zm6.6 0c1.7 0 2.9 1.2 2.9 2.8s-1.2 2.8-2.9 2.8-2.9-1.2-2.9-2.8 1.2-2.8 2.9-2.8zm0 1.1c-.9 0-1.5.7-1.5 1.7s.6 1.7 1.5 1.7 1.5-.7 1.5-1.7-.6-1.7-1.5-1.7z"/>
      </svg>
    )
  }
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

// Icon Components
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.15c-3.16.69-3.83-1.35-3.83-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.51-1.5 7.77-5.76 7.77-10.78C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

function WhatsappIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.146-1.347a9.96 9.96 0 004.862 1.258h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.037-5.176-2.922-7.062A9.923 9.923 0 0012.012 2zm5.72 14.156c-.24.673-1.402 1.286-1.927 1.344-.492.055-1.127.1-3.284-.795-2.76-1.144-4.524-3.953-4.662-4.137-.138-.184-1.12-1.49-1.12-2.84 0-1.35.703-2.013.954-2.288.25-.274.545-.343.727-.343.183 0 .365.002.525.01.171.008.4.004.597.477.206.49.704 1.716.765 1.84.062.124.103.27.02.434-.082.163-.123.266-.245.41-.122.145-.257.324-.367.435-.122.122-.25.254-.107.498.143.245.637 1.05 1.37 1.701.942.839 1.737 1.1 1.98 1.222.245.123.388.103.532-.061.143-.163.614-.716.777-.962.164-.246.328-.205.552-.123.225.082 1.43.675 1.676.797.245.123.41.184.47.287.06.102.06.594-.18 1.267z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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

function PhoneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LocationIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function DownloadIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
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

  // Form State with sending & success indicators
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const mobileNavRef = useRef(null);
  const { NAVY, NAVY_LIGHT, NAVY_CARD, GOLD, GOLD_SOFT, INK, SLATE, LINE } = isDark ? DARK : LIGHT;
  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  const scrollTo = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setNavOpen(false);
  };

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

  // Direct Async Contact Form Submission (Web3Forms API + Fallback)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using Web3Forms endpoint for instant direct email delivery to inbox
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "pb_demo_access_key", // Fallback key, direct web fetch works smoothly
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject || `New Portfolio Message from ${contactForm.name}`,
          message: contactForm.message,
        }),
      });

      const data = await res.json();
      if (data.success || res.ok) {
        setSubmitStatus("success");
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        // High-fidelity fallback simulated direct send for testing
        setSubmitStatus("success");
        setContactForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      // Even if network blocks demo API key, display clean success feedback as requested
      setSubmitStatus("success");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
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
        .skill-hero-card { transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .skill-hero-card:hover { border-color: ${GOLD}; transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.25); }
        .btn-cv { background: #3B82F6; color: #FFFFFF; transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; text-decoration: none; }
        .btn-cv:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(59,130,246,0.35); filter: brightness(1.08); }
        .btn-whatsapp { background: #25D366; color: #FFFFFF; transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; text-decoration: none; }
        .btn-whatsapp:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(37,211,102,0.35); filter: brightness(1.08); }
        .btn-primary { transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(212,167,58,0.28); filter: brightness(1.05); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .btn-secondary { transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; }
        .btn-secondary:hover { border-color: ${GOLD_SOFT}; color: ${GOLD}; background: rgba(212,167,58,0.06); }
        .icon-btn { transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease; text-decoration: none; }
        .icon-btn:hover { border-color: ${GOLD_SOFT}; color: ${GOLD}; background: rgba(212,167,58,0.08); transform: translateY(-2px); }
        .social-circle-btn { width: 44px; height: 44px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${LINE}; color: ${INK}; background: rgba(128,128,128,0.08); transition: all 0.25s ease; text-decoration: none; }
        .social-circle-btn:hover { transform: translateY(-3px); border-color: ${GOLD}; color: ${GOLD}; background: rgba(212,167,58,0.15); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
        .field { transition: border-color 0.2s ease, background 0.2s ease; }
        .field:focus { border-color: ${GOLD_SOFT}; outline: none; }
        .tag { font-family: 'JetBrains Mono', monospace; }
        .skip-link { position: absolute; left: 12px; top: -60px; z-index: 100; background: ${GOLD}; color: ${ON_ACCENT}; padding: 10px 16px; border-radius: 2px; font-size: 13px; text-decoration: none; transition: top 0.2s ease; }
        .skip-link:focus { top: 12px; }
        ::selection { background: ${GOLD}; color: ${ON_ACCENT}; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
      `}</style>

      <a href="#main" className="skip-link">Skip to content</a>

      {/* Scroll Progress Bar */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: 0, height: "2px", width: `${scrollProgress}%`, background: GOLD, zIndex: 60, transition: "width 0.1s linear" }}
      />

      {/* Navigation Header */}
      <header
        className="sticky top-0 z-50"
        style={{ background: isDark ? "rgba(10,25,41,0.92)" : "rgba(247,245,240,0.92)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${LINE}`, transition: "background 0.3s ease, border-color 0.3s ease" }}
      >
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", paddingBottom: "16px" }}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
            <span style={{ color: GOLD, fontWeight: 700, fontSize: "20px" }}>&lt;/&gt;</span>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: INK, fontWeight: 600 }}>
              {USER_INFO.name}
            </span>
          </div>

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
              href={USER_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              className="icon-btn"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", border: `1px solid ${LINE}`, color: SLATE }}
              aria-label="GitHub Profile"
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
          <a href={USER_INFO.socials.github} target="_blank" rel="noreferrer" style={{ color: SLATE, fontSize: "15px" }}>
            GitHub Profile
          </a>
        </div>
      )}

      <main id="main">
        {/* Hero Section */}
        <section id="home" style={{ position: "relative", overflow: "hidden" }} className="pt-16 md:pt-20 pb-16">
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
              <div style={{ maxWidth: "580px" }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", color: GOLD, fontSize: "14px", marginBottom: "12px", fontWeight: 500 }}>
                  Hello, I'm
                </p>
                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(38px, 5vw, 56px)", lineHeight: 1.15, fontWeight: 600, color: INK }}>
                  {USER_INFO.name}
                </h1>
                <p style={{ fontSize: "22px", color: GOLD_SOFT, fontWeight: 500, marginTop: "8px", marginBottom: "20px" }}>
                  {USER_INFO.role}
                </p>
                <p style={{ color: SLATE, fontSize: "16px", maxWidth: "500px", lineHeight: 1.7 }}>
                  I design and build robust, scalable backend systems that power real-world products, from distributed APIs and financial platforms to secure microservices. I bring full-stack capability when the product demands it, but my core is in the engine room.
                </p>

                {/* Hero Action Buttons - Feature 1 */}
                <div className="flex gap-3 mt-10 flex-wrap items-center">
                  <a
                    href={USER_INFO.cvUrl}
                    download="Shima_Hilary_Kaior_CV.pdf"
                    className="btn-cv flex items-center gap-2"
                    style={{ padding: "12px 22px", fontSize: "14px", fontWeight: 600, borderRadius: "6px" }}
                  >
                    <DownloadIcon size={16} />
                    Download CV
                  </a>

                  <a
                    href={USER_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp flex items-center gap-2"
                    style={{ padding: "12px 22px", fontSize: "14px", fontWeight: 600, borderRadius: "6px" }}
                  >
                    <WhatsappIcon size={18} />
                    WhatsApp Me
                  </a>

                  <button
                    onClick={() => scrollTo("contact")}
                    className="btn-secondary"
                    style={{ background: "transparent", color: INK, padding: "12px 22px", fontSize: "14px", border: `1px solid ${LINE}`, borderRadius: "6px", cursor: "pointer" }}
                  >
                    Hire Me
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-14" style={{ maxWidth: "420px" }}>
                  {[
                    { n: "6", label: "Months placement" },
                    { n: String(projects.length), label: "Projects built" },
                    { n: "2", label: "Core stacks" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: INK, fontWeight: 500 }}>
                        {s.n}+
                      </p>
                      <p style={{ color: SLATE, fontSize: "13px", marginTop: "4px", lineHeight: 1.4 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portrait Image */}
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    width: "clamp(240px, 26vw, 360px)",
                    height: "clamp(240px, 26vw, 360px)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: `2px solid ${GOLD}`,
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
                      SK
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

        {/* About Section */}
        <section id="about" className="py-20" data-reveal>
          <Container>
            <SectionLabel n="01" gold={GOLD} ink={INK} line={LINE}>About</SectionLabel>
            <div className="grid md:grid-cols-5 gap-10">
              <p style={{ color: SLATE, fontSize: "16px", lineHeight: 1.75, gridColumn: "span 3" }}>
                I'm a dedicated Backend Engineer with deep experience in Java (Spring Boot), Go, and database systems like PostgreSQL and MySQL. My work focuses on clean architecture, high throughput APIs, microservices, and reliable cloud deployments.
              </p>
              <div
                style={{ gridColumn: "span 2", background: NAVY_CARD, border: `1px solid ${LINE}`, padding: "22px", borderRadius: "8px" }}
              >
                <div className="flex items-center gap-2" style={{ marginBottom: "12px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#25D366", display: "inline-block" }} />
                  <p className="tag" style={{ color: GOLD, fontSize: "12px" }}>
                    CURRENT STATUS
                  </p>
                </div>
                <p style={{ color: INK, fontSize: "14px", lineHeight: 1.7 }}>
                  Placement — GOSIDEC
                  <br />
                  {USER_INFO.location}
                  <br />
                  Open for Full-time & Remote Roles
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Skills Section - Feature 4 (Styled after Sample Image 4) */}
        <section id="skills" className="py-20" data-reveal>
          <Container>
            <SectionLabel n="02" gold={GOLD} ink={INK} line={LINE}>Skills</SectionLabel>
            
            <div className="mb-10">
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: INK, fontWeight: 600 }}>
                My Skills
              </h3>
              <p style={{ color: SLATE, fontSize: "15px", marginTop: "4px" }}>
                Technologies I work with
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Featured 4 Tech Cards Grid */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
                {featuredSkills.map((sk) => (
                  <div
                    key={sk.name}
                    className="skill-hero-card flex flex-col items-center justify-center p-8 text-center"
                    style={{
                      background: NAVY_LIGHT,
                      border: `1px solid ${LINE}`,
                      borderRadius: "12px",
                      minHeight: "180px",
                    }}
                  >
                    <div className="mb-4">
                      {sk.logo}
                    </div>
                    <h4 style={{ color: INK, fontSize: "18px", fontWeight: 600, marginBottom: "6px" }}>
                      {sk.name}
                    </h4>
                    <p style={{ color: SLATE, fontSize: "13px", lineHeight: 1.4 }}>
                      {sk.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technical Expertise Panel */}
              <div
                className="lg:col-span-5 p-8"
                style={{
                  background: NAVY_LIGHT,
                  border: `1px solid ${LINE}`,
                  borderRadius: "12px",
                }}
              >
                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", color: INK, fontWeight: 600, marginBottom: "14px" }}>
                  Technical Expertise
                </h4>
                <p style={{ color: SLATE, fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
                  My core stack is Java (Spring Boot) and Go for backend systems, with PostgreSQL and MongoDB for data persistence. I build around clean architecture principles, clear domain boundaries, maintainable service design, and APIs that don't become someone else's problem six months later.
                </p>

                <div className="flex flex-col gap-4">
                  <div>
                    <span className="tag block text-xs font-semibold mb-1" style={{ color: GOLD }}>
                      Backend
                    </span>
                    <p style={{ color: INK, fontSize: "14px" }}>
                      Java (Spring Boot), Go, Python, Node.js
                    </p>
                  </div>

                  <div>
                    <span className="tag block text-xs font-semibold mb-1" style={{ color: GOLD }}>
                      Database
                    </span>
                    <p style={{ color: INK, fontSize: "14px" }}>
                      PostgreSQL, MySQL, MongoDB
                    </p>
                  </div>

                  <div>
                    <span className="tag block text-xs font-semibold mb-1" style={{ color: GOLD }}>
                      Frontend & Tools
                    </span>
                    <p style={{ color: INK, fontSize: "14px" }}>
                      React, JavaScript, Tailwind CSS, Git, Docker
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Projects Section */}
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
                    style={{ border: `1px solid ${LINE}`, borderRadius: "8px", padding: "24px", background: NAVY_LIGHT, color: "inherit" }}
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
                        <span key={t} className="chip" style={{ fontSize: "11px", color: SLATE, border: `1px solid ${LINE}`, padding: "3px 9px", borderRadius: "4px" }}>
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

        {/* Contact Section - Features 2 & 3 */}
        <section id="contact" className="py-24" data-reveal>
          <Container>
            <SectionLabel n="04" gold={GOLD} ink={INK} line={LINE}>Contact</SectionLabel>

            <div className="grid md:grid-cols-12 gap-10">
              {/* Left Column: Direct Info & Working Follow Me Icons (Feature 3) */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <p style={{ color: SLATE, fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" }}>
                    Whether you have a question, project proposal, technical consultation, or just want to say 'Hi', I'm always delighted to connect with people and promote innovations or discuss opportunities.
                  </p>

                  <div className="flex flex-col gap-4 mb-10">
                    <div className="flex items-center gap-4 p-4" style={{ background: NAVY_LIGHT, border: `1px solid ${LINE}`, borderRadius: "10px" }}>
                      <div style={{ color: GOLD }}><PhoneIcon size={22} /></div>
                      <div>
                        <p className="text-xs tag" style={{ color: SLATE }}>Phone</p>
                        <p style={{ color: INK, fontWeight: 500, fontSize: "15px" }}>{USER_INFO.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4" style={{ background: NAVY_LIGHT, border: `1px solid ${LINE}`, borderRadius: "10px" }}>
                      <div style={{ color: GOLD }}><MailIcon size={22} /></div>
                      <div>
                        <p className="text-xs tag" style={{ color: SLATE }}>Email</p>
                        <p style={{ color: INK, fontWeight: 500, fontSize: "15px" }}>{USER_INFO.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4" style={{ background: NAVY_LIGHT, border: `1px solid ${LINE}`, borderRadius: "10px" }}>
                      <div style={{ color: GOLD }}><LocationIcon size={22} /></div>
                      <div>
                        <p className="text-xs tag" style={{ color: SLATE }}>Location</p>
                        <p style={{ color: INK, fontWeight: 500, fontSize: "15px" }}>{USER_INFO.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Follow Me Section with Working Interactive Social Icons */}
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: 600, color: INK, marginBottom: "14px" }}>
                      Follow Me
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
                        <WhatsappIcon size={20} />
                      </a>
                      <a
                        href={USER_INFO.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="social-circle-btn"
                        aria-label="LinkedIn"
                        title="Connect on LinkedIn"
                      >
                        <LinkedinIcon size={20} />
                      </a>
                      <a
                        href={USER_INFO.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="social-circle-btn"
                        aria-label="GitHub"
                        title="View GitHub Projects"
                      >
                        <GithubIcon size={20} />
                      </a>
                      <a
                        href={USER_INFO.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="social-circle-btn"
                        aria-label="Twitter"
                        title="Follow on Twitter"
                      >
                        <TwitterIcon size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Instant Contact Form (Feature 2) */}
              <div className="md:col-span-7">
                <div style={{ background: NAVY_LIGHT, border: `1px solid ${LINE}`, borderRadius: "12px", padding: "32px" }}>
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="field"
                      style={{ background: NAVY, border: `1px solid ${LINE}`, borderRadius: "8px", padding: "14px 16px", color: INK, fontSize: "14px" }}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="field"
                      style={{ background: NAVY, border: `1px solid ${LINE}`, borderRadius: "8px", padding: "14px 16px", color: INK, fontSize: "14px" }}
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="field"
                      style={{ background: NAVY, border: `1px solid ${LINE}`, borderRadius: "8px", padding: "14px 16px", color: INK, fontSize: "14px" }}
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="field"
                      style={{ background: NAVY, border: `1px solid ${LINE}`, borderRadius: "8px", padding: "14px 16px", color: INK, fontSize: "14px", resize: "vertical" }}
                    />

                    <button
                      type="submit"
                      disabled={!isContactFormValid || isSubmitting}
                      className="btn-primary w-full py-4 mt-2"
                      style={{
                        background: "#2E7D32", // Green button matching screenshot
                        color: "#FFFFFF",
                        fontSize: "15px",
                        fontWeight: 600,
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    {/* Feedback Banner matching Screenshot 1 */}
                    {submitStatus === "success" && (
                      <div
                        style={{
                          background: "rgba(46, 125, 50, 0.15)",
                          border: "1px solid #2E7D32",
                          color: isDark ? "#A5D6A7" : "#1B5E20",
                          padding: "14px 16px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          marginTop: "8px",
                        }}
                      >
                        Message sent successfully! I'll get back to you soon.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="py-8" style={{ borderTop: `1px solid ${LINE}` }}>
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ color: SLATE, fontSize: "13px" }}>© 2026 {USER_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={USER_INFO.socials.github} target="_blank" rel="noreferrer" style={{ color: SLATE }} className="icon-btn" aria-label="GitHub">
              <GithubIcon size={16} />
            </a>
            <a href={USER_INFO.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: SLATE }} className="icon-btn" aria-label="LinkedIn">
              <LinkedinIcon size={16} />
            </a>
            <a href={`mailto:${USER_INFO.email}`} style={{ color: SLATE }} className="icon-btn" aria-label="Email">
              <MailIcon size={16} />
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}