import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmreportListComponent } from './pmreport-list.component';

describe('PmreportListComponent', () => {
  let component: PmreportListComponent;
  let fixture: ComponentFixture<PmreportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmreportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmreportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
