import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PictureUpdateComponent} from "./picture-update/picture-update.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AuthGuardService} from "./auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'upload', component: PictureUpdateComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent,canActivate: [AuthGuardService] },
  {path: 'logout', component: LoginComponent, canActivate:[AuthGuardService]},
  {path: 'register', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
