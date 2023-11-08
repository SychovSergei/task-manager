export enum ETaskOperation {
  Create = 'create',
  Edit = 'edit',
  Update = 'update',
  Delete = 'update',
  Default = 'default',
}
export interface ITaskItem {
  id: string,
  title: string;
  status: ETaskStatus;
  description: string;
  completed: boolean;
  dateCreate: number;
}

export interface ITaskOperationData {
  data: ITaskItem;
  operation: ETaskOperation;
}
