import { HomePage } from './components/HomePage';
import { Quiz } from './components/Quiz';
import { SectionSelection } from './components/SectionSelection';

import { useState } from 'react';

type AppState = 'home' | 'sectionSelection' | 'quiz';

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [selectedSection, setSelectedSection] = useState<number>(1);

  const handleStartQuiz = () => {
    setAppState('sectionSelection');
  };

  const handleSectionSelect = (sectionNumber: number) => {
    setSelectedSection(sectionNumber);
    setAppState('quiz');
  };

  const handleBackToHome = () => {
    setAppState('home');
    setSelectedSection(1);
  };

  if (appState === 'quiz') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <Quiz 
            sectionNumber={selectedSection} 
            onBackToHome={handleBackToHome}
          />
        </div>
      </div>
    );
  }

  if (appState === 'sectionSelection') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <SectionSelection 
            onSectionSelect={handleSectionSelect}
            onBackToHome={handleBackToHome}
          />
        </div>
      </div>
    );
  }

  return <HomePage onStartQuiz={handleStartQuiz} />;
}