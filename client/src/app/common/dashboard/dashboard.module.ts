import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { TaskListModule } from '../../task-list/task-list.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,

    TaskListModule,
  ],
})
export class DashboardModule { }
