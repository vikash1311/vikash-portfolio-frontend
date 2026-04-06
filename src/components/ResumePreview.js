import React, { useState } from 'react';

const RESUME_URL = 'https://drive.google.com/file/d/1tLWqPHuErcBLojQMiqXhVdFcXopt6ic5/view?usp=drivesdk';
const RESUME_EMBED = 'https://drive.google.com/file/d/1tLWqPHuErcBLojQMiqXhVdFcXopt6ic5/preview';
const RESUME_DOWNLOAD = 'https://drive.google.com/uc?export=download&id=1tLWqPHuErcBLojQMiqXhVdFcXopt6ic5';

export default function ResumePreview() {
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="resume" style={{ padding: '0 4rem 6rem', maxWidth: 1200, margin: '0 auto' }}>
      <div className="reveal">
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: '#1A6CFF', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>// resume</div>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
          My <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: '#1A6CFF' }}>Resume</span>
        </h2>
        <p style={{ fontSize: '1rem', color: '#6B7280', maxWidth: 560, lineHeight: 1.7, marginBottom: '2rem' }}>View or download my full resume — no redirects, right here.</p>
      </div>

      <div className="reveal" style={{ background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 24, overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(10,10,10,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem', background: '#FAFAF8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EEF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📄</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Vikash_Gautam_Resume.pdf</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: '#6B7280' }}>Full Stack Developer · 2025</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <button onClick={() => setExpanded(!expanded)} style={{
              fontFamily: "'Syne',sans-serif", fontSize: '0.8rem', fontWeight: 600,
              padding: '0.5rem 1.1rem', borderRadius: 100,
              background: 'transparent', border: '1.5px solid var(--border,rgba(10,10,10,0.15))',
              color: 'var(--black,#0A0A0A)', cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {expanded ? '↑ Collapse' : '↕ Expand'}
            </button>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" style={{
              fontFamily: "'Syne',sans-serif", fontSize: '0.8rem', fontWeight: 600,
              padding: '0.5rem 1.1rem', borderRadius: 100,
              background: 'transparent', border: '1.5px solid var(--border,rgba(10,10,10,0.15))',
              color: 'var(--black,#0A0A0A)', textDecoration: 'none',
            }}>
              🔗 Open
            </a>
            <a href={RESUME_DOWNLOAD} target="_blank" rel="noreferrer" style={{
              fontFamily: "'Syne',sans-serif", fontSize: '0.8rem', fontWeight: 700,
              padding: '0.5rem 1.1rem', borderRadius: 100,
              background: '#1A6CFF', color: '#fff', textDecoration: 'none',
            }}>
              ↓ Download
            </a>
          </div>
        </div>

        {/* PDF Embed */}
        <div style={{ position: 'relative', height: expanded ? 900 : 520, transition: 'height 0.4s ease', background: '#f0f0f0' }}>
          {!loaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#F4F3EF' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(26,108,255,0.15)', borderTopColor: '#1A6CFF', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', color: '#6B7280' }}>Loading resume...</div>
            </div>
          )}
          <iframe
            src={RESUME_EMBED}
            width="100%"
            height="100%"
            style={{ border: 'none', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
            title="Vikash Gautam Resume"
            onLoad={() => setLoaded(true)}
            allow="autoplay"
          />
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:768px){ #resume { padding: 0 1.5rem 4rem !important; } }
      `}</style>
    </section>
  );
}