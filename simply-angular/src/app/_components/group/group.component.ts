import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, AlertService, GroupService, UserService } from '@/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User, Group } from '@/_models';

@Component({ templateUrl: 'group.component.html' })
export class GroupComponent implements OnInit {
    groupForm: FormGroup;
    invitForm: FormGroup;
    groups : any;
    loading = false;
    submitted = false;
    returnUrl: string;
    currentUser: any;
    p: number = 1;
    idGroup: number;
    studentSearch:boolean=false;
    students:any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private groupService: GroupService,
        private userService : UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    // convenience getter for easy access to form fields
    get f() { return this.groupForm.controls; }
    get i() { return this.invitForm.controls; }

    ngOnInit() {
        this.loadAllGroupsByCurrentUser();
        this.groupForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
        this.invitForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }

    addToGroup(){
        this.groupService.addToGroup(this.i.email.value, this.idGroup)
        .pipe(first())
        .subscribe(
            (response: any) => {
                this.getAllUsersByGroupId(this.idGroup);
            },
            error => {
                this.alertService.error(error);
            }
        );
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
                    //this.alertService.success('Group added successful', true);
                    this.loading = false;
                    this.loadAllGroupsByCurrentUser();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    deleteGroup(id: number) {
        this.groupService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllGroupsByCurrentUser());
    }

    sendInvitation() {
        this.groupService.sendInvitation(this.currentUser.data.user, this.i.email.value, this.idGroup)
            .subscribe(() => this.loadAllGroupsByCurrentUser());
    }

    getAllUsersByGroupId(id : number) {
        this.idGroup = id ;
        this.userService.findAllByGroudId(id)
            .subscribe(
                response => {
                    this.students = response.data;
                    console.log(response.data);
                },error => {
                    this.alertService.error(error);
                }
            );
    }

    private loadAllGroupsByCurrentUser() {
        this.groupService.findAllByOwner(this.currentUser.data.user._id)
            .subscribe(
                response => {
                    this.groups = response.data;
                },
                error => {
                    this.alertService.error(error);
                }
            );
    }
}