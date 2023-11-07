import {ITaskItem} from "../interfaces/manage-task.interface";

export class Utils {

  static generateId(length: number = 6): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomIndex: string = '';

    for (let i = 0; i < length; i++) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      randomIndex += randomChar;
    }
    return randomIndex;
  }

}

export function sortArray<T>( array: T[], sortBy: string, sortOrder: 'asc' | 'desc' | '' ): T[] {
  if (sortOrder === '') {
    return array;
  }

  array.sort((a,b) => {
    const valA: string = (a[sortBy as keyof T] as any).toString().toUpperCase();
    const valB: string = (b[sortBy as keyof T] as any).toString().toUpperCase();

    if (sortOrder === 'asc') {
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    } else if (sortOrder === 'desc') {
      if (valA > valB) return -1;
      if (valA < valB) return 1;
      return 0;
    } else return 0;
  })

  return array;

}
