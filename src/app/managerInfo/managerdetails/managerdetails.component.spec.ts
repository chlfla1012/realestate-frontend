import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerdetailsComponent } from './managerdetails.component';

describe('ManagerdetailsComponent', () => {
  let component: ManagerdetailsComponent;
  let fixture: ComponentFixture<ManagerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
