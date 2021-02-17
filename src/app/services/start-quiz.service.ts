import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {QuizComponent} from '../components/quiz/quiz.component';
import {Observable} from 'rxjs';
import {Quiz} from '../interfaces/quiz';

@Injectable({
  providedIn: 'any'
})
export class StartQuizService {

  constructor(private httpClient: HttpClient) { }

  public getQuiz(): Observable<Quiz>{
    return this.httpClient.get<Quiz>('http://localhost:8080/quiz/start');
  }
}
