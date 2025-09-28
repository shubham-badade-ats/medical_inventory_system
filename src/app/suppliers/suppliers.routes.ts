import { Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';

export const suppliersRoutes: Routes = [
  {
    path: '',
    component: SupplierListComponent // default → list view
  },
  {
    path: 'add',
    component: SupplierFormComponent // add supplier
  },
  {
    path: 'edit/:id',
    component: SupplierFormComponent // edit supplier
  }
  
];
