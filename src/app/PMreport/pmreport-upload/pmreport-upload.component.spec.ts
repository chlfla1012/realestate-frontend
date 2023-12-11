import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmreportUploadComponent } from './pmreport-upload.component';

describe('PmreportUploadComponent', () => {
  let component: PmreportUploadComponent;
  let fixture: ComponentFixture<PmreportUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmreportUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmreportUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
