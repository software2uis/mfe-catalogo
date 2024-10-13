import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent:(() => import('./components/home-panel/home-panel.component').then(c => c.HomePanelComponent))
  },
  {
    path: 'product-detail/:id',
    loadComponent:(() => import('./components/product-detail/product-detail.component').then(c => c.ProductDetailComponent))
  },
  {
    path:'**',
    redirectTo: 'home',
  }

];
