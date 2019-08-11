import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './_components/user';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';
import { AuthGuard } from './shared/_helpers';
import { TaskCreationComponent } from './_components/task/task-creation';
import { TaskListComponent } from './_components/task/task-list';
import { ProjectCreationComponent } from './_components/project/project-creation';
import { ProjectListComponent } from './_components/project/project-list';
import { UserDetailComponent } from './_components/user-detail';

const routes: Routes = [
    { path: '', component: UserComponent, canActivate: [AuthGuard], 
        children: [
            { path: 'user-detail', component: UserDetailComponent},
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'project/create', component: ProjectCreationComponent, canActivate: [AuthGuard],
        children: [
            { path: 'task/create', component: TaskCreationComponent, canActivate: [AuthGuard]}
        ]
    },
    { path: 'project/list', component: ProjectListComponent, canActivate: [AuthGuard]},
    { path: 'task/create', component: TaskCreationComponent, canActivate: [AuthGuard]},
    { path: 'task/list', component: TaskListComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);