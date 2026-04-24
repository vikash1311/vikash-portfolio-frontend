// import React from 'react';

// const EXP = [
//   {
//     role: 'Full Stack Development Intern',
//     company: "Chetan's Royals Webtech Pvt. Ltd., Nagpur",
//     date: 'Dec 2025 — Present',
//     highlight: '⚡ 10,000+ users · Govt. project · 4× performance gain',
//     bullets: [
//       'Built multiple full-stack applications including Tours & Travel platforms with dynamic admin panels using React, Node.js, Express, Supabase, and Nodemailer',
//       'Engineered a scalable ID Card Generation System used by 10,000+ users, featuring role-based access, link-based data collection, and face detection image processing',
//       'Contributed to a Government Vendor Management System handling 2000+ vendors with multi-role admin workflows; built analytics dashboard and expiry notifications',
//       'Reduced API response time from 15–20 seconds to 1–5 seconds using pagination and controlled data loading',
//       'Deployed full-stack apps on Render + Netlify; collaborated with clients across 4+ projects',
//     ],
//   },
// ];

// export default function Experience() {
//   return (
//     <section id="experience" style={{ padding: '6rem 4rem', maxWidth: 1200, margin: '0 auto' }}>
//       <div className="reveal">
//         <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: '#1A6CFF', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>// work_experience</div>
//         <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
//           Where I've <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: '#1A6CFF' }}>Shipped</span>
//         </h2>
//         <p style={{ fontSize: '1rem', color: '#6B7280', maxWidth: 560, lineHeight: 1.7, marginBottom: '3.5rem' }}>Real-world systems, real users, real impact — building production software from day one.</p>
//       </div>

//       <div className="reveal" style={{ position: 'relative' }}>
//         <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #1A6CFF, #00D4AA, transparent)' }} />
//         {EXP.map((exp, i) => (
//           <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '2rem', marginBottom: '3rem' }}>
//             <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#1A6CFF', border: '3px solid #F4F3EF', marginTop: 6, position: 'relative', zIndex: 1, justifySelf: 'center', boxShadow: '0 0 0 4px rgba(26,108,255,0.15)' }} />
//             <div style={{ background: 'var(--card, #fff)', border: '1px solid var(--border, rgba(10,10,10,0.08))', borderRadius: 20, padding: '2rem', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'default' }}
//               onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
//               onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
//                 <div>
//                   <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{exp.role}</div>
//                   <div style={{ fontSize: '0.85rem', color: '#1A6CFF', fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
//                 </div>
//                 <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted, #6B7280)', background: 'rgba(10,10,10,0.04)', padding: '0.3rem 0.8rem', borderRadius: 100, whiteSpace: 'nowrap' }}>{exp.date}</span>
//               </div>
//               <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
//                 {exp.bullets.map((b, j) => (
//                   <li key={j} style={{ fontSize: '0.9rem', color: 'var(--exp-bullet, #444)', lineHeight: 1.7, paddingLeft: '1.2rem', position: 'relative', marginBottom: '0.5rem' }}>
//                     <span style={{ position: 'absolute', left: 0, color: '#00D4AA', fontSize: '0.8rem' }}>↳</span>
//                     {b}
//                   </li>
//                 ))}
//               </ul>
//               <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(0,212,170,0.08)', color: '#0A6B55', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.7rem', borderRadius: 100, border: '1px solid rgba(0,212,170,0.2)', marginTop: '1rem' }}>{exp.highlight}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <style>{`@media(max-width:768px){ #experience { padding: 4rem 1.5rem !important; } }`}</style>
//     </section>
//   );
// }
import React from 'react';

