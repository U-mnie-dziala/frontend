import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {ElementaryGroupForSearch} from '../../interfaces/elementary-group-for-search';
import { ActivatedRoute } from '@angular/router';
import {stringify} from 'querystring';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  searchGroupText = '';
  groups: ElementaryGroupForSearch[] = [];

  pageEvent: PageEvent;
  pageSize = 15;
  length: number;
  pageSizeOptions: number[] = [5, 10, 15, 25, 50];
  paginatorData = [];

  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchGroupText = params.searchGroupText;
    });
    this.getGroups();
  }

  paginateData($event: PageEvent): PageEvent {
    this.paginatorData = this.groups.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
    return $event;
  }

  getGroups(): void {
    this.groups = null;
    if (this.searchGroupText){
      this.searchService.postGroup(this.searchGroupText).subscribe(element => {
        this.groups = element;
        this.paginatorData = element.slice(0, this.pageSize);
        this.length = element.length;
      });
    }
    else {
      this.searchService.postGroup(' ').subscribe(element => {
        this.groups = element;
        this.paginatorData = element.slice(0, this.pageSize);
        this.length = element.length;
      });
    }
  }
}
