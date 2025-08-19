import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Zap, Trophy, Target, Clock, BookOpen, ChevronRight } from './Icons';
import { getSectionInfo } from '../data/questions';

interface SectionSelectionProps {
  onSectionSelect: (sectionNumber: number) => void;
  onBackToHome: () => void;
}

export function SectionSelection({ onSectionSelect, onBackToHome }: SectionSelectionProps) {
  const sections = [
    {
      number: 1,
      icon: Star,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      difficulty: 'Осон',
      estimatedTime: '25 дақиқа'
    },
    {
      number: 2,
      icon: Zap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      difficulty: 'Ўрта',
      estimatedTime: '50 дақиқа'
    },
    {
      number: 3,
      icon: Trophy,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      difficulty: 'Қийин',
      estimatedTime: '2 соат 5 дақиқа'
    },
    {
      number: 4,
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      difficulty: 'Экстрем',
      estimatedTime: '2+ соат'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Тест бўлимини танланг</CardTitle>
          <p className="text-muted-foreground">
            Билим даражангизга мос келувчи бўлимни танлаб, тестни бошланг
          </p>
        </CardHeader>
      </Card>

      {/* Sections Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {sections.map((section) => {
          const sectionInfo = getSectionInfo(section.number);
          const IconComponent = section.icon;
          
          return (
            <Card 
              key={section.number} 
              className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${section.borderColor} border-2 ${section.bgColor}`}
              onClick={() => onSectionSelect(section.number)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${section.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${section.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{sectionInfo.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{sectionInfo.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{sectionInfo.questionCount} савол</span>
                    </div>
                    <Badge variant="outline" className={section.color}>
                      {section.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Тахминий вақт: {section.estimatedTime}
                    </span>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full" size="sm">
                      <IconComponent className="w-4 h-4 mr-2" />
                      Бошлаш
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Қўшимча маълумот</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Бўлимлар ҳақида:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-green-500" />
                  <span><strong>1-Бўлим:</strong> Асосий тиббий билимлар ва ҳамширалик асослари</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span><strong>2-Бўлим:</strong> Кенгайтирилган клиник билимлар</span>
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-orange-500" />
                  <span><strong>3-Бўлим:</strong> Пухта ихтисослик билимлари</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span><strong>4-Бўлим:</strong> Барча мавзулар бўйича тўлиқ тест</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Умумий шартлар:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Ҳар саволга 30 сония вақт берилади</li>
                <li>• Вақт тугаса, автоматик кейинги саволга ўтади</li>
                <li>• Олдинги саволларга қайтиш мумкин</li>
                <li>• Жавобларни ўзгартириш мумкин</li>
                <li>• Тест якунида батафсил натижа кўрсатилади</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={onBackToHome}>
              Бош саҳифага қайтиш
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}