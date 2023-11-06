import {Observable, of} from "rxjs";

export interface ITaskItem {
  id: string,
  title: string;
  description: string;
  completed: boolean;
}

export interface IManageTaskInterface {

  getTasksList(): Observable<ITaskItem[]>;

}
