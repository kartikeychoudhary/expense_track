import { TestBed } from '@angular/core/testing';

import { ThemeEngineService } from './theme-engine.service';

describe('ThemeEngineService', () => {
  let service: ThemeEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
