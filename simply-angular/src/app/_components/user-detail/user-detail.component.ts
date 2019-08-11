import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService, AlertService } from '@/_services';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({ 
    selector: 'app-user-detail',
    templateUrl: 'user-detail.component.html' 
})
export class UserDetailComponent implements OnInit {

    @Input() user: User ;
    userForm: FormGroup;
    profiles = ['Collaborator', 'Manager' , 'Human resources'];
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
            username : ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            profile: ['', Validators.required]
        });
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
                    this.userService.getAll().subscribe(response => {
                        this.userService.usersSource.next(response.data);
                    })
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