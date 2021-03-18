import {Question} from './question';
import {QuestionHistory} from './question-history';

export interface Quiz {
  questionsHistory: QuestionHistory[];
  groupCodes: string[];
  questionList: Question[];
  answerIds: number[];
}
