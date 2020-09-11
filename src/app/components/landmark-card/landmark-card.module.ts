import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandmarkCardComponent } from './landmark-card.component';
import {ButtonModule} from "../button/button.module";



@NgModule({
    declarations: [LandmarkCardComponent],
    exports: [
        LandmarkCardComponent
    ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class LandmarkCardModule { }
