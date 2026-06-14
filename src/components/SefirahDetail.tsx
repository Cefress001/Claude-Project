import { useEffect } from 'react';
import { type Sefirah } from '../data/sefirot';

interface SefirahDetailProps {
  sefirah: Sefirah;
  onClose: () => void;
}

export default function SefirahDetail({ sefirah, onClose }: SefirahDetailProps) {
  const c = sefirah.color;

  // Esc closes the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="card-mystic overflow-y-auto scrollbar-mystic view-enter"
      style={{ maxHeight: '86vh' }}
    >
      {/* ── Header ── */}
      <div
        className="relative p-6 pb-5"
        style={{
          background: `linear-gradient(145deg, ${c}18 0%, ${c}06 60%, transparent 100%)`,
          borderBottom: `1px solid ${c}20`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-200 transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          aria-label="Close"
        >
          ×
        </button>

        <div className="flex items-center gap-5">
          {/* Circular badge */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-center rounded-full"
            style={{
              width: 70, height: 70,
              border: `2px solid ${c}60`,
              background: `radial-gradient(circle at 38% 32%, ${c}30, ${c}08)`,
              boxShadow: `0 0 28px ${c}35, inset 0 1px 0 ${c}20`,
            }}
          >
            <span className="font-cinzel font-bold text-xl leading-none" style={{ color: c }}>
              {sefirah.number}
            </span>
            <span className="hebrew text-sm leading-none mt-0.5" style={{ color: `${c}bb` }}>
              {sefirah.hebrewName[0]}
            </span>
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="font-cinzel text-2xl font-bold leading-none" style={{ color: c }}>
                {sefirah.name}
              </h2>
              <span className="hebrew text-xl" style={{ color: `${c}99` }}>
                {sefirah.hebrewName}
              </span>
            </div>
            <p className="font-crimson italic text-mystic-300 text-base mt-1">{sefirah.translation}</p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-2.5">
              <Chip label={`${sefirah.pillar} pillar`} color={c} />
              <Chip label={sefirah.soulLevel}           color={c} />
              <Chip label={sefirah.archangel}           color={c} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick attributes row */}
        <div className="grid grid-cols-2 gap-3">
          <Attr icon="☀" label="Divine Light" value={sefirah.divineLight} color={c} />
          <Attr icon="✦" label="Divine Name"  value={sefirah.godName}    color={c} />
        </div>

        <div className="divider-divine" />

        {/* Description */}
        <Section title="Overview" color={c}>
          <p className="font-crimson text-[15px] text-gray-300 leading-relaxed">{sefirah.description}</p>
        </Section>

        {/* Baal HaSulam teaching */}
        <Section title="Baal HaSulam's Teaching" color={c}>
          <p className="font-crimson text-[15px] text-gray-300 leading-relaxed">{sefirah.baalHaSulamTeaching}</p>
        </Section>

        {/* Qualities */}
        <Section title="Spiritual Qualities" color={c}>
          <ul className="space-y-2">
            {sefirah.qualities.map(q => (
              <li key={q} className="flex items-start gap-2.5 font-crimson text-[15px] text-gray-300">
                <span style={{ color: c }} className="mt-1 flex-shrink-0 text-xs">◆</span>
                {q}
              </li>
            ))}
          </ul>
        </Section>

        {/* Footer note */}
        <div className="pt-2" style={{ borderTop: `1px solid ${c}15` }}>
          <p className="text-xs text-gray-600 text-center font-cinzel tracking-wider">
            Sefirah {sefirah.number} of 10 &nbsp;·&nbsp; {sefirah.pillar.charAt(0).toUpperCase() + sefirah.pillar.slice(1)} Pillar
          </p>
        </div>
      </div>
    </div>
  );
}

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block text-[11px] px-2.5 py-0.5 rounded-full capitalize font-cinzel tracking-wide"
      style={{
        border: `1px solid ${color}40`,
        color: `${color}cc`,
        background: `${color}0d`,
      }}
    >
      {label}
    </span>
  );
}

function Attr({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-xl p-3"
      style={{ background: `${color}08`, border: `1px solid ${color}1a` }}
    >
      <p className="text-[10px] font-cinzel tracking-wider text-gray-500 mb-1">
        <span className="mr-1">{icon}</span>{label}
      </p>
      <p className="font-crimson text-sm font-semibold leading-snug" style={{ color }}>{value}</p>
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="font-cinzel text-xs tracking-[0.18em] uppercase mb-3 pb-2"
        style={{ color, borderBottom: `1px solid ${color}25` }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
