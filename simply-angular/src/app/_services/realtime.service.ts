import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RealTimeService {
    private socket = io('http://localhost:3003')


    joinRoom(data) {
        this.socket.emit('join', data);
    }

    newUserJoined() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('new user joined', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    leaveRoom(data) {
        this.socket.emit('leave', data);
    }

    userLeftRoom() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('user left room', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendMessage(data) {
        this.socket.emit('message', data);
    }

    newMessageReceived() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    userTyping(data) {
        this.socket.emit('userTyping', data);
    }

    userTypingMessage() {
        let observable = new Observable<{ messageTyping: String }>(observer => {
            this.socket.on('user typing', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    emitBroadcasterEvent() {
        console.log("EMIT BROADCAST EVENT")
        this.socket.emit('broadcaster');
        console.log("EMIT BROADCAST EVENT DONE")
    }

    receiveBroadcasterEvent() {
        let observable = new Observable<{ broadcasterId: string }>((observer) => {
            console.log("RECEIVE BROADCAST EVENT")
            this.socket.on('broadcaster', (data) => {
                console.log("DATA RECEIVED WITH BROADCAST EVENT "+ data.broadcasterId)
                console.log("EMIT WATCHER EVENT ")
                this.socket.emit("watcher");
                console.log("EMIT WATCHER EVENT DONE")
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    receiveWatcherEvent() {
        let observable = new Observable<{ id: String }>(observer => {
            this.socket.on('watcher', (data) => {
                console.log("RECEIVE WATCHER EVENT WITH " + data); 
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendOffer(data) {
        console.log("SEND OFFER TO " + data.id + " MESSAGE "+ data.message)
        this.socket.emit('offer', data);
    }

    sendCandidate(data) {
        console.log("SEND CANDIDATE TO " + data.id + " MESSAGE "+ data.message)
        this.socket.emit('candidate', data);
    }


    receiveOffer() {
        let observable = new Observable<{ id: String, message: String }>(observer => {
            this.socket.on('offer', (data) => {
                console.log("RECEIVE OFFER FROM " + data.id + " MESSAGE "+ data.message)
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    receiveCandidate() {
        let observable = new Observable<{ id: String, message: String }>(observer => {
            this.socket.on('candidate', (data) => {
                console.log("RECEIVE CANDIDATE FROM " + data.id + " MESSAGE "+ data.message)
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }


    sendAnswer(data) {
        this.socket.emit('answer', data);
        console.log("SEND ANSWER TO " + data.id + " MESSAGE "+ data.message)
    }

    receiveAnswer() {
        let observable = new Observable<{ id: String, message: String }>(observer => {
            this.socket.on('answer', (data) => {
                console.log("RECEIVE ANSWER TO " + data.id + " MESSAGE "+ data.message)
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

}
