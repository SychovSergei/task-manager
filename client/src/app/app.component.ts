import { Component } from '@angular/core';
import { BreakpointService, EBreakpoints } from './services/breakpoint.service';
import { Config, MenuItem } from './common/menu/menu.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  isLargeDesktop: boolean = false;

  constructor(public breakpointService: BreakpointService) {
    this.breakpointService.getCurrScreenSize()
      .subscribe((screenSize) => {
        this.isMobile = screenSize === EBreakpoints.XSmall;
        this.isTablet = screenSize === EBreakpoints.Small;
        this.isDesktop = screenSize === EBreakpoints.Medium;
        this.isLargeDesktop = screenSize === (EBreakpoints.Large || EBreakpoints.XLarge);
      });
  }

  options: Config = {
    multi: false
  };

  menus: MenuItem[] = [
    {
      title: 'Dashboard',
      iconSource: {
        type: "mat-icon",
        matIconData: {
          iconCode: "dashboard"
        }
      },
      url: "/dashboard",
      active: false,
    },
    {
      title: 'Auth',
      iconSource: {
        type: "fontawesome",
        matIconData: {
          iconClass: 'fa fa-mobile',
        }
      },
      active: false,
      submenu: [
        { title: "Login", url: "/auth/login" },
        { title: "Register", url: "/auth/register" },
      ]
    },
  ];


}
