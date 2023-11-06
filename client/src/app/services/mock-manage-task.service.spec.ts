import { TestBed } from '@angular/core/testing';

import { MockManageTaskService } from './mock-manage-task.service';

describe('MockManageTaskService', () => {
  let service: MockManageTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockManageTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
