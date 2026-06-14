import { LESSONS } from '../data/lessons';
import { usePersistentState } from '../hooks/usePersistentState';
import { LESSONS_COMPLETED_KEY } from '../lib/storage';

type View = 'tree' | 'lessons' | 'glossary' | 'quiz';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const navItems: { view: View; label: string }[] = [
  { view: 'tree',     label: 'Tree of Life' },
  { view: 'lessons',  label: 'Lessons'      },
  { view: 'glossary', label: 'Glossary'     },
  { view: 'quiz',     label: 'Quiz'         },
];

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  const [completedIds] = usePersistentState<number[]>(LESSONS_COMPLETED_KEY, []);
  const lessonProgress = completedIds.length;
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(180deg, rgba(8,4,22,0.98) 0%, rgba(12,6,28,0.96) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(91,33,182,0.2)',
        boxShadow: '0 1px 24px rgba(0,0,0,0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[62px]">

          {/* Brand */}
          <button
            onClick={() => onNavigate('tree')}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base"
              style={{
                background: 'radial-gradient(circle at 40% 35%, rgba(212,175,55,0.25), rgba(91,33,182,0.15))',
                border: '1px solid rgba(212,175,55,0.35)',
                boxShadow: '0 0 16px rgba(212,175,55,0.2)',
              }}
            >
              ✡
            </div>
            <div className="leading-none">
              <span
                className="block text-sm font-cinzel font-semibold glow-text tracking-widest"
                style={{ color: '#d4af37' }}
              >
                KABBALAH
              </span>
              <span className="block text-[10px] text-mystic-500 tracking-widest font-cinzel mt-0.5 hebrew" style={{ direction: 'rtl' }}>
                עֵץ חַיִּים
              </span>
            </div>
          </button>

          {/* Nav links */}
          <div className="flex items-stretch h-full gap-0.5">
            {navItems.map(({ view, label }) => {
              const active = currentView === view;
              return (
                <button
                  key={view}
                  onClick={() => onNavigate(view)}
                  className="relative px-3 sm:px-4 flex items-center gap-1.5 font-cinzel text-xs sm:text-[13px] tracking-wide transition-colors duration-200"
                  style={{ color: active ? '#d4af37' : 'rgba(180,160,220,0.7)' }}
                >
                  {label}
                  {/* Lessons progress badge */}
                  {view === 'lessons' && lessonProgress > 0 && (
                    <span
                      className="text-[9px] leading-none px-1.5 py-0.5 rounded-full font-bold"
                      style={{
                        background: lessonProgress === LESSONS.length ? 'rgba(212,175,55,0.18)' : 'rgba(91,33,182,0.25)',
                        color: lessonProgress === LESSONS.length ? '#d4af37' : 'rgba(190,170,240,0.9)',
                        border: `1px solid ${lessonProgress === LESSONS.length ? 'rgba(212,175,55,0.4)' : 'rgba(139,92,246,0.35)'}`,
                      }}
                    >
                      {lessonProgress === LESSONS.length ? '✓' : `${lessonProgress}/${LESSONS.length}`}
                    </span>
                  )}
                  {/* Active underline */}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                        boxShadow: '0 0 8px rgba(212,175,55,0.8)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}
