import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {ManageTaskService} from "../services/manage-task.service";
import {MockManageTaskService} from "../services/mock-manage-task.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
    declarations: [
        TaskListComponent
    ],
    exports: [
        TaskListComponent
    ],
  imports: [
    CommonModule,
    FormsModule,

    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: ManageTaskService,
      useClass: MockManageTaskService
    }
  ]
})
export class TaskListModule { }
