export interface SectionConfig {
  name: string;
  questionCount: number;
  description: string;
}

export const sectionConfigs: Record<number, SectionConfig> = {
  1: { 
    name: "1-Бўлим", 
    questionCount: 50, 
    description: "Асосий тиббий билимлар" 
  },
  2: { 
    name: "2-Бўлим", 
    questionCount: 100, 
    description: "Кенгайтирилган тиббий билимлар" 
  },
  3: { 
    name: "3-Бўлим", 
    questionCount: 250, 
    description: "Пухта тиббий билимлар" 
  },
  4: { 
    name: "4-Бўлим", 
    questionCount: 250, // This will be updated dynamically based on actual question count
    description: "Барча саволлар" 
  }
};