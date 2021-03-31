import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ElementaryGroupForSearch} from '../interfaces/elementary-group-for-search';

@Injectable({
  providedIn: 'any'
})
export class SearchService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
  };
  private urlElementary = 'http://localhost:8080/search/elementarygroups';
  private urlProffesionsLetter = 'http://localhost:8080/search/professions';
  private urlProffesions = 'http://localhost:8080/search/professions';

  constructor(private httpClient: HttpClient) {}

  getProffesions(letter: string): Observable<any>{
    return this.httpClient.get(this.urlProffesionsLetter + '/' + letter, this.httpOptions);
  }

  postProffesions(text: string): Observable<any>{
    return this.httpClient.post(this.urlProffesions, text, this.httpOptions);
  }

  postGroup(searchGroupText: string): Observable<any> {
    console.log('Input: ' + searchGroupText);
    return this.httpClient.post(this.urlElementary, searchGroupText, this.httpOptions);
  }
}
