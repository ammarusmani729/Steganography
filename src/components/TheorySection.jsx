import { useState } from 'react';
import SectionHeader from './SectionHeader';
import GlassCard from './GlassCard';

const theoryCards = [
  {
    icon: '🔍',
    title: 'What is Steganography?',
    color: '#00d4ff',
    content:
      'Steganography is the practice of hiding secret information within an ordinary, non-secret file or message to avoid detection. Unlike encryption, which scrambles data, steganography conceals its very existence. The word comes from Greek: steganos (covered) + graphia (writing).',
    tag: 'Core Concept',
    tagClass: 'tag-cyan',
  },
  {
    icon: '⚔️',
    title: 'Steganography vs Cryptography',
    color: '#a855f7',
    content:
      'Cryptography transforms data into an unreadable format — anyone can see that a secret exists but cannot read it. Steganography hides the existence of the secret itself — the message is invisible to observers. They can be combined for maximum security: encrypt first, then hide.',
    tag: 'Comparison',
    tagClass: 'tag-purple',
    comparison: [
      { label: 'Cryptography', detail: 'Hides the content' },
      { label: 'Steganography', detail: 'Hides the existence' },
    ],
  },
  {
    icon: '🗂️',
    title: 'Types of Steganography',
    color: '#00ff88',
    content: 'Steganography works across multiple media types:',
    tag: 'Types',
    tagClass: 'tag-green',
    types: [
      { icon: '🖼️', name: 'Image', desc: 'Hides data in pixel values (LSB method)' },
      { icon: '🔊', name: 'Audio', desc: 'Modifies least significant audio samples' },
      { icon: '🎬', name: 'Video', desc: 'Embeds in individual frames over time' },
      { icon: '📄', name: 'Text', desc: 'Uses whitespace or Unicode variations' },
    ],
  },
  {
    icon: '🌍',
    title: 'Real-World Applications',
    color: '#ff6b35',
    content: 'Steganography is deployed in critical real-world scenarios:',
    tag: 'Applications',
    tagClass: 'tag-orange',
    apps: [
      { icon: '🪖', name: 'Military Communication', desc: 'Covert channel for field operatives' },
      { icon: '🔐', name: 'Secure Messaging', desc: 'Hidden communication for whistleblowers' },
      { icon: '💧', name: 'Digital Watermarking', desc: 'Invisible ownership markers in media' },
      { icon: '©️', name: 'Copyright Protection', desc: 'Track unauthorized distribution' },
    ],
  },
];

export default function TheorySection() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="theory" className="section-container">
      <SectionHeader
        tag="Educational Foundation"
        title="Understanding Steganography"
        subtitle="Build your knowledge from the ground up — explore the theory, comparisons, types, and real-world use cases of information hiding."
        accent="cyan"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {theoryCards.map((card, idx) => (
          <div
            key={idx}
            className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
              activeCard === idx ? 'cyber-border' : ''
            }`}
            style={{
              transform: activeCard === idx ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow:
                activeCard === idx
                  ? `0 8px 30px ${card.color}22, 0 0 0 1px ${card.color}33`
                  : 'none',
            }}
            onClick={() => setActiveCard(activeCard === idx ? null : idx)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
              >
                {card.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`tag ${card.tagClass} text-xs`}>{card.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {card.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-4">{card.content}</p>

            {card.comparison && (
              <div className="grid grid-cols-2 gap-3">
                {card.comparison.map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg text-center"
                    style={{
                      background: i === 0 ? 'rgba(168,85,247,0.08)' : 'rgba(0,212,255,0.08)',
                      border: `1px solid ${i === 0 ? 'rgba(168,85,247,0.25)' : 'rgba(0,212,255,0.25)'}`,
                    }}
                  >
                    <div
                      className="text-xs font-bold mb-1"
                      style={{ color: i === 0 ? '#a855f7' : '#00d4ff' }}
                    >
                      {c.label}
                    </div>
                    <div className="text-xs text-slate-400">{c.detail}</div>
                  </div>
                ))}
              </div>
            )}

            {card.types && (
              <div className="grid grid-cols-2 gap-2">
                {card.types.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-3 rounded-lg"
                    style={{
                      background: 'rgba(0,255,136,0.05)',
                      border: '1px solid rgba(0,255,136,0.15)',
                    }}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-green-400">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {card.apps && (
              <div className="grid grid-cols-2 gap-2">
                {card.apps.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-3 rounded-lg"
                    style={{
                      background: 'rgba(255,107,53,0.05)',
                      border: '1px solid rgba(255,107,53,0.15)',
                    }}
                  >
                    <span className="text-lg">{a.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-orange-400">{a.name}</div>
                      <div className="text-xs text-slate-500">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: card.color }}
              ></span>
              {activeCard === idx ? 'Click to collapse' : 'Click to highlight'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
