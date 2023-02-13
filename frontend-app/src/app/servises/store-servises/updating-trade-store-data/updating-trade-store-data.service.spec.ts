import { TestBed, inject } from '@angular/core/testing';

import { UpdatingTradeStoreDataService } from './updating-trade-store-data.service';

describe('UpdatingTradeStoreDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatingTradeStoreDataService]
    });
  });

  it('should be created', inject([UpdatingTradeStoreDataService], (service: UpdatingTradeStoreDataService) => {
    expect(service).toBeTruthy();
  }));
});
