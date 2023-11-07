import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ITaskOperationData} from "../../interfaces/manage-task.interface";

@Component({
  selector: 'app-task-confirm-dialog',
  templateUrl: './task-confirm-dialog.component.html',
  styleUrls: ['./task-confirm-dialog.component.scss']
})
export class TaskConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITaskOperationData,
              private dialogRef: MatDialogRef<TaskConfirmDialogComponent>) {}
  confirmDelete() {
    this.dialogRef.close(this.data);
  }
}
