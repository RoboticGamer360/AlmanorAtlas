import { Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { ShoppingComponent } from './components/views/shopping/shopping.component';
import { FoodComponent } from './components/views/food/food.component';
import { FishingComponent } from './components/views/fishing/fishing.component';
import { AddLocationComponent } from './components/views/add_location/add_location.component';
import { ContributeComponent } from './components/views/contribute/contribute.component';

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
    path: 'fishing',
    component: FishingComponent
  },
  {
    path: 'food',
    component: FoodComponent
  },
  {
    path: 'add_location',
    component: AddLocationComponent
  },
  {
    path: 'contribute',
    component: ContributeComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
