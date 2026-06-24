export default function SectionHeader({ tag, title, subtitle, accent = 'cyan' }) {
  const accentColors = {
    cyan: 'gradient-text-cyan',
    green: 'gradient-text-green',
    orange: 'gradient-text-orange',
  };

  const tagColors = {
    cyan: 'tag-cyan',
    green: 'tag-green',
    orange: 'tag-orange',
  };

  return (
    <div className="text-center mb-16">
      {tag && (
        <div className="flex justify-center mb-4">
          <span className={`tag ${tagColors[accent]}`}>
            <span className="glow-dot" style={{ width: 6, height: 6 }}></span>
            {tag}
          </span>
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${accentColors[accent]}`}
        style={{ fontFamily: 'Outfit, sans-serif' }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ margin: '5px' }} className="text-slate-400 text-base md:text-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
