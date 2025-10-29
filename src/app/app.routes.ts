import { Routes } from '@angular/router';
import { ListingComponent } from './pages/listing-component/listing-component';

export const routes: Routes = [
    { path: '', redirectTo: 'reward-listing', pathMatch: 'full' },
  { path: 'reward-listing', component: ListingComponent },
];
