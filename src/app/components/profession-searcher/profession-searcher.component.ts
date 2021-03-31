import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {ProfessionForSearch} from '../../interfaces/profession-for-search';

@Component({
  selector: 'app-profession-searcher',
  templateUrl: './profession-searcher.component.html',
  styleUrls: ['./profession-searcher.component.css']
})
export class ProfessionSearcherComponent implements OnInit {
  searchProffesionText = '';
  professions: ProfessionForSearch[] = [];
  lettersToUse = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'O', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Z', 'Ż'];
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.getProffesions('A');
  }

  getProffesions(letter: string): void{
    this.professions = null;
    this.searchService.getProffesions(letter).subscribe(element => this.professions = element);
  }

  postProffesions(): void {
    this.professions = null;
    this.searchService.postProffesions(this.searchProffesionText).subscribe(element => this.professions = element);
  }

}
