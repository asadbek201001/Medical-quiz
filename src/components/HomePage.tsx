import React from 'react';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Info, Target, Award, Star, Zap, Trophy } from './Icons';

interface HomePageProps {
  onStartQuiz: () => void;
}

export function HomePage({ onStartQuiz }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 max-w-4xl px-4">
        <Header />
        
        {/* Welcome Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Тестга хуш келибсиз!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Info className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-medium">Кўрсатмалар</h3>
                <p className="text-sm text-muted-foreground">
                  4 хил қийинлик даражасидаги бўлимлардан бирини танланг. Ҳар саволга 30 сония вақт берилади.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Target className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-medium">Мақсад</h3>
                <p className="text-sm text-muted-foreground">
                  Тиббиёт ва ҳамширалик соҳасидаги билимларингизни турли даражаларда синаб кўринг.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-medium">Баҳолаш</h3>
                <p className="text-sm text-muted-foreground">
                  Тест якунида натижаларингиз, тўғри жавоблар фоизи ва сарфланган вақт кўрсатилади.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Button onClick={onStartQuiz} size="lg" className="px-12">
                <Play className="w-5 h-5 mr-2" />
                Бўлим танлаш
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sections Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-center">Мавжуд бўлимлар</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-medium text-sm">1-Бўлим</h4>
                <p className="text-xs text-muted-foreground">50 савол</p>
                <p className="text-xs text-green-600">Осон</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-medium text-sm">2-Бўлим</h4>
                <p className="text-xs text-muted-foreground">100 савол</p>
                <p className="text-xs text-blue-600">Ўрта</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
                <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-medium text-sm">3-Бўлим</h4>
                <p className="text-xs text-muted-foreground">250 савол</p>
                <p className="text-xs text-orange-600">Қийин</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
                <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h4 className="font-medium text-sm">4-Бўлим</h4>
                <p className="text-xs text-muted-foreground">Барча саволлар</p>
                <p className="text-xs text-purple-600">Экстрем</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Тест хусусиятлари</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  4 хил қийинлик даражаси
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Ҳар саволга 30 сония вақт
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Жавобларни кейинчалик ўзгартириш мумкин
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Автоматик кейинги саволга ўтиш
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Мавзулар</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Умумий тиббиёт ва физиология
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Ҳамширалик асослари ва парвариши
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Инфекцион назорат ва гигиена
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Кардиология, пульмонология ва бошқалар
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}