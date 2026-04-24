// import React, { useEffect, useState } from 'react';
// import ProjectModal, { PROJECT_DATA } from './ProjectModal';

// const GITHUB_USER = 'vikash1311';

// const LANG_COLORS = {
//   JavaScript:'#F7DF1E', TypeScript:'#3178C6', Python:'#3572A5',
//   Java:'#B07219', HTML:'#E34C26', CSS:'#563D7C',
//   'C++':'#F34B7D', Shell:'#89E051', 'Jupyter Notebook':'#DA5B0B',
// };

// const ACCENTS = [
//   { color:'#3B82F6', light:'rgba(59,130,246,0.08)',  dark:'rgba(59,130,246,0.15)'  },
//   { color:'#10B981', light:'rgba(16,185,129,0.08)',  dark:'rgba(16,185,129,0.15)'  },
//   { color:'#8B5CF6', light:'rgba(139,92,246,0.08)',  dark:'rgba(139,92,246,0.15)'  },
//   { color:'#F59E0B', light:'rgba(245,158,11,0.08)',  dark:'rgba(245,158,11,0.15)'  },
//   { color:'#F43F5E', light:'rgba(244,63,94,0.08)',   dark:'rgba(244,63,94,0.15)'   },
//   { color:'#06B6D4', light:'rgba(6,182,212,0.08)',   dark:'rgba(6,182,212,0.15)'   },
// ];

// function timeAgo(d) {
//   const s = (Date.now() - new Date(d)) / 1000;
//   if (s < 3600) return `${Math.floor(s/60)}m ago`;
//   if (s < 86400) return `${Math.floor(s/3600)}h ago`;
//   if (s < 2592000) return `${Math.floor(s/86400)}d ago`;
//   if (s < 31536000) return `${Math.floor(s/2592000)}mo ago`;
//   return `${Math.floor(s/31536000)}y ago`;
// }

// function Skeleton() {
//   return (
//     <div style={{ background:'var(--project-card-bg,#fff)', border:'1px solid var(--project-card-border,rgba(10,10,10,0.08))', borderRadius:20, overflow:'hidden', opacity:0.6 }}>
//       <div style={{ height:4, background:'#e5e7eb' }} />
//       <div style={{ padding:'1.5rem' }}>
//         <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
//           <div className="skeleton" style={{ height:22, width:80, borderRadius:100 }} />
//           <div className="skeleton" style={{ height:16, width:30 }} />
//         </div>
//         <div className="skeleton" style={{ height:20, width:'65%', marginBottom:10 }} />
//         <div className="skeleton" style={{ height:11, width:'100%', marginBottom:6 }} />
//         <div className="skeleton" style={{ height:11, width:'80%', marginBottom:20 }} />
//         <div style={{ display:'flex', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid rgba(0,0,0,0.05)' }}>
//           <div className="skeleton" style={{ height:14, width:60 }} />
//           <div className="skeleton" style={{ height:28, width:70, borderRadius:100 }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Projects() {
//   const [repos, setRepos]         = useState([]);
//   const [filtered, setFiltered]   = useState([]);
//   const [langs, setLangs]         = useState([]);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [status, setStatus]       = useState('loading');
//   const [modal, setModal]         = useState(null);

//   useEffect(() => {
//     fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`)
//       .then(r => { if (!r.ok) throw new Error(); return r.json(); })
//       .then(data => {
//         const list = data
//           .filter(r => !r.fork)
//           .sort((a,b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));
//         const ul = ['All', ...new Set(list.map(r => r.language).filter(Boolean))];
//         setRepos(list); setFiltered(list); setLangs(ul); setStatus('success');
//       })
//       .catch(() => setStatus('error'));
//   }, []);

//   const filter = (lang) => {
//     setActiveFilter(lang);
//     setFiltered(lang === 'All' ? repos : repos.filter(r => r.language === lang));
//   };

//   const getProjectData = (name) =>
//     PROJECT_DATA.find(p => name.toLowerCase().includes(p.id.split('-')[0]));

//   return (
//     <section id="projects" style={{ padding:'6rem 4rem', maxWidth:1200, margin:'0 auto' }}>

//       <div className="reveal">
//         <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.75rem', color:'#1A6CFF', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'0.8rem' }}>// github_projects</div>
//         <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:'1rem' }}>
//           Things I've <span style={{ fontFamily:"'Instrument Serif',serif", fontStyle:'italic', fontWeight:400, color:'#1A6CFF' }}>Built</span>
//         </h2>
//         <p style={{ fontSize:'1rem', color:'var(--muted,#6B7280)', maxWidth:560, lineHeight:1.7, marginBottom:'2rem' }}>
//           Live from GitHub — always up to date. Click any card for a full case study.
//         </p>
//       </div>

