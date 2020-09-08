import {Colors} from "./Generics";

export interface IButton {
  action: string;
  color?: Colors | string;
  tooltip?: string;
  displayName?: string;
  icon?: string;
  iconRightSide?: boolean;
}
