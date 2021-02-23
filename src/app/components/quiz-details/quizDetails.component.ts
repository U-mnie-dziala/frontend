import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../interfaces/quiz';
import {StartQuizService} from '../../services/start-quiz.service';
import {Answer} from '../../interfaces/answer';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quizDetails.component.html',
  styleUrls: ['./quizdetails.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quiz: Quiz;

  constructor(private startQuizService: StartQuizService) { }

  ngOnInit(): void {
    this.getQuiz();
  }

  getQuiz(): void {
    this.startQuizService.getQuiz().subscribe(quiz => this.quiz = quiz);
  }

  saveAnswer(answer: Answer): void {
    this.startQuizService.storeAnswers(answer);
  }

  sendAnswers(): void {
    this.startQuizService.quiz = this.quiz;
    this.postQuiz();
    this.startQuizService.userAnswers = [];
  }

  postQuiz(): void {
    this.startQuizService.sendUserAnswers().subscribe(quiz => this.quiz = quiz);
  }
}
