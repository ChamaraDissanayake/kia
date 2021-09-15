import { TestBed } from '@angular/core/testing';

import { KiaProviderService } from './kia-provider.service';

describe('KiaProviderService', () => {
  let service: KiaProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KiaProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
