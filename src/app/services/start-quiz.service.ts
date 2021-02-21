import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuizDetailsComponent} from '../components/quiz-details/quizDetails.component';
import {Observable} from 'rxjs';
import {Quiz} from '../interfaces/quiz';
import {Answer} from '../interfaces/answer';
import { QuizDTO } from '../interfaces/quiz-dto';

@Injectable({
  providedIn: 'any'
})
export class StartQuizService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'} ),
    mode: 'no-cors'
  };
  httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'text'})
  };
  url = 'http://localhost:8080/quiz/start';
  url2 = 'http://localhost:8080/quiz/bezsesji';
  userAnswers: Answer[] = [];
  test: any;

  quizDTO!: QuizDTO;

  constructor(private httpClient: HttpClient) { }

  public getQuiz(): Observable<QuizDTO>{
    return this.httpClient.get<QuizDTO>(this.url);
  }

  public storeAnswers(answer: Answer): void {
    // console.log(answer);
    this.userAnswers.push(answer);
  }

  public sendUserAnswers(): Observable<any>{
    this.quizDTO.answer = this.userAnswers;
    console.log(JSON.stringify(this.quizDTO)) ;
    return this.httpClient.post(
      this.url2,
      this.quizDTO,
      this.httpOptions
    );
  }

}
