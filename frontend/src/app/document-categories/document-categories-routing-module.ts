import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentCategoryList } from './components/document-category-list/document-category-list';
import { DocumentCategoryDetail } from './components/document-category-detail/document-category-detail';
import { DocumentCategoryForm } from './components/document-category-form/document-category-form';

const routes: Routes = [
  { path: '', component: DocumentCategoryList },
  { path: 'new', component: DocumentCategoryForm },
  { path: ':id', component: DocumentCategoryDetail },
  { path: ':id/edit', component: DocumentCategoryForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentCategoriesRoutingModule {}
