import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {UserDataComponent} from "./user-data/user-data.component";
import {RouteGuardService} from "./services/route-guard.service";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/new',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/:id',
    component: UserDataComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/:id/edit',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
