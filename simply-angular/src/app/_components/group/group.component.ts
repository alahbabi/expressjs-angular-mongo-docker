import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, AlertService, GroupService } from '@/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User, Group } from '@/_models';

@Component({ templateUrl: 'group.component.html' })
export class GroupComponent implements OnInit {
    groupForm: FormGroup;
    groups : any;
    loading = false;
    submitted = false;
    returnUrl: string;
    currentUser: any;
    p: number = 1;
    studentSearch:boolean=false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private groupService: GroupService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    // convenience getter for easy access to form fields
    get f() { return this.groupForm.controls; }

    ngOnInit() {
        this.loadAllGroupsByCurrentUser();
        this.groupForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.groupForm.invalid) {
            return;
        }

        this.loading = true;


        this.groupService.addGroup({ name: this.groupForm.value.name, owner: this.currentUser.data.user })
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Group added successful', true);
                    this.loading = false;
                    this.loadAllGroupsByCurrentUser();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private loadAllGroupsByCurrentUser() {
        this.groupService.findAllByOwner(this.currentUser.data.user._id)
            .subscribe(
                response => {
                    this.groups = response.data;
                    console.log(this.groups);
                },
                error => {
                    this.alertService.error(error);
                }
            );
    }

    


    studentSearchDiv(){
        if(this.studentSearch){
            this.studentSearch=false;
        }else {
            this.studentSearch=true;
        }

    }
}