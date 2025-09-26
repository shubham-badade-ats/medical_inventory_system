import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { authGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.module';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { AddItemComponent } from './inventory/add-item/add-item.component';

export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'dashboard', component: HomeComponent },
   {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory/list', component: InventoryListComponent },
      { path: 'inventory/add', component: AddItemComponent }
    ]
  },

  // Products
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/add', component: AddProductComponent, canActivate: [authGuard] },

  // (Similarly add suppliers and orders routes when generated)
];



