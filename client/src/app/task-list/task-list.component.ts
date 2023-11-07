import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ETaskOperation, ITaskOperationData, ITaskItem} from "../interfaces/manage-task.interface";
import {MatDialog} from "@angular/material/dialog";
import {TaskManageDialogComponent} from "./task-manage-dialog/task-manage-dialog.component";
import {SubjectManageTaskService} from "../services/subject-manage-task.service";
import {TaskConfirmDialogComponent} from "./task-confirm-dialog/task-confirm-dialog.component";
import {Sort} from "@angular/material/sort";
import {sortArray} from "../utils/utils";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [SubjectManageTaskService]
})
export class TaskListComponent implements OnInit {

  public displayedColumns: string[] = ['complete', 'title', 'description', 'action'];
  public dataSource: ITaskItem[] = [];

  constructor(public dialog: MatDialog,
              private mockManageTaskService: SubjectManageTaskService) {
  }

  ngOnInit() {
    this.mockManageTaskService.getTasksList()
      .subscribe((response) => {
        this.dataSource = response;
      })
  }

  public createTask() {
    this.openCreateNewTaskDialog(ETaskOperation.Create);
  }

  public editTask(element: ITaskItem) {
    this.openCreateNewTaskDialog(ETaskOperation.Edit, element);
  }

  public updateTask(element: ITaskItem) {
    this.mockManageTaskService.editTask(element.id, element)
  }

  public deleteTask(element: ITaskItem) {
    const dialogRef = this.dialog.open(
      TaskConfirmDialogComponent,
      {
        maxWidth: '600px',
        data: {data: {...element}, operation: ETaskOperation.Delete},
      },
    );

    dialogRef.afterClosed().subscribe((result: ITaskOperationData) => {
      if (result) {
        const {operation, data} = result;
        if (operation === ETaskOperation.Delete) {
          this.mockManageTaskService.deleteTask(data.id);
        }
      }
    });
  }

  private openCreateNewTaskDialog(operation: ETaskOperation = ETaskOperation.Create, data: ITaskItem | undefined = {id: '', title: '', description: '', completed: false, dateCreate: new Date().getTime()}) {
    const dialogRef = this.dialog.open(
      TaskManageDialogComponent,
      {
        minHeight: '300px',
        maxWidth: '600px',
        data: {data: {...data}, operation},
      },
    );

    dialogRef.afterClosed().subscribe((result: ITaskOperationData) => {
      if (result) {
        const {operation, data} = result;
        if (operation === ETaskOperation.Create) {
          this.mockManageTaskService.createTask(data);
        }
        if (operation === ETaskOperation.Edit) {
          this.mockManageTaskService.editTask(data.id, data);
        }
      }
    });
  }

  announceSortChange(event: Sort) {
    this.dataSource = [...sortArray(this.dataSource, event.active, event.direction)];
  }
}
