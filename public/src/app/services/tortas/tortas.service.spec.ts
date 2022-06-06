import { TestBed } from '@angular/core/testing';

import { TortasService } from './tortas.service';

describe('TortasService', () => {
  let service: TortasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TortasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
