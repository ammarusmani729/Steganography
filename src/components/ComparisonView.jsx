import { useState } from 'react';

export default function ComparisonView({ originalSrc, encodedSrc, stats }) {
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState('side-by-side');

  if (!originalSrc || !encodedSrc) return null;

  return (
    <div className="glass-card p-6 mt-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="glow-dot"></div>
          <h3 className="text-sm font-bold text-slate-300">Original vs Encoded</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {['side-by-side', 'stacked'].map(m => (
              <button
                key={m}
                id={`view-mode-${m}`}
                onClick={() => setMode(m)}
                className="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: mode === m ? 'rgba(0,212,255,0.15)' : 'rgba(2,8,23,0.6)',
                  border: `1px solid ${mode === m ? 'rgba(0,212,255,0.4)' : 'rgba(30,58,95,0.5)'}`,
                  color: mode === m ? '#00d4ff' : '#64748b',
                }}
              >
                {m === 'side-by-side' ? '⊞ Side' : '☰ Stack'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              id="zoom-out"
              onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
              style={{ background: 'rgba(2,8,23,0.8)', border: '1px solid rgba(30,58,95,0.5)' }}
            >
              −
            </button>
            <span className="text-xs text-slate-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button
              id="zoom-in"
              onClick={() => setZoom(z => Math.min(3, z + 0.25))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
              style={{ background: 'rgba(2,8,23,0.8)', border: '1px solid rgba(30,58,95,0.5)' }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className={`grid gap-4 mb-4 ${mode === 'side-by-side' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {[
          { label: 'Original', src: originalSrc, color: '#a855f7', tag: 'tag-purple' },
          { label: 'Encoded', src: encodedSrc, color: '#00ff88', tag: 'tag-green' },
        ].map(img => (
          <div key={img.label}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`tag ${img.tag} text-xs`}>{img.label}</span>
            </div>
            <div
              className="rounded-xl overflow-auto"
              style={{
                background: 'rgba(2,8,23,0.8)',
                border: `1px solid ${img.color}30`,
                maxHeight: 280,
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                  display: 'block',
                  maxWidth: zoom <= 1 ? '100%' : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className="p-3 rounded-xl text-center"
        style={{
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.15)',
        }}
      >
        <p className="text-xs text-cyan-400 font-semibold">
          🔍 The images appear visually identical because only the least significant bits were modified.
          A 1-bit change in a 0–255 channel value causes a maximum brightness difference of less than 0.4%.
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Pixels Used', value: stats.pixelsUsed?.toLocaleString(), color: '#00d4ff' },
            { label: 'Bits Embedded', value: stats.totalBits?.toLocaleString(), color: '#a855f7' },
            { label: 'Message Length', value: `${stats.messageLength} chars`, color: '#00ff88' },
            { label: 'Image Dimensions', value: stats.dimensions, color: '#ff6b35' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="text-xs text-slate-500 mb-1">{s.label}</div>
              <div className="text-base font-bold mono" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
