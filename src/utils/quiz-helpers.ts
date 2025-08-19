/**
 * Quiz configuration constants
 */
export const QUESTION_TIME_LIMIT = 30; // 30 seconds per question

/**
 * Format seconds into MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get color class based on score percentage
 */
export const getScoreColor = (score: number, total: number): string => {
  const percentage = (score / total) * 100;
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Get color class based on time remaining
 */
export const getTimerColor = (timeLeft: number): string => {
  if (timeLeft <= 5) return 'text-red-600';
  if (timeLeft <= 10) return 'text-yellow-600';
  return 'text-muted-foreground';
};