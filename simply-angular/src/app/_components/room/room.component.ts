import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ChatService } from '@/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'room.component.html',
    providers: [ChatService]
})
export class RoomComponent implements OnInit {
    currentUser: any;
    user: String;
    messageText: String;
    messageArray: Array<{ user: String, message: String }> = [];
    room:string;
    roomId:string;

    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private chatservice: ChatService
    ) {
        this.route.queryParamMap.subscribe(params => this.roomId = params.get('id'));

        this.currentUser = this.authenticationService.currentUserValue;
        
        this.chatservice.newUserJoined()
            .subscribe(data => this.messageArray.push(data));

        this.chatservice.userLeftRoom()
            .subscribe(data => this.messageArray.push(data));

        this.chatservice.newMessageReceived()
            .subscribe(data => this.messageArray.push(data));
           
        this.join();
    }

    ngOnInit() {

    }

    join() {
        this.chatservice.joinRoom({ user: this.currentUser.data.user.lastname, room: this.roomId});
    }

    leave() {
        this.chatservice.leaveRoom({ user: this.currentUser.data.user.lastname, room:  this.roomId });
    }

    sendMessage() {
        this.chatservice.sendMessage({ user: this.currentUser.data.user.lastname, room:  this.roomId, message: this.messageText });
    }


}