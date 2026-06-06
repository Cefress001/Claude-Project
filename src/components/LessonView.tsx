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
      {/* Back button + header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-mystic-400 hover:text-gray-200 text-sm flex items-center gap-1 transition-colors"
        >
          ← Back to Lessons
        </button>
      </div>

      <div className="card-mystic overflow-hidden">
        {/* Lesson header */}
        <div
          className="p-6 border-b border-mystic-800"
          style={{ background: 'linear-gradient(135deg, rgba(91,33,182,0.2), transparent)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-mystic-500 mb-1">Lesson {lesson.id}</p>
              <h2 className="text-2xl font-serif text-divine-400 glow-text">{lesson.title}</h2>
              <p className="text-mystic-300 text-sm mt-1">{lesson.subtitle}</p>
            </div>
            {isCompleted && (
              <span className="flex-shrink-0 text-xs px-3 py-1 rounded-full bg-divine-400/10 border border-divine-400/30 text-divine-400">
                ✓ Completed
              </span>
            )}
          </div>

          {/* Key terms */}
          <div className="flex gap-2 flex-wrap mt-4">
            {lesson.keyTerms.map(term => (
              <span key={term} className="text-xs px-2 py-1 rounded-full bg-mystic-900 border border-mystic-700 text-mystic-300">
                {term}
              </span>
            ))}
          </div>
        </div>

        {/* Section navigation tabs */}
        <div className="flex border-b border-mystic-900 overflow-x-auto scrollbar-mystic">
          {lesson.sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSection(idx)}
              className={`flex-shrink-0 px-4 py-3 text-xs font-medium transition-all border-b-2 ${
                activeSection === idx
                  ? 'border-divine-400 text-divine-400 bg-divine-400/5'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {idx + 1}. {sec.heading.length > 24 ? sec.heading.slice(0, 24) + '…' : sec.heading}
            </button>
          ))}
        </div>

        {/* Section content */}
        <div className="p-6">
          <h3 className="text-lg font-serif text-mystic-200 mb-4">{section.heading}</h3>

          <div className="prose-content space-y-4">
            {section.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-300 text-sm leading-relaxed">
                {para.split('**').map((chunk, j) =>
                  j % 2 === 1
                    ? <strong key={j} className="text-divine-400 font-semibold">{chunk}</strong>
                    : chunk
                )}
              </p>
            ))}
          </div>

          {section.quote && (
            <blockquote className="mt-6 border-l-2 border-divine-500 pl-4 bg-divine-400/5 rounded-r-lg py-3 pr-3">
              <p className="text-gray-300 text-sm italic leading-relaxed">"{section.quote.text}"</p>
              <cite className="text-xs text-divine-500 mt-2 block">— {section.quote.source}</cite>
            </blockquote>
          )}
        </div>

        {/* Navigation footer */}
        <div className="p-4 border-t border-mystic-900 flex items-center justify-between">
          <button
            onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="text-sm text-mystic-400 hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          {/* Section dots */}
          <div className="flex gap-2">
            {lesson.sections.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSection === idx ? 'bg-divine-400 w-4' : 'bg-mystic-700 hover:bg-mystic-500'
                }`}
              />
            ))}
          </div>

          {isLastSection ? (
            <button
              onClick={onComplete}
              className="text-sm px-4 py-2 rounded-lg font-medium transition-all"
              style={{
                background: 'linear-gradient(135deg, #5b21b6, #d4af37)',
                color: '#fff',
              }}
            >
              {isCompleted ? 'Back to Lessons' : 'Mark Complete ✓'}
            </button>
          ) : (
            <button
              onClick={() => setActiveSection(activeSection + 1)}
              className="text-sm text-mystic-400 hover:text-gray-200 transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Summary card */}
      <div className="mt-4 card-mystic p-4">
        <h4 className="text-xs font-semibold text-mystic-400 mb-2">Lesson Summary</h4>
        <p className="text-xs text-gray-400 leading-relaxed">{lesson.summary}</p>
      </div>
    </div>
  );
}
