import SectionHeader from './SectionHeader';

const stack = [
  { label: 'Algorithm', value: 'Least Significant Bit (LSB)', icon: '🧮', color: '#00d4ff', tag: 'tag-cyan' },
  { label: 'Frontend Framework', value: 'React 18 + Vite', icon: '⚛️', color: '#61dafb', tag: 'tag-cyan' },
  { label: 'Styling', value: 'Tailwind CSS v4', icon: '🎨', color: '#38bdf8', tag: 'tag-cyan' },
  { label: 'Image Processing', value: 'HTML5 Canvas API', icon: '🖼️', color: '#00ff88', tag: 'tag-green' },
  { label: 'Security Concept', value: 'Steganography', icon: '🔐', color: '#a855f7', tag: 'tag-purple' },
  { label: 'Execution Environment', value: '100% Browser-side', icon: '🌐', color: '#ff6b35', tag: 'tag-orange' },
];

const features = [
  { icon: '👁️', title: 'Visual Teaching', desc: 'Bit-level visualization of LSB modification with animated steps' },
  { icon: '🔄', title: 'Full Encode/Decode', desc: 'Complete round-trip: encode a message and decode it back perfectly' },
  { icon: '📊', title: 'Real Statistics', desc: 'Actual bits embedded, pixels used, and capacity calculations' },
  { icon: '🎓', title: 'Educational', desc: 'Theory, ASCII demo, pixel visualizer, and algorithm flowcharts' },
  { icon: '🔒', title: 'No Backend', desc: 'All processing done locally — no data ever leaves your browser' },
  { icon: '💻', title: 'Presentation Ready', desc: 'Dark cyber theme designed for live university demonstrations' },
];

export default function ProjectSummarySection() {
  return (
    <section id="summary" className="section-container">
      <SectionHeader
        tag="Project Summary"
        title="About This Application"
        subtitle="A comprehensive information security lab project demonstrating steganography concepts with a fully functional browser-based implementation."
        accent="cyan"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card p-6 cyber-border">
          <div className="flex items-center gap-2 mb-5">
            <div className="glow-dot"></div>
            <h3 className="text-sm font-bold text-slate-300">Technology Stack</h3>
          </div>
          <div className="flex flex-col gap-3">
            {stack.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${item.color}15` }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                  <div className="text-sm font-bold" style={{ color: item.color }}>
                    {item.value}
                  </div>
                </div>
                <span className={`tag ${item.tag} text-xs flex-shrink-0`}>✓</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="glow-dot" style={{ background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></div>
            <h3 className="text-sm font-bold text-slate-300">Key Features</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)' }}
              >
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <div className="text-sm font-bold text-green-400 mb-0.5">{f.title}</div>
                  <div className="text-xs text-slate-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="glass-card p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(124,58,237,0.05), rgba(0,255,136,0.05))',
          border: '1px solid rgba(0,212,255,0.2)',
        }}
      >
        <div className="text-4xl mb-3">🎓</div>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <span className="shimmer-text">Information Security Lab Project</span>
        </h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mb-4 leading-relaxed">
          This application demonstrates how steganography can be implemented purely in the browser using modern web technologies, with no backend dependencies or external libraries.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['LSB Steganography', 'Canvas API', 'React', 'Tailwind CSS', 'No Backend', 'Educational'].map(tag => (
            <span key={tag} className="tag tag-cyan text-xs">{tag}</span>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-slate-700 text-xs">
        <p>Image Steganography Visualizer — Information Security Lab Presentation</p>
        <p className="mt-1">All processing is done locally in the browser. No data is transmitted to any server.</p>
      </div>
    </section>
  );
}
