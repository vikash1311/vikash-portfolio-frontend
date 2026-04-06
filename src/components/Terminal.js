import React, { useEffect, useState, useRef } from 'react';

const COMMANDS = [
  { cmd: 'whoami', delay: 600, output: ['vikash_gautam — Full Stack Developer, Nagpur'] },
  { cmd: 'cat skills.txt', delay: 900, output: ['Java · Spring Boot · React · Node.js', 'Python · TensorFlow · MySQL · MongoDB'] },
  { cmd: 'gate_rank --year 2026', delay: 800, output: ['Data Science & AI  →  AIR 12,757 ✓', 'CS & IT            →  Qualified   ✓'] },
  { cmd: 'ls ./projects', delay: 700, output: ['bug-tracker/   ai-forgery-detection/   id-card-system/   vendor-mgmt/'] },
  { cmd: 'cat copyright.txt', delay: 800, output: ['Reg. No: L-151429/2024', 'Govt. of India — Digital Image Forgery Detection'] },
];

function useTyping(text, speed = 42) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    if (!text) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return { displayed, done };
}

function TerminalLine({ cmd, outputs, active, onDone }) {
  const { displayed, done } = useTyping(active ? cmd : cmd, active ? 42 : 0);
  const shown = active ? displayed : cmd;
  const showOutput = active ? done : true;

  useEffect(() => {
    if (done && onDone) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  return (
    <div style={{ marginBottom: '0.7rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: '#00D4AA', fontWeight: 600, userSelect: 'none' }}>❯</span>
        <span style={{ color: '#FAFAF8' }}>{shown}</span>
        {active && !done && <span style={{ borderRight: '2px solid #1A6CFF', height: '0.9em', animation: 'blink 0.7s infinite' }} />}
      </div>
      {showOutput && outputs.map((line, i) => (
        <div key={i} style={{ color: 'rgba(255,255,255,0.55)', paddingLeft: '1.2rem', fontSize: '0.78rem', lineHeight: 1.8 }}>{line}</div>
      ))}
    </div>
  );
}

export default function Terminal() {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const bottomRef = useRef(null);

  // useEffect(() => {
  //   if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  // }, [step, completedSteps]);

  const handleDone = () => {
    setCompletedSteps(prev => [...prev, step]);
    setTimeout(() => {
      if (step + 1 < COMMANDS.length) setStep(step + 1);
      else setTimeout(() => { setStep(0); setCompletedSteps([]); }, 1800);
    }, COMMANDS[step].delay);
  };

  return (
    <div style={{
      background: '#0F0F0F',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      width: '100%',
      maxWidth: 520,
      boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
    }}>
      {/* Title bar */}
      <div style={{ background: '#1A1A1A', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41' }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>vikash@portfolio ~ </span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '1.2rem 1.4rem', fontFamily: "'DM Mono',monospace", fontSize: '0.82rem', minHeight: 220, maxHeight: 260, overflowY: 'auto' }}>
        {/* Completed steps */}
        {completedSteps.map(i => (
          <TerminalLine key={i + '-done'} cmd={COMMANDS[i].cmd} outputs={COMMANDS[i].output} active={false} />
        ))}
        {/* Active step */}
        {step < COMMANDS.length && !completedSteps.includes(step) && (
          <TerminalLine key={step} cmd={COMMANDS[step].cmd} outputs={COMMANDS[step].output} active={true} onDone={handleDone} />
        )}
        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}
