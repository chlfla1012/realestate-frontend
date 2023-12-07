import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFormatCreateComponent } from './bankformat-create.component';

describe('BankFormatCreateComponent', () => {
  let component: BankFormatCreateComponent;
  let fixture: ComponentFixture<BankFormatCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankFormatCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankFormatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
