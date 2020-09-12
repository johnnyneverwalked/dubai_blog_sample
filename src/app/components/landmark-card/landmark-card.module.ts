import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandmarkCardComponent } from './landmark-card.component';
import {ButtonModule} from "../button/button.module";
import {ModalModule} from '../modal/modal.module';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [LandmarkCardComponent],
    exports: [
        LandmarkCardComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        ModalModule,
        RouterModule
    ]
})
export class LandmarkCardModule { }