const EXP = [
  {
    status: 'live',
    role: 'Jr. Software Developer',
    company: "Chetan's Royals Webtech Pvt. Ltd., Nagpur",
    date: 'Dec 2025 — Present',
    tag: '10,000+ users · Govt. project · 4× perf gain',
    bullets: [
      'Built full-stack Tours & Travel platforms with dynamic admin panels using React, Node.js, Express, Supabase, and Nodemailer',
      'Engineered a scalable ID Card Generation System for 10,000+ users with role-based access, link-based data collection, and face detection image processing',
      'Contributed to a Government Vendor Management System handling 2000+ vendors with multi-role workflows, analytics dashboard and expiry notifications',
      'Reduced API response time from 15–20s to 1–5s using pagination and controlled data loading',
      'Deployed full-stack apps on Render + Netlify across 4+ client projects',
    ],
  },
  {
    status: 'done',
    role: 'Frontend Developer Intern',
    company: 'All India Council for Technical Education (AICTE)',
    date: 'Aug 2025 — Oct 2025',
    tag: 'AICTE · Virtual · 3 months',
    bullets: [
      'Built responsive web interfaces using HTML, CSS, JavaScript, and React',
      'Developed dynamic UI components and improved overall user experience',
      'Followed best practices for clean code, accessibility, and design consistency',
      'Collaborated in a project-based virtual development environment',
    ],
  },
  {
    status: 'done',
    role: 'AI/ML Intern',
    company: 'StaxTech',
    date: 'Jul 2025 — Aug 2025',
    tag: 'AI/ML · Portfolio Optimization · 2 months',
    bullets: [
      'Worked on AI/ML-based projects including portfolio optimization and real-world problem solving',
      'Gained hands-on experience in machine learning concepts and model implementation',
      'Strengthened understanding of AI workflows and data-driven systems',
    ],
  },
];

const css = `
  @keyframes expPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.5); opacity: 0.35; }
  }
  @keyframes expFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .exp-reveal { animation: expFadeUp 0.55s ease both; }
  .exp-pulse  { animation: expPulse 1.4s ease-in-out infinite; }
  .exp-card-live {
    background: #fff;
    border: 1.5px solid #1A6CFF;
    border-radius: 14px;
    padding: 1.2rem 1.3rem;
    margin-bottom: 1rem;
    transition: transform 0.2s;
    cursor: default;
  }
  .exp-card-live:hover { transform: translateX(5px); }
  .exp-card-done {
    background: #F9F8F5;
    border: 0.5px solid rgba(10,10,10,0.08);
    border-radius: 14px;
    padding: 1.1rem 1.3rem;
    margin-bottom: 1rem;
    transition: transform 0.2s, border-color 0.2s;
    cursor: default;
  }
  .exp-card-done:hover { transform: translateX(5px); border-color: rgba(10,10,10,0.15); }
  @media (max-width: 640px) {
    #experience         { padding: 4rem 1.25rem !important; }
    .exp-layout         { grid-template-columns: 52px 1fr !important; }
  }
`;

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M2 6.5L5 9.5L11 3.5"
        stroke="rgba(10,10,10,0.3)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LiveNode() {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: '#fff', border: '2.5px solid #1A6CFF',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, zIndex: 2,
    }}>
      <div className="exp-pulse" style={{ width: 10, height: 10, borderRadius: '50%', background: '#1A6CFF' }} />
    </div>
  );
}

function DoneNode() {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: '#F4F3EF', border: '1.5px solid rgba(10,10,10,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, zIndex: 2,
    }}>
      <CheckIcon />
    </div>
  );
}

function Stub({ isLive }) {
  return (
    <div style={{
      height: 2, width: 22, alignSelf: 'flex-end',
      background: isLive ? '#1A6CFF' : 'rgba(10,10,10,0.12)',
      opacity: isLive ? 0.7 : 1,
    }} />
  );
}

function LiveCard({ exp, delay }) {
  return (
    <div className="exp-card-live exp-reveal" style={{ animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{exp.role}</div>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
          color: '#1A6CFF', background: 'rgba(26,108,255,0.08)',
          border: '0.5px solid rgba(26,108,255,0.2)',
          padding: '0.15rem 0.55rem', borderRadius: 100, whiteSpace: 'nowrap',
        }}>{exp.date}</span>
      </div>

      <div style={{ fontSize: '0.75rem', color: '#1A6CFF', fontWeight: 600, marginBottom: '0.5rem' }}>{exp.company}</div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: '0.63rem', fontWeight: 600, padding: '0.12rem 0.5rem',
        borderRadius: 100, background: 'rgba(26,108,255,0.08)',
        color: '#0C447C', border: '0.5px solid rgba(26,108,255,0.25)',
        marginBottom: '0.65rem',
      }}>
        <div className="exp-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#1A6CFF', flexShrink: 0 }} />
        currently here
      </div>

      <div style={{ height: 0.5, background: 'rgba(10,10,10,0.07)', marginBottom: '0.65rem' }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.32rem' }}>
        {exp.bullets.map((b, i) => (
          <li key={i} style={{ fontSize: '0.8rem', color: '#444', lineHeight: 1.6, display: 'flex', gap: '0.45rem' }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#00D4AA', flexShrink: 0, marginTop: '0.53rem' }} />
            {b}
          </li>
        ))}
      </ul>

      <span style={{
        display: 'inline-block', fontSize: '0.63rem', fontWeight: 600,
        padding: '0.15rem 0.55rem', borderRadius: 100, marginTop: '0.75rem',
        background: 'rgba(0,212,170,0.1)', color: '#085041',
        border: '0.5px solid rgba(0,212,170,0.25)',
      }}>{exp.tag}</span>
    </div>
  );
}

