import { useState } from 'react';
import { GLOSSARY, type GlossaryTerm } from '../data/glossary';

const CATEGORIES: { value: GlossaryTerm['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All Terms' },
  { value: 'fundamental', label: 'Fundamental' },
  { value: 'sefirot', label: 'Sefirot' },
  { value: 'worlds', label: 'Four Worlds' },
  { value: 'soul', label: 'Soul Levels' },
  { value: 'process', label: 'Processes' },
  { value: 'text', label: 'Texts' },
];

const CATEGORY_COLORS: Record<GlossaryTerm['category'], string> = {
  fundamental: '#8b5cf6',
  sefirot: '#d4af37',
  worlds: '#3b82f6',
  soul: '#10b981',
  process: '#f59e0b',
  text: '#ec4899',
};

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<GlossaryTerm['category'] | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = GLOSSARY.filter(term => {
    const matchesSearch =
      !search ||
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      term.hebrewTerm.includes(search) ||
      term.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || term.category === category;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="card-mystic p-6 mb-6">
        <h2 className="text-2xl font-serif text-divine-400 glow-text mb-1">Kabbalistic Glossary</h2>
        <p className="text-mystic-400 text-sm mb-4">
          {GLOSSARY.length} terms from Baal HaSulam's Talmud Eser Sefirot
        </p>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search terms in English or Hebrew..."
          className="w-full bg-void-900 border border-mystic-800 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-mystic-600 transition-colors"
        />

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mt-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                category === cat.value
                  ? 'border-mystic-600 bg-mystic-800 text-mystic-200'
                  : 'border-mystic-900 text-gray-500 hover:text-gray-300 hover:border-mystic-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {search && (
        <p className="text-xs text-gray-500 mb-3 px-1">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
        </p>
      )}

      {/* Terms list */}
      <div className="space-y-2">
        {filtered.map(term => (
          <div
            key={term.id}
            className="card-mystic overflow-hidden"
          >
            <button
              className="w-full text-left p-4 flex items-start gap-4 hover:bg-mystic-900/30 transition-colors"
              onClick={() => setExpanded(expanded === term.id ? null : term.id)}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className="w-2 h-2 rounded-full mt-1.5"
                  style={{ background: CATEGORY_COLORS[term.category] }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-serif font-semibold text-gray-100">{term.term}</span>
                  <span className="text-base hebrew" style={{ color: '#d4af37', opacity: 0.8 }}>
                    {term.hebrewTerm}
                  </span>
                  <span className="text-xs text-mystic-500 italic">{term.transliteration}</span>
                </div>
                {expanded !== term.id && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {term.definition}
                  </p>
                )}
              </div>
              <span className="flex-shrink-0 text-gray-600 text-sm">
                {expanded === term.id ? '▲' : '▼'}
              </span>
            </button>

            {expanded === term.id && (
              <div className="px-4 pb-4 pt-0 border-t border-mystic-900">
                <p className="text-sm text-gray-300 leading-relaxed mt-3">{term.definition}</p>

                {term.relatedTerms.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Related terms:</p>
                    <div className="flex gap-2 flex-wrap">
                      {term.relatedTerms.map(related => (
                        <button
                          key={related}
                          onClick={() => setSearch(related)}
                          className="text-xs px-2 py-1 rounded border border-mystic-800 text-mystic-400 hover:text-mystic-200 transition-colors"
                        >
                          {related}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full border capitalize"
                    style={{
                      borderColor: `${CATEGORY_COLORS[term.category]}50`,
                      color: CATEGORY_COLORS[term.category],
                      background: `${CATEGORY_COLORS[term.category]}10`,
                    }}
                  >
                    {term.category}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="card-mystic p-12 text-center">
            <p className="text-gray-500">No terms found for "{search}"</p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="text-mystic-400 text-sm mt-2 hover:text-mystic-200 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
