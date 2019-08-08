import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from '@/_models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http: HttpClient) { }

    addProject(project: Project){
        return this.http.post(`${config.apiUrl}/projects`, project);
    }

    getAll() {
        return this.http.get<any>(`${config.apiUrl}/projects`);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/projects/${id}`);
    }
}
