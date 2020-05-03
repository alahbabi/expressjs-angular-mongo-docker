import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services';

@Component({ templateUrl: 'room.component.html' })
export class RoomComponent implements OnInit {
    currentUser: any;

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {

    }

    
}