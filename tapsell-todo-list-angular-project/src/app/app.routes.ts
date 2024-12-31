import { Routes } from '@angular/router';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListDynamicComponent } from '../components/list-dynamic/list-dynamic.component';

export const routes: Routes = [
    { path: 'list/:id', component: ListDetailComponent },
    { path: '**', component: ListDynamicComponent },
    { path: 'main', component: ListDynamicComponent },
    { path: '', redirectTo: 'main', pathMatch: 'full' }
];
