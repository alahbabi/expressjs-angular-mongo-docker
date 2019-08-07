import { Component, OnInit } from '@angular/core';
import { ProjectService, AlertService, UserService } from '@/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@/_models';

@Component({ templateUrl: 'project-creation.component.html' })
export class ProjectCreationComponent implements OnInit{

    projectCreationForm: FormGroup;
    owners: User[];
    
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService, 
        private projectService: ProjectService,
        private alertService: AlertService ) {
        this.loadAllowners();
    }

    ngOnInit(): void {
        this.projectCreationForm = this.formBuilder.group({
            name : ['', Validators.required],
            owner: ['', Validators.required]
        });
    }

    private loadAllowners() {
        this.userService.getAll()
            .subscribe(
                response => {
                    this.owners = response.data;
                },
                error => {
                    this.alertService.error(error);
                });
    }
}