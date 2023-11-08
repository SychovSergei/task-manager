import {Component, Inject} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ETaskOperation, ITaskOperationData, ITaskItem, ETaskStatus} from "../../interfaces/manage-task.interface";

interface IStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-manage-dialog',
  templateUrl: './task-manage-dialog.component.html',
  styleUrls: ['./task-manage-dialog.component.scss'],
})
export class TaskManageDialogComponent {

  public taskFormData: ITaskItem = {id: '', status: ETaskStatus.Pending, title: '', description: '', completed: false, dateCreate: 0};

  result: ITaskOperationData = {
    data: this.taskFormData,
    operation: ETaskOperation.Default
  };

  private operation!: ETaskOperation;
  get isCreate() {
    return this.operation === ETaskOperation.Create;
  }
  get isEdit() {
    return this.operation === ETaskOperation.Edit;
  }

  isSubmit: boolean = false;

  statuses: IStatus[] = [
    {value: ETaskStatus.Pending, viewValue: 'Pending'},
    {value: ETaskStatus.OnWork, viewValue: 'OnWork'},
    {value: ETaskStatus.Done, viewValue: 'Done'},
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITaskOperationData,
              private dialogRef: MatDialogRef<TaskManageDialogComponent>
              ) {
  }

  ngOnInit() {
    this.taskFormData = this.data.data;
    this.operation = this.data.operation;
  }

  onSubmit(taskForm: NgForm) {
    this.isSubmit = true;
    taskForm.form.controls['title'].markAsTouched();
    taskForm.form.controls['description'].markAsTouched();
    if (taskForm.valid) {
      this.result = {
        data: {
          id: this.taskFormData.id,
          status: taskForm.form.controls['status'].value,
          title: taskForm.form.controls['title'].value,
          description: taskForm.form.controls['description'].value,
          completed: this.taskFormData.completed,
          dateCreate: new Date().getTime()
        },
        operation: this.operation
      }
      this.dialogRef.close(this.result);
    }
  }

}
