import { Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { ShoppingComponent } from './components/views/shopping/shopping.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'shopping',
    component: ShoppingComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
