import { Routes } from '@angular/router';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListDynamicComponent } from '../components/list-dynamic/list-dynamic.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';

export const routes: Routes = [
    //? List Detail Page
    { path: 'list/:id', component: ListDetailComponent },
    //? List Completed Page
    { path: 'completed', component: CompletedTasksComponent },
    //? List NotFound Page => Redirect to main page
    { path: '**', component: ListDynamicComponent },
    //? main page
    { path: 'main', component: ListDynamicComponent },
    //? empty url(main url browser) Redirect to main page for pathMatch full
    { path: '', redirectTo: 'main', pathMatch: 'full' }
];
