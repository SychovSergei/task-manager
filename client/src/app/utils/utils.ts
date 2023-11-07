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
