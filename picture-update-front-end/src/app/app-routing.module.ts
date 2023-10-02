import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PictureUpdateComponent} from "./picture-update/picture-update.component";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path:'welcome', component:WelcomeComponent},
  {path: 'upload', component: PictureUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
