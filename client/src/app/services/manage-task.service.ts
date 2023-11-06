import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IManageTaskInterface, ITaskItem} from "../interfaces/manage-task.interface";


@Injectable()
export class ManageTaskService implements IManageTaskInterface {

  private getTaskListUrl = 'realLink';

  constructor(private http: HttpClient) { }

  public getTasksList(): Observable<ITaskItem[]> {
    return this.http.get<ITaskItem[]>(this.getTaskListUrl);
  }
}
