import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group, User } from '@/models';

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

    sendInvitation(user: User , email: String, idGroup: number) {
        return this.http.post(`${config.apiUrl}/groups/invit`, {'user': user, 'email': email, 'idGroup': idGroup});
    }

    addToGroup(email: String, idGroup: number) {
        return this.http.post(`${config.apiUrl}/groups/add`, {'email': email, 'idGroup': idGroup});
    }

    removeStudent(idGroup: number, idStudent: number) {
        return this.http.delete(`${config.apiUrl}/groups/remove/${idGroup}/${idStudent}`);
    }
}
