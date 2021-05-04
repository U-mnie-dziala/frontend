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
  private urlElementary = 'https://programowaniezespolowe-app.herokuapp.com/search/elementarygroups';
  private urlProffesions = 'https://programowaniezespolowe-app.herokuapp.com/search/professions';

  constructor(private httpClient: HttpClient) {}

  getProffesions(letter: string): Observable<any>{
    return this.httpClient.get(this.urlProffesions + '/' + letter, this.httpOptions);
  }

  postProffesions(text: string): Observable<any>{
    return this.httpClient.post(this.urlProffesions, text, this.httpOptions);
  }

  postGroup(searchGroupText: string): Observable<any> {
    return this.httpClient.post(this.urlElementary, searchGroupText, this.httpOptions);
  }
}
