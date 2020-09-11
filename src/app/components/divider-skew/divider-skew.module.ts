import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerSkewComponent } from './divider-skew.component';



@NgModule({
    declarations: [DividerSkewComponent],
    exports: [
        DividerSkewComponent
    ],
    imports: [
        CommonModule
    ]
})
export class DividerSkewModule { }
