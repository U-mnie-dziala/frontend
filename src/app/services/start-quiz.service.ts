import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuizDetailsComponent} from '../components/quiz-details/quizDetails.component';
import {Observable} from 'rxjs';
import {Quiz} from '../interfaces/quiz';

@Injectable({
  providedIn: 'any'
})
export class StartQuizService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  url = 'http://localhost:8080/quiz/start';
  userAnswers: string[] = [];
  test: any;

  constructor(private httpClient: HttpClient) { }

  public getQuiz(): Observable<Quiz>{
    return this.httpClient.get<Quiz>(this.url);
  }

  public storeAnswers(userAnswer: string): void {
    console.log(userAnswer);
    this.userAnswers.push(userAnswer);
  }

  public sendUserAnswers(): Observable<any>{
    console.log(this.userAnswers);
    return this.httpClient.post(this.url, this.userAnswers, this.httpOptions);
  }

}
