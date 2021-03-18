import {Answer} from './answer';

export interface Question {
  id: number;
  groupCode: string;
  text: string;
  answers: Answer[];
  hasSimilarQuestions: boolean;
  similarQuestionIds: number[];
  multipleChoice: boolean;
}
