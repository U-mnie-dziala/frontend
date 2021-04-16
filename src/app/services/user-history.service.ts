import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../interfaces/quiz';
import {QuizDTO} from '../interfaces/quiz-dto';
import {stringify} from 'querystring';

const API_URL = 'http://localhost:8080/api/quizhistory/';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {
  username: string;
  userId: number;
  quiz: Quiz;

  constructor(private http: HttpClient) { }

  getUserHistory(userId = this.userId, username = this.username ): Observable<any> {

    return this.http.post(API_URL + 'getuserhistory', { userId, username } , { responseType: 'text' });
  }

  saveUserHistory(quiz: Quiz, userId = this.userId): Observable<any> {
    console.log('quiz: ' + userId + ', quiz: ' + JSON.stringify(quiz) + '}');
    return this.http.post(API_URL + 'save', {userId, quiz: JSON.stringify(quiz)} , { responseType: 'text' });
  }

  quizify(quiz: string): Observable<any> {
    return this.http.post(API_URL + 'toQuiz', quiz , { responseType: 'text' });
  }

  getUserHistoryByUUID(uuid: string): Observable<any> {
    return this.http.get(API_URL + uuid, { responseType: 'text' });
  }
}
