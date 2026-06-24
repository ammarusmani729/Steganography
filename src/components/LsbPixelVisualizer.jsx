import { useState } from 'react';
import SectionHeader from './SectionHeader';
import { numberToBinary8 } from '../utils/binaryUtils';

function BitRow({ label, value, highlightLSB, color }) {
  const bits = numberToBinary8(value);

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-6 font-bold text-sm text-center flex-shrink-0 mono" style={{ color }}>
        {label}
      </div>
      <div className="w-16 text-right mono font-bold text-sm flex-shrink-0" style={{ color: '#64748b' }}>
        {value}
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {bits.split('').map((bit, i) => {
          const isLSB = i === 7;
          return (
            <div key={i} className={`bit-cell ${isLSB && highlightLSB ? 'lsb' : bit === '1' ? 'active' : ''}`}>
              {bit}
            </div>
          );
        })}
      </div>
      <div className="text-xs text-slate-600 mono hidden md:block">{bits}</div>
    </div>
  );
}

export default function LsbPixelVisualizer() {
  const [r, setR] = useState(178);
  const [g, setG] = useState(201);
  const [b, setB] = useState(227);
  const [msgBit, setMsgBit] = useState(1);
  const [selectedChannel, setSelectedChannel] = useState(0);

  const channels = [
    { label: 'R', value: r, color: '#ef4444', setter: setR },
    { label: 'G', value: g, color: '#22c55e', setter: setG },
    { label: 'B', value: b, color: '#3b82f6', setter: setB },
  ];

  const ch = channels[selectedChannel];
  const originalBinary = numberToBinary8(ch.value);
  const modifiedValue = (ch.value & 0b11111110) | msgBit;
  const modifiedBinary = numberToBinary8(modifiedValue);
  const changed = originalBinary[7] !== modifiedBinary[7];

  return (
    <section id="lsb-demo" className="section-container">
      <SectionHeader
        tag="Algorithm Visualization"
        title="LSB Pixel Modification"
        subtitle="Adjust the RGB pixel values and choose a message bit to see exactly how the Least Significant Bit algorithm modifies individual channels to embed secret data."
        accent="cyan"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
        <div className="glass-card p-8 cyber-border">
          <div className="flex items-center gap-3 mb-8">
            <div className="glow-dot"></div>
            <h3 className="text-sm font-bold text-slate-300">Pixel Controls</h3>
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            {channels.map((ch, i) => (
              <div key={i}>
                <label className="text-xs font-semibold mb-2 block" style={{ color: ch.color }}>
                  {ch.label} Channel
                </label>
                <input
                  id={`channel-${ch.label}`}
                  type="number"
                  min="0"
                  max="255"
                  value={ch.value}
                  onChange={e => {
                    const v = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                    ch.setter(v);
                  }}
                  className="input-cyber text-center mono"
                  style={{ borderColor: `${ch.color}40` }}
                />
              </div>
            ))}
          </div>
{/* 
          <div
            className="w-full h-20 rounded-xl mb-8 transition-colors duration-300 border"
            style={{ background: `rgb(${r}, ${g}, ${b})`, borderColor: 'rgba(30,58,95,0.5)' }}
          /> */}

          <div className="mb-8">
            <label className="text-xs font-semibold text-slate-400 mb-2 block">
              Select Channel to Modify
            </label>
            <div className="flex gap-3">
              {channels.map((ch, i) => (
                <button
                  key={i}
                  id={`select-channel-${ch.label}`}
                  onClick={() => setSelectedChannel(i)}
                  className="flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-200"
                  style={{
                    background: selectedChannel === i ? `${ch.color}20` : 'rgba(2,8,23,0.8)',
                    border: `1px solid ${selectedChannel === i ? ch.color : 'rgba(30,58,95,0.6)'}`,
                    color: selectedChannel === i ? ch.color : '#64748b',
                  }}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 mb-2 block">
              Message Bit to Embed
            </label>
            <div className="flex gap-2">
              {[0, 1].map(bit => (
                <button
                  key={bit}
                  id={`msg-bit-${bit}`}
                  onClick={() => setMsgBit(bit)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 mono"
                  style={{
                    background: msgBit === bit ? 'rgba(0,212,255,0.15)' : 'rgba(2,8,23,0.8)',
                    border: `1px solid ${msgBit === bit ? '#00d4ff' : 'rgba(30,58,95,0.6)'}`,
                    color: msgBit === bit ? '#00d4ff' : '#64748b',
                  }}
                >
                  Bit {bit}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="glow-dot" style={{ background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></div>
            <h3 className="text-sm font-bold text-slate-300">Bit Visualization</h3>
          </div>

          <div className="p-6 rounded-xl mb-6" style={{ background: 'rgba(2,8,23,0.7)', border: '1px solid rgba(30,58,95,0.5)' }}>
            <div className="flex items-center gap-5 text-xs text-slate-500 mb-5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="bit-cell active" style={{ width: 18, height: 18, fontSize: '0.6rem' }}>1</span>
                <span>Active bit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bit-cell lsb" style={{ width: 18, height: 18, fontSize: '0.6rem' }}>x</span>
                <span>LSB (bit 0)</span>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-1 pl-10">
              <span className="w-16 text-right text-xs text-slate-600 mono mr-1">Value</span>
              <div className="flex gap-2 ml-2">
                {['7', '6', '5', '4', '3', '2', '1', '0'].map(bit => (
                  <span key={bit} className="w-8 text-center text-xs mono" style={{ color: bit === '0' ? '#ff6b35' : '#334155' }}>
                    {bit}
                  </span>
                ))}
              </div>
            </div>

            {channels.map((ch, i) => (
              <BitRow key={i} label={ch.label} value={ch.value} highlightLSB={selectedChannel === i} color={ch.color} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-xl" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <div className="text-xs text-slate-500 mb-1">Original {ch.label} Value</div>
              <div className="text-2xl font-black mono" style={{ color: ch.color }}>{ch.value}</div>
              <div className="text-xs mono text-slate-400 mt-1">{originalBinary}</div>
            </div>
            <div
              className="p-5 rounded-xl"
              style={{
                background: changed ? 'rgba(0,255,136,0.07)' : 'rgba(100,116,139,0.07)',
                border: `1px solid ${changed ? 'rgba(0,255,136,0.3)' : 'rgba(100,116,139,0.2)'}`,
              }}
            >
              <div className="text-xs text-slate-500 mb-1">After LSB Embed</div>
              <div className="text-2xl font-black mono" style={{ color: changed ? '#00ff88' : '#64748b' }}>
                {modifiedValue}
              </div>
              <div className="text-xs mono text-slate-400 mt-1">{modifiedBinary}</div>
            </div>
          </div>

          <div className="p-5 rounded-xl text-center" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div className="text-xs text-yellow-400 font-semibold mb-1">Pixel Value Change</div>
            <div className="text-xl font-black mono text-yellow-300">
              Δ = {Math.abs(ch.value - modifiedValue)}
              {' '}
              <span className="text-sm font-normal text-slate-500">
                {changed ? '(1-bit flip)' : '(already matches)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
