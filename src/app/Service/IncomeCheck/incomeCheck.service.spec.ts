import { TestBed } from '@angular/core/testing';

import { IncomeCheckService } from './incomeCheck.service';

describe('IncomeCheckService', () => {
  let service: IncomeCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
