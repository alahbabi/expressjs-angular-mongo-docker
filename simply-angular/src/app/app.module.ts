import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './shared/_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';
import { AlertComponent } from './_components/alert';
import { TaskCreationComponent } from './_components/task/task-creation';
import { TaskListComponent } from './_components/task/task-list';
import { TaskDetailComponent } from './_components/task/task-detail';
import { ProjectCreationComponent } from './_components/project/project-creation';
import { ProjectListComponent } from './_components/project/project-list';
import { ProjectDetailComponent } from './_components/project/project-detail';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
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
