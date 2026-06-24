import { useState, useRef } from 'react';
import SectionHeader from './SectionHeader';
import { getImageData } from '../utils/canvasUtils';
import { decodeMessage } from '../utils/lsb';
import { formatBinaryInChunks } from '../utils/binaryUtils';

const DECODE_STEPS = [
  { icon: '🖼️', label: 'Read encoded image pixels', color: '#00d4ff' },
  { icon: '🔍', label: 'Extract LSB from each channel', color: '#a855f7' },
  { icon: '🔗', label: 'Reconstruct binary stream', color: '#ff6b35' },
  { icon: '🔎', label: 'Detect delimiter & trim', color: '#fbbf24' },
  { icon: '📝', label: 'Convert binary to text', color: '#00ff88' },
];

export default function DecoderSection() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [decoding, setDecoding] = useState(false);
  const [decodeStep, setDecodeStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const fileInputRef = useRef();

  const handleFile = file => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setResult(null);
    setError('');
    setDone(false);
    setDecodeStep(-1);
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const runDecoding = async () => {
    if (!imageFile) { setError('Please upload an encoded image first.'); return; }
    setError('');
    setDecoding(true);
    setDone(false);
    setResult(null);

    for (let i = 0; i < DECODE_STEPS.length; i++) {
      setDecodeStep(i);
      await sleep(600);
    }

    try {
      const { imageData } = await getImageData(imageFile);
      const decoded = decodeMessage(imageData);
      setResult(decoded);
      setDone(true);
    } catch (e) {
      setError(e.message);
    }

    setDecoding(false);
    setDecodeStep(-1);
  };

  const binaryChunks = result ? formatBinaryInChunks(result.binary.slice(0, 128), 8) : [];

  return (
    <section id="decoder" className="section-container">
      <SectionHeader
        tag="Step 3 — Decode"
        title="Extract Hidden Messages"
        subtitle="Upload an image that was previously encoded with this tool to reveal the hidden secret message inside."
        accent="orange"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="glass-card p-8 cyber-border-purple">
          <div className="flex items-center gap-3 mb-6">
            <div className="glow-dot" style={{ background: '#a855f7', boxShadow: '0 0 10px #a855f7' }}></div>
            <h3 className="text-sm font-bold text-slate-300">Encoded Image</h3>
          </div>

          <div
            className="upload-zone mb-6"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          >
            <input
              ref={fileInputRef}
              id="decoder-image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleFile(e.target.files[0])}
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Encoded"
                style={{ maxHeight: 180, maxWidth: '100%', objectFit: 'contain', borderRadius: 8 }}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <span className="text-3xl">🔐</span>
                <span className="text-sm">Upload encoded image</span>
                <span className="text-xs text-slate-600">Drop a file encoded with this tool</span>
              </div>
            )}
          </div>

          <button
            id="decode-btn"
            className="btn-primary w-full"
            onClick={runDecoding}
            disabled={decoding || !imageFile}
            style={{ opacity: decoding || !imageFile ? 0.5 : 1 }}
          >
            {decoding ? '⏳ Decoding...' : '🔓 Decode Message'}
          </button>

          {error && (
            <div
              className="mt-3 p-3 rounded-lg"
              style={{ background: 'rgba(255,107,53,0.07)', border: '1px solid rgba(255,107,53,0.3)' }}
            >
              <p className="text-xs text-orange-400">❌ {error}</p>
            </div>
          )}
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="glow-dot" style={{ background: '#ff6b35', boxShadow: '0 0 10px #ff6b35' }}></div>
            <h3 className="text-sm font-bold text-slate-300">Decode Process</h3>
            {done && <span className="tag tag-green text-xs ml-auto">✓ Done</span>}
          </div>

          <div className="flex flex-col gap-3">
            {DECODE_STEPS.map((step, i) => {
              const isDone = done || i < decodeStep;
              const isActive = i === decodeStep && decoding;
              return (
                <div
                  key={i}
                  className={`process-step ${isActive ? 'active' : isDone ? 'done' : ''}`}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-500"
                    style={{
                      background: isDone
                        ? 'rgba(0,255,136,0.12)'
                        : isActive
                        ? `${step.color}18`
                        : 'rgba(30,58,95,0.3)',
                      border: `1px solid ${
                        isDone ? 'rgba(0,255,136,0.35)' : isActive ? `${step.color}50` : 'rgba(30,58,95,0.4)'
                      }`,
                    }}
                  >
                    {isDone ? '✓' : step.icon}
                  </div>
                  <p
                    className="text-sm font-medium flex-1 transition-colors"
                    style={{ color: isDone ? '#00ff88' : isActive ? step.color : '#64748b' }}
                  >
                    {step.label}
                  </p>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: step.color }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {done && result && (
        <div className="glass-card p-8 cyber-border-green animate-fade-in">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xl">🎉</span>
            <h3 className="text-base font-bold text-green-400">Message Successfully Decoded!</h3>
          </div>

          <div className="mb-6 p-6 rounded-xl" style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.25)' }}>
            <div className="text-xs text-green-500 font-semibold mb-2 uppercase tracking-widest">
              Extracted Message
            </div>
            <p
              className="text-xl font-semibold"
              style={{ color: '#e2e8f0', lineHeight: 1.6, wordBreak: 'break-word' }}
            >
              {result.text}
            </p>
          </div>

          <div className="mb-6 p-5 rounded-xl" style={{ background: 'rgba(2,8,23,0.7)', border: '1px solid rgba(30,58,95,0.5)' }}>
            <div className="text-xs text-slate-500 mb-2">Binary Stream (first 128 bits)</div>
            <div className="flex flex-wrap gap-1">
              {binaryChunks.map((chunk, i) => (
                <span
                  key={i}
                  className="mono text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: i % 2 === 0 ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)',
                    color: '#a855f7',
                    border: '1px solid rgba(168,85,247,0.15)',
                  }}
                >
                  {chunk}
                </span>
              ))}
              {result.binary.length > 128 && (
                <span className="text-slate-600 text-xs self-center">...{result.bitsRead - 128} more bits</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Characters', value: result.charactersDecoded, color: '#00ff88' },
              { label: 'Bits Read', value: result.bitsRead, color: '#00d4ff' },
              { label: 'Binary Bytes', value: Math.ceil(result.bitsRead / 8), color: '#a855f7' },
              { label: 'Status', value: 'Decoded ✓', color: '#fbbf24' },
            ].map((s, i) => (
              <div key={i} className="stat-card" style={{ borderColor: `${s.color}20` }}>
                <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                <div className="text-base font-bold mono" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
