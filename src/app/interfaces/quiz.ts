import {Answer} from './answer';
import {Question} from './question';

export interface Quiz {
  questionsHistory: Map<Answer, Question>;
  groupCodes: string[];
  questionList: Question[];
}
