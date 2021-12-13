import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoveCategoryComponent } from './category/remove-category/remove-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryComponent } from './category/category/category.component';

const routes: Routes = [
   {
      path: "list-category",
      component: CategoryComponent
    },
    {
      path: "create-category",
      component: CategoryCreateComponent
    },
    {
      path: "edit-category",
      component: EditCategoryComponent
    },
    {
      path: "remove-category",
      component: RemoveCategoryComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
