import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {LandmarkIndexComponent} from './landmark-index/landmark-index.component';
import {LandmarkEditComponent} from './landmark-edit/landmark-edit.component';
import {AuthGuard} from '../../interceptors/auth.guard';
import {DividerSkewModule} from '../../components/divider-skew/divider-skew.module';
import {ButtonModule} from '../../components/button/button.module';
import {ModalModule} from '../../components/modal/modal.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {LoaderModule} from '../../components/loader/loader.module';

const routes: Route[] = [
  {
    path: ":_id",
    component: LandmarkIndexComponent
  },
  {
    path: ":_id/edit",
    canActivate: [AuthGuard],
    component: LandmarkEditComponent
  }
];

@NgModule({
  declarations: [LandmarkEditComponent, LandmarkIndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DividerSkewModule,
    ButtonModule,
    ModalModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    LoaderModule
  ]
})
export class LandmarkModule { }
