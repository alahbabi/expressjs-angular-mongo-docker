import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertModule } from './_modules/alert.module';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './shared/_helpers';
import { AppComponent } from './app.component';
import { UserComponent } from './_components/user';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';
import { UserDetailComponent } from './_components/user-detail';
import { GroupComponent } from './_components/group';
import { RoomComponent } from './_components/room';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        AlertModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        UserComponent,
        UserDetailComponent,
        LoginComponent,
        RegisterComponent,
        GroupComponent,
        RoomComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
