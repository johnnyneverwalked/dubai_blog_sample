import {Injectable} from "@angular/core";
import {IUser} from "../interfaces/IUser";

@Injectable({
    providedIn: "root",
})

export class HelperService {

    constructor() {
    }

  /**
   * @description Decodes an html formatted string and returns a clean string
   * @param {string} html - The string with html entities
   * @return the decoded html string
   */
  public static decodeHtml(html: string): string {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
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

  public static generateUser(name?: string): IUser {
    const names = [
      "Yaritza Bradley",
      "Emiliano Santana",
      "Oswaldo Huber",
      "Natalya Levine",
      "Corbin Wilkinson",
      "Adolfo Salinas",
      "Darrell Haley",
      "Kasey Hays",
      "Yasmin Foley",
      "Thaddeus Fritz",
      "Ben Douglas",
      "Deborah Green",
      "Janae Shepard",
      "Paisley Hartman",
      "Joselyn Townsend",
      "Mariyah Rhodes",
      "Bradyn Sellers",
      "Howard Haley",
      "Taryn Case",
      "Jett Holland",
    ];
    name = names[names.indexOf(name)] || names[Math.floor(Math.random() * names.length)];
    return {
      _id: name,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      fullName: name,
      email: `${name.replace(" ", "")}@test.test`,
      gravatar: `${name.replace(" ", "")}@test.test`
    };
  }

}
