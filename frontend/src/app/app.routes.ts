import { Routes } from '@angular/router';
import { authGuard } from '../app/auth/auth-guard';


export const routes: Routes = [
  {
    path: 'landingpage',
    loadChildren: () =>
      import('./landingpage/landingpage-module').then(m => m.LandingpageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./home/home-module').then(m => m.HomeModule),
  },
  {
    path: 'documents',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./documents/documents-module').then(m => m.DocumentsModule),
  },
  {
    path: 'documentcategories',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./document-categories/document-categories-module').then(m => m.DocumentCategoriesModule),
  },
  {
    path: 'persons',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./persons/persons-module').then(m => m.PersonsModule),
  },
  {
    path: 'units',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./units/units-module').then(m => m.UnitsModule),
  },
  {
    path: 'unitgroups',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./unit-groups/unit-groups-module').then(m => m.UnitGroupsModule),
  },
  {
    path: 'agnotices',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./ag-notices/ag-notices-module').then(m => m.AgNoticesModule),
  },
  {
    path: 'agresolutions',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./ag-resolutions/ag-resolutions-module').then(m => m.AgResolutionsModule),
  },
  {
    path: 'agminutes',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./ag-minutes/ag-minutes-module').then(m => m.AgMinutesModule),
  },
  {
    path: 'contact',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./contact/contact-module').then(m => m.ContactModule),
  },
  {
    path: 'chargecalls',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./charge-calls/charge-calls-module').then(m => m.ChargeCallsModule),
  },
  {
    path: 'invoices',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./invoices/invoices-module').then(m => m.InvoicesModule),
  },
  {
    path: 'chargepayments',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./charge-payments/charge-payments-module').then(m => m.ChargePaymentsModule),
  },
  {
    path: 'finances',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./finances/finances-routing-module').then(m => m.FinancesRoutingModule),
  },
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
