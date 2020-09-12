import {Injectable} from "@angular/core";
import {IUser} from "../interfaces/IUser";

@Injectable({
    providedIn: "root",
})

export class HelperService {

    constructor() {
    }

  /**
   * @description Use await to delay the script execution by ms millis
   * @param ms    - The delay in milliseconds
   * @return An empty promise to use await on
   */
  public static sleep(ms: number = 0): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * @description Inserts elements to the specified position of an array
   * @param {any[]} arr       - The array to be modified
   * @param {number} index    - The position to add the items to
   * @param {any} newItems    - The item/items to be added
   * @return A new array containing arr elements along with the newly added elements
   */
  public static arrayInsert(arr: any[], index: number, ...newItems: any[]): any[] {
    return [
      ...arr.slice(0, index),
      ...newItems,
      ...arr.slice(index)
    ];
  }

}
