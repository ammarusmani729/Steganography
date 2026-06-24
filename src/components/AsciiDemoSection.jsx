import { useState } from 'react';
import SectionHeader from './SectionHeader';
import { textToAsciiArray, formatBinaryInChunks } from '../utils/binaryUtils';

export default function AsciiDemoSection() {
  const [input, setInput] = useState('Hello');

  const chars = textToAsciiArray(input.slice(0, 12));
  const fullBinary = chars.map(c => c.binary).join('');
  const chunks = formatBinaryInChunks(fullBinary, 8);

  return (
    <section id="ascii-demo" className="section-container">
      <SectionHeader
        tag="Interactive Demo"
        title="ASCII & Binary Representation"
        subtitle="Type any text below to watch it transform into ASCII codes and binary digits in real time. This is how computers represent every character."
        accent="green"
      />

      <div className="glass-card p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-semibold text-slate-300">
            Enter Text (max 12 chars)
          </label>
          <span className="tag tag-green text-xs">{input.length}/12 chars</span>
        </div>
        <input
          id="ascii-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value.slice(0, 12))}
          className="input-cyber"
          placeholder="Type something..."
          maxLength={12}
        />
      </div>

      {chars.length > 0 && (
        <>
          <div className="overflow-x-auto mb-8 py-4">
            <div className="flex gap-6 px-2 pb-6 pt-2" style={{ minWidth: 'max-content' }}>
              {chars.map((c, i) => (
                <div
                  key={i}
                  className="glass-card p-8 text-center flex-shrink-0 transition-all duration-300"
                  style={{
                    minWidth: 132,
                    border: '1px solid rgba(0,255,136,0.2)',
                    boxShadow: '0 0 12px rgba(0,255,136,0.05)',
                  }}
                >
                  <div
                    className="text-3xl font-black mb-3"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#00ff88',
                      textShadow: '0 0 20px rgba(0,255,136,0.5)',
                    }}
                  >
                    {c.char === ' ' ? '⎵' : c.char}
                  </div>
                  <div className="text-xs text-slate-500 mb-2">Character</div>
                  <div
                    className="text-lg font-bold mb-2"
                    style={{ color: '#00d4ff', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {c.ascii}
                  </div>
                  <div className="text-xs text-slate-500 mb-3">ASCII</div>
                  <div
                    className="text-xs font-mono"
                    style={{ color: '#a855f7', letterSpacing: '0.05em' }}
                  >
                    {c.binary}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">Binary</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="glow-dot"></div>
              <h3 className="text-sm font-semibold text-slate-300">
                Full Binary Stream
              </h3>
              <span className="tag tag-purple text-xs">{fullBinary.length} bits total</span>
            </div>
            <div
              className="p-5 rounded-lg font-mono text-sm leading-loose break-all"
              style={{
                background: 'rgba(2,8,23,0.9)',
                border: '1px solid rgba(30,58,95,0.6)',
                color: '#a855f7',
                letterSpacing: '0.08em',
                lineHeight: 2,
              }}
            >
              {chunks.map((chunk, i) => (
                <span key={i}>
                  <span
                    style={{
                      color: i % 2 === 0 ? '#a855f7' : '#7c3aed',
                      background:
                        i % 2 === 0 ? 'rgba(168,85,247,0.08)' : 'rgba(124,58,237,0.08)',
                      borderRadius: '3px',
                      padding: '1px 2px',
                    }}
                  >
                    {chunk}
                  </span>{' '}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Input Text',
                value: input || '—',
                color: '#00ff88',
                bg: 'rgba(0,255,136,0.05)',
                border: 'rgba(0,255,136,0.2)',
                icon: '📝',
              },
              {
                label: 'Total Characters',
                value: chars.length,
                color: '#00d4ff',
                bg: 'rgba(0,212,255,0.05)',
                border: 'rgba(0,212,255,0.2)',
                icon: '🔤',
              },
              {
                label: 'Total Bits',
                value: fullBinary.length,
                color: '#a855f7',
                bg: 'rgba(168,85,247,0.05)',
                border: 'rgba(168,85,247,0.2)',
                icon: '💾',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-6 rounded-xl text-center transition-all duration-300"
                style={{
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                }}
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div
                  className="text-2xl font-black mono mb-1"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
