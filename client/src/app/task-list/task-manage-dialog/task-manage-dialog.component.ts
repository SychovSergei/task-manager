import {Component, Inject} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ETaskOperation, ITaskOperationData, ITaskItem} from "../../interfaces/manage-task.interface";

@Component({
  selector: 'app-task-manage-dialog',
  templateUrl: './task-manage-dialog.component.html',
  styleUrls: ['./task-manage-dialog.component.scss'],
})
export class TaskManageDialogComponent {

  public taskFormData: ITaskItem = {id: '', title: '', description: '', completed: false};

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
          // id: this.operation === ETaskOperation.Create ? Utils.generateId() : this.taskFormData.id,
          id: this.taskFormData.id,
          title: taskForm.form.controls['title'].value,
          description: taskForm.form.controls['description'].value,
          completed: this.taskFormData.completed,
        },
        operation: this.operation
      }
      this.dialogRef.close(this.result);
    }
  }

}
