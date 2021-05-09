import {Question} from './question';

interface AnswerForHistory {
  id: number;
  text: string;
}

export interface QuestionHistory {
  questionId: number;
  text: string;
  answersForHistory: AnswerForHistory[];
}
