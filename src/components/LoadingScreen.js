import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Never lock body scroll — just overlay visually
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) { p = 100; clearInterval(interval); }
      setProgress(Math.min(Math.round(p), 100));
    }, 120);
    const fadeTimer = setTimeout(() => setFade(true), 1800);
    const doneTimer = setTimeout(() => onDone(), 2200);
    return () => { clearInterval(interval); clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#0A0A0A',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '2.5rem',
      opacity: fade ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: fade ? 'none' : 'all',
    }}>
      {/* Animated monogram */}
      <div style={{ position: 'relative', width: 120, height: 120 }}>
        {/* Rotating ring */}
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, animation: 'spinRing 3s linear infinite' }}>
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(26,108,255,0.15)" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="54" fill="none" stroke="#1A6CFF" strokeWidth="1.5"
            strokeDasharray="80 260" strokeLinecap="round" />
        </svg>
        {/* Second ring counter-rotating */}
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, animation: 'spinRingReverse 4s linear infinite' }}>
          <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(0,212,170,0.1)" strokeWidth="1" />
          <circle cx="60" cy="60" r="46" fill="none" stroke="#00D4AA" strokeWidth="1"
            strokeDasharray="40 250" strokeLinecap="round" />
        </svg>
        {/* Center VG */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 2,
        }}>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 800,
            background: 'linear-gradient(135deg, #1A6CFF, #00D4AA)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
          }}>VG</div>
        </div>
      </div>

      {/* Name */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#FAFAF8', letterSpacing: '0.05em' }}>Vikash Gautam</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: '0.15em' }}>// loading portfolio</div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(to right, #1A6CFF, #00D4AA)',
          borderRadius: 2,
          width: progress + '%',
          transition: 'width 0.15s ease',
        }} />
      </div>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: -20 }}>{progress}%</div>

      <style>{`
        @keyframes spinRing { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinRingReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}
