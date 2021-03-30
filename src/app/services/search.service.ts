import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class SearchService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
  };
  private urlSearch = 'http://localhost:8080/search';

  constructor(private httpClient: HttpClient) {}

  getAllProffesions(): Observable<any>{
    return this.httpClient.get(this.urlSearch, this.httpOptions);
  }

  postProffesions(text: string): Observable<any>{
    console.log('Executed: ' + text);
    return this.httpClient.post(this.urlSearch, text, this.httpOptions);
  }
}
