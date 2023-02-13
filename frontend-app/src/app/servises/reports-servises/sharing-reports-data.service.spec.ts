import { TestBed, inject } from '@angular/core/testing';

import { SharingReportsDataService } from './sharing-reports-data.service';

describe('SharingReportsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharingReportsDataService]
    });
  });

  it('should be created', inject([SharingReportsDataService], (service: SharingReportsDataService) => {
    expect(service).toBeTruthy();
  }));
});
