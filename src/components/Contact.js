import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://vikash-portfolio-backend.onrender.com';

const INPUTS = [
  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Opportunity / Collaboration / Project' },
];

const LINKS = [
  { icon: '📧', bg: '#FEE2E2', label: 'gautam7.ven@gmail.com', href: 'mailto:gautam7.ven@gmail.com' },
  { icon: '💻', bg: '#F3F4F6', label: 'github.com/vikash1311', href: 'https://github.com/vikash1311' },
  { icon: '🔗', bg: '#EFF6FF', label: 'linkedin.com/in/vikash2808', href: 'https://linkedin.com/in/vikash2808' },
  { icon: '📱', bg: '#ECFDF5', label: '+91 93072 31784', href: 'tel:+919307231784' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setErrMsg(data.message || 'Something went wrong.');
        setStatus('error');
      }
    } catch (err) {
      setErrMsg('Could not reach the server. Make sure the backend is running: cd backend && npm run dev');
      setStatus('error');
    }
  };

  const inputStyle = {
    background: 'var(--input-bg, #F4F3EF)',
    border: '1.5px solid transparent',
    borderRadius: 12,
    padding: '0.85rem 1rem',
    fontSize: '0.9rem',
    fontFamily: "'Syne',sans-serif",
    color: 'var(--black, #0A0A0A)',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '0 2rem 6rem' }}>
      <div style={{ background: 'var(--card, #fff)', borderRadius: 28, border: '1px solid var(--border, rgba(10,10,10,0.08))', padding: '4rem', maxWidth: 1200, margin: '0 auto' }} className="reveal">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="contact-grid">
          {/* Left */}
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: '#1A6CFF', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>// get_in_touch</div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.8rem' }}>
              Let's <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: '#1A6CFF' }}>Build</span><br />Something
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.7, marginBottom: '2rem' }}>Open to full-time roles, freelance projects, and research collaborations. Let's talk.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {LINKS.map(l => (
                <a key={l.href} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.2rem', background: 'var(--input-bg, #F4F3EF)', borderRadius: 14, textDecoration: 'none', color: 'var(--black, #0A0A0A)', transition: 'transform 0.2s, background 0.2s, color 0.2s', fontSize: '0.9rem', fontWeight: 600, cursor: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.background = '#EEF4FF'; e.currentTarget.style.color = '#1A6CFF'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = 'var(--input-bg, #F4F3EF)'; e.currentTarget.style.color = 'var(--black, #0A0A0A)'; }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: l.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{l.icon}</div>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {INPUTS.map(inp => (
              <div key={inp.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280' }}>{inp.label}</label>
                <input name={inp.name} type={inp.type} placeholder={inp.placeholder} required={inp.name !== 'subject'}
                  value={form[inp.name]} onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#1A6CFF'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = '#F4F3EF'; }} />
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280' }}>Message</label>
              <textarea name="message" placeholder="Tell me about your project or role..." required
                value={form.message} onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                onFocus={e => { e.target.style.borderColor = '#1A6CFF'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = '#F4F3EF'; }} />
            </div>

            {status === 'error' && (
              <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#BE123C' }}>
                ⚠️ {errMsg}
                <div style={{ marginTop: '0.5rem' }}>
                  <a href={`mailto:gautam7.ven@gmail.com?subject=${encodeURIComponent(form.subject||'Portfolio enquiry')}&body=${encodeURIComponent(form.message)}`}
                    style={{ color: '#BE123C', fontWeight: 700, fontSize: '0.82rem' }}>
                    📧 Email directly instead →
                  </a>
                </div>
              </div>
            )}
            {status === 'success' && (
              <div style={{ background: '#ECFDF5', border: '1px solid #BBF7D0', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#15803D' }}>✅ Message sent! I'll reply within 24–48 hours.</div>
            )}

            <button type="submit" disabled={status === 'sending'}
              style={{ background: status === 'success' ? '#10B981' : status === 'sending' ? '#6B7280' : '#1A6CFF', color: '#fff', border: 'none', borderRadius: 100, padding: '1rem 2rem', fontSize: '0.9rem', fontWeight: 700, fontFamily: "'Syne',sans-serif", cursor: status === 'sending' ? 'wait' : 'none', letterSpacing: '0.03em', transition: 'background 0.2s, transform 0.2s', alignSelf: 'flex-start' }}
              onMouseEnter={e => { if (status === 'idle') e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => e.currentTarget.style.transform = ''}>
              {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Sent!' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          #contact { padding: 0 1rem 4rem !important; }
          #contact > div { padding: 2rem 1.5rem !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}