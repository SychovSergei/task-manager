import {Component, OnInit} from '@angular/core';
import {ManageTaskService} from "../services/manage-task.service";
import {ITaskItem} from "../interfaces/manage-task.interface";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'action', 'title', 'description'];
  public dataSource: ITaskItem[] = [];

  constructor(private manageTaskService: ManageTaskService) {
  }

  ngOnInit() {
    this.manageTaskService.getTasksList()
      .subscribe((response) => {
        console.table(response);
        this.dataSource = response;
      })
  }

  public editTask(element: ITaskItem) {
    console.log(element);
  }

  public deleteTask(element: ITaskItem) {
    console.log(element);
  }

  public updateTask(element: ITaskItem) {
    console.log(this.dataSource);
  }
}
