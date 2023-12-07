import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnercreateComponent } from './ownercreate.component';

describe('OwnercreateComponent', () => {
  let component: OwnercreateComponent;
  let fixture: ComponentFixture<OwnercreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnercreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
