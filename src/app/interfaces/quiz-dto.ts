import {Answer} from './answer';
import {Quiz} from './quiz';

export interface QuizDTO {
  answer: Answer[];
  quiz: Quiz;
}