function DoneCard({ exp, delay }) {
  return (
    <div className="exp-card-done exp-reveal" style={{ animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'rgba(10,10,10,0.45)' }}>{exp.role}</div>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
          color: 'rgba(10,10,10,0.35)', background: '#fff',
          border: '0.5px solid rgba(10,10,10,0.1)',
          padding: '0.15rem 0.55rem', borderRadius: 100, whiteSpace: 'nowrap',
        }}>{exp.date}</span>
      </div>

      <div style={{ fontSize: '0.75rem', color: 'rgba(10,10,10,0.35)', fontWeight: 600, marginBottom: '0.5rem' }}>{exp.company}</div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: '0.63rem', fontWeight: 600, padding: '0.12rem 0.5rem',
        borderRadius: 100, background: '#fff',
        color: 'rgba(10,10,10,0.35)', border: '0.5px solid rgba(10,10,10,0.1)',
        marginBottom: '0.65rem',
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(10,10,10,0.25)', flexShrink: 0 }} />
        completed
      </div>

      <div style={{ height: 0.5, background: 'rgba(10,10,10,0.07)', marginBottom: '0.65rem' }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.32rem' }}>
        {exp.bullets.map((b, i) => (
          <li key={i} style={{ fontSize: '0.78rem', color: 'rgba(10,10,10,0.38)', lineHeight: 1.6, display: 'flex', gap: '0.45rem' }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(10,10,10,0.2)', flexShrink: 0, marginTop: '0.53rem' }} />
            {b}
          </li>
        ))}
      </ul>

      <span style={{
        display: 'inline-block', fontSize: '0.63rem', fontWeight: 600,
        padding: '0.15rem 0.55rem', borderRadius: 100, marginTop: '0.75rem',
        background: '#fff', color: 'rgba(10,10,10,0.35)',
        border: '0.5px solid rgba(10,10,10,0.1)',
      }}>{exp.tag}</span>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 4rem', maxWidth: 1100, margin: '0 auto' }}>
      <style>{css}</style>

      {/* Header */}
      <div className="exp-reveal" style={{ animationDelay: '0s' }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
          color: '#1A6CFF', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem',
        }}>
          // work_experience
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
          letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.5rem',
        }}>
          Where I've{' '}
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#1A6CFF' }}>
            Shipped
          </span>
        </h2>
        <p style={{ fontSize: '1rem', color: '#6B7280', maxWidth: 500, lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Real-world systems, real users, real impact — building production software from day one.
        </p>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#6B7280' }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              border: '2px solid #1A6CFF', background: '#fff', flexShrink: 0,
            }} />
            current
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#6B7280' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(10,10,10,0.2)', flexShrink: 0 }} />
            completed · moved on
          </div>
        </div>
      </div>

      {/* Timeline grid */}
      <div className="exp-layout" style={{ display: 'grid', gridTemplateColumns: '64px minmax(0,1fr)', gap: 0 }}>

        {/* Track column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ height: '1.15rem' }} />

          {/* Live node */}
          <Stub isLive={true} />
          <LiveNode />
          {/* Transition segment — solid fading to muted */}
          <div style={{ width: 3, flex: 1, minHeight: 12, background: 'rgba(10,10,10,0.08)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: '55%', background: '#1A6CFF', opacity: 0.3 }} />
          </div>

          {/* Done node 1 */}
          <Stub isLive={false} />
          <DoneNode />
          <div style={{ width: 3, flex: 1, minHeight: 12, background: 'rgba(10,10,10,0.08)' }} />

          {/* Done node 2 */}
          <Stub isLive={false} />
          <DoneNode />
        </div>

        {/* Cards column */}
        <div>
          {EXP.map((exp, i) =>
            exp.status === 'live'
              ? <LiveCard key={i} exp={exp} delay={0.1 + i * 0.12} />
              : <DoneCard key={i} exp={exp} delay={0.1 + i * 0.12} />
          )}
        </div>

      </div>
    </section>
  );
}