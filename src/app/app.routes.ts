import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';
 // 👈 FIXED
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { AddItemComponent } from './inventory/add-item/add-item.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
    // { path: 'inventory/list', component: InventoryListComponent },
    //   { path: 'inventory/add', component: AddItemComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory/list', component: InventoryListComponent },
      { path: 'inventory/add', component: AddItemComponent },
      { path: 'orders/add-order', component: AddOrderComponent },
      { path: 'orders/list', component: OrderListComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products/edit/:id', component: AddProductComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // 👈 default route
    ]
  },

  // Guarded routes (optional, can remove duplicates if already inside children)
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/add', component: AddProductComponent, canActivate: [authGuard] }
];
