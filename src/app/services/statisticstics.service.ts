import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StatisticsticsService {
  constructor(private http: HttpClient) { }

  getStatistics(groupCode: string): Observable<any>{
    return this.http.get('https://programowaniezespolowe-app.herokuapp.com/salarystatistics/' + groupCode, httpOptions);
  }
}
