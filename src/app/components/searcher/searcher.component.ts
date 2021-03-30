import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  allProffesions: string[];
  searchText: string;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.getAllProffesions();
  }

  getAllProffesions(): void{
    this.searchService.getAllProffesions().subscribe(element => this.allProffesions = element);
  }

  getProffesions(): void {
    this.searchService.postProffesions(this.searchText).subscribe(element => this.allProffesions = element);
  }
}
