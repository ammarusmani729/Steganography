export default function GlassCard({ children, className = '', glow = false, style = {} }) {
  return (
    <div
      className={`glass-card p-20 m-10 ${glow ? 'cyber-border' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
