import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "landmark",
    loadChildren: () => import("./pages/landmark/landmark.module").then(m => m.LandmarkModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
