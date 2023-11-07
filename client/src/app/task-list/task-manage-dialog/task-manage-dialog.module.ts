import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManageDialogComponent } from './task-manage-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    TaskManageDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],

})
export class TaskManageDialogModule { }
