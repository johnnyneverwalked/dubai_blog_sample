import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "./loader.component";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
    exports: [LoaderComponent],
    imports: [
        CommonModule,
        NgxSpinnerModule
    ],
    declarations: [LoaderComponent]
})
export class LoaderModule {
}
