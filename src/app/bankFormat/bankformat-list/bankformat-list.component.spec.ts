import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFormatListComponent } from './bankformat-list.component';

describe('BankFormatListComponent', () => {
  let component: BankFormatListComponent;
  let fixture: ComponentFixture<BankFormatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankFormatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankFormatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
