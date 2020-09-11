import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [ButtonComponent],
  exports: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    // NgbTooltipModule,
    RouterModule
  ]
})
export class ButtonModule { }
