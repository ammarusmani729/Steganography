import { useEffect, useRef, useState } from 'react';

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: `${6 + Math.random() * 8}s`,
  delay: `${Math.random() * 6}s`,
  color: ['#00d4ff', '#a855f7', '#00ff88', '#ff6b35'][Math.floor(Math.random() * 4)],
}));

export default function HeroSection() {
  const [typed, setTyped] = useState('');
  const fullText = 'Image Steganography Visualizer';
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(c => !c), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col grid-bg overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #020817 0%, #0a1628 50%, #020817 100%)' }}
    >
      {particles.map(p => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            '--duration': p.duration,
            '--delay': p.delay,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,212,255,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 70%, rgba(124,58,237,0.06) 0%, transparent 60%)',
        }}
      />

      <nav className="relative z-10 mx-8 mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-8 py-6 backdrop-blur md:mx-12 md:mt-10 md:px-12 lg:mx-20">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" fill="white" opacity="0.9" />
              <rect x="14" y="3" width="7" height="7" rx="1" fill="white" opacity="0.6" />
              <rect x="3" y="14" width="7" height="7" rx="1" fill="white" opacity="0.6" />
              <rect x="14" y="14" width="7" height="7" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-slate-300 tracking-wide hidden sm:block">
            Steganography
          </span>
        </div>

        <div className="tag tag-cyan text-xs">
          <span className="glow-dot" style={{ width: 5, height: 5 }}></span>
          InfoSec Lab
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-10 py-40 md:px-12 md:py-44">
        <div className="mb-12 flex justify-center">
          <span
            className="tag tag-cyan text-xs font-mono tracking-widest"
            style={{ letterSpacing: '0.15em' }}
          >
            INFORMATION SECURITY LAB PROJECT
          </span>
        </div>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          <span className="shimmer-text">{typed}</span>
          <span
            className="text-cyan-400"
            style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
          >
            |
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          The art of hiding secret messages within digital images — invisibly, seamlessly, and securely.
        </p>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mb-16 leading-relaxed">
          Explore how the{' '}
          <span className="text-cyan-400 font-semibold">Least Significant Bit (LSB)</span> algorithm
          embeds data into pixel values without any perceptible visual change.
        </p>

        <div className="flex justify-center m-10">
          <a href="#encoder" className="btn-primary" style={{ padding: '14px 40px', margin: '15px', fontSize: '1rem' }}>
            Start Encoding →
          </a>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-20 justify-center">
          {[
            { value: 'LSB', label: 'Algorithm' },
            { value: '0', label: 'Visual Difference' },
            { value: '1-bit', label: 'Per Channel Modified' },
            { value: '100%', label: 'Browser-side' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text-cyan mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center pb-8 gap-2 animate-bounce-subtle">
        <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll to explore</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
