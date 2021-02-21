import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../interfaces/quiz';
import {StartQuizService} from '../../services/start-quiz.service';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Answer} from '../../interfaces/answer';
import {QuizDTO} from '../../interfaces/quiz-dto';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quizDetails.component.html',
  styleUrls: ['./quizdetails.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quizDTO: QuizDTO;

  constructor(private startQuizService: StartQuizService) { }

  ngOnInit(): void {
    this.getQuiz();
  }

  getQuiz(): void {
    this.startQuizService.getQuiz().subscribe(quizDTO => this.quizDTO = quizDTO);
  }

  saveAnswer(answer: Answer): void {
    this.startQuizService.storeAnswers(answer);
  }

  sendAnswers(): void {
    this.startQuizService.storeQuizDTO(this.quizDTO);
    this.getResponse();
    this.startQuizService.userAnswers = [];
  }

  getResponse(): void {
    this.startQuizService.sendUserAnswers().subscribe(quizDTO => this.quizDTO = quizDTO);
  }

}
