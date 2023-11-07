import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ITaskItem} from "../interfaces/manage-task.interface";
import {Utils} from "../utils/utils";

@Injectable()
export abstract class TaskService {

  abstract getTasksList(): Observable<ITaskItem[]>;

  abstract createTask(data: ITaskItem): Observable<ITaskItem>;

  abstract editTask(id: string, data: ITaskItem): Observable<ITaskItem>;

  abstract deleteTask(id: string): Observable<void>;

}
@Injectable()
export class HttpManageTaskService extends TaskService {

  private getTaskListUrl = 'realLink';
  private createTaskUrl = 'createTaskUrl';
  private editTaskUrl = 'editTaskUrl';
  private deleteTaskUrl = 'deleteTaskUrl';

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
}
