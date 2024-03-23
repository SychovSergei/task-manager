import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

import { AuthService } from "./auth.service";

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,

    LoginModule,
    RegisterModule,
  ],
  declarations: [
    AuthComponent,
  ],
  exports: [
    AuthComponent,
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule {}
