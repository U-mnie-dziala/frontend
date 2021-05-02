import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {ProfessionForSearch} from '../../interfaces/profession-for-search';
import { ActivatedRoute } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-profession-searcher',
  templateUrl: './profession-searcher.component.html',
  styleUrls: ['./profession-searcher.component.css']
})
export class ProfessionSearcherComponent implements OnInit {
  lettersToUse = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'O', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Z', 'Ż'];

  pageEvent: PageEvent;
  pageSize = 15;
  length: number;
  pageSizeOptions: number[] = [5, 10, 15, 25, 50];
  paginatorData = [];

  searchProffesionText = '';
  professions: ProfessionForSearch[] = [];

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchProffesionText = params.searchProffesionText;
    });
    if (this.searchProffesionText && this.searchProffesionText.length === 1){
      this.getProffesions(this.searchProffesionText);
    }
    else if (this.searchProffesionText){
      this.postProffesions();
    }
    else {
      this.getProffesions('A');
    }
  }

  paginateData($event: PageEvent): PageEvent {
    this.paginatorData = this.professions.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
    return $event;
  }

  getProffesions(letter: string): void{
    this.professions = null;
    if (this.searchProffesionText){
      this.searchService.getProffesions(letter).subscribe(element => {
        this.professions = element;
        this.paginatorData = element.slice(0, this.pageSize);
        this.length = element.length;
      });
    }
    else {
      this.searchService.getProffesions('A').subscribe(element => {
        this.professions = element;
        this.paginatorData = element.slice(0, this.pageSize);
        this.length = element.length;
      });
    }
  }

  postProffesions(): void {
    this.professions = null;
    if (this.searchProffesionText){
      this.searchService.postProffesions(this.searchProffesionText).subscribe(element => {
        this.professions = element;
        this.paginatorData = element.slice(0, this.pageSize);
        this.length = element.length;
      });
    }
    else {
      this.searchService.getProffesions(' ').subscribe(element => {
        this.professions = element;
        this.paginatorData = element.slice(0, this.pageSize);
        this.length = element.length;
      });
    }
  }
}
