import { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import TreeOfLife from './components/TreeOfLife';
import Lessons from './components/Lessons';
import Glossary from './components/Glossary';
import Quiz from './components/Quiz';

type View = 'tree' | 'lessons' | 'glossary' | 'quiz';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('tree');
  const [animKey, setAnimKey] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  function navigate(view: View) {
    setCurrentView(view);
    setAnimKey(k => k + 1);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Scroll window to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentView={currentView} onNavigate={navigate} />

      <main
        ref={mainRef}
        className="flex-1 pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full"
      >
        <div key={animKey} className="view-enter h-full">
          {currentView === 'tree'     && <TreeOfLife />}
          {currentView === 'lessons'  && <Lessons />}
          {currentView === 'glossary' && <Glossary />}
          {currentView === 'quiz'     && <Quiz />}
        </div>
      </main>

      <footer className="py-5 text-center">
        <div className="divider-divine mb-4 mx-auto max-w-xs" />
        <p className="text-xs text-gray-600 font-crimson tracking-wide">
          Based on Baal HaSulam's{' '}
          <span className="hebrew text-mystic-700">תַּלְמוּד עֶשֶׂר סְפִירוֹת</span>
          {' '}· For educational purposes only
        </p>
      </footer>
    </div>
  );
}
