import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService, AlertService } from '@/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'user.component.html' })
export class UserComponent implements OnInit {
    currentUser: User;
    users : any;
    user : User;
    number = 5 ;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    detailUser(id: number) {
        this.userService.getUserById(id)
        .subscribe(
            response => {
                console.log(response.data);
                this.user = response.data ;
                this.router.navigate(['/user-detail/'+ id]);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    private loadAllUsers() {
        this.userService.getAll()
            .subscribe(
                response => {
                    this.users = response.data;
                },
                error => {
                    this.alertService.error(error);
                }
            );
    }
}