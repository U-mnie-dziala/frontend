import {Question} from './question';

export interface QuestionHistory {
  questionId: number;
  text: string;
  answerIds: number[];
}