//       {/* Status + filters */}
//       <div className="reveal" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginBottom:'2.5rem' }}>
//         <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
//           <span style={{ width:8, height:8, borderRadius:'50%', background: status==='error'?'#EF4444':'#10B981', display:'inline-block', animation: status==='success'?'pulse 2s infinite':'none' }} />
//           <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.72rem', color:'var(--muted,#6B7280)' }}>
//             {status==='loading' && 'Fetching from GitHub...'}
//             {status==='success' && <>Live · <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" style={{ color:'#1A6CFF', textDecoration:'none' }}>github.com/{GITHUB_USER}</a> · {repos.length} repos</>}
//             {status==='error'   && 'Could not load repos'}
//           </span>
//         </div>
//         {status==='success' && (
//           <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
//             {langs.map(l => (
//               <button key={l} onClick={() => filter(l)}
//                 style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.68rem', padding:'0.3rem 0.85rem', borderRadius:100,
//                   border:`1.5px solid ${activeFilter===l ? '#1A6CFF' : 'var(--border,rgba(10,10,10,0.12))'}`,
//                   background: activeFilter===l ? '#1A6CFF' : 'transparent',
//                   color: activeFilter===l ? '#fff' : 'var(--muted,#6B7280)',
//                   cursor:'pointer', transition:'all 0.2s' }}>
//                 {l==='All' ? 'All repos' : l}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Grid */}
//       <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'1.5rem' }}>
//         {status==='loading' && [1,2,3].map(i => <Skeleton key={i} />)}

//         {status==='error' && (
//           <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'3rem', background:'var(--card,#fff)', borderRadius:20, border:'1px solid var(--border,rgba(10,10,10,0.08))' }}>
//             <div style={{ fontSize:'1.5rem', marginBottom:'0.8rem' }}>⚠️</div>
//             <div style={{ fontWeight:700, marginBottom:'0.4rem', color:'var(--black,#0A0A0A)' }}>Couldn't load repositories</div>
//             <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" style={{ color:'#1A6CFF', fontSize:'0.88rem' }}>View directly on GitHub →</a>
//           </div>
//         )}

//         {status==='success' && filtered.map((repo, i) => {
//           const acc = ACCENTS[i % ACCENTS.length];
//           const lc  = LANG_COLORS[repo.language] || '#8B949E';
//           const caseStudy = getProjectData(repo.name);
//           const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
//           const accentBg = isDark ? acc.dark : acc.light;

//           return (
//             <div key={repo.id}
//               style={{
//                 background: 'var(--project-card-bg,#fff)',
//                 border: '1px solid var(--project-card-border,rgba(10,10,10,0.08))',
//                 borderRadius: 20,
//                 overflow: 'hidden',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'transform 0.25s, box-shadow 0.25s',
//                 animation: `fadeUp 0.4s ease both`,
//                 animationDelay: `${i * 0.05}s`,
//                 cursor: 'default',
//               }}
//               onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=`0 20px 48px rgba(0,0,0,0.12), 0 0 0 2px ${acc.color}44`; }}
//               onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>

//               {/* Accent top bar */}
//               <div style={{ height:4, background: acc.color, flexShrink:0 }} />

//               <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', flex:1 }}>

