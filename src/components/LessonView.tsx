import { useState } from 'react';
import { type Lesson } from '../data/lessons';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function LessonView({ lesson, onBack, onComplete, isCompleted }: LessonViewProps) {
  const [activeSection, setActiveSection] = useState(0);
  const isLastSection = activeSection === lesson.sections.length - 1;
  const section = lesson.sections[activeSection];

  return (
    <div className="max-w-3xl mx-auto">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-cinzel text-xs tracking-widest text-mystic-500 hover:text-mystic-300 transition-colors mb-5"
      >
        ← ALL LESSONS
      </button>

      <div className="card-mystic overflow-hidden">

        {/* ── Lesson header ── */}
        <div
          className="p-6 pb-5"
          style={{
            background: 'linear-gradient(135deg, rgba(91,33,182,0.18) 0%, rgba(10,10,26,0) 60%)',
            borderBottom: '1px solid rgba(91,33,182,0.15)',
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-cinzel text-[11px] tracking-[0.2em] text-mystic-600 mb-1">
                LESSON {lesson.id} OF {8}
              </p>
              <h2 className="font-cinzel text-2xl font-bold glow-text mb-1" style={{ color: '#d4af37' }}>
                {lesson.title}
              </h2>
              <p className="font-crimson italic text-mystic-300 text-base">{lesson.subtitle}</p>
            </div>
            {isCompleted && (
              <span className="flex-shrink-0 font-cinzel text-[11px] tracking-wider px-3 py-1 rounded-full"
                style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#b8921f' }}>
                ✓ COMPLETED
              </span>
            )}
          </div>

          {/* Key terms */}
          <div className="flex gap-2 flex-wrap mt-3.5">
            {lesson.keyTerms.map(t => (
              <span key={t}
                className="font-cinzel text-[10px] px-2.5 py-1 rounded-full tracking-wide"
                style={{ background: 'rgba(91,33,182,0.14)', border: '1px solid rgba(91,33,182,0.25)', color: 'rgba(160,120,240,0.8)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Section tabs ── */}
        <div
          className="flex overflow-x-auto scrollbar-mystic"
          style={{ borderBottom: '1px solid rgba(91,33,182,0.15)' }}
        >
          {lesson.sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSection(idx)}
              className={`flex-shrink-0 px-4 py-3 font-cinzel text-[11px] tracking-wide transition-all border-b-2 ${
                activeSection === idx
                  ? 'border-divine-400 text-divine-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {idx + 1}. {sec.heading.length > 22 ? sec.heading.slice(0, 22) + '…' : sec.heading}
            </button>
          ))}
        </div>

        {/* ── Section content ── */}
        <div className="p-6 sm:p-8 view-enter">
          <h3 className="font-cinzel text-lg text-mystic-200 mb-5 leading-snug">{section.heading}</h3>

          <div className="space-y-4">
            {section.content.split('\n\n').map((para, i) => (
              <p key={i} className="font-crimson text-[16px] text-gray-300 leading-[1.8]">
                {para.split('**').map((chunk, j) =>
                  j % 2 === 1
                    ? <strong key={j} style={{ color: '#d4af37' }} className="font-semibold">{chunk}</strong>
                    : chunk
                )}
              </p>
            ))}
          </div>

          {section.quote && (
            <div
              className="mt-7 pl-5 py-4 pr-4 rounded-r-xl"
              style={{
                borderLeft: '2px solid rgba(212,175,55,0.5)',
                background: 'rgba(212,175,55,0.04)',
              }}
            >
              <p className="font-crimson italic text-[16px] text-gray-300 leading-relaxed">
                "{section.quote.text}"
              </p>
              <cite className="block font-cinzel text-[11px] tracking-wider text-divine-600 mt-2.5 not-italic">
                — {section.quote.source}
              </cite>
            </div>
          )}
        </div>

        {/* ── Footer navigation ── */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(91,33,182,0.12)' }}
        >
          <button
            onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="font-cinzel text-xs tracking-widest text-mystic-500 hover:text-mystic-300 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            ← PREV
          </button>

          {/* Section dots */}
          <div className="flex gap-2">
            {lesson.sections.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeSection === idx ? 20 : 7,
                  height: 7,
                  background: activeSection === idx
                    ? 'linear-gradient(90deg, #5b21b6, #d4af37)'
                    : 'rgba(91,33,182,0.3)',
                }}
              />
            ))}
          </div>

          {isLastSection ? (
            <button onClick={onComplete} className="btn-primary">
              {isCompleted ? 'Back' : 'Complete ✓'}
            </button>
          ) : (
            <button
              onClick={() => setActiveSection(activeSection + 1)}
              className="font-cinzel text-xs tracking-widest text-mystic-500 hover:text-mystic-300 transition-colors"
            >
              NEXT →
            </button>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 card-mystic p-4">
        <p className="font-cinzel text-[11px] tracking-wider text-mystic-500 mb-2">LESSON SUMMARY</p>
        <p className="font-crimson text-[14px] text-gray-400 leading-relaxed italic">{lesson.summary}</p>
      </div>
    </div>
  );
}
