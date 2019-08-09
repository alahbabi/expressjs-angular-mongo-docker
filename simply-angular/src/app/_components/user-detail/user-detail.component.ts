import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService, AlertService } from '@/_services';
import { ActivatedRoute } from '@angular/router';

@Component({ 
    selector: 'app-user-detail',
    templateUrl: 'user-detail.component.html' 
})
export class UserDetailComponent  {

    @Input() myNum ;

    constructor(private route: ActivatedRoute) {
        console.log('snapshot ' + this.route.snapshot.paramMap.get('id'));

    }
}