/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LookupService } from './lookup.service';

describe('Service: Lookup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupService]
    });
  });

  it('should ...', inject([LookupService], (service: LookupService) => {
    expect(service).toBeTruthy();
  }));
});
