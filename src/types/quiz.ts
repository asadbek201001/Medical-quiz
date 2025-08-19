export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  score: number;
  isCompleted: boolean;
  timeElapsed: number;
  questionTimeLeft: number;
}