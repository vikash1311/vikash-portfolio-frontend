import React from 'react';

const EXP = [
  {
    role: 'Full Stack Development Intern',
    company: "Chetan's Royals Webtech Pvt. Ltd., Nagpur",
    date: 'Dec 2025 — Present',
    highlight: '⚡ 10,000+ users · Govt. project · 4× performance gain',
    bullets: [
      'Built multiple full-stack applications including Tours & Travel platforms with dynamic admin panels using React, Node.js, Express, Supabase, and Nodemailer',
      'Engineered a scalable ID Card Generation System used by 10,000+ users, featuring role-based access, link-based data collection, and face detection image processing',
      'Contributed to a Government Vendor Management System handling 2000+ vendors with multi-role admin workflows; built analytics dashboard and expiry notifications',
      'Reduced API response time from 15–20 seconds to 1–5 seconds using pagination and controlled data loading',
      'Deployed full-stack apps on Render + Netlify; collaborated with clients across 4+ projects',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 4rem', maxWidth: 1200, margin: '0 auto' }}>
      <div className="reveal">
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: '#1A6CFF', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>// work_experience</div>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
          Where I've <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: '#1A6CFF' }}>Shipped</span>
        </h2>
        <p style={{ fontSize: '1rem', color: '#6B7280', maxWidth: 560, lineHeight: 1.7, marginBottom: '3.5rem' }}>Real-world systems, real users, real impact — building production software from day one.</p>
      </div>

      <div className="reveal" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #1A6CFF, #00D4AA, transparent)' }} />
        {EXP.map((exp, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#1A6CFF', border: '3px solid #F4F3EF', marginTop: 6, position: 'relative', zIndex: 1, justifySelf: 'center', boxShadow: '0 0 0 4px rgba(26,108,255,0.15)' }} />
            <div style={{ background: 'var(--card, #fff)', border: '1px solid var(--border, rgba(10,10,10,0.08))', borderRadius: 20, padding: '2rem', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{exp.role}</div>
                  <div style={{ fontSize: '0.85rem', color: '#1A6CFF', fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                </div>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted, #6B7280)', background: 'rgba(10,10,10,0.04)', padding: '0.3rem 0.8rem', borderRadius: 100, whiteSpace: 'nowrap' }}>{exp.date}</span>
              </div>
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: '0.9rem', color: 'var(--exp-bullet, #444)', lineHeight: 1.7, paddingLeft: '1.2rem', position: 'relative', marginBottom: '0.5rem' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#00D4AA', fontSize: '0.8rem' }}>↳</span>
                    {b}
                  </li>
                ))}
              </ul>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(0,212,170,0.08)', color: '#0A6B55', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.7rem', borderRadius: 100, border: '1px solid rgba(0,212,170,0.2)', marginTop: '1rem' }}>{exp.highlight}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){ #experience { padding: 4rem 1.5rem !important; } }`}</style>
    </section>
  );
}
