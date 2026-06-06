import { useState } from 'react';
import { SEFIROT, PATHS, type Sefirah } from '../data/sefirot';
import SefirahDetail from './SefirahDetail';

export default function TreeOfLife() {
  const [selected, setSelected] = useState<Sefirah | null>(null);

  const sefirahById = Object.fromEntries(SEFIROT.map(s => [s.id, s]));

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Tree SVG */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="card-mystic p-4 star-bg">
          <h2 className="text-center text-divine-400 font-serif text-lg mb-3 glow-text">
            עֵץ חַיִּים — Etz Chaim — Tree of Life
          </h2>
          <svg
            viewBox="0 0 500 720"
            width="340"
            height="490"
            className="mx-auto"
            style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.15))' }}
          >
            {/* Background glow */}
            <defs>
              {SEFIROT.map(s => (
                <radialGradient key={s.id} id={`glow-${s.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                </radialGradient>
              ))}
              <radialGradient id="tree-bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a0a2e" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06060f" stopOpacity="0.9" />
              </radialGradient>
            </defs>

            <rect width="500" height="720" fill="url(#tree-bg)" rx="12" />

            {/* Three pillars guide lines */}
            <line x1="110" y1="80" x2="110" y2="640" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="250" y1="30" x2="250" y2="680" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="390" y1="80" x2="390" y2="500" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Pillar labels */}
            <text x="35" y="360" fill="rgba(204,34,34,0.5)" fontSize="9" textAnchor="middle" transform="rotate(-90,35,360)">Pillar of Severity</text>
            <text x="465" y="360" fill="rgba(34,68,204,0.5)" fontSize="9" textAnchor="middle" transform="rotate(90,465,360)">Pillar of Mercy</text>

            {/* Paths / connections */}
            {PATHS.map(path => {
              const from = sefirahById[path.from];
              const to = sefirahById[path.to];
              if (!from || !to) return null;
              const isActive = selected && (selected.id === path.from || selected.id === path.to);
              return (
                <g key={path.number}>
                  <line
                    x1={from.x} y1={from.y}
                    x2={to.x} y2={to.y}
                    stroke={isActive ? 'rgba(212,175,55,0.7)' : 'rgba(255,255,255,0.12)'}
                    strokeWidth={isActive ? 2 : 1}
                    className="path-line"
                  />
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2}
                    fill={isActive ? 'rgba(212,175,55,0.9)' : 'rgba(255,255,255,0.25)'}
                    fontSize="9"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontFamily: 'Arial Hebrew, Arial, sans-serif' }}
                  >
                    {path.hebrewLetter}
                  </text>
                </g>
              );
            })}

            {/* Sefirot circles */}
            {SEFIROT.map(sefirah => {
              const isSelected = selected?.id === sefirah.id;
              return (
                <g
                  key={sefirah.id}
                  className="sefirah-circle"
                  onClick={() => setSelected(isSelected ? null : sefirah)}
                >
                  {/* Glow background */}
                  {isSelected && (
                    <circle
                      cx={sefirah.x}
                      cy={sefirah.y}
                      r={38}
                      fill={`url(#glow-${sefirah.id})`}
                      className="sefirah-selected-ring"
                    />
                  )}
                  {/* Outer ring */}
                  <circle
                    cx={sefirah.x}
                    cy={sefirah.y}
                    r={isSelected ? 26 : 22}
                    fill="none"
                    stroke={sefirah.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    opacity={isSelected ? 1 : 0.7}
                  />
                  {/* Inner fill */}
                  <circle
                    cx={sefirah.x}
                    cy={sefirah.y}
                    r={isSelected ? 23 : 19}
                    fill={`${sefirah.color}22`}
                    stroke={sefirah.color}
                    strokeWidth={isSelected ? 1.5 : 1}
                    opacity={isSelected ? 0.9 : 0.6}
                  />
                  {/* Number */}
                  <text
                    x={sefirah.x}
                    y={sefirah.y - 4}
                    fill={sefirah.color}
                    fontSize={isSelected ? "11" : "10"}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontWeight="bold"
                    opacity={isSelected ? 1 : 0.85}
                  >
                    {sefirah.number}
                  </text>
                  {/* Hebrew name */}
                  <text
                    x={sefirah.x}
                    y={sefirah.y + 6}
                    fill={sefirah.color}
                    fontSize="7"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontFamily: 'Arial Hebrew, Arial, sans-serif' }}
                    opacity={isSelected ? 1 : 0.8}
                  >
                    {sefirah.hebrewName.split('')[0]}
                  </text>
                  {/* English label below circle */}
                  <text
                    x={sefirah.x}
                    y={sefirah.y + (isSelected ? 34 : 30)}
                    fill={isSelected ? sefirah.color : 'rgba(255,255,255,0.7)'}
                    fontSize={isSelected ? "9.5" : "8.5"}
                    textAnchor="middle"
                    fontWeight={isSelected ? "bold" : "normal"}
                  >
                    {sefirah.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="text-center text-xs text-mystic-500 mt-3">
            Click a sefirah to learn more
          </p>
        </div>

        {/* Pillar legend */}
        <div className="flex gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-600 opacity-70" />
            <span className="text-gray-500">Severity</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500 opacity-70" />
            <span className="text-gray-500">Equilibrium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 opacity-70" />
            <span className="text-gray-500">Mercy</span>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div className="flex-1 min-w-0">
        {selected ? (
          <SefirahDetail sefirah={selected} onClose={() => setSelected(null)} />
        ) : (
          <WelcomePanel />
        )}
      </div>
    </div>
  );
}

function WelcomePanel() {
  return (
    <div className="card-mystic p-8 h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">✡</div>
        <h2 className="text-3xl font-serif text-divine-400 glow-text mb-2">
          Talmud Eser Sefirot
        </h2>
        <p className="text-mystic-300 text-lg">Study of the Ten Sefirot</p>
        <p className="text-gray-500 text-sm mt-1">Based on the teachings of Baal HaSulam</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto w-full">
        {[
          { icon: '🌳', title: 'The Tree of Life', desc: 'An interactive map of the ten divine emanations and 22 spiritual paths' },
          { icon: '📖', title: '8 Structured Lessons', desc: 'From Or Ein Sof to Tikkun — covering all foundational concepts' },
          { icon: '📚', title: 'Complete Glossary', desc: 'Definitions of 35+ key Kabbalistic terms in Hebrew and English' },
          { icon: '✍️', title: 'Study Quiz', desc: 'Test your understanding with 20 questions on the material' },
        ].map(item => (
          <div key={item.title} className="bg-void-900 border border-mystic-900 rounded-lg p-4">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h3 className="font-serif text-divine-400 text-sm font-semibold mb-1">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-600 text-xs mt-8 max-w-md mx-auto">
        "The wisdom of Kabbalah is no more and no less than a sequence of roots that hang down by way of cause and effect, by fixed, determined laws, interweaving to a single, exalted goal."
        <br />
        <span className="text-mystic-600 italic">— Baal HaSulam</span>
      </p>
    </div>
  );
}
