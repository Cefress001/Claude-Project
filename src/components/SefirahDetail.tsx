import { type Sefirah } from '../data/sefirot';

interface SefirahDetailProps {
  sefirah: Sefirah;
  onClose: () => void;
}

export default function SefirahDetail({ sefirah, onClose }: SefirahDetailProps) {
  return (
    <div className="card-mystic h-full overflow-y-auto scrollbar-mystic">
      {/* Header */}
      <div
        className="p-6 border-b border-mystic-800 rounded-t-xl relative"
        style={{ background: `linear-gradient(135deg, ${sefirah.color}15, transparent)` }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 text-xl leading-none"
        >
          ×
        </button>

        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: sefirah.color,
              background: `${sefirah.color}20`,
              boxShadow: `0 0 20px ${sefirah.color}40`,
            }}
          >
            <span className="font-bold text-xl" style={{ color: sefirah.color }}>
              {sefirah.number}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl font-serif font-bold" style={{ color: sefirah.color }}>
                {sefirah.name}
              </h2>
              <span className="text-2xl hebrew" style={{ color: `${sefirah.color}cc` }}>
                {sefirah.hebrewName}
              </span>
            </div>
            <p className="text-mystic-300 font-medium">{sefirah.translation}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Badge label={`${sefirah.pillar} pillar`} color={sefirah.color} />
              <Badge label={sefirah.soulLevel} color={sefirah.color} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <InfoCard label="Divine Light" value={sefirah.divineLight} color={sefirah.color} />
          <InfoCard label="Divine Name" value={sefirah.godName} color={sefirah.color} />
        </div>

        {/* Description */}
        <Section title="Overview" color={sefirah.color}>
          <p className="text-gray-300 text-sm leading-relaxed">{sefirah.description}</p>
        </Section>

        {/* Baal HaSulam teaching */}
        <Section title="Baal HaSulam's Teaching" color={sefirah.color}>
          <p className="text-gray-300 text-sm leading-relaxed">{sefirah.baalHaSulamTeaching}</p>
        </Section>

        {/* Qualities */}
        <Section title="Spiritual Qualities" color={sefirah.color}>
          <ul className="space-y-1">
            {sefirah.qualities.map(q => (
              <li key={q} className="flex items-start gap-2 text-sm text-gray-300">
                <span style={{ color: sefirah.color }} className="mt-0.5 flex-shrink-0">◆</span>
                {q}
              </li>
            ))}
          </ul>
        </Section>

        {/* Sefirot position */}
        <div className="border-t border-mystic-900 pt-4">
          <p className="text-xs text-gray-600 text-center">
            Sefirah {sefirah.number} of 10 · {sefirah.pillar.charAt(0).toUpperCase() + sefirah.pillar.slice(1)} Pillar ·{' '}
            Archangel: {sefirah.archangel}
          </p>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full border capitalize"
      style={{ borderColor: `${color}50`, color: `${color}cc`, background: `${color}10` }}
    >
      {label}
    </span>
  );
}

function InfoCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-void-900 border border-mystic-900 rounded-lg p-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium" style={{ color }}>{value}</p>
    </div>
  );
}

function Section({ title, children, color }: { title: string; children: React.ReactNode; color: string }) {
  return (
    <div>
      <h3
        className="text-sm font-serif font-semibold mb-3 pb-2 border-b"
        style={{ color, borderColor: `${color}30` }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
