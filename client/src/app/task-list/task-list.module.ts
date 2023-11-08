import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {SubjectManageTaskService} from "../services/subject-manage-task.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TaskManageDialogModule} from "./task-manage-dialog/task-manage-dialog.module";
import {TaskConfirmDialogModule} from "./task-confirm-dialog/task-confirm-dialog.module";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DragDropModule} from "@angular/cdk/drag-drop";



@NgModule({
  declarations: [
      TaskListComponent,
  ],
  exports: [
    TaskListComponent
  ],
    imports: [
    CommonModule,
    FormsModule,

    TaskManageDialogModule,
    TaskConfirmDialogModule,

    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
      DragDropModule,
    ],
  providers: [SubjectManageTaskService]
})
export class TaskListModule { }
