import { TestBed, inject } from '@angular/core/testing';

import { SharingSalesDataService } from './sharing-sales-data.service';

describe('SharingSalesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharingSalesDataService]
    });
  });

  it('should be created', inject([SharingSalesDataService], (service: SharingSalesDataService) => {
    expect(service).toBeTruthy();
  }));
});
