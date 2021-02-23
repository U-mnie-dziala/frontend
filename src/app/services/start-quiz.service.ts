import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../interfaces/quiz';
import {Answer} from '../interfaces/answer';

@Injectable({
  providedIn: 'any'
})
export class StartQuizService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
  };
  // httpOptions2 = {
  //   headers: new HttpHeaders({ 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'}),
  //   mode: 'no-cors'
  // };
  urlStart = 'http://localhost:8080/quiz/start';
  urlForm = 'http://localhost:8080/quiz/form';
  userAnswers: Answer[] = [];
  userAnswersIds: number[] = [];
  test: any;

  quiz: Quiz;

  constructor(private httpClient: HttpClient) { }

  public getQuiz(): Observable<Quiz>{
    return this.httpClient.get<Quiz>(this.urlStart);
  }

  public storeAnswers(answer: Answer): void {
    console.log('Stored answer: ' + answer.text);
    this.userAnswers.push(answer);
  }

  public sendUserAnswers(): Observable<any>{
    this.userAnswers.forEach(item => this.userAnswersIds.push(item.id));
    this.quiz.answerIds = this.userAnswersIds;

    console.log('Sending with POST:');
    console.log(this.userAnswers);

    return this.httpClient.post(
      this.urlForm,
      this.quiz,
      this.httpOptions
    );
  }

}
