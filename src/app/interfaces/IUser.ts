import {IModel} from "./IModel";

export interface IUser extends IModel {
  username: string;
  superAccess?: boolean;
}
