import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {ElementaryGroupForSearch} from '../../interfaces/elementary-group-for-search';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  allProffesions: string[];
  searchProffesionText: string;
  searchGroupText = '';
  groups: ElementaryGroupForSearch[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
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
