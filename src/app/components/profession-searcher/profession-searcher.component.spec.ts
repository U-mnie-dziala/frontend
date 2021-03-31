import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionSearcherComponent } from './profession-searcher.component';

describe('ProfessionSearcherComponent', () => {
  let component: ProfessionSearcherComponent;
  let fixture: ComponentFixture<ProfessionSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
