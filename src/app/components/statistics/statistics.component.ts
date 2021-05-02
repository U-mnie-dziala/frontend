import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StatisticsticsService} from '../../services/statisticstics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  searchingProffession: string;
  loading = true;
  getSuccess = false;
  raw: string;

  constructor(private route: ActivatedRoute, private statistics: StatisticsticsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchingProffession = params.code;
    });
    this.statistics.getStatistics(this.searchingProffession).subscribe(element => {
        this.raw = JSON.stringify(element);
        this.loading = false;
        this.getSuccess = true;
      },
      error => {
        this.raw = JSON.stringify(error);
        this.loading = false;
        this.getSuccess = false;
      }
    );
  }
}
