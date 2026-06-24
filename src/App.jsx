import HeroSection from './components/HeroSection';
import AsciiDemoSection from './components/AsciiDemoSection';
import LsbPixelVisualizer from './components/LsbPixelVisualizer';
import EncoderSection from './components/EncoderSection';
import DecoderSection from './components/DecoderSection';
import AlgorithmFlowSection from './components/AlgorithmFlowSection';
import ProjectSummarySection from './components/ProjectSummarySection';

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: '#020817' }}>
      <div className="noise-overlay" />
      <HeroSection />

      <div className="section-divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <AsciiDemoSection />

      <div className="section-divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <LsbPixelVisualizer />

      <div className="section-divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <EncoderSection />

      <div className="section-divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <DecoderSection />

      <div className="section-divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <AlgorithmFlowSection />

      <div className="section-divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <ProjectSummarySection />
    </div>
  );
}
