import React, { useEffect, useRef, useState } from 'react';

const SKILL_CATS = [
  { icon: '⚙️', title: 'Backend', color: 'rgba(26,108,255,0.15)', iconColor: '#1A6CFF', tags: ['Java', 'Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'JWT', 'Spring Security'] },
  { icon: '🖥️', title: 'Frontend', color: 'rgba(0,212,170,0.15)', iconColor: '#00D4AA', tags: ['React.js', 'HTML', 'CSS', 'Tailwind CSS'] },
  { icon: '🗄️', title: 'Databases', color: 'rgba(255,77,109,0.15)', iconColor: '#FF4D6D', tags: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'Supabase'] },
  { icon: '🤖', title: 'AI / ML', color: 'rgba(139,92,246,0.15)', iconColor: '#7C3AED', tags: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'CNN'] },
  { icon: '🚀', title: 'DevOps & Tools', color: 'rgba(245,158,11,0.15)', iconColor: '#D97706', tags: ['Git', 'GitHub', 'Postman', 'Netlify', 'Render'] },
  { icon: '📐', title: 'Languages', color: 'rgba(16,185,129,0.15)', iconColor: '#059669', tags: ['Java', 'Python', 'C++', 'JavaScript'] },
];

const PROFICIENCY = [
  { skill: 'Java', level: 88, color: '#B07219' },
  { skill: 'Spring Boot', level: 85, color: '#6DB33F' },
  { skill: 'React.js', level: 82, color: '#61DAFB' },
  { skill: 'Node.js', level: 80, color: '#339933' },
  { skill: 'Python', level: 78, color: '#3572A5' },
  { skill: 'MySQL', level: 85, color: '#4479A1' },
  { skill: 'MongoDB', level: 75, color: '#47A248' },
  { skill: 'TensorFlow', level: 72, color: '#FF6F00' },
];

function ProgressBar({ skill, level, color, animate }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{skill}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{animate ? level : 0}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: animate ? level + '%' : '0%',
          background: `linear-gradient(to right, ${color}99, ${color})`,
          borderRadius: 2,
          transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)',
          transitionDelay: '0.1s',
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" style={{ background: '#0A0A0A', padding: '5rem 4rem', borderRadius: 28 }} ref={ref}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal">
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: '#00D4AA', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>// tech_stack</div>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#FAFAF8', marginBottom: '1rem' }}>
            Skills &amp; <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: '#00D4AA' }}>Technologies</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', maxWidth: 500, lineHeight: 1.7, marginBottom: '3rem' }}>Every tool in the arsenal — from backend systems to neural networks.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="skills-inner-grid">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.2rem' }}>
            {SKILL_CATS.map((sk, i) => (
              <div key={sk.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.2rem', transition: 'background 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = ''; }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: sk.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', marginBottom: '0.8rem' }}>{sk.icon}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FAFAF8', marginBottom: '0.6rem' }}>{sk.title}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {sk.tags.map(t => (
                    <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', padding: '0.2rem 0.55rem', borderRadius: 100, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '2rem' }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: '#1A6CFF', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>// proficiency_levels</div>
            {PROFICIENCY.map(p => <ProgressBar key={p.skill} {...p} animate={animate} />)}
            <div style={{ marginTop: '1.2rem', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 10, fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
              * Based on project complexity and time invested
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){
          #skills { padding: 3rem 1.5rem !important; }
          .skills-inner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
