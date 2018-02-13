import { TestBed, inject } from '@angular/core/testing';

import { OuterService } from './outer.service';

describe('OuterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OuterService]
    });
  });

  it('should be created', inject([OuterService], (service: OuterService) => {
    expect(service).toBeTruthy();
  }));
});
