type View = 'tree' | 'lessons' | 'glossary' | 'quiz';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const navItems: { view: View; label: string; icon: string }[] = [
  { view: 'tree', label: 'Tree of Life', icon: '🌳' },
  { view: 'lessons', label: 'Lessons', icon: '📖' },
  { view: 'glossary', label: 'Glossary', icon: '📚' },
  { view: 'quiz', label: 'Study Quiz', icon: '✍️' },
];

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-mystic-800"
      style={{ background: 'linear-gradient(180deg, rgba(10,5,25,0.98) 0%, rgba(15,8,35,0.95) 100%)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✡</div>
            <div>
              <h1 className="text-sm font-serif font-bold text-divine-400 leading-none glow-text">
                Kabbalah Study
              </h1>
              <p className="text-xs text-mystic-400 leading-none">Talmud Eser Sefirot</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map(({ view, label, icon }) => (
              <button
                key={view}
                onClick={() => onNavigate(view)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === view
                    ? 'bg-mystic-800 text-divine-400 shadow-lg shadow-mystic-900/50'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-void-800'
                }`}
              >
                <span className="hidden sm:inline">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
