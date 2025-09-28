import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { suppliersRoutes } from './suppliers.routes';

@NgModule({
  imports: [RouterModule.forChild(suppliersRoutes)]
})
export class SuppliersModule {}
