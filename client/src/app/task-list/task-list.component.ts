import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ETaskOperation, ETaskStatus, ITaskItem, ITaskOperationData} from "../interfaces/manage-task.interface";
import {MatDialog} from "@angular/material/dialog";
import {TaskManageDialogComponent} from "./task-manage-dialog/task-manage-dialog.component";
import {SubjectManageTaskService} from "../services/subject-manage-task.service";
import {TaskConfirmDialogComponent} from "./task-confirm-dialog/task-confirm-dialog.component";
import {Sort} from "@angular/material/sort";
import {sortArray} from "../utils/utils";
import {BehaviorSubject, debounceTime} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [SubjectManageTaskService]
})
export class TaskListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['select', 'status', 'title', 'description', 'dateCreate', 'action'];
  private filterItemsList: string[] = ['status', 'title', 'description'];
  public dataSource: ITaskItem[] = [];
  public dataSourceFiltered!: MatTableDataSource<ITaskItem>;
  private searchValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public selectedTasks: Array<string> = [];

  get isSelected(): boolean {
    return this.selectedTasks.length > 0;
  }

  constructor(public dialog: MatDialog,
              private mockManageTaskService: SubjectManageTaskService) {
  }

  ngOnInit() {
    this.dataSourceFiltered = new MatTableDataSource<ITaskItem>();
    this.mockManageTaskService.getTasksList()
      .subscribe((response) => {
        this.dataSource = response;
        this.dataSourceFiltered.data = this.filterData(this.searchValueSubject.getValue(), response);
      });
    this.searchValueSubject.pipe(debounceTime(500)).subscribe((value) => {
      this.dataSourceFiltered.data = this.filterData(value, this.dataSource);
    })
  }

  ngAfterViewInit() {
    this.dataSourceFiltered.paginator = this.paginator;
    this.paginator.page.subscribe((page) => {
      this.announcePageChange();
    });
  }

  public createTask() {
    this.openCreateNewTaskDialog(ETaskOperation.Create);
  }

  public editTask(element: ITaskItem) {
    this.openCreateNewTaskDialog(ETaskOperation.Edit, element);
  }

  public addToSelectedList(element: ITaskItem) {
    if (!this.selectedTasks.includes(element.id)) {
      this.selectedTasks.push(element.id);
    } else {
      this.selectedTasks = this.selectedTasks.filter((item) => item !== element.id);
    }
  }

  public deleteTask(element: ITaskItem) {
    const dialogRef = this.dialog.open(
      TaskConfirmDialogComponent,
      {
        maxWidth: '600px',
        data: {data: {...element}, operation: ETaskOperation.Delete},
      },
    );

    dialogRef.afterClosed().subscribe((result: ITaskOperationData) => {
      if (result) {
        const {operation, data} = result;
        if (operation === ETaskOperation.Delete) {
          this.mockManageTaskService.deleteTask(data.id);
        }
      }
    });
  }

  public deleteTasks() {
    this.mockManageTaskService.deleteTasks(this.selectedTasks);
    this.selectedTasks.length = 0;
  }

  private openCreateNewTaskDialog(operation: ETaskOperation = ETaskOperation.Create, data: ITaskItem | undefined = {id: '', status: ETaskStatus.Pending, title: '', description: '', selected: false, dateCreate: new Date().getTime()}) {
    const dialogRef = this.dialog.open(
      TaskManageDialogComponent,
      {
        minHeight: '300px',
        maxWidth: '600px',
        data: {data: {...data}, operation},
      },
    );

    dialogRef.afterClosed().subscribe((result: ITaskOperationData) => {
      if (result) {
        const {operation, data} = result;
        if (operation === ETaskOperation.Create) {
          this.mockManageTaskService.createTask(data);
        }
        if (operation === ETaskOperation.Edit) {
          this.mockManageTaskService.editTask(data.id, data);
        }
      }
    });
  }

  announceSortChange(event: Sort) {
    this.dataSourceFiltered.data = [...sortArray(this.dataSource, event.active, event.direction)];
  }

  announcePageChange() {
    this.dataSourceFiltered.data = this.filterData(this.searchValueSubject.getValue(), this.dataSource);//, this.paginator.pageIndex, this.paginator.pageSize
  }

  public filterData(value: string, data: ITaskItem[]): ITaskItem[] {
    let filteredData = [];
    if (value.length > 0) {
      filteredData = data.filter((item) => {
        return this.filterItemsList.some((val) => {
          return item[val as keyof ITaskItem].toString().toUpperCase().includes(value);
        });
      });
    } else {
      filteredData = data;
    }

    return filteredData;
  }

  search(value: Event) {
    this.searchValueSubject.next((value.target as HTMLInputElement).value.toUpperCase());
  }

  drop(event: CdkDragDrop<ITaskItem[]>) {
    this.mockManageTaskService.updateTasks({prevInd: event.previousIndex, currInd: event.currentIndex});
  }
}
