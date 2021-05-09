import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
    responseType: 'text' as 'json'
  };
  private url = 'https://programowaniezespolowe-app.herokuapp.com/api/credentials/';

  constructor(private httpClient: HttpClient) {}

  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any>{
    return this.httpClient.post(this.url + 'changepassword', {userId, oldPassword, newPassword}, this.httpOptions);
  }

  changeEmail(userId: number, oldPassword: string, emailNew: string): Observable<any>{
    return this.httpClient.post(this.url + 'changeemail', {userId, oldPassword, emailNew}, this.httpOptions);
  }

  deleteAccount(userId: number, oldPassword: string): Observable<any>{
    return this.httpClient.post(this.url + 'deleteaccount', {userId, oldPassword}, this.httpOptions);
  }
}
