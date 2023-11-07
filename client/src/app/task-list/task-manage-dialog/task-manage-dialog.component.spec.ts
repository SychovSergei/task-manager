import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManageDialogComponent } from './task-manage-dialog.component';

describe('TaskManageDialogComponent', () => {
  let component: TaskManageDialogComponent;
  let fixture: ComponentFixture<TaskManageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskManageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
