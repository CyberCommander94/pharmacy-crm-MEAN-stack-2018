import { TestBed, inject } from '@angular/core/testing';

import { SharingDirectoryDataService } from './sharing-directory-data.service';

describe('SharingDirectoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharingDirectoryDataService]
    });
  });

  it('should be created', inject([SharingDirectoryDataService], (service: SharingDirectoryDataService) => {
    expect(service).toBeTruthy();
  }));
});
