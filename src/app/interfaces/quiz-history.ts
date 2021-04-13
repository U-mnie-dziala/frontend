import {Quiz} from './quiz';

export interface QuizHistory {
  id: number;
  userId: number;
  quiz: Quiz;
  uuid: string;
}
