import { TestBed } from '@angular/core/testing';

import { SubjectManageTaskService } from './subject-manage-task.service';

describe('SubjectManageTaskService', () => {
  let service: SubjectManageTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectManageTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
