import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-module').then(m => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./home/home-module').then(m => m.HomeModule),
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
  {
    path: 'agnotices',
    loadChildren: () =>
      import('./ag-notices/ag-notices-module').then(m => m.AgNoticesModule),
  },
  {
    path: 'agresolutions',
    loadChildren: () =>
      import('./ag-resolutions/ag-resolutions-module').then(m => m.AgResolutionsModule),
  },
  {
    path: 'agminutes',
    loadChildren: () =>
      import('./ag-minutes/ag-minutes-module').then(m => m.AgMinutesModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact-module').then(m => m.ContactModule),
  },
  {
    path: 'chargecalls',
    loadChildren: () =>
      import('./charge-calls/charge-calls-module').then(m => m.ChargeCallsModule),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./invoices/invoices-module').then(m => m.InvoicesModule),
  },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
