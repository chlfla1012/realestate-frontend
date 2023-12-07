import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertydetailComponent } from './propertydetail.component';

describe('PropertydetailComponent', () => {
  let component: PropertydetailComponent;
  let fixture: ComponentFixture<PropertydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertydetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
