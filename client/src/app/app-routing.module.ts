import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/auth/login',
  // },
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
        data: {
          title: "Login"
        }
      },
      {
        path: "register",
        component: RegisterComponent,
        data: {
          title: "Registration"
        }
      },
      {
        path: "confirm-email/:token",
        component: RegisterComponent,
        data: {
          title: "Confirm Email"
        }
      },
    ]
  },{
    path: "dashboard",
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
