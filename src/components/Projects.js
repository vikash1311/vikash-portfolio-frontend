import React, { useEffect, useState } from 'react';
import ProjectModal, { PROJECT_DATA } from './ProjectModal';

const GITHUB_USER = 'vikash1311';

const LANG_COLORS = {
  JavaScript:'#F7DF1E', TypeScript:'#3178C6', Python:'#3572A5',
  Java:'#B07219', HTML:'#E34C26', CSS:'#563D7C',
  'C++':'#F34B7D', Shell:'#89E051', 'Jupyter Notebook':'#DA5B0B',
};

const ACCENTS = [
  { color:'#3B82F6', light:'rgba(59,130,246,0.08)',  dark:'rgba(59,130,246,0.15)'  },
  { color:'#10B981', light:'rgba(16,185,129,0.08)',  dark:'rgba(16,185,129,0.15)'  },
  { color:'#8B5CF6', light:'rgba(139,92,246,0.08)',  dark:'rgba(139,92,246,0.15)'  },
  { color:'#F59E0B', light:'rgba(245,158,11,0.08)',  dark:'rgba(245,158,11,0.15)'  },
  { color:'#F43F5E', light:'rgba(244,63,94,0.08)',   dark:'rgba(244,63,94,0.15)'   },
  { color:'#06B6D4', light:'rgba(6,182,212,0.08)',   dark:'rgba(6,182,212,0.15)'   },
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

export default function Projects() {
  const [repos, setRepos]         = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [langs, setLangs]         = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [status, setStatus]       = useState('loading');
  const [modal, setModal]         = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        const list = data
          .filter(r => !r.fork)
          .sort((a,b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));
        const ul = ['All', ...new Set(list.map(r => r.language).filter(Boolean))];
        setRepos(list); setFiltered(list); setLangs(ul); setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, []);

  const filter = (lang) => {
    setActiveFilter(lang);
    setFiltered(lang === 'All' ? repos : repos.filter(r => r.language === lang));
  };

  const getProjectData = (name) =>
    PROJECT_DATA.find(p => name.toLowerCase().includes(p.id.split('-')[0]));

  return (
    <section id="projects" style={{ padding:'6rem 4rem', maxWidth:1200, margin:'0 auto' }}>

      <div className="reveal">
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.75rem', color:'#1A6CFF', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'0.8rem' }}>// github_projects</div>
        <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:'1rem' }}>
          Things I've <span style={{ fontFamily:"'Instrument Serif',serif", fontStyle:'italic', fontWeight:400, color:'#1A6CFF' }}>Built</span>
        </h2>
        <p style={{ fontSize:'1rem', color:'var(--muted,#6B7280)', maxWidth:560, lineHeight:1.7, marginBottom:'2rem' }}>
          Live from GitHub — always up to date. Click any card for a full case study.
        </p>
      </div>

      {/* Status + filters */}
      <div className="reveal" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginBottom:'2.5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background: status==='error'?'#EF4444':'#10B981', display:'inline-block', animation: status==='success'?'pulse 2s infinite':'none' }} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.72rem', color:'var(--muted,#6B7280)' }}>
            {status==='loading' && 'Fetching from GitHub...'}
            {status==='success' && <>Live · <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" style={{ color:'#1A6CFF', textDecoration:'none' }}>github.com/{GITHUB_USER}</a> · {repos.length} repos</>}
            {status==='error'   && 'Could not load repos'}
          </span>
        </div>
        {status==='success' && (
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {langs.map(l => (
              <button key={l} onClick={() => filter(l)}
                style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.68rem', padding:'0.3rem 0.85rem', borderRadius:100,
                  border:`1.5px solid ${activeFilter===l ? '#1A6CFF' : 'var(--border,rgba(10,10,10,0.12))'}`,
                  background: activeFilter===l ? '#1A6CFF' : 'transparent',
                  color: activeFilter===l ? '#fff' : 'var(--muted,#6B7280)',
                  cursor:'pointer', transition:'all 0.2s' }}>
                {l==='All' ? 'All repos' : l}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'1.5rem' }}>
        {status==='loading' && [1,2,3].map(i => <Skeleton key={i} />)}

        {status==='error' && (
          <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'3rem', background:'var(--card,#fff)', borderRadius:20, border:'1px solid var(--border,rgba(10,10,10,0.08))' }}>
            <div style={{ fontSize:'1.5rem', marginBottom:'0.8rem' }}>⚠️</div>
            <div style={{ fontWeight:700, marginBottom:'0.4rem', color:'var(--black,#0A0A0A)' }}>Couldn't load repositories</div>
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" style={{ color:'#1A6CFF', fontSize:'0.88rem' }}>View directly on GitHub →</a>
          </div>
        )}

        {status==='success' && filtered.map((repo, i) => {
          const acc = ACCENTS[i % ACCENTS.length];
          const lc  = LANG_COLORS[repo.language] || '#8B949E';
          const caseStudy = getProjectData(repo.name);
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          const accentBg = isDark ? acc.dark : acc.light;

          return (
            <div key={repo.id}
              style={{
                background: 'var(--project-card-bg,#fff)',
                border: '1px solid var(--project-card-border,rgba(10,10,10,0.08))',
                borderRadius: 20,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s, box-shadow 0.25s',
                animation: `fadeUp 0.4s ease both`,
                animationDelay: `${i * 0.05}s`,
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=`0 20px 48px rgba(0,0,0,0.12), 0 0 0 2px ${acc.color}44`; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>

              {/* Accent top bar */}
              <div style={{ height:4, background: acc.color, flexShrink:0 }} />

              <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', flex:1 }}>

                {/* Language pill + stars */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                  <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                    {repo.language && (
                      <span style={{
                        fontFamily:"'DM Mono',monospace", fontSize:'0.68rem', fontWeight:600,
                        padding:'0.3rem 0.8rem', borderRadius:100,
                        background: accentBg, color: acc.color,
                        display:'inline-flex', alignItems:'center', gap:5,
                        border:`1px solid ${acc.color}33`,
                      }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:lc, flexShrink:0 }} />
                        {repo.language}
                      </span>
                    )}
                    {(repo.topics||[]).slice(0,1).map(t => (
                      <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.64rem', padding:'0.25rem 0.65rem', borderRadius:100, background:'var(--project-card-tag-bg,#F3F4F6)', color:'var(--project-card-muted,#6B7280)', border:'1px solid var(--project-card-border,rgba(10,10,10,0.08))' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                    {repo.stargazers_count > 0 && (
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', color: acc.color, display:'flex', alignItems:'center', gap:3 }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill={acc.color}><path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4z"/></svg>
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', color:'var(--project-card-muted,#6B7280)' }}>⑂ {repo.forks_count}</span>
                    )}
                  </div>
                </div>

                {/* Repo name */}
                <div style={{ fontSize:'1.08rem', fontWeight:800, color:'var(--project-card-title,#0A0A0A)', letterSpacing:'-0.01em', marginBottom:'0.5rem', textTransform:'capitalize', lineHeight:1.3 }}>
                  {repo.name.replace(/[-_]/g, ' ')}
                </div>

                {/* Description */}
                <p style={{ fontSize:'0.84rem', color:'var(--project-card-muted,#6B7280)', lineHeight:1.7, marginBottom:'1.2rem', flex:1 }}>
                  {repo.description || 'No description provided.'}
                </p>

                {/* Footer */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'1rem', borderTop:`1px solid var(--project-card-divider,rgba(10,10,10,0.06))` }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.65rem', color:'var(--project-card-muted,#6B7280)', display:'flex', alignItems:'center', gap:4 }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="4.5"/><path d="M6 3.5v2.5l1.5 1.5" strokeLinecap="round"/></svg>
                    {timeAgo(repo.updated_at)}
                  </span>
                  <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                    {caseStudy && (
                      <button onClick={() => setModal(caseStudy)}
                        style={{ fontFamily:"'Syne',sans-serif", fontSize:'0.72rem', fontWeight:700,
                          color: acc.color, background: accentBg,
                          border:`1px solid ${acc.color}44`,
                          borderRadius:100, padding:'0.32rem 0.85rem',
                          cursor:'pointer', transition:'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background=acc.color; e.currentTarget.style.color='#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background=accentBg; e.currentTarget.style.color=acc.color; }}>
                        Case Study ↗
                      </button>
                    )}
                    <a href={repo.html_url} target="_blank" rel="noreferrer"
                      style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.68rem', fontWeight:600,
                        color:'var(--project-card-title,#0A0A0A)', textDecoration:'none',
                        display:'inline-flex', alignItems:'center', gap:5,
                        padding:'0.32rem 0.8rem', borderRadius:100,
                        border:'1px solid var(--project-card-border,rgba(10,10,10,0.12))',
                        transition:'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor=acc.color; e.currentTarget.style.color=acc.color; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--project-card-border,rgba(10,10,10,0.12))'; e.currentTarget.style.color='var(--project-card-title,#0A0A0A)'; }}>
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {status==='success' && (
        <div style={{ textAlign:'center', marginTop:'3rem' }}>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem',
              background:'transparent', color:'var(--black,#0A0A0A)',
              padding:'0.9rem 2.2rem', borderRadius:100,
              border:'1.5px solid var(--border,rgba(10,10,10,0.2))',
              fontSize:'0.88rem', fontWeight:600, textDecoration:'none', transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background='#1A6CFF'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#1A6CFF'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--black,#0A0A0A)'; e.currentTarget.style.borderColor='var(--border,rgba(10,10,10,0.2))'; }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            View All Repositories
          </a>
        </div>
      )}

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      <style>{`@media(max-width:768px){ #projects { padding: 4rem 1.5rem !important; } }`}</style>
    </section>
  );
}