import { TestBed } from '@angular/core/testing';

import { SoldProductService } from './sold-product.service';

describe('SoldProductService', () => {
  let service: SoldProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
