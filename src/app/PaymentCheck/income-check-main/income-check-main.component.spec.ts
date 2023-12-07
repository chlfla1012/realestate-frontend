import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCheckMainComponent } from './income-check-main.component';

describe('IncomeCheckMainComponent', () => {
  let component: IncomeCheckMainComponent;
  let fixture: ComponentFixture<IncomeCheckMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeCheckMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeCheckMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
