import SectionHeader from './SectionHeader';

function FlowBox({ label, isStartEnd = false }) {
  return (
    <div className={`flow-box ${isStartEnd ? 'start-end' : ''}`}>
      {label}
    </div>
  );
}

function FlowArrow({ label }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      {label && <span className="text-xs text-slate-600 font-mono">{label}</span>}
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <line x1="8" y1="0" x2="8" y2="14" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.5" />
        <polygon points="8,20 4,12 12,12" fill="#00d4ff" fillOpacity="0.5" />
      </svg>
    </div>
  );
}

const encodeFlow = [
  { label: 'START', isStartEnd: true },
  { arrow: true },
  { label: 'Upload Carrier Image' },
  { arrow: true },
  { label: 'Enter Secret Message' },
  { arrow: true },
  { label: 'Convert Text → Binary', note: 'ASCII → 8-bit binary' },
  { arrow: true },
  { label: 'Read Pixel RGB Values', note: 'Canvas API getImageData()' },
  { arrow: true },
  { label: 'Modify LSB of Each Channel', note: 'channel & 0xFE | bit' },
  { arrow: true },
  { label: 'Generate Encoded Image', note: 'putImageData() → PNG' },
  { arrow: true },
  { label: 'Download Image' },
  { arrow: true },
  { label: 'END', isStartEnd: true },
];

const decodeFlow = [
  { label: 'START', isStartEnd: true },
  { arrow: true },
  { label: 'Upload Encoded Image' },
  { arrow: true },
  { label: 'Read All Pixel LSBs', note: 'channel & 0x01' },
  { arrow: true },
  { label: 'Accumulate Binary Stream' },
  { arrow: true },
  { label: 'Detect Delimiter', note: '1111111111111110' },
  { arrow: true },
  { label: 'Trim to Message Bits' },
  { arrow: true },
  { label: 'Convert Binary → Text', note: 'Every 8 bits → ASCII char' },
  { arrow: true },
  { label: 'Display Message' },
  { arrow: true },
  { label: 'END', isStartEnd: true },
];

export default function AlgorithmFlowSection() {
  return (
    <section id="flow" className="section-container">
      <SectionHeader
        tag="Algorithm Flow"
        title="Encoding & Decoding Flowcharts"
        subtitle="Step-by-step visual representation of how the LSB steganography algorithm processes data during both encoding and decoding operations."
        accent="cyan"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: '🔒 Encoding Flow', flow: encodeFlow, color: '#00d4ff', accent: 'cyan' },
          { title: '🔓 Decoding Flow', flow: decodeFlow, color: '#00ff88', accent: 'green' },
        ].map((section, si) => (
          <div key={si} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <div
                className="glow-dot"
                style={{ background: section.color, boxShadow: `0 0 10px ${section.color}` }}
              ></div>
              <h3 className="text-base font-bold" style={{ color: section.color }}>
                {section.title}
              </h3>
            </div>

            <div className="flex flex-col items-center">
              {section.flow.map((item, i) => {
                if (item.arrow) {
                  return <FlowArrow key={i} label={item.note} />;
                }
                return (
                  <div key={i} className="w-full">
                    <FlowBox label={item.label} isStartEnd={item.isStartEnd} />
                    {item.note && !section.flow[i + 1]?.arrow && (
                      <div className="text-center text-xs text-slate-600 mono mt-1 mb-1">
                        {item.note}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 mt-6 cyber-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="glow-dot"></div>
          <h3 className="text-sm font-bold text-slate-300">Key Algorithm Properties</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: '🎯',
              title: 'Lossless Embedding',
              desc: 'Each bit change alters pixel value by at most ±1, imperceptible to human vision.',
              color: '#00d4ff',
            },
            {
              icon: '📊',
              title: 'Linear Capacity',
              desc: 'Capacity scales with image size: 3 bits per pixel (one per RGB channel).',
              color: '#00ff88',
            },
            {
              icon: '🔐',
              title: 'Reversible',
              desc: 'The original message can be fully reconstructed from the encoded image using the delimiter.',
              color: '#a855f7',
            },
          ].map((prop, i) => (
            <div
              key={i}
              className="p-4 rounded-xl"
              style={{
                background: `${prop.color}08`,
                border: `1px solid ${prop.color}25`,
              }}
            >
              <div className="text-2xl mb-2">{prop.icon}</div>
              <h4 className="text-sm font-bold mb-1" style={{ color: prop.color }}>
                {prop.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">{prop.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
