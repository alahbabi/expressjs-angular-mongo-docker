﻿import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/models';
import { UserService, AuthenticationService, AlertService } from '@/services';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({ 
    selector: 'app-user-detail',
    templateUrl: 'user-detail.component.html' 
})
export class UserDetailComponent implements OnInit {

    @Input() user: User ;
    userForm: FormGroup;
    profiles = ['Student', 'Teacher'];
    submitted = false;
    loading = false;
    users: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            profile: ['', Validators.required]
        });
        this.userService.usersSource.subscribe(data => {
            this.users = data;
        })
    }

    onUpdate(id: number){
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.update(id, this.userForm.value)
            .subscribe(
                response => {
                    let index = this.users.findIndex(x => x._id === id)
                    this.users[index] = response.data;
                    this.userService.usersSource.next(this.users);
                    this.alertService.success(response.message, false);
                }, error => {
                    this.alertService.error(error);
                }
            );
        this.loading = false;
    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }
}