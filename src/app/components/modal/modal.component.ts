import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from "@angular/core";
import {fade} from "../../animations/enter-leave.animation";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  animations: [fade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {

  @Input() hasClose: boolean = true;
  @Input() closeWithBackdrop: boolean = true;
  @Input() closeWithEscape: boolean = true;

  @Input() fullWidth: boolean = false;
  @Input() fullHeight: boolean = false;

  @Input() headerTitle: string = "";

  @Input() hasHeader: boolean = true;
  @Input() hasFooter: boolean = true;

  @Output() backdropClose = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();

  public opened: boolean;

  @ViewChild("footer") footer: ElementRef;
  @ViewChild("body") body: ElementRef;

  @HostListener("document:keydown.escape")
  handleEscapeEvent() {
    if (this.opened && this.closeWithEscape) {
      this.opened = false;
      this.close.emit();
      this.cd.markForCheck();
    }
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  public show() {
    this.opened = true;
    this.open.emit();
    this.cd.markForCheck();
  }

  public hide() {
    this.opened = false;
    this.close.emit();
    this.cd.markForCheck();
  }

  public onBackdropClose() {
    if (this.closeWithBackdrop && this.opened) {
      this.opened = false;
      this.close.emit();
      this.backdropClose.emit();
      this.cd.markForCheck();
    }
  }
}
