import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { ProductInventoryComponent } from './products/product-inventory/product-inventory.component';
import { InventoryListComponent } from './products/product-inventory/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './products/product-inventory/inventory-create/inventory-create.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { FormComponent } from './pages/form/form.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-inventory', component: ProductInventoryComponent },
  { path: 'product-category', component: ProductCategoryComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'form', component: FormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'journal-entry' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  DashboardComponent,
  MenuComponent,
  DataTableComponent,
  ProductInventoryComponent,
  InventoryListComponent,
  InventoryCreateComponent,
  OrdersComponent,
  FormComponent
];
