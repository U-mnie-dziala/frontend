import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {ProfessionForSearch} from '../../interfaces/profession-for-search';
import { ActivatedRoute } from '@angular/router';
import {stringify} from 'querystring';

@Component({
  selector: 'app-profession-searcher',
  templateUrl: './profession-searcher.component.html',
  styleUrls: ['./profession-searcher.component.css']
})
export class ProfessionSearcherComponent implements OnInit {
  searchProffesionText = '';
  professions: ProfessionForSearch[] = [];
  lettersToUse = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'O', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Z', 'Ż'];

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchProffesionText = params.searchProffesionText;
    });
    if (this.searchProffesionText){
      this.getProffesions(this.searchProffesionText);
    }
    else {
      this.getProffesions('A');
    }
  }

  getProffesions(letter: string): void{
    this.professions = null;
    if (this.searchProffesionText){
      this.searchService.getProffesions(letter).subscribe(element => this.professions = element);
    }
    else {
      this.searchService.getProffesions('A').subscribe(element => this.professions = element);
    }
  }

  postProffesions(): void {
    this.professions = null;
    if (this.searchProffesionText){
      this.searchService.postProffesions(this.searchProffesionText).subscribe(element => this.professions = element);
    }
    else {
      this.searchService.postProffesions(' ').subscribe(element => this.professions = element);
    }
  }

}
