import React, { useEffect, useState } from 'react';

const PAPERS = [
  { title: 'An Approach for Digital Image Forgery Detection', journal: 'IJSREM', url: 'https://ijsrem.com/download/an-approach-for-digital-image-forgery-detection/', badgeColor: '#EFF6FF', badgeText: '#1D4ED8' },
  { title: 'Digital Image Forgery Detection using JPEG Artifacts', journal: 'IJSCI', url: 'https://ijsci.com/index.php/home/article/view/944', badgeColor: '#F5F3FF', badgeText: '#6D28D9' },
  { title: 'Image Forgery Detection — Deep Learning Approach', journal: 'IJFMR', url: 'https://www.ijfmr.com/research-paper.php?id=29653', badgeColor: '#ECFDF5', badgeText: '#065F46' },
];

const ACH = [
  { icon: '🏆', bg: '#FEF3C7', title: 'GATE 2026 — Data Science & AI', desc: 'Improved by ~5,000 positions in one year.', num: 'AIR 12,757' },
  { icon: '📊', bg: '#EFF6FF', title: 'GATE 2026 — CS & IT', desc: 'Qualified in Computer Science & IT stream.', num: 'Qualified ✓' },
  { icon: '🎓', bg: '#EFF6FF', title: 'B.Tech — AI', desc: 'G.H. Raisoni College, Nagpur · 2022–2026', num: 'CGPA 8.46' },
  { icon: '📈', bg: '#FEF3C7', title: 'GATE 2025', desc: 'Previous year baseline — improved 5,034 ranks.', num: 'AIR 17,791' },
];

function VisitorCounter() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/vikash-gautam-portfolio/visits')
      .then(r => r.json())
      .then(d => setCount(d.value))
      .catch(() => setCount(null));
  }, []);
  if (!count) return null;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 100, padding: '0.45rem 1rem', marginBottom: '2rem' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite', display: 'inline-block' }} />
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: '#6B7280' }}>
        Visited by <strong style={{ color: '#0A0A0A' }}>{count.toLocaleString()}</strong> people
      </span>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: '6rem 4rem', maxWidth: 1200, margin: '0 auto' }}>
      <div className="reveal">
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: '#1A6CFF', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>// research_achievements</div>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
          Milestones &amp; <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: '#1A6CFF' }}>Recognition</span>
        </h2>
        <p style={{ fontSize: '1rem', color: '#6B7280', maxWidth: 560, lineHeight: 1.7, marginBottom: '1.5rem' }}>Published research, government copyright, competitive rankings.</p>
        <VisitorCounter />
      </div>

      {/* Papers */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted,#6B7280)', letterSpacing: '0.12em', marginBottom: '1rem' }}>// published_papers</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
          {PAPERS.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noreferrer"
              style={{ background: 'var(--project-card-bg,#fff)', border: '1px solid var(--project-card-border,rgba(10,10,10,0.08))', borderRadius: 18, padding: '1.4rem', textDecoration: 'none', color: 'var(--project-card-title,#0A0A0A)', display: 'flex', flexDirection: 'column', gap: '0.7rem', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.2rem' }}>📄</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '0.2rem 0.65rem', borderRadius: 100, background: p.badgeColor, color: p.badgeText }}>Peer Reviewed</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.4 }}>{p.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: 'var(--project-card-muted,#6B7280)' }}>{p.journal}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A6CFF' }}>Read →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted,#6B7280)', letterSpacing: '0.12em', marginBottom: '1rem' }}>// copyright</div>
        <a href="https://drive.google.com/file/d/1kqD7doPYv-i6OHx0abJyu_fPluiTmfIr/view?usp=drivesdk" target="_blank" rel="noreferrer"
          style={{ background: 'linear-gradient(135deg,#FFFBEB,#FEF3C7)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 18, padding: '1.5rem 2rem', textDecoration: 'none', color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', transition: 'transform 0.2s, box-shadow 0.2s', maxWidth: 680 }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(245,158,11,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>🏛️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem', color: '#1C1008' }}>Government of India — Official Copyright</div>
              <div style={{ fontSize: '0.82rem', color: '#92400E' }}>Digital Image Forgery Detection Using JPEG</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: '#B45309', marginTop: 2 }}>Reg. No: L-151429/2024</div>
            </div>
          </div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#B45309' }}>View Certificate →</span>
        </a>
      </div>

      {/* Exam / Education */}
      <div className="reveal">
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted,#6B7280)', letterSpacing: '0.12em', marginBottom: '1rem' }}>// exam_education</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1rem' }}>
          {ACH.map((a, i) => (
            <div key={i} style={{ background: 'var(--project-card-bg,#fff)', border: '1px solid var(--project-card-border,rgba(10,10,10,0.08))', borderRadius: 18, padding: '1.4rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px var(--project-card-shadow,rgba(0,0,0,0.09))`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{a.icon}</div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.2rem', color: 'var(--project-card-title,#0A0A0A)' }}>{a.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--project-card-muted,#6B7280)', lineHeight: 1.6 }}>{a.desc}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A6CFF', fontFamily: "'DM Mono',monospace", marginTop: '0.3rem' }}>{a.num}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){ #achievements { padding: 4rem 1.5rem !important; } }`}</style>
    </section>
  );
}