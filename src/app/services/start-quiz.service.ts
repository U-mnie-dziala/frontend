import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuizDetailsComponent} from '../components/quiz-details/quizDetails.component';
import {Observable, range} from 'rxjs';
import {Quiz} from '../interfaces/quiz';
import {Answer} from '../interfaces/answer';
import { QuizDTO } from '../interfaces/quiz-dto';

@Injectable({
  providedIn: 'any'
})
export class StartQuizService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
  };
  // httpOptions2 = {
  //   headers: new HttpHeaders()}
  url = 'http://localhost:8080/quiz/start';
  url2 = 'http://localhost:8080/quiz/form';
  userAnswers: Answer[] = [];
  userAnswersIds: number[] = [];
  test: any;

  quiz: Quiz;

  constructor(private httpClient: HttpClient) { }

  public getQuiz(): Observable<Quiz>{
    return this.httpClient.get<Quiz>(this.url);
  }

  public storeAnswers(answer: Answer): void {
    console.log(answer);
    this.userAnswers.push(answer);
  }

  public sendUserAnswers(): Observable<any>{
    console.log('Przed POST:');
    console.log(this.userAnswers);
    for (var i = 0; i < this.userAnswers.length; i++){
      this.userAnswersIds.push(this.userAnswers[i].id);
    }
    this.quiz.answerIds = this.userAnswersIds;
    return this.httpClient.post(
      this.url2,
      this.quiz,
      this.httpOptions
    );
  }

}
