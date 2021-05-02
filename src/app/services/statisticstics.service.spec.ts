import { TestBed } from '@angular/core/testing';

import { StatisticsticsService } from './statisticstics.service';

describe('StatisticsticsService', () => {
  let service: StatisticsticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
