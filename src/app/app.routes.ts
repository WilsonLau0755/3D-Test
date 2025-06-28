import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index/index.component';

export const AppRoutes: Routes = [
  { path: '', component: IndexComponent, children: [
    { path: ':id', loadChildren: () => import('./pages/model/model.module').then(m => m.ModelModule) }
  ] }
];
