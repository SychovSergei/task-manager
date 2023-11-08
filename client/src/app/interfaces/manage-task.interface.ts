export enum ETaskOperation {
  Create = 'create',
  Edit = 'edit',
  Update = 'update',
  Delete = 'update',
  Default = 'default',
}
export enum ETaskStatus {
  Pending = 'pending',
  Done = 'done',
  OnWork = 'onwork',
}
export interface ITaskItem {
  id: string,
  title: string;
  status: ETaskStatus;
  description: string;
  selected: boolean;
  dateCreate: number;
}

export interface ITaskOperationData {
  data: ITaskItem;
  operation: ETaskOperation;
}
