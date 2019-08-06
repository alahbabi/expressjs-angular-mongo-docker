import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// La propriété providedIn: root du décorateur permet de dire que le service est accessible globalement
// Cela signifie que le service est providé dans le root de l’application est qu’il est accessible globalement. D’autres options sont possibles.
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
   // Un BehaviorSubject a obligatoirement une valeur par défaut.
   //Il sauvegarde la dernière valeur qu'il a émis et l'envoie aux observateurs lors de leur subscribe
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
