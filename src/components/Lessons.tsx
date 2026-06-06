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
      {/* Header */}
      <div className="card-mystic p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif text-divine-400 glow-text mb-1">
              Kabbalah Lessons
            </h2>
            <p className="text-mystic-400 text-sm">
              Based on Baal HaSulam's Talmud Eser Sefirot
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-3xl font-bold text-divine-400">{completed.size}/{LESSONS.length}</p>
            <p className="text-xs text-gray-500">completed</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-void-900 rounded-full border border-mystic-900 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #5b21b6, #d4af37)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div className="space-y-3">
        {LESSONS.map((lesson, idx) => {
          const isCompleted = completed.has(lesson.id);
          const isLocked = false; // All lessons unlocked

          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && setSelected(lesson)}
              className={`w-full text-left card-mystic p-5 transition-all duration-200 ${
                isLocked
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-mystic-600 hover:shadow-lg hover:shadow-mystic-900/50 cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Lesson number / status */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                    isCompleted
                      ? 'border-divine-400 bg-divine-400/20 text-divine-400'
                      : 'border-mystic-700 text-mystic-400'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-serif font-semibold ${isCompleted ? 'text-divine-400' : 'text-gray-200'}`}>
                      {lesson.title}
                    </h3>
                    {isCompleted && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-divine-400/10 border border-divine-400/30 text-divine-500">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-mystic-400 mt-0.5">{lesson.subtitle}</p>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
                    {lesson.summary}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-gray-600">⏱ {lesson.duration}</span>
                    <div className="flex gap-1 flex-wrap">
                      {lesson.keyTerms.slice(0, 3).map(term => (
                        <span key={term} className="text-xs px-2 py-0.5 rounded-full bg-mystic-900/60 border border-mystic-800 text-mystic-400">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 text-gray-600 self-center">
                  →
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
