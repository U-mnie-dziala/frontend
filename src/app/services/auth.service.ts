import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://https://programowaniezespolowe-app.herokuapp.com/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'credentials/resetPassword', email, httpOptions);
  }

  resetPasswordwithToken(token: string): Observable<any> {
    return this.http.get(AUTH_API + 'credentials/resetPassword/' + token, httpOptions);
  }

  resetPasswordFinal(newPassword: string, token: string): Observable<any> {
    return this.http.post(AUTH_API + 'credentials/resetPassword/save', {newPassword, token}, httpOptions);
  }
}
