import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagereditComponent } from './manageredit.component';

describe('ManagereditComponent', () => {
  let component: ManagereditComponent;
  let fixture: ComponentFixture<ManagereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagereditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
