import { Routes } from '@angular/router';
import { BusesListComponent } from './buses-list/buses-list.component';
import { BusesCreateEditComponent } from './buses-create-edit/buses-create-edit.component';

export const routes: Routes = [
    { path: 'buses', component: BusesListComponent },
    { path: '', redirectTo: 'buses', pathMatch: 'full' },
    { path: 'create', component: BusesCreateEditComponent },
    { path: '**', redirectTo: 'buses' }
];
