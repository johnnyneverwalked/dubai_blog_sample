import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Colors} from "../../interfaces/Generics";
import {IButton} from "../../interfaces/Button";
import IStringMap from "../../interfaces/StringMap";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  private readonly _availableButtons: IStringMap<Partial<IButton>> = {
    next: {
      color: "primary",
      displayName: "Next",
      tooltip: "Next",
      icon: "la-arrow-right",
      iconRightSide: true
    },
    prev: {
      color: "light border",
      displayName: "Previous",
      tooltip: "Previous",
      icon: "la-arrow-left"
    },
    cancel: {
      color: "light border",
      displayName: "Cancel",
      tooltip: "Cancel"
    },
    help: {
      color: "info",
      displayName: "Help",
      tooltip: "Help",
      icon: "la-question-circle"
    },
    shortcuts: {
      color: "btn-light border",
      displayName: "Shortcuts",
      tooltip: "Shortcuts",
      icon: "la-keyboard-o"
    },
    close: {
      color: "btn-light border",
      displayName: "",
      icon: "la-times"
    },
    warning: {
      color: "btn-danger",
      displayName: "Warning",
      tooltip: "Warning",
      icon: "la-exclamation-circle"
    },
    view: {
      color: "btn-light",
      displayName: "View",
      tooltip: "View",
      icon: "la-eye"
    },
    save: {
      color: "success",
      displayName: "Save",
      tooltip: "Save",
      icon: "la-save",
    },
    edit: {
      color: "primary",
      displayName: "Edit",
      tooltip: "Edit",
      icon: "la-save",
    },
    delete: {
      color: "danger",
      displayName: "Delete",
      tooltip: "Delete",
      icon: "la-trash"
    },
  };

  @Input() displayName: string = null;
  @Input() icon: string = null;
  @Input() icons: string[] = null;
  @Input() class: string = null;
  @Input() color: Colors|string = null;
  @Input() disabled: boolean = false;
  @Input() iconRightSide: boolean = false;
  @Input() href: string | string[] = null;
  @Input() queryParams: any;
  @Input() small: boolean = false;
  @Input() full: boolean = false;
  @Input() tooltip: string = null;
  @Input() target: "_blank"|"_self"|"_parent"|"_top"|"framename" = "_self";
  @Input("action") set setAction(action: ButtonActions) {
    this.action = action;
    this._applyButtonData(this._availableButtons[this.action], true);
  }

  @Output() btnClick = new EventEmitter();

  public action: ButtonActions = null;

  constructor() { }

  ngOnInit(): void {
  }

  private _applyButtonData(button: Omit<IButton, "action">, force: boolean = false) {
    if (!button) {
      return;
    }
    if (button.iconRightSide && this.iconRightSide == null || force) {
      this.iconRightSide = button.iconRightSide;
    }
    if (this.displayName === null || (force && this.displayName && button.displayName)) {
      this.displayName = this.displayName ? this.displayName : button.displayName;
    }
    if (this.icon === null || force) {
      this.icon = this.icon ? this.icon : button.icon;
    }
    if (this.color === null || force) {
      this.color = this.color ? this.color : button.color;
    }
    if ((this.tooltip === null && this.displayName === "")) {
      this.tooltip = button.tooltip;
    }
  }

}

type ButtonActions = "next"|"prev"|"close"|"cancel"|"warning"|"help"|"shortcuts"|"view"|"save"|"edit"|"delete";
