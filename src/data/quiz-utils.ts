import { Question } from '../types/quiz';
import { medicalQuestionsData } from './medical-questions-data';
import { sectionConfigs, SectionConfig } from './quiz-sections';

/**
 * Get questions for a specific section based on section number
 */
export const getQuestionsBySection = (sectionNumber: number): Question[] => {
  switch (sectionNumber) {
    case 1:
      return medicalQuestionsData.slice(0, 50);
    case 2:
      return medicalQuestionsData.slice(0, 100);
    case 3:
      return medicalQuestionsData.slice(0, 250);
    case 4:
      return medicalQuestionsData; // All questions
    default:
      return medicalQuestionsData.slice(0, 50);
  }
};

/**
 * Get section information including name, question count, and description
 */
export const getSectionInfo = (sectionNumber: number): SectionConfig => {
  const config = sectionConfigs[sectionNumber];
  
  if (!config) {
    return sectionConfigs[1]; // Default to section 1
  }
  
  // Update question count for section 4 (all questions)
  if (sectionNumber === 4) {
    return {
      ...config,
      questionCount: medicalQuestionsData.length
    };
  }
  
  return config;
};