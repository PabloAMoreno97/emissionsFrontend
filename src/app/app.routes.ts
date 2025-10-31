import { Routes } from '@angular/router';
import { EmissionList } from './components/emission-list/emission-list';

export const routes: Routes = [
    { path: '', redirectTo: '/emissions', pathMatch: 'full' },
    { path: 'emissions', component: EmissionList }
];
