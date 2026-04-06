import React, { useEffect, useRef, useState } from 'react';
import Terminal from './Terminal';

const ROLES = ['Full Stack Developer', 'Java · Spring Boot', 'React.js Builder', 'AI Researcher'];

function useTypewriter(phrases) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setIdx((idx+1)%phrases.length); }
      }
    }, deleting ? 45 : 90);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, phrases]);
  return text;
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const statsRef = useRef(null);
  const [counted, setCounted] = useState(false);
  const [counts, setCounts] = useState({ users:0, projects:0, apis:0, cgpa:0 });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted) { setCounted(true); animateCounters(); }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  function animateCounters() {
    const targets = { users:10, projects:4, apis:15, cgpa:846 };
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1800, 1);
      const ease = 1 - Math.pow(1-progress, 3);
      setCounts({ users:Math.floor(ease*targets.users), projects:Math.floor(ease*targets.projects), apis:Math.floor(ease*targets.apis), cgpa:Math.floor(ease*targets.cgpa) });
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <section id="about" style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'8rem 4rem 4rem', position:'relative', overflow:'visible' }}>
      {/* BG blobs */}
      <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(26,108,255,0.06) 0%,transparent 70%)', top:-200, right:-100, pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,212,170,0.08) 0%,transparent 70%)', bottom:-100, left:-100, pointerEvents:'none' }} />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center', width:'100%', maxWidth:1200, margin:'0 auto' }} className="hero-grid">

        {/* Left */}
        <div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.78rem', color:'#1A6CFF', letterSpacing:'0.15em', marginBottom:'1.2rem', display:'flex', alignItems:'center', gap:'0.6rem' }}>
            <span style={{ width:24, height:1.5, background:'#1A6CFF', display:'inline-block' }} />
            Available for opportunities
          </div>
          <h1 style={{ fontSize:'clamp(3rem,6vw,5.5rem)', fontWeight:800, lineHeight:1.0, letterSpacing:'-0.03em', marginBottom:'0.3rem' }}>
            Vikash<br />
            <span style={{ fontFamily:"'Instrument Serif',serif", fontStyle:'italic', fontWeight:400, color:'#1A6CFF' }}>Gautam</span>
          </h1>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'1rem', color:'#1A6CFF', marginBottom:'1.2rem', height:'1.5rem', display:'flex', alignItems:'center', gap:4 }}>
            <span>{role}</span>
            <span style={{ borderRight:'2px solid #1A6CFF', height:'1.1em', animation:'blink 0.8s infinite' }} />
          </div>
          <p style={{ fontSize:'1.05rem', color:'#6B7280', lineHeight:1.7, marginBottom:'2rem', maxWidth:480 }}>
            Full Stack Developer building <strong style={{ color:'var(--black,#0A0A0A)' }}>scalable systems</strong> that serve thousands — and training models that think. Based in Nagpur, open to remote.
          </p>

          {/* Quick stats */}
          <div ref={statsRef} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'2.5rem', padding:'1.2rem', background:'var(--card,#fff)', borderRadius:16, border:'1.5px solid var(--border,rgba(10,10,10,0.08))' }}>
            {[{num:counts.users+'k+',label:'Users'},{num:counts.projects+'+',label:'Projects'},{num:counts.apis+'+',label:'APIs'},{num:(counts.cgpa/100).toFixed(2),label:'CGPA'}].map(s=>(
              <div key={s.label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'1.3rem', fontWeight:800, color:'#1A6CFF', fontFamily:"'DM Mono',monospace" }}>{s.num}</div>
                <div style={{ fontSize:'0.68rem', color:'#6B7280', fontFamily:"'DM Mono',monospace", marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
<a href="#projects"
  style={{
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    background: 'var(--accent, #1A6CFF)',   // always a visible blue
    color: '#fff',
    padding: '0.85rem 2rem', borderRadius: 100,
    fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none',
    transition: 'transform 0.2s, background 0.2s', cursor: 'none'
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
  onMouseLeave={e => e.currentTarget.style.transform = ''}>
  View My Work →
</a>
            <a href="#resume"
              style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'transparent', color:'var(--black,#0A0A0A)', padding:'0.85rem 2rem', borderRadius:100, border:'1.5px solid rgba(10,10,10,0.2)', fontSize:'0.88rem', fontWeight:600, textDecoration:'none', transition:'transform 0.2s, border-color 0.2s, color 0.2s', cursor:'none' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.borderColor='#1A6CFF'; e.currentTarget.style.color='#1A6CFF'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(10,10,10,0.2)'; e.currentTarget.style.color='var(--black,#0A0A0A)'; }}>
              View Resume
            </a>
          </div>
        </div>

        {/* Right — Terminal */}
        <div className="hero-visual" style={{ display:'flex', flexDirection:'column', gap:'1.5rem', alignItems:'flex-start' }}>
          <Terminal />
          {/* Floating badges */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.7rem' }}>
            {[
              { text:'AIR 12,757 — GATE 2026', dot:true },
              { text:'🏛️ Govt. Copyright' },
              { text:'⚡ 15s → 1s' },
            ].map((b,i) => (
              <div key={i} style={{ background:'var(--card,#fff)', border:'1.5px solid var(--border,rgba(10,10,10,0.08))', borderRadius:100, padding:'0.45rem 0.9rem', fontSize:'0.76rem', fontWeight:600, display:'inline-flex', alignItems:'center', gap:'0.4rem', boxShadow:'0 4px 12px rgba(0,0,0,0.05)', animation:`float2 ${4+i}s ease-in-out infinite ${i*0.5}s` }}>
                {b.dot && <span style={{ width:7, height:7, borderRadius:'50%', background:'#00D4AA', animation:'pulse 2s infinite', flexShrink:0 }} />}
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-visual { width: 100% !important; }
          #about { padding: 7rem 1.5rem 3rem !important; }
        }
      `}</style>
    </section>
  );
}
