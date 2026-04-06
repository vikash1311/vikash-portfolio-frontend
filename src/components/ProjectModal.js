import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev || '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(10,10,10,0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: '0',
      animation: 'fadeInOverlay 0.2s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg, #F4F3EF)',
        width: '100%', maxWidth: 780,
        maxHeight: '90vh',
        borderRadius: '24px 24px 0 0',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.35s cubic-bezier(0.22,1,0.36,1)',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ background: project.headerBg, padding: '2rem 2.5rem 1.5rem', position: 'relative', flexShrink: 0 }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(10,10,10,0.08)', border: 'none',
            fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}>✕</button>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{project.icon}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: '#1A6CFF', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>// case_study</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>{project.title}</h2>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', padding: '2rem 2.5rem', flex: 1 }}>

          {/* Stats row */}
          {project.stats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {project.stats.map((s, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 14, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A6CFF', fontFamily: "'DM Mono',monospace" }}>{s.value}</div>
                  <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Problem / Solution */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: '#FFF1F2', border: '1px solid rgba(255,77,109,0.12)', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: '#BE123C', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>// PROBLEM</div>
              <p style={{ fontSize: '0.88rem', color: '#333', lineHeight: 1.7, margin: 0 }}>{project.problem}</p>
            </div>
            <div style={{ background: '#ECFDF5', border: '1px solid rgba(0,212,170,0.15)', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: '#0A6B55', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>// SOLUTION</div>
              <p style={{ fontSize: '0.88rem', color: '#333', lineHeight: 1.7, margin: 0 }}>{project.solution}</p>
            </div>
          </div>

          {/* Tech stack */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: '#6B7280', letterSpacing: '0.12em', marginBottom: '0.8rem' }}>// TECH_STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.stack.map(t => (
                <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', padding: '0.35rem 0.85rem', borderRadius: 100, background: '#EEF3FF', color: '#1A4CAA', border: '1px solid rgba(26,108,255,0.12)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Key features */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: '#6B7280', letterSpacing: '0.12em', marginBottom: '0.8rem' }}>// KEY_FEATURES</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', fontSize: '0.88rem', color: '#444', lineHeight: 1.6 }}>
                  <span style={{ color: '#00D4AA', flexShrink: 0, marginTop: 2 }}>↳</span>{f}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid rgba(10,10,10,0.08)' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#0A0A0A', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Syne',sans-serif" }}>
                💻 View on GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1A6CFF', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Syne',sans-serif" }}>
                🚀 Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }
        @media(max-width:600px){
          .modal-problem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export const PROJECT_DATA = [
  {
    id: 'bug-tracker',
    title: 'Bug Tracker System',
    icon: '🐛',
    headerBg: 'linear-gradient(135deg,#EEF4FF,#DBEAFE)',
    stats: [
      { value: '15+', label: 'REST APIs' },
      { value: '+25%', label: 'Performance gain' },
      { value: 'JWT', label: 'Auth method' },
      { value: 'MySQL', label: 'Database' },
    ],
    problem: 'Development teams lacked a centralized, role-aware system to track bugs, assign tasks, and monitor resolution status across multiple projects.',
    solution: 'Built a full-stack bug tracking system with role-based access (Admin / Developer / Tester), JWT authentication, and 15+ REST APIs. SQL query optimization with indexing and pagination cut query time by ~25%.',
    stack: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'JWT', 'Spring Security', 'REST APIs'],
    features: [
      'Role-based access control — Admin, Developer, and Tester roles with different permissions',
      'JWT-based authentication with secure token refresh',
      '15+ REST APIs covering full CRUD for bugs, users, projects, and comments',
      'SQL query optimization using indexing and pagination — ~25% performance improvement',
      'Real-time status tracking: Open → In Progress → Resolved → Closed',
    ],
    github: 'https://github.com/vikash1311',
  },
  {
    id: 'ai-forgery',
    title: 'AI-Based Image Forgery Detection',
    icon: '🔬',
    headerBg: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)',
    stats: [
      { value: 'CNN', label: 'Model type' },
      { value: 'Govt.', label: 'Copyright' },
      { value: '3', label: 'Papers published' },
      { value: 'Flask', label: 'Deployed via' },
    ],
    problem: 'Digital image forgery is increasingly sophisticated and difficult to detect with the naked eye. Existing tools were either too slow or required expert knowledge to operate.',
    solution: 'Developed a CNN-based model leveraging JPEG artifact analysis to detect splicing, copy-move, and retouching forgeries. Integrated into a Flask web app for real-time inference — upload an image, get a result in seconds.',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'CNN', 'JPEG Analysis'],
    features: [
      'CNN model trained on JPEG artifact patterns to detect image splicing, copy-move, and retouching',
      'Flask web application for real-time inference — upload and detect in under 2 seconds',
      'Research published in 3 peer-reviewed international journals',
      'Government of India Copyright — Reg. No: L-151429/2024',
      'Preprocessing pipeline using OpenCV for noise reduction and feature extraction',
    ],
    github: 'https://github.com/vikash1311',
    papers: [
      { label: 'Paper 1 — IJSCI', url: 'https://ijsci.com/index.php/home/article/view/944' },
      { label: 'Paper 2 — IJFMR', url: 'https://www.ijfmr.com/research-paper.php?id=29653' },
      { label: 'Paper 3 — IJSREM', url: 'https://ijsrem.com/download/an-approach-for-digital-image-forgery-detection/' },
    ],
  },
];
