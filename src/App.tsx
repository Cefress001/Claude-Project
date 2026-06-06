import { useState } from 'react';
import Navigation from './components/Navigation';
import TreeOfLife from './components/TreeOfLife';
import Lessons from './components/Lessons';
import Glossary from './components/Glossary';
import Quiz from './components/Quiz';

type View = 'tree' | 'lessons' | 'glossary' | 'quiz';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('tree');

  return (
    <div className="min-h-screen">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />

      <main className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        {currentView === 'tree' && <TreeOfLife />}
        {currentView === 'lessons' && <Lessons />}
        {currentView === 'glossary' && <Glossary />}
        {currentView === 'quiz' && <Quiz />}
      </main>

      <footer className="border-t border-mystic-900 py-4 text-center">
        <p className="text-xs text-gray-600">
          Based on Baal HaSulam's Talmud Eser Sefirot · For educational purposes ·{' '}
          <span className="hebrew text-mystic-700">תַּלְמוּד עֶשֶׂר סְפִירוֹת</span>
        </p>
      </footer>
    </div>
  );
}
