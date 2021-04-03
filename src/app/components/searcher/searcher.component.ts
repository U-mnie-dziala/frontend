import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {ElementaryGroupForSearch} from '../../interfaces/elementary-group-for-search';
import { ActivatedRoute } from '@angular/router';
import {stringify} from 'querystring';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  searchGroupText = '';
  groups: ElementaryGroupForSearch[] = [];

  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchGroupText = params.searchGroupText;
    });
    this.getGroups();
  }

  getGroups(): void {
    this.groups = null;
    if (this.searchGroupText){
      this.searchService.postGroup(this.searchGroupText).subscribe(groups => this.groups = groups);
    }
    else {
      this.searchService.postGroup(' ').subscribe(groups => this.groups = groups);
    }
    console.log('Output: ' + this.groups);
  }
}
