import {Component, HostBinding, OnInit} from '@angular/core';
import {Quiz} from '../../interfaces/quiz';
import {StartQuizService} from '../../services/start-quiz.service';
import {Answer} from '../../interfaces/answer';
import {ElementaryGroup} from '../../interfaces/elementary-group';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quizDetails.component.html',
  styleUrls: ['./quizDetails.component.css']
})
export class QuizDetailsComponent implements OnInit {
  resultsReady = -1;
  quiz: Quiz;
  priorQuiz: Quiz;
  returned = true;
  checkBoxed: Answer[] = [];
  userAnswers: Answer[] = [];
  userAnswersIds: number[] = [];
  results: ElementaryGroup[] = [];

  pageEvent: PageEvent;
  pageSize = 15;
  length: number;
  pageSizeOptions: number[] = [5, 10, 15, 25, 50];
  paginatorData = [];

  constructor(private startQuizService: StartQuizService) {
  }

  ngOnInit(): void {
    this.getQuiz();
  }

  paginateData($event: PageEvent): PageEvent {
    this.paginatorData = this.results.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
    return $event;
  }

  // -buttons- //
  saveOneAnswer(answer: Answer): void {
    this.userAnswers.push(answer);
    this.sendAnswers();
  }

  editCheckboxed(event, answer: Answer): void {
    if (event.target.checked) {
      this.checkBoxed.push(answer);
    } else {
      for (let i = 0; i < this.checkBoxed.length; i++) {
        if (this.checkBoxed[i].id === answer.id) {
          this.checkBoxed.splice(i, 1);
          break;
        }
      }
    }
  }

  saveManyAnswers(): void {
    console.log('Save many');
    if (this.checkBoxed.length !== 0) {
      this.checkBoxed.forEach(archivedAnswer => this.userAnswers.push(archivedAnswer));
    }
    this.sendAnswers();
  }

  previousQuestion(): void {
    this.quiz = this.priorQuiz;
    this.quiz.answerIds = [];
    this.returned = true;
    this.checkBoxed = [];
    this.userAnswers = [];
    this.userAnswersIds = [];
  }

  // --- //

  sendAnswers(): void {
    this.getUserAnswersIds();
    console.log('Sendig post...');
    this.returned = false;
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
    this.startQuizService.getQuiz().subscribe(quiz => {
        this.priorQuiz = this.quiz;
        this.quiz = quiz;
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Get: ' + JSON.stringify(this.quiz))
    );
  }

  postQuiz(): void {
    console.log('Post:\n' + JSON.stringify(this.quiz));
    this.startQuizService.sendUserAnswers(this.quiz).subscribe(quiz => {
        this.priorQuiz = this.quiz;
        this.quiz = quiz;
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        console.log('Resp:\n' + JSON.stringify(this.quiz));
        console.log('prior:\n' + JSON.stringify(this.priorQuiz));
        if (this.quiz.questionList.length === 0) {
          console.log('QuestionListEmpty');
          this.postResults();
        }
      }
    );
  }

  postResults(): void {
    this.startQuizService.getResults(this.quiz).subscribe(results => {
        this.results = results;
        this.paginatorData = results.slice(0, this.pageSize);
        this.length = results.length;
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        console.log('Response: ' + JSON.stringify(this.results));
        this.resultsReady = 1;
        if (this.results.length === 0) {
          this.resultsReady = 0;
        }
      }
    );
  }

  // --- //
}

