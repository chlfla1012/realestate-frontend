import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagercreateComponent } from './managercreate.component';

describe('ManagercreateComponent', () => {
  let component: ManagercreateComponent;
  let fixture: ComponentFixture<ManagercreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagercreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
