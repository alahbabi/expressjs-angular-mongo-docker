import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, AlertService, GroupService, UserService } from '@/_services';
import { first } from 'rxjs/operators';
import { User } from '@/_models';

@Component({ templateUrl: 'group.component.html' })
export class GroupComponent implements OnInit {
    groupForm: FormGroup;
    invitForm: FormGroup;
    groups : any;
    currentUser: any;
    p: number = 1;
    idGroup: number;
    studentSearch:boolean=false;
    students:any;
    user: User;

    options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private groupService: GroupService,
        private userService : UserService,
        private alertService: AlertService
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
                this.alertService.success('Student added', this.options);
                this.user = null ;
                this.invitForm.reset();
            },
            error => {
                this.alertService.error(error.message, this.options);
            }
        );
    }

    addGroup() {
        // stop here if form is invalid
        if (this.groupForm.invalid) {
            return;
        }

        this.groupService.addGroup({ name: this.groupForm.value.name, owner: this.currentUser.data.user })
            .pipe(first())
            .subscribe(
                data => {
                    this.user = null ;
                    this.alertService.success('Group added successful', this.options);
                    this.loadAllGroupsByCurrentUser();
                    this.students = null;
                    this.groupForm.reset();
                },
                error => {
                    this.alertService.error(error, this.options);
                });
    }

    deleteGroup(id: number) {
        this.groupService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllGroupsByCurrentUser());
            this.idGroup = null;
            this.user = null ;
            this.alertService.error("Group deleted", this.options);
    }

    sendInvitation() {
        this.groupService.sendInvitation(this.currentUser.data.user, this.i.email.value, this.idGroup)
            .subscribe(() => this.loadAllGroupsByCurrentUser());
        this.alertService.success('Invitation sended', this.options);
    }

    getAllUsersByGroupId(id : number) {
        this.idGroup = id ;
        this.userService.findAllByGroudId(id)
            .subscribe(
                response => {
                    this.students = response.data;
                    if(this.students.length == 0) {
                        this.user = null ;
                        this.alertService.warn("Empty group", this.options);
                    }else {
                        this.user = this.students[0];
                    }
                },error => {
                    this.alertService.error(error, this.options);
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
                    this.alertService.error(error, this.options);
                }
            );
    }

    userInfo(id: number) {
        this.userService.getUserById(id)
        .subscribe(
            response => {
                this.user = response.data ;
            },
            error => {
                this.alertService.error(error, this.options);
            }
        );
    }

    removeStudent(idStudent:number) {
        if(idStudent == this.user._id) {
            this.user = null ;
        }
        this.groupService.removeStudent(this.idGroup, idStudent)
        .pipe(first())
        .subscribe(
            (response: any) => {
                this.getAllUsersByGroupId(this.idGroup);
                this.alertService.success('Student removed', this.options);
            },
            error => {
                this.alertService.error(error, this.options);
            }
        );
    }
}