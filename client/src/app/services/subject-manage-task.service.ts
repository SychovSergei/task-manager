import { Injectable } from '@angular/core';
import {ITaskItem} from "../interfaces/manage-task.interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Utils} from "../utils/utils";
import {TaskService} from "./http-manage-task.service";

@Injectable()
export class SubjectManageTaskService extends TaskService {

  mockTasksSubject: BehaviorSubject<ITaskItem[]> = new BehaviorSubject<ITaskItem[]>( [
    {
      id: '1',
      title: 'Завершить проект Angular',
      description: 'Закончить разработку проекта по управлению задачами на Angular.',
      completed: false,
      dateCreate: Date.now() - 86400000 // Вчера
    },
    {
      id: '2',
      title: 'Подготовить презентацию',
      description: 'Подготовить презентацию для конференции.',
      completed: false,
      dateCreate: Date.now() - 172800000 // Позавчера
    },
    {
      id: '3',
      title: 'Сделать покупки',
      description: 'Список продуктов для покупок в магазине.',
      completed: true,
      dateCreate: Date.now() - 259200000 // Три дня назад
    },
    {
      id: '4',
      title: 'Прочитать новую книгу',
      description: 'Новая книга по разработке на Angular.',
      completed: false,
      dateCreate: Date.now() - 345600000 // Четыре дня назад
    },
    {
      id: '5',
      title: 'Подготовить ужин',
      description: 'Рецепт для ужина сегодня вечером.',
      completed: true,
      dateCreate: Date.now() - 432000000 // Пять дней назад
    },
    {
      id: '6',
      title: 'Подготовить отчет',
      description: 'Подготовить месячный отчет для руководства.',
      completed: false,
      dateCreate: Date.now() - 518400000 // Шесть дней назад
    },
    {
      id: '7',
      title: 'Занятия спортом',
      description: 'Пойти на тренировку в спортзал.',
      completed: true,
      dateCreate: Date.now() - 604800000 // Одна неделя назад
    },
    {
      id: '8',
      title: 'Подготовить подарок',
      description: 'Подготовить подарок для друга на день рождения.',
      completed: false,
      dateCreate: Date.now() - 691200000 // Восемь дней назад
    },
    {
      id: '9',
      title: 'Изучить новый фреймворк',
      description: 'Изучить новый JavaScript фреймворк.',
      completed: false,
      dateCreate: Date.now() - 777600000 // Девять дней назад
    },
    {
      id: '10',
      title: 'Путешествие в выходные',
      description: 'План путешествия на ближайшие выходные.',
      completed: true,
      dateCreate: Date.now() - 864000000 // Десять дней назад
    },
    {
      id: '11',
      title: 'Подготовить отчет',
      description: 'Отчет о прошедшей неделе работы.',
      completed: false,
      dateCreate: Date.now() - 518400000 // Шесть дней назад
    },
    {
      id: '12',
      title: 'Планирование отпуска',
      description: 'Подготовка к отпуску на следующей неделе.',
      completed: false,
      dateCreate: Date.now() - 604800000 // Одна неделя назад
    },
    {
      id: '13',
      title: 'Убраться в гараже',
      description: 'Очистить гараж от старых вещей.',
      completed: true,
      dateCreate: Date.now() - 691200000 // Две недели назад
    },
    {
      id: '14',
      title: 'Сходить в спортзал',
      description: 'Тренировка в спортзале вечером.',
      completed: false,
      dateCreate: Date.now() - 777600000 // Три недели назад
    },
    {
      id: '15',
      title: 'Создать блог по программированию',
      description: 'Начать писать статьи о программировании.',
      completed: false,
      dateCreate: Date.now() - 864000000 // Месяц назад
    }
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
