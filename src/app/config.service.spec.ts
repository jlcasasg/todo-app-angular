import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = new ConfigService();
  });

  it('should be created', () => {
    service = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
  });

  it('should return a random string', () => {
    let randomId = service.randomId();
    let randomId2 = service.randomId();
    expect(randomId).not.toEqual(randomId2);
  });
});
