import { useState } from 'react';
import { LESSONS, type Lesson } from '../data/lessons';
import LessonView from './LessonView';

export default function Lessons() {
  const [selected, setSelected] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  if (selected) {
    return (
      <LessonView
        lesson={selected}
        onBack={() => setSelected(null)}
        onComplete={() => {
          setCompleted(prev => new Set([...prev, selected.id]));
          setSelected(null);
        }}
        isCompleted={completed.has(selected.id)}
      />
    );
  }

  const progress = (completed.size / LESSONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">

      {/* ── Header card ── */}
      <div className="card-mystic p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-cinzel text-2xl glow-text mb-1" style={{ color: '#d4af37' }}>
              Kabbalah Lessons
            </h2>
            <p className="font-crimson italic text-mystic-400 text-base">
              Based on Baal HaSulam's Talmud Eser Sefirot
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-cinzel text-3xl font-bold glow-text" style={{ color: '#d4af37' }}>
              {completed.size}
              <span className="text-mystic-600 text-xl">/{LESSONS.length}</span>
            </p>
            <p className="text-xs text-gray-500 font-cinzel tracking-wider">COMPLETED</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-[11px] font-cinzel tracking-wider text-gray-500 mb-1.5">
            <span>PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(91,33,182,0.15)', border: '1px solid rgba(91,33,182,0.2)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #5b21b6, #d4af37)',
                boxShadow: progress > 0 ? '0 0 12px rgba(212,175,55,0.4)' : 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Lesson list ── */}
      <div className="space-y-3">
        {LESSONS.map((lesson, idx) => {
          const done = completed.has(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => setSelected(lesson)}
              className="w-full text-left card-mystic card-hover p-5"
            >
              <div className="flex items-start gap-4">

                {/* Number / check */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full border flex items-center justify-center font-cinzel font-bold text-sm transition-all duration-300"
                  style={{
                    borderColor: done ? '#d4af37' : 'rgba(91,33,182,0.4)',
                    background:  done ? 'rgba(212,175,55,0.12)' : 'rgba(91,33,182,0.08)',
                    color: done ? '#d4af37' : 'rgba(139,92,246,0.7)',
                    boxShadow: done ? '0 0 12px rgba(212,175,55,0.2)' : 'none',
                  }}
                >
                  {done ? '✓' : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-cinzel font-semibold text-base" style={{ color: done ? '#d4af37' : '#e2ddf0' }}>
                      {lesson.title}
                    </h3>
                    {done && (
                      <span className="font-cinzel text-[10px] px-2 py-0.5 rounded-full tracking-wider"
                        style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#b8921f' }}>
                        DONE
                      </span>
                    )}
                  </div>
                  <p className="font-crimson italic text-mystic-400 text-sm mt-0.5">{lesson.subtitle}</p>
                  <p className="font-crimson text-[13px] text-gray-500 mt-1.5 leading-snug line-clamp-2">
                    {lesson.summary}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className="font-cinzel text-[11px] text-gray-600 tracking-wide">⏱ {lesson.duration}</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {lesson.keyTerms.slice(0, 3).map(t => (
                        <span key={t}
                          className="font-cinzel text-[10px] px-2 py-0.5 rounded-full tracking-wide"
                          style={{ background: 'rgba(91,33,182,0.12)', border: '1px solid rgba(91,33,182,0.2)', color: 'rgba(139,92,246,0.7)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <span className="flex-shrink-0 text-mystic-600 self-center text-lg">→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
