import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from '@/_models';

@Injectable({ providedIn: 'root' })
export class GroupService {
    constructor(private http: HttpClient) { }

    addGroup(group: Group){
        return this.http.post(`${config.apiUrl}/groups`, group);
    }

    getAll() {
        return this.http.get<any>(`${config.apiUrl}/groups`);
    }

    findAllByOwner(owner: String) {
        return this.http.get<any>(`${config.apiUrl}/groups/owner/${owner}`);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/groups/${id}`);
    }
}
