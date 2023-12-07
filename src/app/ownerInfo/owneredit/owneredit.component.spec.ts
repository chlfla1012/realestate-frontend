import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnereditComponent } from './owneredit.component';

describe('OwnereditComponent', () => {
  let component: OwnereditComponent;
  let fixture: ComponentFixture<OwnereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnereditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
