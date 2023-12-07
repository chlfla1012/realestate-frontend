import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmreportCreatePdfComponent } from './pmreport-create-pdf.component';

describe('PmreportCreatePdfComponent', () => {
  let component: PmreportCreatePdfComponent;
  let fixture: ComponentFixture<PmreportCreatePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmreportCreatePdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmreportCreatePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
