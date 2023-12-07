import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { CustomerDetailsComponent } from './customer-details.component';
=======
import { CusomterDetailsComponent } from './customer-details.component';
>>>>>>> 2e1d7f5106db9b9e8d8befb17402998d08396ff2

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
