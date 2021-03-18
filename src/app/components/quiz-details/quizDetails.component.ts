import {Component, HostBinding, OnInit} from '@angular/core';
import {Quiz} from '../../interfaces/quiz';
import {StartQuizService} from '../../services/start-quiz.service';
import {Answer} from '../../interfaces/answer';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quizDetails.component.html',
  styleUrls: ['./quizDetails.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quiz: Quiz;
  userAnswers: Answer[] = [];
  userAnswersIds: number[] = [];
  results: [] = [];

  constructor(private startQuizService: StartQuizService) { }

  ngOnInit(): void {
    this.getQuiz();
  }

  // -buttons- //
  saveOneAnswer(answer: Answer): void {
    this.userAnswers.push(answer);
    this.sendAnswers();
  }
  // --- //

  sendAnswers(): void {
    this.getUserAnswersIds();
    this.postQuiz();
    this.userAnswersIds = [];
    this.userAnswers = [];
  }

  getUserAnswersIds(): void {
    this.userAnswers.forEach(item => this.userAnswersIds.push(item.id));
    this.quiz.answerIds = this.userAnswersIds;
  }

  // -requests- //
  getQuiz(): void {
    this.startQuizService.getQuiz().subscribe(quiz => this.quiz = quiz);
  }

  postQuiz(): void {
    this.startQuizService.sendUserAnswers(this.quiz).subscribe(quiz => this.quiz = quiz);
    if (this.quiz.questionList.length === 0) {
      this.postResults();
    }
  }

  postResults(): void {
    this.startQuizService.getResults(this.quiz).subscribe(results => this.results = results);
  }
  // --- //
}
