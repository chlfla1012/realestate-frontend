import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMainComponent } from './owner-main.component';

describe('OwnerMainComponent', () => {
  let component: OwnerMainComponent;
  let fixture: ComponentFixture<OwnerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
