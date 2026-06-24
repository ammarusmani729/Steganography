import { useState, useRef } from 'react';
import SectionHeader from './SectionHeader';
import EncodingProcessVisualizer from './EncodingProcessVisualizer';
import ComparisonView from './ComparisonView';
import { getImageData, imageDataToDataURL, getCapacity } from '../utils/canvasUtils';
import { encodeMessage } from '../utils/lsb';
import { textToBinary } from '../utils/binaryUtils';

export default function EncoderSection() {
  const [imageInfo, setImageInfo] = useState(null);
  const [originalSrc, setOriginalSrc] = useState(null);
  const [message, setMessage] = useState('');
  const [encodedSrc, setEncodedSrc] = useState(null);
  const [encodingStep, setEncodingStep] = useState(-1);
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodingDone, setEncodingDone] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const imageInputRef = useRef();

  const handleImageFile = file => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImageInfo({ file, width: img.width, height: img.height });
      setOriginalSrc(url);
      setEncodedSrc(null);
      setEncodingDone(false);
      setStats(null);
      setError('');
    };
    img.src = url;
  };

  const messageBinary = textToBinary(message);
  const capacity = imageInfo ? getCapacity(imageInfo.width, imageInfo.height) : 0;
  const isOverCapacity = message.length > capacity;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const runEncoding = async () => {
    if (!imageInfo || !message.trim()) {
      setError(!imageInfo ? 'Please upload an image first.' : 'Please enter a message.');
      return;
    }
    if (isOverCapacity) {
      setError(`Message too long. Max capacity is ~${capacity} characters.`);
      return;
    }
    setError('');
    setIsEncoding(true);
    setEncodingDone(false);
    setEncodedSrc(null);

    setEncodingStep(0);
    await sleep(700);
    setEncodingStep(1);

    const { imageData, width, height } = await getImageData(imageInfo.file);

    await sleep(700);
    setEncodingStep(2);
    await sleep(700);

    let result;
    try {
      result = encodeMessage(imageData, message);
    } catch (e) {
      setError(e.message);
      setIsEncoding(false);
      return;
    }

    setEncodingStep(3);
    await sleep(700);
    const dataUrl = imageDataToDataURL(result.encodedData, width, height);

    setEncodingStep(4);
    await sleep(600);

    setEncodedSrc(dataUrl);
    setStats({
      ...result.stats,
      dimensions: `${width} × ${height}`,
    });
    setIsEncoding(false);
    setEncodingDone(true);
    setEncodingStep(-1);
  };

  const handleDownload = () => {
    if (!encodedSrc) return;
    const a = document.createElement('a');
    a.href = encodedSrc;
    a.download = 'encoded-image.png';
    a.click();
  };

  const handleClear = () => {
    setMessage('');
    setEncodedSrc(null);
    setEncodingDone(false);
    setStats(null);
    setError('');
    setEncodingStep(-1);
  };

  return (
    <section id="encoder" className="section-container">
      <SectionHeader
        tag="Step 2 — Encode"
        title="Hide Your Secret Message"
        subtitle="Upload a carrier image, type your secret message, and encode it using the LSB algorithm. The resulting image will look identical to the original."
        accent="green"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="glass-card p-8 cyber-border-green">
          <div className="flex items-center gap-3 mb-6">
            <div className="glow-dot" style={{ background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></div>
            <h3 className="text-sm font-bold text-slate-300">Carrier Image</h3>
          </div>

          <div
            className="upload-zone mb-6"
            onClick={() => imageInputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleImageFile(e.dataTransfer.files[0]); }}
          >
            <input
              ref={imageInputRef}
              id="encoder-image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleImageFile(e.target.files[0])}
            />
            {originalSrc ? (
              <img
                src={originalSrc}
                alt="Carrier"
                style={{ maxHeight: 160, maxWidth: '100%', objectFit: 'contain', borderRadius: 8 }}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <span className="text-3xl">🖼️</span>
                <span className="text-sm">Click or drop image here</span>
              </div>
            )}
          </div>

          {imageInfo && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Width', value: `${imageInfo.width}px`, color: '#00d4ff' },
                { label: 'Height', value: `${imageInfo.height}px`, color: '#a855f7' },
                { label: 'Capacity', value: `~${capacity} ch`, color: '#00ff88' },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ borderColor: `${s.color}20` }}>
                  <div className="text-xs text-slate-600 mb-1">{s.label}</div>
                  <div className="text-sm font-bold mono" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="glow-dot" style={{ background: '#a855f7', boxShadow: '0 0 10px #a855f7' }}></div>
              <h3 className="text-sm font-bold text-slate-300">Secret Message</h3>
            </div>
            <span
              className="text-xs mono"
              style={{ color: isOverCapacity ? '#ff6b35' : '#64748b' }}
            >
              {message.length} / {capacity || '?'} chars
            </span>
          </div>

          <textarea
            id="secret-message-input"
            className="textarea-cyber mb-4"
            placeholder="Type your secret message here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
          />

          {message.length > 0 && (
            <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(2,8,23,0.7)', border: '1px solid rgba(30,58,95,0.5)' }}>
              <div className="text-xs text-slate-500 mb-1">Binary Preview ({messageBinary.length} bits)</div>
              <div
                className="text-xs mono break-all leading-relaxed"
                style={{ color: '#a855f7', maxHeight: 60, overflow: 'hidden' }}
              >
                {messageBinary.slice(0, 128)}{messageBinary.length > 128 ? '...' : ''}
              </div>
            </div>
          )}

          {isOverCapacity && (
            <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(255,107,53,0.07)', border: '1px solid rgba(255,107,53,0.3)' }}>
              <p className="text-xs text-orange-400">⚠ Message exceeds image capacity. Please shorten your message or use a larger image.</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(255,107,53,0.07)', border: '1px solid rgba(255,107,53,0.3)' }}>
              <p className="text-xs text-orange-400">❌ {error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              id="encode-btn"
              className="btn-primary flex-1"
              onClick={runEncoding}
              disabled={isEncoding || !imageInfo || !message.trim() || isOverCapacity}
              style={{ opacity: isEncoding || !imageInfo || !message.trim() ? 0.5 : 1 }}
            >
              {isEncoding ? '⏳ Encoding...' : '🔒 Encode Message'}
            </button>
            <button
              id="clear-encoder-btn"
              className="btn-danger"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <EncodingProcessVisualizer
        currentStep={encodingStep}
        isEncoding={isEncoding}
        done={encodingDone}
      />

      {encodingDone && encodedSrc && (
          <div className="glass-card p-8 cyber-border-green">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-lg">✅</span>
              <h3 className="text-sm font-bold text-green-400">Encoding Successful!</h3>
            </div>
            <button id="download-encoded-btn" className="btn-green" onClick={handleDownload}>
              ⬇ Download encoded-image.png
            </button>
          </div>

          <ComparisonView
            originalSrc={originalSrc}
            encodedSrc={encodedSrc}
            stats={stats}
          />
        </div>
      )}
    </section>
  );
}
