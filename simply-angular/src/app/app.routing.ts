import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { AuthGuard } from './shared/_helpers';
import { UserDetailComponent } from './components/user-detail';
import { GroupComponent } from './components/group';
import { RoomComponent } from './components/room';

const routes: Routes = [
    { path: 'group', component: GroupComponent, canActivate: [AuthGuard] },
    { path: '', component: GroupComponent, canActivate: [AuthGuard], 
        children: [
            { path: 'user-detail', component: UserDetailComponent},
        ]
    },
    { path: 'room', component: RoomComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { useHash: true });