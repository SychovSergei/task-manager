import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './auth/login/login.module';
import { ToolbarModule } from './common/toolbar/toolbar.module';
import { FooterModule } from './common/footer/footer.module';
import { MenuModule } from './common/menu/menu.module';
import { DashboardModule } from './common/dashboard/dashboard.module';
import { TaskListModule } from "./task-list/task-list.module";

import { BreakpointService } from './services/breakpoint.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatButtonModule,
    MatListModule,

    TaskListModule,

    AuthModule,
    LoginModule,
    ToolbarModule,
    FooterModule,
    MenuModule,
    DashboardModule,
  ],
  providers: [
    BreakpointService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
