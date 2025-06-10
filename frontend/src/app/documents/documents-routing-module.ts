import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentList } from './components/document-list/document-list';
import { DocumentDetail } from './components/document-detail/document-detail';
import { DocumentForm } from './components/document-form/document-form';

const routes: Routes = [
  { path: '', component: DocumentList },
  { path: 'new', component: DocumentForm },
  { path: ':id', component: DocumentDetail },
  { path: ':id/edit', component: DocumentForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
