import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './shared/_helpers';
import { AppComponent } from './app.component';
import { UserComponent } from './_components/user';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';
import { AlertComponent } from './_components/alert';
import { TaskCreationComponent } from './_components/task/task-creation';
import { TaskListComponent } from './_components/task/task-list';
import { TaskDetailComponent } from './_components/task/task-detail';
import { ProjectCreationComponent } from './_components/project/project-creation';
import { ProjectListComponent } from './_components/project/project-list';
import { ProjectDetailComponent } from './_components/project/project-detail';
import { UserDetailComponent } from './_components/user-detail';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        UserComponent,
        UserDetailComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        TaskCreationComponent,
        TaskListComponent,
        TaskDetailComponent,
        ProjectCreationComponent,
        ProjectListComponent,
        ProjectDetailComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        //,

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
