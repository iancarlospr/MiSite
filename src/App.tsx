import { useEffect, useRef, useState } from 'react';

// ===== SVG ICONS =====
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);

const GhostIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="24" height="24">
    <path d="M8 1C5.2 1 3 3.2 3 6v6l1-1.5 1 1.5 1-1.5 1 1.5 1-1.5 1 1.5 1-1.5 1 1.5V6c0-2.8-2.2-5-5-5z"/>
    <circle cx="6" cy="5.5" r="1" fill="#000"/>
    <circle cx="10" cy="5.5" r="1" fill="#000"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10"/>
  </svg>
);

// ===== PIXEL PARTICLES COMPONENT =====
function PixelParticles() {
  const particles = Array.from({ length: 60 }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 40;
    const size = Math.random() * 3 + 1;
    const duration = 3 + Math.random() * 5;
    const delay = Math.random() * 5;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const startX = 50 + (Math.random() - 0.5) * 80;
    const startY = 50 + (Math.random() - 0.5) * 80;

    return (
      <div
        key={i}
        className="pixel-particle"
        style={{
          left: `${startX}%`,
          top: `${startY}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: Math.random() * 0.6 + 0.1,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          '--tx': `${tx}px`,
          '--ty': `${ty}px`,
        } as React.CSSProperties}
      />
    );
  });

  return <div className="dispersion-container">{particles}</div>;
}

// ===== FLOATING NOISE PARTICLES =====
function NoiseParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 4 + Math.random() * 8;
    const delay = Math.random() * 6;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size}px`,
          background: '#fff',
          opacity: Math.random() * 0.15 + 0.02,
          animation: `subtle-drift ${duration}s ease-in-out ${delay}s infinite`,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles}
    </div>
  );
}

// ===== CANVAS GLITCH EFFECT =====
function GlitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Random glitch bars
      if (Math.random() > 0.97) {
        const numBars = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numBars; i++) {
          const y = Math.random() * canvas.height;
          const h = Math.random() * 2 + 1;
          const x = Math.random() * canvas.width * 0.3;
          const w = Math.random() * canvas.width * 0.4;
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
          ctx.fillRect(x, y, w, h);
        }
      }

      // Sparse random pixels
      if (frame % 3 === 0) {
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const s = Math.random() * 2 + 1;
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
          ctx.fillRect(x, y, s, s);
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ opacity: 0.6 }}
    />
  );
}

// ===== LINK DATA =====
const links = [
  {
    label: 'LinkedIn Profile',
    url: 'https://www.linkedin.com/in/iancarlospr/',
    icon: <LinkedInIcon />,
    sub: 'Professional Network',
  },
  {
    label: 'MarketingAlphaScan',
    url: 'https://marketingalphascan.com/',
    icon: <GhostIcon />,
    sub: 'Skill Showcase Project',
  },
  {
    label: 'Personal Website',
    url: 'https://iancarlospr.github.io/rrg22agency/',
    icon: <GlobeIcon />,
    sub: 'Portfolio & Case Studies',
  },
  {
    label: 'GitHub Page',
    url: 'https://github.com/iancarlospr',
    icon: <GitHubIcon />,
    sub: 'Code & Projects',
  },
];

// ===== MAIN APP =====
export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative h-dvh bg-black text-white overflow-hidden">
      {/* Background layers */}
      <div className="noise-bg animate-noise" />
      <div className="dot-matrix" />
      <div className="scanlines" />
      <NoiseParticles />
      <GlitchCanvas />

      {/* Main content */}
      <main className="relative z-10 flex flex-col h-dvh px-6">

        {/* TOP — Profile, name, headline */}
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 md:gap-4 pt-8 md:pt-12">
          <div
            className={`profile-container transition-all duration-1000 ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="profile-ring" />
            <div className="profile-ring-outer" />
            <img
              src="/images/profile.png"
              alt="Ian C. Ramírez Rivera"
              className="profile-img"
            />
            <div className="profile-glitch">
              <img
                src="/images/profile.png"
                alt=""
                className="profile-img"
                aria-hidden="true"
              />
            </div>
            <PixelParticles />
          </div>

          <div className="animate-fade-in animate-delay-2 text-center">
            <h1
              className="glitch-text text-xl md:text-3xl font-bold tracking-wider uppercase"
              data-text="Ian C. Ramírez Rivera"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Ian C. Ramírez Rivera
            </h1>
          </div>

          <div className="animate-fade-in animate-delay-3 text-center">
            <p
              className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-white/50"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Performance Marketing
            </p>
            <p
              className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-white/50 mt-0.5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              & Revenue Operations
            </p>
          </div>
        </div>

        {/* CENTER — Link cards */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
          <div className="animate-fade-in animate-delay-4 w-full corruption-border mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-white/30"
                    style={{
                      opacity: i === 2 ? 0.6 : 0.2,
                      animation: `subtle-drift ${2 + i * 0.5}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          <div className="w-full space-y-2 md:space-y-3">
            {links.map((link, i) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`link-btn animate-fade-in animate-delay-${i + 5}`}
              >
                <div className="glitch-line" />
                <div className="link-icon">{link.icon}</div>
                <div className="link-label">
                  <span className="block text-sm md:text-[15px] font-medium tracking-wide">
                    {link.label}
                  </span>
                  <span
                    className="block text-[10px] md:text-xs text-white/30 tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {link.sub}
                  </span>
                </div>
                <div className="link-arrow">
                  <ArrowIcon />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM — Status + binary text */}
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 pb-4">
          <p
            className="animate-fade-in animate-delay-8 text-[10px] tracking-[0.4em] uppercase text-white/15 text-center"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            MarTech//ACTIVE
          </p>
          <p
            className="animate-fade-in animate-delay-8 text-[8px] tracking-widest text-white/[0.06] text-center whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            01001001 01000001 01001110 ░░▒▓█ TECHIE.ACTIVE ░░ REV.OPS ▓▒░░ MKTG.SYS ░░▒▓
          </p>
        </div>
      </main>
    </div>
  );
}
