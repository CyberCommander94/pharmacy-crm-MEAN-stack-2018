import { TestBed, inject } from '@angular/core/testing';

import { SharingStoreDataService } from './sharing-store-data.service';

describe('SharingStoreDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharingStoreDataService]
    });
  });

  it('should be created', inject([SharingStoreDataService], (service: SharingStoreDataService) => {
    expect(service).toBeTruthy();
  }));
});
