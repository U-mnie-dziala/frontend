import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StatisticsticsService} from '../../services/statisticstics.service';
import {Statistics} from '../../interfaces/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  searchingProffession: string;
  loading = true;
  getSuccess = false;
  statistics: Statistics;
  error: string;

  militaryGroup = false;

  constructor(private route: ActivatedRoute, private statisticsService: StatisticsticsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchingProffession = params.code;
    });
    if (this.searchingProffession.startsWith('0')){
      this.getSuccess = true;
      this.loading = false;
      this.militaryGroup = true;
    }
    else{
      this.statisticsService.getStatistics(this.searchingProffession).subscribe(element => {
          this.statistics = element;
          this.loading = false;
          this.getSuccess = true;
        },
        error => {
          this.error = 'Serwer zwrócił błąd: grupa zawodowa nie istnieje?';
          this.loading = false;
          this.getSuccess = false;
        }
      );
    }
  }
}
