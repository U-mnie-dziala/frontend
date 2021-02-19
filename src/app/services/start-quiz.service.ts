import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuizDetailsComponent} from '../components/quiz-details/quizDetails.component';
import {Observable} from 'rxjs';
import {Quiz} from '../interfaces/quiz';
import {Answer} from '../interfaces/answer';

@Injectable({
  providedIn: 'any'
})
export class StartQuizService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'text'})
  };
  url = 'http://localhost:8080/quiz/start';
  url2 = 'http://localhost:8080/quiz/form';
  userAnswers: Answer[] = [];
  test: any;

  constructor(private httpClient: HttpClient) { }

  public getQuiz(): Observable<Quiz>{
    return this.httpClient.get<Quiz>(this.url);
  }

  public storeAnswers(answer: Answer): void {
    // console.log(answer);
    this.userAnswers.push(answer);
  }

  public sendUserAnswers(): Observable<any>{
    console.log(this.userAnswers.toString().substring(1, this.userAnswers.toString().length - 1)) ;
    return this.httpClient.post(this.url2, this.userAnswers.toString().substring(1, this.userAnswers.toString().length - 1), this.httpOptions);
  }

}
