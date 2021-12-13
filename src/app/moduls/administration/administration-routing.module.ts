import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { EditPersonComponent } from './person/edit-person/edit-person.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ListPersonComponent } from './person/list-person/list-person.component';
import { RemoveProductComponent } from './product/remove-product/remove-product.component';

const routes: Routes = [
   {
      path: "create-product",
      component: CreateProductComponent
   },
   {
      path: "edit-product",
      component: EditProductComponent
   },
   {
      path: "list-product",
      component: ListProductComponent
   },
   {
      path: "remove-product",
      component: RemoveProductComponent
   },
   {
      path: "create-person",
      component: CreatePersonComponent
   },
   {
      path: "edit-person",
      component: EditPersonComponent
   },
   {
      path: "list-person",
      component: ListPersonComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
