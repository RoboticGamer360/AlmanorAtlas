import { Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { PopularComponent } from './components/views/popular/popular.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'popular',
    component: PopularComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
