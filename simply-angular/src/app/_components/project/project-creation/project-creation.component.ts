import { Component, OnInit } from '@angular/core';
import { ProjectService, AlertService, UserService } from '@/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Project } from '@/_models';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'project-creation.component.html' })
export class ProjectCreationComponent implements OnInit{

    projectCreationForm: FormGroup;
    owners: User[];
    loading = false;
    submitted = false;
    router: any;
    projects: Project[];
    
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService, 
        private projectService: ProjectService,
        private alertService: AlertService ) {
        this.loadAllowners();
        this.refreshProjectList();
    }

    ngOnInit(): void {
        this.projectCreationForm = this.formBuilder.group({
            name : ['', Validators.required],
            owner: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.projectCreationForm.controls; }

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

    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();

         // stop here if form is invalid
         if (this.projectCreationForm.invalid) {
            return;
        }
        this.loading = true;
        this.projectService.addProject(this.projectCreationForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Project created', true);
                    this.refreshProjectList();
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    refreshProjectList() {
        this.projectService.getAll().subscribe(
            response => {
                this.projects = response.data ;
            }, 
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    deleteProject(id: number) {
        this.alertService.clear();
        this.projectService.delete(id)
            .pipe(first())
            .subscribe(() => this.refreshProjectList());
    }
}