//                 {/* Language pill + stars */}
//                 <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
//                   <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
//                     {repo.language && (
//                       <span style={{
//                         fontFamily:"'DM Mono',monospace", fontSize:'0.68rem', fontWeight:600,
//                         padding:'0.3rem 0.8rem', borderRadius:100,
//                         background: accentBg, color: acc.color,
//                         display:'inline-flex', alignItems:'center', gap:5,
//                         border:`1px solid ${acc.color}33`,
//                       }}>
//                         <span style={{ width:6, height:6, borderRadius:'50%', background:lc, flexShrink:0 }} />
//                         {repo.language}
//                       </span>
//                     )}
//                     {(repo.topics||[]).slice(0,1).map(t => (
//                       <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.64rem', padding:'0.25rem 0.65rem', borderRadius:100, background:'var(--project-card-tag-bg,#F3F4F6)', color:'var(--project-card-muted,#6B7280)', border:'1px solid var(--project-card-border,rgba(10,10,10,0.08))' }}>{t}</span>
//                     ))}
//                   </div>
//                   <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
//                     {repo.stargazers_count > 0 && (
//                       <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', color: acc.color, display:'flex', alignItems:'center', gap:3 }}>
//                         <svg width="10" height="10" viewBox="0 0 12 12" fill={acc.color}><path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4z"/></svg>
//                         {repo.stargazers_count}
//                       </span>
//                     )}
//                     {repo.forks_count > 0 && (
//                       <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', color:'var(--project-card-muted,#6B7280)' }}>⑂ {repo.forks_count}</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Repo name */}
//                 <div style={{ fontSize:'1.08rem', fontWeight:800, color:'var(--project-card-title,#0A0A0A)', letterSpacing:'-0.01em', marginBottom:'0.5rem', textTransform:'capitalize', lineHeight:1.3 }}>
//                   {repo.name.replace(/[-_]/g, ' ')}
//                 </div>

//                 {/* Description */}
//                 <p style={{ fontSize:'0.84rem', color:'var(--project-card-muted,#6B7280)', lineHeight:1.7, marginBottom:'1.2rem', flex:1 }}>
//                   {repo.description || 'No description provided.'}
//                 </p>

