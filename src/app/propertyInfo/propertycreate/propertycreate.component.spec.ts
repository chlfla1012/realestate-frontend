import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertycreateComponent } from './propertycreate.component';

describe('PropertycreateComponent', () => {
  let component: PropertycreateComponent;
  let fixture: ComponentFixture<PropertycreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertycreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
