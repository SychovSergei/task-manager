import { Injectable } from '@angular/core';
import {ETaskStatus, ITaskItem} from "../interfaces/manage-task.interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Utils} from "../utils/utils";
import {TaskService} from "./http-manage-task.service";

@Injectable()
export class SubjectManageTaskService extends TaskService {

  mockTasksSubject: BehaviorSubject<ITaskItem[]> = new BehaviorSubject<ITaskItem[]>( [
    {
      id: "1",
      status: ETaskStatus.Pending,
      title: "Complete Angular Project",
      description: "Finish the Angular task manager project by the end of the week.",
      completed: false,
      dateCreate: 1665282000, // Timestamp for a specific date
    },
    {
      id: "2",
      status: ETaskStatus.OnWork,
      title: "Meeting with Client",
      description: "Discuss project requirements with the client at 2 PM on Tuesday.",
      completed: true,
      dateCreate: 1665182000,
    },
    {
      id: "3",
      status: ETaskStatus.Done,
      title: "Prepare Presentation",
      description: "Create a presentation for the team meeting next Monday.",
      completed: false,
      dateCreate: 1665082000,
    },
    {
      id: "4",
      status: ETaskStatus.Pending,
      title: "Code Review",
      description: "Review code changes made by the team members this week.",
      completed: false,
      dateCreate: 1664982000,
    },
    {
      id: "5",
      status: ETaskStatus.Pending,
      title: "Exercise",
      description: "Go to the gym and work out for at least an hour.",
      completed: true,
      dateCreate: 1664882000,
    },
    {
      id: "6",
      status: ETaskStatus.Pending,
      title: "Read a Book",
      description: "Spend some time reading a new book in the evening.",
      completed: false,
      dateCreate: 1664782000,
    },
    {
      id: "7",
      status: ETaskStatus.Pending,
      title: "Shopping",
      description: "Buy groceries and household items from the store.",
      completed: false,
      dateCreate: 1664682000,
    },
    {
      id: "8",
      status: ETaskStatus.Pending,
      title: "Walk the Dog",
      description: "Take the dog for a walk in the park in the evening.",
      completed: false,
      dateCreate: 1664582000,
    },
    {
      id: "9",
      status: ETaskStatus.Pending,
      title: "Study for Exam",
      description: "Prepare for the upcoming mid-term exam in mathematics.",
      completed: false,
      dateCreate: 1664482000,
    },
    {
      id: "10",
      status: ETaskStatus.Pending,
      title: "Write a Blog Post",
      description: "Create a blog post about web development trends.",
      completed: false,
      dateCreate: 1664382000,
    },
    {
      id: "11",
      status: ETaskStatus.Pending,
      title: "Plan Weekend Trip",
      description: "Plan a weekend getaway to a nearby resort.",
      completed: false,
      dateCreate: 1664282000,
    },
    {
      id: "12",
      status: ETaskStatus.Pending,
      title: "Call Mom",
      description: "Call your mom and catch up on family news.",
      completed: true,
      dateCreate: 1664182000,
    },
    {
      id: "13",
      status: ETaskStatus.Pending,
      title: "Cook Dinner",
      description: "Prepare a delicious dinner for yourself and your family.",
      completed: false,
      dateCreate: 1664082000,
    },
    {
      id: "14",
      status: ETaskStatus.Pending,
      title: "Review Project Proposal",
      description: "Review the project proposal for the upcoming client meeting.",
      completed: false,
      dateCreate: 1663982000,
    },
    {
      id: "15",
      status: ETaskStatus.Pending,
      title: "Clean the Garage",
      description: "Organize and clean the garage on Saturday morning.",
      completed: false,
      dateCreate: 1663882000,
    },
    {
      id: "16",
      status: ETaskStatus.Pending,
      title: "Learn New Programming Language",
      description: "Start learning a new programming language like Rust or Kotlin.",
      completed: false,
      dateCreate: 1663782000,
    },
    {
      id: "17",
      status: ETaskStatus.Pending,
      title: "Write Thank You Cards",
      description: "Express your gratitude by writing thank you cards for friends and family.",
      completed: false,
      dateCreate: 1663682000,
    },
    {
      id: "18",
      status: ETaskStatus.Pending,
      title: "Volunteer at Local Shelter",
      description: "Spend some time volunteering at a local animal shelter on the weekend.",
      completed: true,
      dateCreate: 1663582000,
    },
    {
      id: "19",
      status: ETaskStatus.Pending,
      title: "Start a New Book",
      description: "Begin reading a new book from your favorite author.",
      completed: false,
      dateCreate: 1663482000,
    },
    {
      id: "20",
      status: ETaskStatus.Pending,
      title: "Fix Leaky Faucet",
      description: "Call a plumber to fix the leaky faucet in the kitchen.",
      completed: false,
      dateCreate: 1663382000,
    },
    {
      id: "21",
      status: ETaskStatus.Pending,
      title: "Renew Gym Membership",
      description: "Make sure your gym membership is up to date for the next month.",
      completed: true,
      dateCreate: 1663282000,
    },
    {
      id: "22",
      status: ETaskStatus.Pending,
      title: "Update Resume",
      description: "Update your resume to include your latest work experiences and skills.",
      completed: false,
      dateCreate: 1663182000,
    },
    {
      id: "23",
      status: ETaskStatus.Pending,
      title: "Bake a Cake",
      description: "Bake a homemade cake for a friend's birthday celebration.",
      completed: false,
      dateCreate: 1663082000,
    },
    {
      id: "24",
      status: ETaskStatus.Pending,
      title: "Visit the Art Museum",
      description: "Plan a visit to the local art museum to appreciate some fine art.",
      completed: false,
      dateCreate: 1662982000,
    },
    {
      id: "25",
      status: ETaskStatus.Pending,
      title: "Learn to Play Guitar",
      description: "Start taking guitar lessons to learn how to play your favorite songs.",
      completed: false,
      dateCreate: 1662882000,
    },
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