//                 {/* Footer */}
//                 <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'1rem', borderTop:`1px solid var(--project-card-divider,rgba(10,10,10,0.06))` }}>
//                   <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', color:'var(--project-card-muted,#6B7280)', display:'flex', alignItems:'center', gap:4 }}>
//                     <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="4.5"/><path d="M6 3.5v2.5l1.5 1.5" strokeLinecap="round"/></svg>
//                     {timeAgo(repo.updated_at)}
//                   </span>
//                   <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
//                     {caseStudy && (
//                       <button onClick={() => setModal(caseStudy)}
//                         style={{ fontFamily:"'Syne',sans-serif", fontSize:'0.72rem', fontWeight:700,
//                           color: acc.color, background: accentBg,
//                           border:`1px solid ${acc.color}44`,
//                           borderRadius:100, padding:'0.32rem 0.85rem',
//                           cursor:'pointer', transition:'all 0.2s' }}
//                         onMouseEnter={e => { e.currentTarget.style.background=acc.color; e.currentTarget.style.color='#fff'; }}
//                         onMouseLeave={e => { e.currentTarget.style.background=accentBg; e.currentTarget.style.color=acc.color; }}>
//                         Case Study ↗
//                       </button>
//                     )}
//                     <a href={repo.html_url} target="_blank" rel="noreferrer"
//                       style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.68rem', fontWeight:600,
//                         color:'var(--project-card-title,#0A0A0A)', textDecoration:'none',
//                         display:'inline-flex', alignItems:'center', gap:5,
//                         padding:'0.32rem 0.8rem', borderRadius:100,
//                         border:'1px solid var(--project-card-border,rgba(10,10,10,0.12))',
//                         transition:'all 0.2s' }}
//                       onMouseEnter={e => { e.currentTarget.style.borderColor=acc.color; e.currentTarget.style.color=acc.color; }}
//                       onMouseLeave={e => { e.currentTarget.style.borderColor='var(--project-card-border,rgba(10,10,10,0.12))'; e.currentTarget.style.color='var(--project-card-title,#0A0A0A)'; }}>
//                       <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
//                       GitHub
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {status==='success' && (
//         <div style={{ textAlign:'center', marginTop:'3rem' }}>
//           <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"
//             style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem',
//               background:'transparent', color:'var(--black,#0A0A0A)',
//               padding:'0.9rem 2.2rem', borderRadius:100,
//               border:'1.5px solid var(--border,rgba(10,10,10,0.2))',
//               fontSize:'0.88rem', fontWeight:600, textDecoration:'none', transition:'all 0.2s' }}
//             onMouseEnter={e => { e.currentTarget.style.background='#1A6CFF'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#1A6CFF'; }}
//             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--black,#0A0A0A)'; e.currentTarget.style.borderColor='var(--border,rgba(10,10,10,0.2))'; }}>
//             <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
//             View All Repositories
//           </a>
//         </div>
//       )}

//       {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
//       <style>{`@media(max-width:768px){ #projects { padding: 4rem 1.5rem !important; } }`}</style>
//     </section>
//   );
// }
import React, { useEffect, useState, useRef } from 'react';
import ProjectModal, { PROJECT_DATA } from './ProjectModal';

const GITHUB_USER = 'vikash1311';

const LANG_COLORS = {
  JavaScript:'#F7DF1E', TypeScript:'#3178C6', Python:'#3572A5',
  Java:'#B07219', HTML:'#E34C26', CSS:'#563D7C',
  'C++':'#F34B7D', Shell:'#89E051', 'Jupyter Notebook':'#DA5B0B',
};

const ACCENTS = [
  { color:'#3B82F6', light:'rgba(59,130,246,0.08)', dark:'rgba(59,130,246,0.15)' },
  { color:'#10B981', light:'rgba(16,185,129,0.08)', dark:'rgba(16,185,129,0.15)' },
  { color:'#8B5CF6', light:'rgba(139,92,246,0.08)', dark:'rgba(139,92,246,0.15)' },
  { color:'#F59E0B', light:'rgba(245,158,11,0.08)', dark:'rgba(245,158,11,0.15)' },
  { color:'#F43F5E', light:'rgba(244,63,94,0.08)',  dark:'rgba(244,63,94,0.15)'  },
  { color:'#06B6D4', light:'rgba(6,182,212,0.08)',  dark:'rgba(6,182,212,0.15)'  },
];

// Featured projects with rich mentor-format descriptions + imagery SVGs
const FEATURED = [
  {
    id: 'bug-tracker',
    name: 'Bug Tracker System',
    tagline: 'Role-based issue tracking for dev teams',
    what: 'A full-stack bug tracking platform with Admin, Developer, and Tester roles — built to manage software defects end-to-end.',
    problem: 'Dev teams had no centralized system to track bugs, assign tasks, or monitor resolution across multiple projects.',
    impact: '15+ REST APIs built, SQL query performance improved by ~25% using indexing and pagination.',
    learned: 'Deepened expertise in Spring Security, JWT flows, and designing multi-role access systems at scale.',
    stack: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'JWT'],
    accent: ACCENTS[0],
    github: 'https://github.com/vikash1311',
    visual: (
      <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="320" height="180" fill="#EEF4FF"/>
        <rect x="20" y="20" width="280" height="140" rx="10" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
        {/* Header bar */}
        <rect x="20" y="20" width="280" height="36" rx="10" fill="#3B82F6"/>
        <rect x="20" y="46" width="280" height="10" fill="#3B82F6"/>
        <circle cx="40" cy="38" r="7" fill="rgba(255,255,255,0.3)"/>
        <rect x="54" y="33" width="60" height="10" rx="3" fill="rgba(255,255,255,0.4)"/>
        <rect x="240" y="33" width="48" height="10" rx="5" fill="rgba(255,255,255,0.25)"/>
        {/* Bug rows */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x="32" y={72+i*22} width="8" height="8" rx="2" fill={i===0?'#EF4444':i===1?'#F59E0B':i===2?'#10B981':'#6B7280'} opacity="0.8"/>
            <rect x="48" y={73+i*22} width={80+i*10} height="6" rx="2" fill="#E2E8F0"/>
            <rect x={136+i*10} y={73+i*22} width="40" height="6" rx="2" fill="#EEF4FF"/>
            <rect x="240" y={73+i*22} width="50" height="6" rx="2" fill="#DBEAFE"/>
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: 'ai-forgery',
    name: 'AI Image Forgery Detection',
    tagline: 'CNN model that catches fake images instantly',
    what: 'A deep learning system that detects whether an image has been digitally forged using JPEG artifact analysis and CNN classification.',
    problem: 'Digital image manipulation is rampant — courts, journalists, and organizations need tools to verify image authenticity quickly.',
    impact: 'Research published in 3 peer-reviewed journals. Awarded official Government of India copyright (Reg. No: L-151429/2024).',
    learned: 'Mastered CNN architecture, OpenCV preprocessing pipelines, and deploying ML models as real-time web APIs with Flask.',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'CNN'],
    accent: ACCENTS[1],
    github: 'https://github.com/vikash1311',
    visual: (
      <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="320" height="180" fill="#ECFDF5"/>
        {/* Image frame */}
        <rect x="20" y="20" width="130" height="140" rx="10" fill="white" stroke="#D1FAE5" strokeWidth="1.5"/>
        <rect x="28" y="28" width="114" height="80" rx="6" fill="#E9F7FF"/>
        {/* Scan lines */}
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x="28" y={28+i*16} width="114" height="2" rx="1" fill="#10B981" opacity={0.15+i*0.05}/>
        ))}
        <rect x="28" y="72" width="114" height="3" rx="1" fill="#10B981" opacity="0.8"/>
        {/* Verdict */}
        <rect x="28" y="118" width="114" height="34" rx="6" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1"/>
        <circle cx="44" cy="135" r="8" fill="#10B981"/>
        <path d="M40 135l3 3 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="58" y="130" width="50" height="5" rx="2" fill="#6EE7B7"/>
        <rect x="58" y="139" width="35" height="4" rx="2" fill="#A7F3D0"/>
        {/* Neural net */}
        <g transform="translate(168,20)">
          {[[0],[1,2,3],[4,5],[6]].map((layer,li)=>
            layer.map((n,ni)=>(
              <circle key={`${li}-${ni}`} cx={li*38+19} cy={ni*30+30+(3-layer.length)*15} r="9"
                fill={li===0?'#D1FAE5':li===3?'#10B981':'white'}
                stroke="#10B981" strokeWidth="1.5"/>
            ))
          )}
          {/* Connections */}
          {[55,85].map(y=>(
            [25,65,105].map(ty=>(
              <line key={`${y}-${ty}`} x1="28" y1={y} x2="66" y2={ty} stroke="#10B981" strokeWidth="0.5" opacity="0.4"/>
            ))
          ))}
        </g>
      </svg>
    ),
  },
  {
    id: 'id-card',
    name: 'ID Card Generation System',
    tagline: 'Automated identity platform for 10,000+ users',
    what: 'A scalable system for generating, managing, and distributing ID cards with role-based access, face detection, and link-based data collection.',
    problem: 'Manual ID card creation for large organizations was slow, error-prone, and had no centralized tracking or verification.',
    impact: 'Deployed in production serving 10,000+ users. Reduced card generation time from hours to seconds per batch.',
    learned: 'Learned to build production-grade systems under real client pressure — handling scale, face detection integration, and multi-role workflows.',
    stack: ['React', 'Node.js', 'Express', 'Supabase', 'Nodemailer'],
    accent: ACCENTS[2],
    github: 'https://github.com/vikash1311',
    visual: (
      <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="320" height="180" fill="#F5F3FF"/>
        {/* ID Card */}
        <rect x="60" y="25" width="200" height="130" rx="12" fill="white" stroke="#DDD6FE" strokeWidth="1.5"/>
        <rect x="60" y="25" width="200" height="40" rx="12" fill="#8B5CF6"/>
        <rect x="60" y="53" width="200" height="12" fill="#8B5CF6"/>
        <rect x="75" y="33" width="80" height="8" rx="3" fill="rgba(255,255,255,0.5)"/>
        <rect x="220" y="30" width="30" height="15" rx="3" fill="rgba(255,255,255,0.2)"/>
        {/* Avatar */}
        <circle cx="105" cy="105" r="28" fill="#EDE9FE" stroke="#DDD6FE" strokeWidth="1.5"/>
        <circle cx="105" cy="98" r="12" fill="#C4B5FD"/>
        <path d="M78 128c0-15 12-22 27-22s27 7 27 22" fill="#C4B5FD"/>
        {/* Info lines */}
        <rect x="145" y="82" width="90" height="7" rx="3" fill="#EDE9FE"/>
        <rect x="145" y="96" width="70" height="5" rx="2" fill="#F3F0FF"/>
        <rect x="145" y="108" width="80" height="5" rx="2" fill="#F3F0FF"/>
        <rect x="145" y="120" width="60" height="5" rx="2" fill="#F3F0FF"/>
        {/* Barcode */}
        <rect x="75" y="143" width="170" height="5" rx="1" fill="#EDE9FE"/>
        {[0,6,12,18,24,32,38,44,52,58,64,72,78,84,92,98,104,112,118,124,132,138,144].map((x,i)=>(
          <rect key={i} x={75+x} y={140} width={i%3===0?3:2} height={8} rx="0.5" fill="#8B5CF6" opacity="0.6"/>
        ))}
      </svg>
    ),
  },
  // {
  //   id: 'vendor',
  //   name: 'Vendor Management System',
  //   tagline: 'Government platform for 2000+ vendors',
  //   what: 'A multi-role admin platform for a government project — managing vendors, tracking document expiry, and generating analytics dashboards.',
  //   problem: 'A government body managing 2000+ vendors had no unified system — expiry tracking was manual, analytics were absent, and admin roles were undefined.',
  //   impact: 'Reduced backend load from 15–20s to 1–5s via pagination. Delivered analytics dashboard and automated expiry notifications.',
  //   learned: 'Gained real experience working with government-grade requirements — strict data handling, multi-stakeholder workflows, and zero-downtime expectations.',
  //   stack: ['React', 'Node.js', 'Supabase', 'Express', 'Nodemailer'],
  //   accent: ACCENTS[3],
  //   github: 'https://github.com/vikash1311',
  //   visual: (
  //     <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
  //       <rect width="320" height="180" fill="#FFFBEB"/>
  //       {/* Dashboard */}
  //       <rect x="20" y="20" width="280" height="140" rx="10" fill="white" stroke="#FDE68A" strokeWidth="1"/>
  //       <rect x="20" y="20" width="280" height="32" rx="10" fill="#F59E0B"/>
  //       <rect x="20" y="40" width="280" height="12" fill="#F59E0B"/>
  //       <rect x="35" y="29" width="90" height="7" rx="3" fill="rgba(255,255,255,0.5)"/>
  //       {/* Stat cards */}
  //       {[
  //         {x:30,val:'2,048',label:'Vendors',color:'#FEF3C7'},
  //         {x:115,val:'94%',label:'Active',color:'#ECFDF5'},
  //         {x:200,val:'127',label:'Expiring',color:'#FFF1F2'},
  //       ].map(s=>(
  //         <g key={s.x}>
  //           <rect x={s.x} y="65" width="78" height="42" rx="8" fill={s.color} stroke="#FDE68A" strokeWidth="0.8"/>
  //           <rect x={s.x+8} y="73" width="35" height="8" rx="2" fill="#F59E0B" opacity="0.6"/>
  //           <rect x={s.x+8} y="86" width="50" height="5" rx="2" fill="#FDE68A"/>
  //         </g>
  //       ))}
  //       {/* Bar chart */}
  //       {[40,65,50,80,55,70,90].map((h,i)=>(
  //         <rect key={i} x={30+i*35} y={178-h} width="20" height={h-68} rx="3" fill="#F59E0B" opacity={0.4+i*0.08}/>
  //       ))}
  //       <rect x="20" y="110" width="280" height="1" fill="#FDE68A"/>
  //     </svg>
  //   ),
  // },
];

