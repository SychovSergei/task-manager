import { Injectable } from '@angular/core';
import {IManageTaskInterface, ITaskItem} from "../interfaces/manage-task.interface";
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MockManageTaskService implements IManageTaskInterface{

  mockTasks: ITaskItem[] = [
    {id: '1', completed: true, title: 'Title 1', description: 'Description 1'},
    {id: '2', completed: false, title: 'Title 2', description: 'Description 2'},
  ];

  constructor() { }

  public getTasksList(): Observable<ITaskItem[]> {
    return of(this.mockTasks).pipe(delay(3000));
  }
}
