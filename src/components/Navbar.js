import React, { useState, useEffect } from 'react';

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1.2rem 4rem',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(10,10,10,0.06)',
    transition: 'background 0.3s, boxShadow 0.3s',
  },
  logo: {
    fontFamily: "'DM Mono', monospace", fontSize: '0.85rem',
    fontWeight: 500, color: '#1A6CFF', letterSpacing: '0.05em', textDecoration: 'none'
  },
  links: { display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' },
  link: {
    fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none',
    color: '#6B7280', letterSpacing: '0.1em', textTransform: 'uppercase',
    transition: 'color 0.2s', cursor: 'none'
  },
  cta: {
    background: '#1A6CFF', color: '#fff', padding: '0.45rem 1.2rem',
    borderRadius: '100px', fontWeight: 600, fontSize: '0.78rem',
    textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase',
    transition: 'background 0.2s, transform 0.2s', cursor: 'none'
  },
  hamburger: {
    display: 'none', flexDirection: 'column', gap: '5px',
    background: 'none', border: 'none', cursor: 'pointer', padding: '4px'
  },
  bar: { width: '24px', height: '2px', background: '#0A0A0A', borderRadius: '2px', transition: 'all 0.3s' },
  mobileMenu: {
    position: 'fixed', top: '65px', left: 0, right: 0,
    background: 'rgba(244,243,239,0.98)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(10,10,10,0.08)',
    padding: '1.5rem 2rem', zIndex: 99,
    display: 'flex', flexDirection: 'column', gap: '1.2rem'
  },
  mobileLink: {
    fontSize: '1rem', fontWeight: 600, textDecoration: 'none',
    color: '#0A0A0A', letterSpacing: '0.05em', padding: '0.5rem 0',
    borderBottom: '1px solid rgba(10,10,10,0.06)'
  }
};

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Research' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    ...s.nav,
    background: scrolled ? 'rgba(244,243,239,0.92)' : 'rgba(244,243,239,0.7)',
    boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.04)' : 'none',
  };

  return (
    <>
      <nav style={navStyle}>
        <a href="#about" style={s.logo}>// VG.dev</a>

        {/* Desktop */}
        <ul style={s.links} className="nav-desktop">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} style={s.link}
                onMouseEnter={e => e.target.style.color = '#1A6CFF'}
                onMouseLeave={e => e.target.style.color = '#6B7280'}>
                {l.label}
              </a>
            </li>
          ))}
          <li><a href="#contact" style={s.cta}
            onMouseEnter={e => { e.target.style.background = '#0055dd'; e.target.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.target.style.background = '#1A6CFF'; e.target.style.transform = 'scale(1)'; }}>
            Contact
          </a></li>
        </ul>

        {/* Hamburger */}
        <button style={{ ...s.hamburger, display: 'none' }} className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ ...s.bar, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ ...s.bar, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </button>
      </nav>

      {menuOpen && (
        <div style={s.mobileMenu}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={s.mobileLink} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" style={{ ...s.cta, textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          nav { padding: 1rem 1.5rem !important; }
        }
      `}</style>
    </>
  );
}
