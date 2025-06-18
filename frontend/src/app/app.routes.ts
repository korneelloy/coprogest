import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home-module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-module').then(m => m.LoginModule),
  },
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
  {
    path: 'persons',
    loadChildren: () =>
      import('./persons/persons-module').then(m => m.PersonsModule),
  },
  {
    path: 'units',
    loadChildren: () =>
      import('./units/units-module').then(m => m.UnitsModule),
  },
  {
    path: 'unitgroups',
    loadChildren: () =>
      import('./unit-groups/unit-groups-module').then(m => m.UnitGroupsModule),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
