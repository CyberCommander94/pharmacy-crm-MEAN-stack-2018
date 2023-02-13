import { TestBed, inject } from '@angular/core/testing';

import { HttpActionsService } from './http-actions.service';

describe('HttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpActionsService]
    });
  });

  it('should be created', inject([HttpActionsService], (service: HttpActionsService) => {
    expect(service).toBeTruthy();
  }));
});
