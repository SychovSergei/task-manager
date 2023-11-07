import { Injectable } from '@angular/core';
import {ITaskItem} from "../interfaces/manage-task.interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Utils} from "../utils/utils";
import {TaskService} from "./http-manage-task.service";

@Injectable()
export class SubjectManageTaskService extends TaskService {

  mockTasksSubject: BehaviorSubject<ITaskItem[]> = new BehaviorSubject<ITaskItem[]>( [
    {id: '1', completed: true, title: 'Title 1', description: 'Description 1', dateCreate: 1569033022000},
    {id: '2', completed: false, title: 'Title 2', description: 'Description 2', dateCreate: 1569035022000},
  ]);

  constructor() {
    super();
  }

  public getTasksList(): Observable<ITaskItem[]> {
    return this.mockTasksSubject.asObservable();
  }

  public createTask(data: ITaskItem): Observable<ITaskItem> {
    const id: string = Utils.generateId(10);
    const newData = {...data, id: id, dateCreate: new Date().getTime()} as ITaskItem;
    this.mockTasksSubject.next([...this.mockTasksSubject.getValue(), newData]);

    return of(newData);
  }

  public editTask(id: string, task: ITaskItem): Observable<ITaskItem> {
    const updatedTasks = this.mockTasksSubject.getValue();
    const index = updatedTasks.findIndex((task) => task.id === id);
    if (index >= 0) {
      updatedTasks[index] = task;
    }
    this.mockTasksSubject.next([...updatedTasks]);

    return of(task);
  }

  public deleteTask(id: string): Observable<void> {
    const updatedTasks = this.mockTasksSubject.getValue().filter((task) => task.id !== id);
    this.mockTasksSubject.next(updatedTasks);

    return of(undefined);
  }

}
