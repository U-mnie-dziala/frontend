import {Component, HostBinding, OnInit} from '@angular/core';
import {Quiz} from '../../interfaces/quiz';
import {StartQuizService} from '../../services/start-quiz.service';
import {Answer} from '../../interfaces/answer';
import {ElementaryGroup} from '../../interfaces/elementary-group';
import {PageEvent} from '@angular/material/paginator';
import {UserHistoryService} from '../../services/user-history.service';
import {ActivatedRoute} from '@angular/router';

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
  waiting = true;

  pageEvent: PageEvent;
  pageSize = 15;
  length: number;
  pageSizeOptions: number[] = [5, 10, 15, 25, 50];
  paginatorData = [];

  savingResponse: string;
  savingHistorySuccesfull: boolean = null;

  UUID: string;


  constructor(private startQuizService: StartQuizService, private route: ActivatedRoute, private userHistoryService: UserHistoryService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.UUID = params.UUID;
    });
    if (this.UUID){
      this.postResults();
    }
    else{
      this.getQuiz();
    }
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
    this.waiting = true;
    this.startQuizService.getQuiz().subscribe(quiz => {
        this.priorQuiz = this.quiz;
        this.quiz = quiz;
      },
      err => console.error('Observer got an error: ' + err),
      () => this.waiting = false
    );
  }

  postQuiz(): void {
    this.waiting = true;
    this.startQuizService.sendUserAnswers(this.quiz).subscribe(quiz => {
        this.priorQuiz = this.quiz;
        this.quiz = quiz;
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        if (this.quiz.questionList.length === 0) {
          this.postResults();
        }
        this.waiting = false;
      }
    );
  }

  postResults(): void {
    if (this.UUID){
      this.quiz = this.userHistoryService.quiz;
    }
    else {
      this.userHistoryService.saveUserHistory(this.quiz).subscribe(response => {
          this.savingResponse = response;
          this.savingHistorySuccesfull = true;
          console.log('Fail to save. Provided to userHistory');
        },
        err => {
          this.savingResponse = err.error.message;
          this.savingHistorySuccesfull = false;
          this.userHistoryService.quiz = this.quiz;
          this.userHistoryService.saveHistoryFailed = true;
          console.log('Fail to save. Provided to userHistory');
        },
      );
    }

    this.startQuizService.getResults(this.quiz).subscribe(results => {
        this.results = results;
        this.paginatorData = results.slice(0, this.pageSize);
        this.length = results.length;
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        this.resultsReady = 1;
        if (this.results.length === 0) {
          this.resultsReady = 0;
        }
      }
    );
  }

  // --- //
}

