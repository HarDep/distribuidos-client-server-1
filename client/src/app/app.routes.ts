import { Routes } from '@angular/router';
import { BusesListComponent } from './buses-list/buses-list.component';
import { BusesCreateEditComponent } from './buses-create-edit/buses-create-edit.component';
import { BusInfoComponent } from './bus-info/bus-info.component';

export const routes: Routes = [
    { path: 'buses', component: BusesListComponent },
    { path: '', redirectTo: 'buses', pathMatch: 'full' },
    { path: 'create', component: BusesCreateEditComponent },
    { path: 'edit/:busPlate', component: BusesCreateEditComponent },
    { path: 'details/:busPlate', component: BusInfoComponent },
    { path: '**', redirectTo: 'buses' }
];
