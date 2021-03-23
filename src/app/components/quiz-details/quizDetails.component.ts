import {Component, HostBinding, OnInit} from '@angular/core';
import {Quiz} from '../../interfaces/quiz';
import {StartQuizService} from '../../services/start-quiz.service';
import {Answer} from '../../interfaces/answer';
import {log} from 'util';
import {ElementaryGroup} from '../../interfaces/elementary-group';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quizDetails.component.html',
  styleUrls: ['./quizDetails.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quiz: Quiz;
  checkBoxed: Answer[] = [];
  userAnswers: Answer[] = [];
  userAnswersIds: number[] = [];
  results: ElementaryGroup[] = [];

  constructor(private startQuizService: StartQuizService) { }

  ngOnInit(): void {
    this.getQuiz();
  }

  // -buttons- //
  saveOneAnswer(answer: Answer): void {
    this.userAnswers.push(answer);
    this.sendAnswers();
  }

  editCheckboxed(event, answer: Answer): void {
    if (event.target.checked) {
      this.checkBoxed.push(answer);
    }
    else {
      for (let i = 0; i < this.checkBoxed.length; i++) {
        if (this.checkBoxed[i].id === answer.id){
          this.checkBoxed.splice(i, 1);
          break;
        }
      }
    }
  }

  saveManyAnswers(): void {
    if (this.checkBoxed.length === 0){
      this.quiz.questionList.splice(0, 1);
    }
    else {
      this.checkBoxed.forEach(archivedAnswer => this.userAnswers.push(archivedAnswer));
      this.sendAnswers();
    }
  }
  // --- //

  sendAnswers(): void {
    this.getUserAnswersIds();
    console.log('Sendig post...');
    this.postQuiz();
    this.userAnswersIds = [];
    this.userAnswers = [];
    this.checkBoxed = [];
  }

  getUserAnswersIds(): void {
    this.userAnswers.forEach(item => this.userAnswersIds.push(item.id));
    this.quiz.answerIds = this.userAnswersIds;
  }

  // -requests- //
  getQuiz(): void {
    this.startQuizService.getQuiz().subscribe(quiz => this.quiz = quiz,
      err => console.error('Observer got an error: ' + err),
      () => console.log('Get: ' + JSON.stringify(this.quiz))
    );
  }

  postQuiz(): void {
    this.startQuizService.sendUserAnswers(this.quiz).subscribe(quiz => this.quiz = quiz,
      err => console.error('Observer got an error: ' + err),
      () => {
        console.log('Post:' + JSON.stringify(this.quiz));
        if (this.quiz.questionList.length === 0) {
          console.log('QuestionListEmpty');
          this.postResults();
        }
      }
    );
  }

  postResults(): void {
    this.startQuizService.getResults(this.quiz).subscribe(results => this.results = results,
      err => console.error('Observer got an error: ' + err),
      () => console.log('Response: ' + JSON.stringify(this.results))
    );
  }
  // --- //
}
