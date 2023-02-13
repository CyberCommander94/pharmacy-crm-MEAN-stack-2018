import { TestBed, inject } from '@angular/core/testing';

import { SharingSuppliesDataService } from './sharing-supplies-data.service';

describe('SharingSuppliesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharingSuppliesDataService]
    });
  });

  it('should be created', inject([SharingSuppliesDataService], (service: SharingSuppliesDataService) => {
    expect(service).toBeTruthy();
  }));
});
