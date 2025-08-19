import React from 'react';
import { Card, CardContent } from './ui/card';
import { GraduationCap, Clock, BookOpen } from './Icons';

export function Header() {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-medium mb-2">Тиббий билим тести</h1>
            <p className="text-muted-foreground text-lg">
              Ҳамширалик ва тиббиёт бўйича билимларингизни синаб кўринг
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>4 та бўлим</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Ҳар саволга 30 сония</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}