function timeAgo(d) {
  const s = (Date.now() - new Date(d)) / 1000;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  if (s < 2592000) return `${Math.floor(s/86400)}d ago`;
  if (s < 31536000) return `${Math.floor(s/2592000)}mo ago`;
  return `${Math.floor(s/31536000)}y ago`;
}

function Skeleton() {
  return (
    <div style={{ background:'var(--project-card-bg,#fff)', border:'1px solid var(--project-card-border,rgba(10,10,10,0.08))', borderRadius:20, overflow:'hidden', opacity:0.6 }}>
      <div style={{ height:4, background:'#e5e7eb' }} />
      <div style={{ padding:'1.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
          <div className="skeleton" style={{ height:22, width:80, borderRadius:100 }} />
          <div className="skeleton" style={{ height:16, width:30 }} />
        </div>
        <div className="skeleton" style={{ height:20, width:'65%', marginBottom:10 }} />
        <div className="skeleton" style={{ height:11, width:'100%', marginBottom:6 }} />
        <div className="skeleton" style={{ height:11, width:'80%', marginBottom:20 }} />
        <div style={{ display:'flex', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid rgba(0,0,0,0.05)' }}>
          <div className="skeleton" style={{ height:14, width:60 }} />
          <div className="skeleton" style={{ height:28, width:70, borderRadius:100 }} />
        </div>
      </div>
    </div>
  );
}

// Featured slider card
function FeaturedCard({ project, isActive, onClick }) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const accentBg = isDark ? project.accent.dark : project.accent.light;

  return (
    <div onClick={onClick}
      style={{
        background: 'var(--project-card-bg,#fff)',
        border: `1.5px solid ${isActive ? project.accent.color : 'var(--project-card-border,rgba(10,10,10,0.08))'}`,
        borderRadius: 20, overflow: 'hidden',
        transition: 'all 0.3s',
        cursor: 'pointer',
        transform: isActive ? 'translateY(-4px)' : 'none',
        boxShadow: isActive ? `0 16px 48px rgba(0,0,0,0.1), 0 0 0 2px ${project.accent.color}33` : 'none',
        display: 'flex', flexDirection: 'column',
      }}>
      {/* Accent bar */}
      <div style={{ height: 4, background: project.accent.color }} />

      {/* Visual */}
      <div style={{ height: 160, overflow: 'hidden', background: isDark ? '#1a1a1a' : '#f8faff' }}>
        {project.visual}
      </div>

      <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Language tags */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
          {project.stack.slice(0,3).map(t => (
            <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', fontWeight:600, padding:'0.2rem 0.65rem', borderRadius:100, background: accentBg, color: project.accent.color, border:`1px solid ${project.accent.color}33` }}>{t}</span>
          ))}
        </div>

        {/* Name + tagline */}
        <div style={{ fontSize:'1rem', fontWeight:800, color:'var(--project-card-title,#0A0A0A)', marginBottom:'0.2rem', letterSpacing:'-0.01em' }}>{project.name}</div>
        <div style={{ fontSize:'0.8rem', color: project.accent.color, fontWeight:600, marginBottom:'0.8rem', fontFamily:"'DM Mono',monospace" }}>{project.tagline}</div>

        {/* Mentor format description */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem', flex:1 }}>
          {[
            { label:'What', text: project.what },
            { label:'Problem', text: project.problem },
            { label:'Impact', text: project.impact },
            { label:'Learned', text: project.learned },
          ].map(item => (
            <div key={item.label} style={{ display:'flex', gap:'0.5rem', alignItems:'flex-start' }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.6rem', fontWeight:700, color: project.accent.color, background: accentBg, padding:'0.15rem 0.45rem', borderRadius:4, flexShrink:0, marginTop:2, whiteSpace:'nowrap' }}>{item.label}</span>
              <span style={{ fontSize:'0.78rem', color:'var(--project-card-muted,#6B7280)', lineHeight:1.6 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display:'flex', gap:'0.6rem', marginTop:'1.2rem', paddingTop:'1rem', borderTop:`1px solid var(--project-card-divider,rgba(10,10,10,0.06))` }}>
          <a href={project.github} target="_blank" rel="noreferrer"
            style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.68rem', fontWeight:600, color:'var(--project-card-title,#0A0A0A)', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5, padding:'0.35rem 0.85rem', borderRadius:100, border:'1px solid var(--project-card-border,rgba(10,10,10,0.12))', transition:'all 0.2s' }}
            onClick={e => e.stopPropagation()}
            onMouseEnter={e => { e.currentTarget.style.borderColor=project.accent.color; e.currentTarget.style.color=project.accent.color; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--project-card-border,rgba(10,10,10,0.12))'; e.currentTarget.style.color='var(--project-card-title,#0A0A0A)'; }}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

// Other repos card (compact)
function RepoCard({ repo, index }) {
  const acc = ACCENTS[index % ACCENTS.length];
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const accentBg = isDark ? acc.dark : acc.light;
  const lc = LANG_COLORS[repo.language] || '#8B949E';

  return (
    <div style={{ background:'var(--project-card-bg,#fff)', border:'1px solid var(--project-card-border,rgba(10,10,10,0.08))', borderRadius:16, overflow:'hidden', transition:'transform 0.2s, box-shadow 0.2s', animation:`fadeUp 0.4s ease both`, animationDelay:`${index*0.05}s` }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 12px 32px rgba(0,0,0,0.09), 0 0 0 1.5px ${acc.color}33`; }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
      <div style={{ height:3, background: acc.color }} />
      <div style={{ padding:'1.2rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.6rem' }}>
          {repo.language && (
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', fontWeight:600, padding:'0.2rem 0.6rem', borderRadius:100, background:accentBg, color:acc.color, display:'inline-flex', alignItems:'center', gap:4, border:`1px solid ${acc.color}33` }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:lc }} />{repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', color:acc.color }}>★ {repo.stargazers_count}</span>}
        </div>
        <div style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--project-card-title,#0A0A0A)', marginBottom:'0.3rem', textTransform:'capitalize' }}>{repo.name.replace(/[-_]/g,' ')}</div>
        <p style={{ fontSize:'0.78rem', color:'var(--project-card-muted,#6B7280)', lineHeight:1.6, marginBottom:'0.8rem' }}>{repo.description || 'No description.'}</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'0.7rem', borderTop:'1px solid var(--project-card-divider,rgba(10,10,10,0.06))' }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.62rem', color:'var(--project-card-muted,#6B7280)' }}>{timeAgo(repo.updated_at)}</span>
          <a href={repo.html_url} target="_blank" rel="noreferrer"
            style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', fontWeight:600, color:acc.color, textDecoration:'none' }}>GitHub →</a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');
  const [modal, setModal] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        const featuredIds = FEATURED.map(f => f.id);
        const others = data
          .filter(r => !r.fork && !featuredIds.some(id => r.name.toLowerCase().includes(id.split('-')[0])))
          .sort((a,b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6);
        setRepos(others);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, []);

  // Auto-slide every 4s
  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s+1) % FEATURED.length), 4000);
    return () => clearInterval(t);
  }, []);

  const getProjectData = (name) => PROJECT_DATA.find(p => name.toLowerCase().includes(p.id.split('-')[0]));

  return (
    <section id="projects" style={{ padding:'6rem 4rem', maxWidth:1200, margin:'0 auto' }}>

      {/* Header */}
      <div className="reveal">
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.75rem', color:'#1A6CFF', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'0.8rem' }}>// featured_projects</div>
        <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:'1rem' }}>
          Things I've <span style={{ fontFamily:"'Instrument Serif',serif", fontStyle:'italic', fontWeight:400, color:'#1A6CFF' }}>Built</span>
        </h2>
        <p style={{ fontSize:'1rem', color:'var(--muted,#6B7280)', maxWidth:560, lineHeight:1.7, marginBottom:'2.5rem' }}>
          Real systems, real users, real impact — each project solves an actual problem.
        </p>
      </div>

      {/* ── FEATURED SLIDER ── */}
      <div className="reveal" style={{ marginBottom:'4rem' }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.72rem', color:'var(--muted,#6B7280)', letterSpacing:'0.12em', marginBottom:'1.2rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span>// best_work</span>
          {/* Dot indicators */}
          <div style={{ display:'flex', gap:'0.4rem' }}>
            {FEATURED.map((f,i) => (
              <button key={i} onClick={() => setActiveSlide(i)}
                style={{ width: i===activeSlide ? 20 : 7, height:7, borderRadius:100, border:'none', background: i===activeSlide ? FEATURED[activeSlide].accent.color : 'var(--border,rgba(10,10,10,0.15))', cursor:'pointer', transition:'all 0.3s', padding:0 }} />
            ))}
          </div>
        </div>

        {/* Slider grid — show active + peek of next */}
        <div ref={sliderRef} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.5rem' }}>
          {FEATURED.map((project, i) => (
            <FeaturedCard key={project.id} project={project} isActive={i===activeSlide} onClick={() => setActiveSlide(i)} />
          ))}
        </div>

        {/* Nav arrows */}
        <div style={{ display:'flex', gap:'0.8rem', marginTop:'1.5rem', justifyContent:'flex-end' }}>
          {['←','→'].map((arrow,i) => (
            <button key={arrow} onClick={() => setActiveSlide(s => i===0 ? (s-1+FEATURED.length)%FEATURED.length : (s+1)%FEATURED.length)}
              style={{ width:40, height:40, borderRadius:'50%', border:'1.5px solid var(--border,rgba(10,10,10,0.15))', background:'var(--card,#fff)', color:'var(--black,#0A0A0A)', fontSize:'1rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background=FEATURED[activeSlide].accent.color; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor=FEATURED[activeSlide].accent.color; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--card,#fff)'; e.currentTarget.style.color='var(--black,#0A0A0A)'; e.currentTarget.style.borderColor='var(--border,rgba(10,10,10,0.15))'; }}>
              {arrow}
            </button>
          ))}
        </div>
      </div>

      {/* ── OTHER REPOS ── */}
      <div className="reveal">
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.72rem', color:'var(--muted,#6B7280)', letterSpacing:'0.12em', marginBottom:'1.2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.5rem' }}>
          <span>// more_on_github</span>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"
            style={{ fontSize:'0.75rem', fontWeight:600, color:'#1A6CFF', textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            View all repos →
          </a>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.2rem' }}>
          {status==='loading' && [1,2,3].map(i => <Skeleton key={i} />)}
          {status==='success' && repos.map((repo,i) => <RepoCard key={repo.id} repo={repo} index={i} />)}
          {status==='error' && (
            <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'2rem', color:'var(--muted,#6B7280)', fontSize:'0.88rem' }}>
              Could not load repos. <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" style={{ color:'#1A6CFF' }}>View on GitHub →</a>
            </div>
          )}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      <style>{`
        @media(max-width:768px){ #projects { padding: 4rem 1.5rem !important; } }
        @media(max-width:600px){ .featured-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}