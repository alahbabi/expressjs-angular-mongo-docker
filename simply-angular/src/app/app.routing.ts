import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_components/home';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';
import { AuthGuard } from './shared/_helpers';
import { TaskCreationComponent } from './_components/task/task-creation';
import { TaskListComponent } from './_components/task/task-list';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'task/create', component: TaskCreationComponent, canActivate: [AuthGuard]},
    { path: 'task/list', component: TaskListComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);