import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Clock, Timer, ArrowLeft, Home } from './Icons';
import { getQuestionsBySection, getSectionInfo } from '../data/questions';
import { QuizState } from '../types/quiz';
import { QuizResults } from './QuizResults';
import { QUESTION_TIME_LIMIT, formatTime, getTimerColor } from '../utils/quiz-helpers';

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

interface QuizProps {
  sectionNumber: number;
  onBackToHome: () => void;
}

export function Quiz({ sectionNumber, onBackToHome }: QuizProps) {
  const sectionInfo = getSectionInfo(sectionNumber);
  const rawQuestions = getQuestionsBySection(sectionNumber);

  // shuffle answers for each question (memoized)
  const questions = useMemo(() => {
    return rawQuestions.map(q => {
      const options = shuffleArray(q.options);
      const correctAnswerIndex = options.indexOf(q.options[q.correctAnswer]);
      return { ...q, options, correctAnswer: correctAnswerIndex };
    });
  }, [sectionNumber]);
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: Array(questions.length).fill(null),
    score: 0,
    isCompleted: false,
    timeElapsed: 0,
    questionTimeLeft: QUESTION_TIME_LIMIT
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Overall timer effect
  useEffect(() => {
    if (!quizState.isCompleted) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.isCompleted]);

  // Per-question timer effect
  useEffect(() => {
    if (!quizState.isCompleted && quizState.questionTimeLeft > 0) {
      const questionTimer = setInterval(() => {
        setQuizState(prev => {
          const newTimeLeft = prev.questionTimeLeft - 1;
          if (newTimeLeft <= 0) {
            setTimeUp(true);
            return { ...prev, questionTimeLeft: 0 };
          }
          return { ...prev, questionTimeLeft: newTimeLeft };
        });
      }, 1000);

      return () => clearInterval(questionTimer);
    }
  }, [quizState.isCompleted, quizState.questionTimeLeft, quizState.currentQuestionIndex]);

  // Auto-advance when time is up
  useEffect(() => {
    if (timeUp) {
      const timeoutId = setTimeout(() => {
        handleNext(true);
        setTimeUp(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [timeUp]);

  // Reset question timer when moving to next question
  useEffect(() => {
    setQuizState(prev => ({
      ...prev,
      questionTimeLeft: QUESTION_TIME_LIMIT
    }));
    setSelectedOption(null);
    setTimeUp(false);
  }, [quizState.currentQuestionIndex]);

  const currentQuestion = questions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (quizState.questionTimeLeft > 0) {
      setSelectedOption(optionIndex);
    }
  };

  const handleNext = (isAutoAdvance = false) => {
    const answerToRecord = isAutoAdvance ? null : selectedOption;
    
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = answerToRecord;

    const newScore = answerToRecord === currentQuestion.correctAnswer 
      ? quizState.score + 1 
      : quizState.score;

    if (quizState.currentQuestionIndex === questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        isCompleted: true
      }));
      setShowResult(true);
    } else {
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        questionTimeLeft: QUESTION_TIME_LIMIT
      }));
      setSelectedOption(quizState.answers[quizState.currentQuestionIndex - 1]);
      setTimeUp(false);
    }
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: Array(questions.length).fill(null),
      score: 0,
      isCompleted: false,
      timeElapsed: 0,
      questionTimeLeft: QUESTION_TIME_LIMIT
    });
    setSelectedOption(null);
    setShowResult(false);
    setTimeUp(false);
  };

  const handleExitConfirm = () => {
    setShowExitConfirm(false);
    onBackToHome();
  };

  if (showResult) {
    return (
      <QuizResults
        score={quizState.score}
        totalQuestions={questions.length}
        timeElapsed={quizState.timeElapsed}
        sectionInfo={sectionInfo}
        onRestart={handleRestart}
        onBackToHome={onBackToHome}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-lg">Тестни тарк этмоқчимисиз?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Агар тестни ҳозир тарк етсангиз, барча жавобларингиз йўқолади. Ишончингиз комилми?
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowExitConfirm(false)} className="flex-1">
                  Давом этиш
                </Button>
                <Button variant="destructive" onClick={handleExitConfirm} className="flex-1">
                  Ҳа, тарк етиш
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExitConfirm(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4 mr-2" />
                Чиқиш
              </Button>
              <div className="flex flex-col">
                <CardTitle>Тиббий тест</CardTitle>
                <Badge variant="outline" className="w-fit mt-1">
                  {sectionInfo.name} - {sectionInfo.description}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTime(quizState.timeElapsed)}</span>
              </div>
              <div className={`flex items-center gap-2 font-semibold ${getTimerColor(quizState.questionTimeLeft)}`}>
                <Timer className="w-4 h-4" />
                <span>{quizState.questionTimeLeft}с</span>
              </div>
              <Badge variant="secondary">
                {quizState.currentQuestionIndex + 1} / {questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
          {timeUp && (
            <div className="mt-2 text-center text-red-600 font-medium">
              Вақт тугади! Кейинги саволга ўтилмоқда...
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg leading-relaxed">
              {quizState.currentQuestionIndex + 1}. {currentQuestion.question}
            </CardTitle>
            {currentQuestion.category && (
              <Badge variant="outline">{currentQuestion.category}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={quizState.questionTimeLeft === 0}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedOption === index
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                } ${
                  quizState.questionTimeLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === index 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-muted-foreground'
                  }`}>
                    {selectedOption === index && (
                      <div className="w-2 h-2 rounded-full bg-current" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={quizState.currentQuestionIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Олдинги
            </Button>
            <Button
              onClick={() => handleNext(false)}
              disabled={selectedOption === null && quizState.questionTimeLeft > 0}
            >
              {quizState.currentQuestionIndex === questions.length - 1 ? 'Якунлаш' : 'Кейинги'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}