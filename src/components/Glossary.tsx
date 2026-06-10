import { useState } from 'react';
import { GLOSSARY, type GlossaryTerm } from '../data/glossary';

const CATEGORIES: { value: GlossaryTerm['category'] | 'all'; label: string }[] = [
  { value: 'all',         label: 'All'        },
  { value: 'fundamental', label: 'Fundamental' },
  { value: 'sefirot',     label: 'Sefirot'    },
  { value: 'worlds',      label: 'Worlds'     },
  { value: 'soul',        label: 'Soul'       },
  { value: 'process',     label: 'Processes'  },
  { value: 'text',        label: 'Texts'      },
];

const CAT_COLOR: Record<GlossaryTerm['category'], string> = {
  fundamental: '#8b5cf6',
  sefirot:     '#d4af37',
  worlds:      '#3b82f6',
  soul:        '#10b981',
  process:     '#f59e0b',
  text:        '#ec4899',
};

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} style={{ background: 'rgba(212,175,55,0.28)', color: '#f5d87a', borderRadius: 2 }}>{part}</mark>
          : part
      )}
    </>
  );
}

export default function Glossary() {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState<GlossaryTerm['category'] | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const q = search.trim();
  const filtered = GLOSSARY.filter(term => {
    const matchSearch =
      !q ||
      term.term.toLowerCase().includes(q.toLowerCase()) ||
      term.transliteration.toLowerCase().includes(q.toLowerCase()) ||
      term.hebrewTerm.includes(q) ||
      term.definition.toLowerCase().includes(q.toLowerCase());
    return matchSearch && (category === 'all' || term.category === category);
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="max-w-3xl mx-auto">

      {/* ── Header ── */}
      <div className="card-mystic p-6 mb-5">
        <h2 className="font-cinzel text-2xl glow-text mb-1" style={{ color: '#d4af37' }}>
          Kabbalistic Glossary
        </h2>
        <p className="font-crimson italic text-mystic-400 mb-5">
          {GLOSSARY.length} terms from Baal HaSulam's Talmud Eser Sefirot
        </p>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search in English or Hebrew…"
            className="w-full rounded-xl px-4 py-2.5 font-crimson text-base text-gray-200 placeholder-gray-600 focus:outline-none transition-all"
            style={{
              background: 'rgba(10,6,24,0.7)',
              border: '1px solid rgba(91,33,182,0.3)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)')}
            onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(91,33,182,0.3)')}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-lg"
            >
              ×
            </button>
          )}
        </div>

        {/* Category filter chips */}
        <div className="flex gap-2 flex-wrap mt-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className="font-cinzel text-[11px] tracking-wide px-3 py-1.5 rounded-full border transition-all"
              style={{
                borderColor: category === cat.value ? 'rgba(139,92,246,0.6)' : 'rgba(91,33,182,0.2)',
                background:  category === cat.value ? 'rgba(91,33,182,0.2)'  : 'transparent',
                color:       category === cat.value ? 'rgba(190,170,240,0.9)' : 'rgba(130,110,180,0.6)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      {q && (
        <p className="font-cinzel text-[11px] tracking-wider text-gray-600 mb-3 px-1">
          {filtered.length} RESULT{filtered.length !== 1 ? 'S' : ''} FOR "{q.toUpperCase()}"
        </p>
      )}

      {/* ── Terms ── */}
      <div className="space-y-2">
        {filtered.map(term => {
          const open = expanded === term.id;
          const dot  = CAT_COLOR[term.category];
          return (
            <div key={term.id} className="card-mystic overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex items-start gap-3 transition-colors hover:bg-mystic-900/20"
                onClick={() => setExpanded(open ? null : term.id)}
              >
                {/* Category dot */}
                <div className="flex-shrink-0 mt-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: dot, boxShadow: `0 0 6px ${dot}60` }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-cinzel font-semibold text-gray-100 text-base">
                      {highlight(term.term, q)}
                    </span>
                    <span className="hebrew text-base" style={{ color: 'rgba(212,175,55,0.75)' }}>
                      {term.hebrewTerm}
                    </span>
                    <span className="font-crimson italic text-xs text-mystic-500">
                      {highlight(term.transliteration, q)}
                    </span>
                  </div>
                  {!open && (
                    <p className="font-crimson text-sm text-gray-500 mt-1 line-clamp-1">
                      {highlight(term.definition, q)}
                    </p>
                  )}
                </div>

                <span className="flex-shrink-0 text-mystic-700 text-sm mt-0.5 transition-transform duration-200"
                  style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>

              {open && (
                <div
                  className="px-5 pb-5 view-enter"
                  style={{ borderTop: `1px solid ${dot}18` }}
                >
                  <p className="font-crimson text-[15px] text-gray-300 leading-relaxed mt-4">
                    {highlight(term.definition, q)}
                  </p>

                  {term.relatedTerms.length > 0 && (
                    <div className="mt-4">
                      <p className="font-cinzel text-[10px] tracking-wider text-gray-600 mb-2">RELATED TERMS</p>
                      <div className="flex gap-2 flex-wrap">
                        {term.relatedTerms.map(r => (
                          <button
                            key={r}
                            onClick={() => { setSearch(r); setExpanded(null); }}
                            className="font-cinzel text-[11px] tracking-wide px-2.5 py-1 rounded-full border transition-colors"
                            style={{
                              borderColor: 'rgba(91,33,182,0.3)',
                              color: 'rgba(139,92,246,0.7)',
                            }}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className="inline-block mt-4 font-cinzel text-[10px] tracking-wider px-2.5 py-1 rounded-full capitalize"
                    style={{ background: `${dot}12`, border: `1px solid ${dot}30`, color: dot }}
                  >
                    {term.category}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="card-mystic p-14 text-center">
            <p className="font-cinzel text-gray-500 mb-3">No terms found for "{q}"</p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="font-cinzel text-xs tracking-wider text-mystic-500 hover:text-mystic-300 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
