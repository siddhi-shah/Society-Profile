import { TestBed } from '@angular/core/testing';

import { SocietyService } from './society.service';

describe('SocietyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocietyService = TestBed.get(SocietyService);
    expect(service).toBeTruthy();
  });
});
