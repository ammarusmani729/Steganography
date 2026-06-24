import { useState } from 'react';

const STEPS = [
  { icon: '📝', label: 'Convert message to binary', color: '#00d4ff' },
  { icon: '🖼️', label: 'Read image pixels via Canvas API', color: '#a855f7' },
  { icon: '🔧', label: 'Replace LSB of each channel', color: '#ff6b35' },
  { icon: '✨', label: 'Generate encoded image', color: '#00ff88' },
  { icon: '💾', label: 'Prepare for download', color: '#fbbf24' },
];

export default function EncodingProcessVisualizer({ currentStep, isEncoding, done }) {
  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="glow-dot"></div>
        <h3 className="text-sm font-bold text-slate-300">Encoding Process</h3>
        {isEncoding && (
          <span className="tag tag-cyan text-xs ml-auto animate-pulse">
            Processing...
          </span>
        )}
        {done && !isEncoding && (
          <span className="tag tag-green text-xs ml-auto">Complete ✓</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {STEPS.map((step, i) => {
          const isDone = done || i < currentStep;
          const isActive = i === currentStep && isEncoding;
          return (
            <div
              key={i}
              className={`process-step transition-all duration-500 ${
                isActive ? 'active' : isDone ? 'done' : ''
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-500"
                style={{
                  background: isDone
                    ? 'rgba(0,255,136,0.15)'
                    : isActive
                    ? `${step.color}20`
                    : 'rgba(30,58,95,0.3)',
                  border: `1px solid ${
                    isDone
                      ? 'rgba(0,255,136,0.4)'
                      : isActive
                      ? `${step.color}60`
                      : 'rgba(30,58,95,0.4)'
                  }`,
                }}
              >
                {isDone ? '✓' : step.icon}
              </div>

              <div className="flex-1">
                <p
                  className="text-sm font-medium transition-colors duration-500"
                  style={{
                    color: isDone ? '#00ff88' : isActive ? step.color : '#64748b',
                  }}
                >
                  Step {i + 1}: {step.label}
                </p>
                {isActive && (
                  <div className="mt-1.5 progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: '60%', background: `linear-gradient(90deg, ${step.color}, ${step.color}88)` }}
                    ></div>
                  </div>
                )}
              </div>

              {isDone && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#00ff88' }}
                ></div>
              )}
              {isActive && (
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: step.color }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
