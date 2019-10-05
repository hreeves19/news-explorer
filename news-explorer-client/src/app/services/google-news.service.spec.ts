import { TestBed } from '@angular/core/testing';

import { GoogleNewsService } from './google-news.service';

describe('GoogleNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleNewsService = TestBed.get(GoogleNewsService);
    expect(service).toBeTruthy();
  });
});
