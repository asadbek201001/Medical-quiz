import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, RotateCcw, Home } from './Icons';
import { formatTime, getScoreColor } from '../utils/quiz-helpers';
import type { SectionConfig } from '../data/quiz-sections';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeElapsed: number;
  sectionInfo: SectionConfig;
  onRestart: () => void;
  onBackToHome: () => void;
}

export function QuizResults({ 
  score, 
  totalQuestions, 
  timeElapsed, 
  sectionInfo, 
  onRestart, 
  onBackToHome 
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const totalTimeMinutes = Math.floor(timeElapsed / 60);
  const totalTimeSeconds = timeElapsed % 60;
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <Badge variant="outline" className="w-fit mx-auto mb-2">
            {sectionInfo.name}
          </Badge>
          <CardTitle className="text-2xl mb-4">Тест натижаси</CardTitle>
          <div className="space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor(score, totalQuestions)}`}>
              {percentage}%
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-semibold text-green-600">{score}</div>
                <div className="text-sm text-muted-foreground">Тўғри жавоблар</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-red-600">{totalQuestions - score}</div>
                <div className="text-sm text-muted-foreground">Нотўғри жавоблар</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Жами вақт: {totalTimeMinutes}:{totalTimeSeconds.toString().padStart(2, '0')}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {totalQuestions} саволдан {score} тасини тўғри жавобладингиз
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-3">
          <Button onClick={onRestart} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Қайтадан бошлаш
          </Button>
          <Button onClick={onBackToHome} variant="outline" className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Бош саҳифага қайтиш
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}