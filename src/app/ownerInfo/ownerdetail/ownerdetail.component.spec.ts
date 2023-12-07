import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerdetailComponent } from './ownerdetail.component';

describe('OwnerdetailComponent', () => {
  let component: OwnerdetailComponent;
  let fixture: ComponentFixture<OwnerdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
