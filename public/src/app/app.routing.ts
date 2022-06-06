import { Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";

import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";

export const AppRoutes: Routes = [
  { path: "index", component: IndexComponent },
  { path: "", component: IndexComponent },
  {
    path: "",
    redirectTo: "pages/lock",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./dashboard/dashboard.module#DashboardModule",
      },
      {
        path: "categorias",
        loadChildren: "./modules/categoria/categoria.module#CategoriaModule",
      },
      {
        path: "register",
        loadChildren: "./modules/register/register.module#RegisterModule",
      },
      {
        path: "home",
        loadChildren: "./modules/home/home.module#HomeModule",
      },
      {
        path: "products",
        loadChildren: "./modules/products/products.module#ProductsModule",
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "pages",
        loadChildren: "./pages/pages.module#PagesModule",
      },
    ],
  },
];
