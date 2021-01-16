import { Type } from "@angular/core";
import { Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { PreviewComponent } from './components/preview/preview.component';

enum RouteKey {
    HOME = "HOME",
  }

  interface RouteConfig {
    route: string;
    navTitle?: string;
    component: Type<any>;
  }

  type RouteConfigMap = { [routeKey in RouteKey]: RouteConfig };

  export const ROUTES: RouteConfigMap = {
    HOME: {
      route: "home",
      navTitle: "Home",
      component: PreviewComponent,
    }
  };

  export const appRoutes: Routes = [
    {
      path: "app",
      component: AppComponent,
      children: [
        { path: "", redirectTo: `/app/${ROUTES.HOME.route}`, pathMatch: "full" },
        { path: ROUTES.HOME.route, component: ROUTES.HOME.component },
        { path: "**", redirectTo: `/app/${ROUTES.HOME.route}` },
      ],
    },
    { path: "**", redirectTo: `/app/${ROUTES.HOME.route}` },
  ];