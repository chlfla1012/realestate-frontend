import { TestBed } from '@angular/core/testing';

import { PmReportUploadService } from './pmReportUpload.service';

describe('PmReportUploadService', () => {
  let service: PmReportUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmReportUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
