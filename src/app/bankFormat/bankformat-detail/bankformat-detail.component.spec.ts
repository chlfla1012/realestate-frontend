import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFormatDetailComponent } from './bankformat-detail.component';

describe('BankFormatDetailComponent', () => {
  let component: BankFormatDetailComponent;
  let fixture: ComponentFixture<BankFormatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankFormatDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankFormatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
