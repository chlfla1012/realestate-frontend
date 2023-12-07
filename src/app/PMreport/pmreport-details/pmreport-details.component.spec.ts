import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmreportDetailsComponent } from './pmreport-details.component';

describe('PmreportDetailsComponent', () => {
  let component: PmreportDetailsComponent;
  let fixture: ComponentFixture<PmreportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmreportDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmreportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
