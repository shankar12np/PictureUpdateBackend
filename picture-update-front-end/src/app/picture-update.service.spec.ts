import { TestBed } from '@angular/core/testing';

import { PictureUpdateService } from './picture-update.service';

describe('PictureUpdateService', () => {
  let service: PictureUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
