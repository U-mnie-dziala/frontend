import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../interfaces/quiz';
import {StartQuizService} from '../../services/start-quiz.service';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quizDetails.component.html',
  styleUrls: ['./quizdetails.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quiz!: Quiz;

  constructor(private startQuizService: StartQuizService) { }

  ngOnInit(): void {
    this.getQuiz();
  }

  getQuiz(): void {
    this.startQuizService.getQuiz().subscribe(quiz => this.quiz = quiz);
  }

  saveAnswer(): void {
    this.startQuizService.getUserAnswer()
  }
}
