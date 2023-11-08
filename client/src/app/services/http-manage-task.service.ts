import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ITaskItem} from "../interfaces/manage-task.interface";
import {Utils} from "../utils/utils";

export interface IDropIndexes {
  prevInd: number;
  currInd: number;
}

@Injectable()
export abstract class TaskService {

  abstract getTasksList(): Observable<ITaskItem[]>;

  abstract createTask(data: ITaskItem): Observable<ITaskItem>;

  abstract editTask(id: string, data: ITaskItem): Observable<ITaskItem>;

  abstract deleteTask(id: string): Observable<void>;

  abstract deleteTasks(ids: string[]): Observable<void>;

  abstract updateTasks(indexes: IDropIndexes): Observable<void>;

}
@Injectable()
export class HttpManageTaskService extends TaskService {

  private getTaskListUrl = 'realLink';
  private createTaskUrl = 'createTaskUrl';
  private editTaskUrl = 'editTaskUrl';
  private deleteTaskUrl = 'deleteTaskUrl';
  private deleteTasksUrl = 'deleteTasksUrl';
  private updateTaskUrl = 'updateTaskUrl';

  constructor(private http: HttpClient) {
    super();
  }

  public getTasksList(): Observable<ITaskItem[]> {
    return this.http.get<ITaskItem[]>(this.getTaskListUrl);
  }

  public createTask(data: ITaskItem): Observable<ITaskItem> {
    const index: string = Utils.generateId(10);
    return this.http.post<ITaskItem>(this.createTaskUrl, {...data, id: index} as ITaskItem);
  }

  public editTask(id: string, data: ITaskItem): Observable<ITaskItem> {
    return this.http.put<ITaskItem>(this.editTaskUrl+`/${id}`, data);
  }

  public deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(this.deleteTaskUrl+`/${id}`);
  }

  public deleteTasks(ids: string[]): Observable<void> {
    return this.http.delete<void>(this.deleteTasksUrl+`/${ids}`);
  }

  public updateTasks(indexes: IDropIndexes): Observable<void> { // TODO ????
    return this.http.put<void>(this.updateTaskUrl, indexes);
  }
}
