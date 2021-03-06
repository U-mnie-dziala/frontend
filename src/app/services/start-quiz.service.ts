import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../interfaces/quiz';
import {QuizDetailsComponent} from '../components/quiz-details/quizDetails.component';
import {Answer} from '../interfaces/answer';
import {MatExpansionModule} from '@angular/material/expansion';

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
  private urlStart = 'https://programowaniezespolowe-app.herokuapp.com/quiz/start';
  private urlForm = 'https://programowaniezespolowe-app.herokuapp.com/quiz/form';
  private urlResults = 'https://programowaniezespolowe-app.herokuapp.com/elementarygroups';

  constructor(private httpClient: HttpClient) { }

  public getQuiz(): Observable<Quiz>{
    return this.httpClient.get<Quiz>(this.urlStart);
  }

  public sendUserAnswers(quiz: Quiz): Observable<any>{
    return this.httpClient.post(
      this.urlForm,
      quiz,
      this.httpOptions
    );
  }

  getResults(quiz: Quiz): Observable<any> {
    return this.httpClient.post(
      this.urlResults,
      quiz,
      this.httpOptions
    );
  }
}
