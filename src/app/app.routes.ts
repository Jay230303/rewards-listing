import { Routes } from '@angular/router';
import { ListingComponent } from './pages/listing-component/listing-component';

export const routes: Routes = [
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
  { path: 'listing', component: ListingComponent },
];
