import { TestBed } from '@angular/core/testing';

import { EstablecimientosService } from './establecimientos.service';

describe('EstablecimientosService', () => {
  let service: EstablecimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablecimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
