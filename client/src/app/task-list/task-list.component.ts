import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ETaskOperation, ITaskOperationData, ITaskItem} from "../interfaces/manage-task.interface";
import {MatDialog} from "@angular/material/dialog";
import {TaskManageDialogComponent} from "./task-manage-dialog/task-manage-dialog.component";
import {SubjectManageTaskService} from "../services/subject-manage-task.service";
import {TaskConfirmDialogComponent} from "./task-confirm-dialog/task-confirm-dialog.component";
import {Sort} from "@angular/material/sort";
import {sortArray} from "../utils/utils";
import {BehaviorSubject, debounceTime} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [SubjectManageTaskService]
})
export class TaskListComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['complete', 'title', 'description', 'dateCreate', 'action'];
  private filterItemsList: string[] = ['title', 'description'];
  // public dataSource: ITaskItem[] = [];
  public dataSource: ITaskItem[] = [];
  public dataSourceFiltered!: MatTableDataSource<ITaskItem>;
  private searchValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  public updateTask(element: ITaskItem) {
    this.mockManageTaskService.editTask(element.id, element)
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

  private openCreateNewTaskDialog(operation: ETaskOperation = ETaskOperation.Create, data: ITaskItem | undefined = {id: '', title: '', description: '', completed: false, dateCreate: new Date().getTime()}) {
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
}
