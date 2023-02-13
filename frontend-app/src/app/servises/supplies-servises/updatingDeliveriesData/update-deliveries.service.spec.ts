import { TestBed, inject } from '@angular/core/testing';

import { UpdateDeliveriesService } from './update-deliveries.service';

describe('UpdateDeliveriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateDeliveriesService]
    });
  });

  it('should be created', inject([UpdateDeliveriesService], (service: UpdateDeliveriesService) => {
    expect(service).toBeTruthy();
  }));
});
