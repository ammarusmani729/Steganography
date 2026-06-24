import { useRef, useState } from 'react';
import SectionHeader from './SectionHeader';
import { getCapacity } from '../utils/canvasUtils';

export default function ImageUploadSection({ onImageLoaded }) {
  const [dragOver, setDragOver] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  const handleFile = file => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const info = {
        name: file.name,
        size: file.size,
        width: img.width,
        height: img.height,
        type: file.type,
        capacity: getCapacity(img.width, img.height),
        file,
      };
      setImageInfo(info);
      setPreview(url);
      if (onImageLoaded) onImageLoaded(info);
    };
    img.src = url;
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const formatBytes = bytes => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <section id="upload" className="section-container">
      <SectionHeader
        tag="Step 1"
        title="Upload Your Image"
        subtitle="Choose a PNG image to serve as the carrier. The larger the image, the more secret data it can hold."
        accent="cyan"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div
            id="image-upload-zone"
            className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              id="image-file-input"
              type="file"
              accept="image/png,image/jpeg,image/bmp,image/webp"
              className="hidden"
              onChange={e => handleFile(e.target.files[0])}
            />
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300"
                style={{
                  background: dragOver
                    ? 'rgba(0,212,255,0.15)'
                    : 'rgba(30,58,95,0.3)',
                  border: `1px solid ${dragOver ? '#00d4ff' : 'rgba(30,58,95,0.5)'}`,
                }}
              >
                🖼️
              </div>
              <div>
                <p className="text-slate-300 font-semibold mb-1">
                  {dragOver ? 'Drop image here' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-slate-500 text-sm">
                  PNG, JPEG, BMP, WebP supported
                </p>
              </div>
              <button
                type="button"
                className="btn-secondary text-sm py-2 px-6"
                onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
              >
                Browse Files
              </button>
            </div>
          </div>
        </div>

        <div>
          {preview && imageInfo ? (
            <div className="glass-card p-4 h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="glow-dot"></div>
                <span className="text-sm font-semibold text-slate-300">Image Preview</span>
                <span className="tag tag-green text-xs ml-auto">Loaded</span>
              </div>
              <div
                className="rounded-xl overflow-hidden mb-4"
                style={{
                  border: '1px solid rgba(0,212,255,0.2)',
                  maxHeight: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(2,8,23,0.6)',
                }}
              >
                <img
                  src={preview}
                  alt="Uploaded preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'File Name', value: imageInfo.name, color: '#00d4ff' },
                  { label: 'Dimensions', value: `${imageInfo.width} × ${imageInfo.height} px`, color: '#00ff88' },
                  { label: 'File Size', value: formatBytes(imageInfo.size), color: '#a855f7' },
                  { label: 'Max Capacity', value: `~${imageInfo.capacity.toLocaleString()} chars`, color: '#ff6b35' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="stat-card"
                    style={{ borderColor: `${s.color}20` }}
                  >
                    <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                    <div
                      className="text-sm font-bold mono truncate"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="glass-card p-6 h-full flex flex-col items-center justify-center text-center gap-4"
              style={{ minHeight: 250 }}
            >
              <div className="text-4xl opacity-30">📷</div>
              <p className="text-slate-600 text-sm">
                Upload an image to see its details here
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
