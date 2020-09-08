import {IModel} from "./IModel";

export interface IUser extends IModel {
  [key: string]: any;
}

export const CURRENT_USER_ID = "__current__";
