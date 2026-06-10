import { useState } from 'react';
import { SEFIROT, PATHS, type Sefirah } from '../data/sefirot';
import SefirahDetail from './SefirahDetail';

const DAAT = { x: 250, y: 228 };

export default function TreeOfLife() {
  const [selected, setSelected] = useState<Sefirah | null>(null);
  const byId = Object.fromEntries(SEFIROT.map(s => [s.id, s]));

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">

      {/* ── Tree panel ── */}
      <div className="w-full lg:w-auto lg:flex-shrink-0 flex flex-col items-center">

        {/* Title above tree */}
        <p className="font-cinzel text-xs tracking-[0.25em] text-mystic-400 mb-3 uppercase">
          Etz Chaim &nbsp;·&nbsp; <span className="hebrew text-sm">עֵץ חַיִּים</span>
        </p>

        <div
          className="card-mystic star-bg p-3 w-full"
          style={{ maxWidth: 460 }}
        >
          <svg
            viewBox="0 0 500 730"
            className="w-full"
            style={{
              filter: 'drop-shadow(0 0 32px rgba(91,33,182,0.18))',
              maxHeight: '82vh',
            }}
          >
            <defs>
              {/* Gradient fills for each sefirah */}
              {SEFIROT.map(s => (
                <radialGradient key={s.id} id={`fill-${s.id}`} cx="40%" cy="35%" r="65%">
                  <stop offset="0%"   stopColor={s.color} stopOpacity="0.40" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0.07" />
                </radialGradient>
              ))}
              {/* Glow gradient for selected */}
              {SEFIROT.map(s => (
                <radialGradient key={`g-${s.id}`} id={`glow-${s.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor={s.color} stopOpacity="0.30" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0"    />
                </radialGradient>
              ))}
              {/* Soft blur filter */}
              <filter id="blur-light" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Active path gradient */}
              <linearGradient id="active-path" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Dark background */}
            <rect width="500" height="730" fill="rgba(6,4,18,0.7)" rx="14" />

            {/* ── Three pillar columns (subtle coloured bars) ── */}
            <rect x="88"  y="100" width="44" height="420" rx="22" fill="rgba(180,20,20,0.04)" />
            <rect x="228" y="40"  width="44" height="640" rx="22" fill="rgba(91,33,182,0.04)" />
            <rect x="368" y="100" width="44" height="420" rx="22" fill="rgba(30,60,180,0.04)" />

            {/* Pillar labels */}
            <text x="33"  y="310" fill="rgba(200,40,40,0.35)"  fontSize="8.5" textAnchor="middle" transform="rotate(-90,33,310)"  fontFamily="Cinzel,Georgia,serif" letterSpacing="2">SEVERITY</text>
            <text x="467" y="310" fill="rgba(40,80,200,0.35)"  fontSize="8.5" textAnchor="middle" transform="rotate(90,467,310)"   fontFamily="Cinzel,Georgia,serif" letterSpacing="2">MERCY</text>

            {/* ── Paths ── */}
            {PATHS.map(path => {
              const from = byId[path.from];
              const to   = byId[path.to];
              if (!from || !to) return null;
              const active = selected && (selected.id === path.from || selected.id === path.to);
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;
              return (
                <g key={path.number}>
                  {/* Glow behind active path */}
                  {active && (
                    <line
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="#d4af37" strokeWidth="5" opacity="0.12"
                      filter="url(#blur-light)"
                    />
                  )}
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={active ? '#d4af37' : 'rgba(255,255,255,0.11)'}
                    strokeWidth={active ? 1.8 : 1}
                    className="path-line"
                  />
                  {/* Hebrew letter at midpoint */}
                  <text
                    x={mx} y={my}
                    fill={active ? 'rgba(212,175,55,0.95)' : 'rgba(255,255,255,0.22)'}
                    fontSize="9" textAnchor="middle" dominantBaseline="middle"
                    fontFamily="Arial Hebrew,Arial,sans-serif"
                  >
                    {path.hebrewLetter}
                  </text>
                </g>
              );
            })}

            {/* ── Da'at — hidden sefirah ── */}
            <g opacity="0.28">
              <circle cx={DAAT.x} cy={DAAT.y} r="18" fill="none"
                stroke="#888" strokeWidth="1" strokeDasharray="4 3" />
              <text x={DAAT.x} y={DAAT.y - 1}
                fill="#aaa" fontSize="7.5" textAnchor="middle" dominantBaseline="middle"
                fontFamily="Cinzel,Georgia,serif" letterSpacing="0.5">
                Da'at
              </text>
              <text x={DAAT.x} y={DAAT.y + 8}
                fill="#888" fontSize="6.5" textAnchor="middle" dominantBaseline="middle"
                fontFamily="Arial Hebrew,Arial,sans-serif">
                דַּעַת
              </text>
            </g>

            {/* ── Sefirot circles ── */}
            {SEFIROT.map(s => {
              const sel = selected?.id === s.id;
              const r = { outer: 26, main: 22, inner: 16 };

              return (
                <g
                  key={s.id}
                  className="sefirah-circle"
                  onClick={() => setSelected(sel ? null : s)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer soft glow (blurred) */}
                  <circle
                    cx={s.x} cy={s.y} r={sel ? 44 : 36}
                    fill={`url(#glow-${s.id})`}
                    filter="url(#blur-light)"
                    className={sel ? 'sefirah-selected-ring' : ''}
                  />

                  {/* Decorative outer dashed ring */}
                  <circle
                    cx={s.x} cy={s.y} r={r.outer + (sel ? 3 : 0)}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={sel ? 0.8 : 0.5}
                    strokeDasharray="3 3"
                    opacity={sel ? 0.7 : 0.3}
                    style={{ transition: 'all 0.3s' }}
                  />

                  {/* Main circle */}
                  <circle
                    cx={s.x} cy={s.y} r={r.main + (sel ? 3 : 0)}
                    fill={`url(#fill-${s.id})`}
                    stroke={s.color}
                    strokeWidth={sel ? 1.8 : 1.2}
                    opacity={sel ? 1 : 0.82}
                    style={{ transition: 'all 0.3s' }}
                  />

                  {/* Inner highlight arc (top-left quarter) */}
                  <circle
                    cx={s.x} cy={s.y} r={r.inner}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="0.6"
                    strokeDasharray={`${r.inner * 0.9} ${r.inner * 5.4}`}
                    strokeDashoffset={`${r.inner * 1.2}`}
                    opacity={sel ? 0.6 : 0.25}
                  />

                  {/* Sefirah number */}
                  <text
                    x={s.x} y={s.y - 4}
                    fill={s.color}
                    fontSize={sel ? 12 : 10.5}
                    textAnchor="middle" dominantBaseline="middle"
                    fontWeight="700"
                    fontFamily="Cinzel,Georgia,serif"
                    opacity={sel ? 1 : 0.9}
                    style={{ transition: 'font-size 0.25s' }}
                  >
                    {s.number}
                  </text>

                  {/* First Hebrew character of name */}
                  <text
                    x={s.x} y={s.y + 6}
                    fill={s.color}
                    fontSize="8" textAnchor="middle" dominantBaseline="middle"
                    fontFamily="Arial Hebrew,Arial,sans-serif"
                    opacity={sel ? 0.9 : 0.65}
                  >
                    {s.hebrewName[0]}
                  </text>

                  {/* English label below circle */}
                  <text
                    x={s.x} y={s.y + (r.main + (sel ? 3 : 0)) + 10}
                    fill={sel ? s.color : 'rgba(220,210,240,0.75)'}
                    fontSize={sel ? 9.5 : 8.5}
                    textAnchor="middle"
                    fontFamily="Cinzel,Georgia,serif"
                    fontWeight={sel ? '600' : '400'}
                    letterSpacing="0.5"
                    style={{ transition: 'all 0.25s' }}
                  >
                    {s.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="text-center text-[11px] text-mystic-600 font-cinzel tracking-widest mt-2 pb-1">
            SELECT A SEFIRAH
          </p>
        </div>

        {/* Pillar legend */}
        <div className="flex gap-5 mt-4 text-[11px] font-cinzel tracking-wider">
          {[
            { color: '#cc2222', label: 'Severity' },
            { color: '#7c3aed', label: 'Equilibrium' },
            { color: '#2244cc', label: 'Mercy' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: color, opacity: 0.7 }} />
              <span style={{ color: 'rgba(160,140,200,0.6)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Detail / Welcome panel ── */}
      <div className="flex-1 min-w-0 w-full">
        {selected
          ? <SefirahDetail sefirah={selected} onClose={() => setSelected(null)} />
          : <WelcomePanel />
        }
      </div>
    </div>
  );
}

function WelcomePanel() {
  return (
    <div className="card-mystic p-8 lg:p-10 flex flex-col justify-center min-h-[520px]">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5 text-3xl"
          style={{
            background: 'radial-gradient(circle at 40% 35%, rgba(212,175,55,0.18), rgba(91,33,182,0.10))',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 0 32px rgba(212,175,55,0.15)',
          }}
        >
          ✡
        </div>
        <h2 className="text-3xl sm:text-4xl font-cinzel glow-text mb-2" style={{ color: '#d4af37' }}>
          Talmud Eser Sefirot
        </h2>
        <p className="font-crimson text-mystic-300 text-lg italic">Study of the Ten Sefirot</p>
        <p className="text-sm text-gray-500 mt-1">Based on the teachings of Baal HaSulam (1884–1954)</p>
        <div className="divider-divine mt-5 max-w-[200px] mx-auto" />
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto w-full mb-8">
        {[
          { num: '10',  label: 'Divine Sefirot',      desc: 'Click any sefirah to explore its nature and Baal HaSulam\'s teaching' },
          { num: '22',  label: 'Spiritual Paths',     desc: 'The 22 Hebrew-letter paths connecting the sefirot' },
          { num: '8',   label: 'Structured Lessons',  desc: 'From Or Ein Sof and Tzimtzum to Tikkun and Dvekut' },
          { num: '35+', label: 'Glossary Terms',      desc: 'Key Kabbalistic terminology in English, Hebrew, and transliteration' },
        ].map(item => (
          <div
            key={item.label}
            className="rounded-xl p-4 border border-mystic-900/60"
            style={{ background: 'rgba(12,6,28,0.7)' }}
          >
            <p className="font-cinzel text-2xl font-bold glow-text mb-0.5" style={{ color: '#d4af37' }}>
              {item.num}
            </p>
            <p className="font-cinzel text-xs text-mystic-300 tracking-wide mb-1">{item.label}</p>
            <p className="font-crimson text-xs text-gray-500 leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="border-l-2 border-divine-500/50 pl-4 max-w-md mx-auto">
        <p className="font-crimson italic text-gray-400 text-sm leading-relaxed">
          "The wisdom of Kabbalah is no more and no less than a sequence of roots
          that hang down by way of cause and effect… interweaving to a single,
          exalted goal: the revelation of His Godliness to His creatures in this world."
        </p>
        <cite className="block text-xs text-mystic-600 mt-2 not-italic">
          — Baal HaSulam, Introduction to Talmud Eser Sefirot
        </cite>
      </blockquote>
    </div>
  );
}
