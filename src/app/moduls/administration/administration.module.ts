import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { EditPersonComponent } from './person/edit-person/edit-person.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ListPersonComponent } from './person/list-person/list-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveProductComponent } from './product/remove-product/remove-product.component';


@NgModule({
  declarations: [
    CreatePersonComponent,
    EditPersonComponent,
    CreateProductComponent,
    EditProductComponent,
    ListProductComponent,
    ListPersonComponent,
    RemoveProductComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministrationModule { }
