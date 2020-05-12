import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/models';
import { BehaviorSubject } from 'rxjs';

//La propriété providedIn: root du décorateur permet de dire que le service est accessible globalement
// Cela signifie que le service est providé dans le root de l’application est qu’il est accessible globalement. D’autres options sont possibles.
@Injectable({ providedIn: 'root' })
export class UserService {

    
    usersSource = new BehaviorSubject<any>([]);
    currentUsers = this.usersSource.asObservable();

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${config.apiUrl}/users`);
    }

    findAllByGroudId(idGroup: number) {
        return this.http.get<any>(`${config.apiUrl}/users/group/${idGroup}`);
    }

    getUserById(id: number) {
        return this.http.get<any>(`${config.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }

    update(id: number, user: User){
        return this.http.put<any>(`${config.apiUrl}/users/${id}`, user);
    }
}
