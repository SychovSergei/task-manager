import { Component, Input, OnInit } from '@angular/core';
import { Config, MenuItem } from './menu.interfaces';
import { Route, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  config: Config = { multi: true };
  @Input() options = {};
  @Input() menuItems: MenuItem[] = [];

  constructor(private router: Router) {
  }
  navigateTo(route: string | undefined): void {
    if (route) {
      if (this.hasRoute(route, this.router.config)) {
        this.router.navigate([route]);
      } else {
        console.error(`Route '${route}' doesn't exist!`);
      }
    }
  }

  private getRoutes(routes: Routes): string[] {
    const routePaths: string[] = [];
    routes.forEach(route => {
      if (route.path) {
        routePaths.push(route.path);
      }
      if (route.children) {
        const childPaths = this.getRoutes(route.children);
        routePaths.push(...childPaths.map(childPath => `${route.path}/${childPath}`));
      }
    });
    return routePaths;
  }

  private hasRoute(routePath: string, routes: Route[]): boolean {
    const allRoutes = this.getRoutes(routes);
    const setRoutes = new Set(allRoutes);
    const filterRoute = routePath.split("/").filter(item => item.trim().length > 0).join("/");

    return setRoutes.has(filterRoute);
  }
  ngOnInit() {
    this.config = this.mergeConfig(this.options);
  }

  mergeConfig(options: Config) {
    const config = {
      multi: true
    };
    return { ...config, ...options };
  }

  toggle(index: number) {
    // submenu
    if (!this.config.multi) {
      this.menuItems.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }

    // Menu active
    this.menuItems[index].active = !this.menuItems[index].active;
  }

}
