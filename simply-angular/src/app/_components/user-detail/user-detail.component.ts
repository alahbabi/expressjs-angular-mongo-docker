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

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute) {
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

    onSubmit(id: number){
        console.log(id);
    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }
}