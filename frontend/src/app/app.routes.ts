import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'documents',
    loadChildren: () =>
      import('./documents/documents-module').then(m => m.DocumentsModule),
  },
  {
    path: 'documentcategories',
    loadChildren: () =>
      import('./document-categories/document-categories-module').then(m => m.DocumentCategoriesModule),
  },
  { path: '', redirectTo: 'documents', pathMatch: 'full' },
  { path: '**', redirectTo: 'documents' }, // optional fallback
];
