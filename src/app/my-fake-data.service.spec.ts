import { TestBed } from '@angular/core/testing';

import { MyFakeDataService } from './my-fake-data.service';

describe('MyFakeDataService', () => {
  let service: MyFakeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFakeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
