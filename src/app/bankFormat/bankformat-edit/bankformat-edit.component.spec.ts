import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFormatEditComponent } from './bankformat-edit.component';

describe('BankFormatEditComponent', () => {
  let component: BankFormatEditComponent;
  let fixture: ComponentFixture<BankFormatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankFormatEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankFormatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
