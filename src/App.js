import React, { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import ResumePreview from './components/ResumePreview';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import useScrollReveal from './hooks/useScrollReveal';

/* ── Theme variables ── */
const LIGHT = {
  '--bg':'#F4F3EF', '--card':'#FFFFFF', '--black':'#0A0A0A',
  '--muted':'#6B7280', '--border':'rgba(10,10,10,0.08)',
  '--tag-bg':'#EEF3FF', '--tag-color':'#1A4CAA',
  '--section-dark-bg':'#0A0A0A', '--exp-bullet':'#444444',
  '--input-bg':'#F4F3EF', '--footer-border':'rgba(10,10,10,0.08)',
  '--project-card-bg':'#FFFFFF',
  '--project-card-border':'rgba(10,10,10,0.08)',
  '--project-card-title':'#0A0A0A',
  '--project-card-muted':'#6B7280',
  '--project-card-tag-bg':'#EEF3FF',
  '--project-card-tag-color':'#1A4CAA',
  '--project-card-divider':'rgba(10,10,10,0.06)',
  '--project-card-shadow':'rgba(0,0,0,0.09)',
};
const DARK = {
  '--bg':            '#1A1A1A',
  '--card':          '#242424',
  '--black':         '#F5F5F5',
  '--muted':         '#A0A0A0',
  '--border':        'rgba(255,255,255,0.08)',
  '--tag-bg':        'rgba(255,255,255,0.07)',
  '--tag-color':     '#D0D0D0',
  '--section-dark-bg':'#111111',
  '--exp-bullet':    '#C8C8C8',
  '--input-bg':      '#2A2A2A',
  '--footer-border': 'rgba(255,255,255,0.07)',
  '--project-card-bg':'#0D0D0D',
  '--project-card-border':'rgba(255,255,255,0.08)',
  '--project-card-title':'#F5F5F5',
  '--project-card-muted':'#888888',
  '--project-card-tag-bg':'rgba(255,255,255,0.07)',
  '--project-card-tag-color':'#C0C0C0',
  '--project-card-divider':'rgba(255,255,255,0.07)',
  '--project-card-shadow':'rgba(0,0,0,0.5)',
};

function applyTheme(dark) {
  const vars = dark ? DARK : LIGHT;
  Object.entries(vars).forEach(([k,v]) => document.documentElement.style.setProperty(k,v));
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.body.style.background = dark ? '#1A1A1A' : '#F4F3EF';
  document.body.style.color = dark ? '#F5F5F5' : '#0A0A0A';
}

/* ── Custom cursor ── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x:0, y:0 });
  const ring = useRef({ x:0, y:0 });

  useEffect(() => {
    if (window.matchMedia('(max-width:768px)').matches) return;
    const dot = dotRef.current; const ringEl = ringRef.current;
    const move = e => { pos.current={x:e.clientX,y:e.clientY}; if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';} };
    document.addEventListener('mousemove', move);
    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x)*0.12;
      ring.current.y += (pos.current.y - ring.current.y)*0.12;
      if(ringEl){ringEl.style.left=ring.current.x+'px';ringEl.style.top=ring.current.y+'px';}
      raf = requestAnimationFrame(animate);
    };
    animate();
    const grow = () => { if(dot) dot.style.transform='translate(-50%,-50%) scale(2.5)'; if(ringEl){ringEl.style.width='56px';ringEl.style.height='56px';ringEl.style.opacity='0.3';} };
    const shrink = () => { if(dot) dot.style.transform='translate(-50%,-50%) scale(1)'; if(ringEl){ringEl.style.width='36px';ringEl.style.height='36px';ringEl.style.opacity='0.6';} };
    const timer = setTimeout(() => {
      document.querySelectorAll('a,button,.project-card,.skill-card,.ach-card').forEach(el => {
        el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink);
      });
    }, 800);
    return () => { document.removeEventListener('mousemove',move); cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      if (barRef.current) barRef.current.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div ref={barRef} style={{ position:'fixed', top:0, left:0, height:3, background:'linear-gradient(to right,#1A6CFF,#00D4AA)', zIndex:9999, width:0, transition:'width 0.08s linear' }} />;
}

/* ── Dark mode toggle button ── */
function ThemeToggle({ dark, onToggle }) {
  return (
    <button onClick={onToggle} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position:'fixed', bottom:'2rem', right:'2rem', zIndex:500,
        width:48, height:48, borderRadius:'50%',
        background: dark ? '#1A1A1A' : '#fff',
        border: `1.5px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(10,10,10,0.12)'}`,
        boxShadow:'0 4px 20px rgba(0,0,0,0.12)',
        cursor:'pointer', fontSize:'1.3rem', display:'flex', alignItems:'center', justifyContent:'center',
        transition:'transform 0.2s, background 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform='scale(1.1) rotate(12deg)'}
      onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('vg-theme');
    return saved === 'dark'; // default is always light unless user explicitly chose dark
  });

  useScrollReveal();

  useEffect(() => { applyTheme(dark); }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('vg-theme', next ? 'dark' : 'light');
  };

  const handleLoadDone = useCallback(() => {
    setLoading(false);
    // Guarantee scroll is always unlocked after loading
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.documentElement.style.overflow = '';
  }, []);

  return (
    <>
      {loading && <LoadingScreen onDone={handleLoadDone} />}
      <CustomCursor />
      <ScrollProgress />
      <ThemeToggle dark={dark} onToggle={toggleTheme} />
      <Navbar dark={dark} />
      <main style={{ opacity: loading ? 0 : 1, transition:'opacity 0.4s ease 0.1s', overflow: 'visible' }}>
        <Hero />
        <div style={{ padding:'0 2rem' }}><Skills /></div>
        <Experience />
        <Projects />
        <Achievements />
        <ResumePreview />
        <Contact />
      </main>
      <footer style={{ textAlign:'center', padding:'2rem', fontFamily:"'DM Mono',monospace", fontSize:'0.75rem', color:'#6B7280', borderTop:`1px solid ${dark?'rgba(255,255,255,0.08)':'rgba(10,10,10,0.08)'}` }}>
        <span>Built with React · © 2025 Vikash Gautam · </span>
        <span style={{ color:'#1A6CFF' }}>console.log("Hello, World 🌏")</span>
      </footer>
    </>
  );
}