import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RealTimeService {

    private socket = io('http://localhost:3003')

    joinRoom(data) {
        this.socket.emit('JOINROOM', data);
        this.socket.emit('WATCHER', data);
    }

    userJoinedRoom() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('JOINROOM', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    leaveRoom(data) {
        this.socket.emit('LEAVEROOM', data);
    }

    userLeftRoom() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('LEAVEROOM', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendMessage(data) {
        this.socket.emit('MESSAGE', data);
    }

    message() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('MESSAGE', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    userTyping(data) {
        this.socket.emit('USERTYPING', data);
    }

    userTypingMessage() {
        let observable = new Observable<{ messageTyping: String }>(observer => {
            this.socket.on('USERTYPING', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    emitBroadcasterEvent(roomId: string) {
        console.log("EMIT BROADCAST EVENT")
        this.socket.emit('BROADCASTER', {roomId: roomId});
        console.log("EMIT BROADCAST EVENT DONE")
    }

    broadcastEvent(roomId: string) {
        let observable = new Observable<{ broadcasterId: string }>((observer) => {
            console.log("RECEIVE BROADCAST EVENT")
            this.socket.on('BROADCASTER'+roomId, (data) => {
                console.log("DATA RECEIVED WITH BROADCAST EVENT " + data.broadcasterId)
                console.log("EMIT WATCHER EVENT ")
                this.socket.emit('WATCHER', {roomId: roomId});
                console.log("EMIT WATCHER EVENT DONE")
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    watcherEvent(roomId: string) {
        let observable = new Observable<{ id: String }>(observer => {
            this.socket.on('WATCHER'+roomId, (data) => {
                console.log("RECEIVE WATCHER EVENT WITH " + data);
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendOffer(data) {
        console.log("SEND OFFER TO " + data.id + " MESSAGE " + data.message)
        this.socket.emit('OFFER', data);
    }

    offerEvent(roomId:string) {
        let observable = new Observable<{ id: String, message: String }>(observer => {
            this.socket.on('OFFER'+roomId, (data) => {
                console.log("RECEIVE OFFER FROM " + data.id + " MESSAGE " + data.message)
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendCandidate(data) {
        console.log("SEND CANDIDATE TO " + data.id + " MESSAGE " + data.message)
        this.socket.emit('CANDIDATE', data);
    }

    candidateEvent(roomId:string) {
        let observable = new Observable<{ id: String, message: String }>(observer => {
            this.socket.on('CANDIDATE'+roomId, (data) => {
                console.log("RECEIVE CANDIDATE FROM " + data.id + " MESSAGE " + data.message)
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendAnswer(data) {
        this.socket.emit('ANSWER', data);
        console.log("SEND ANSWER TO " + data.id + " MESSAGE " + data.message)
    }

    answerEvent(roomId: string) {
        let observable = new Observable<{ id: String, message: String }>(observer => {
            this.socket.on('ANSWER'+roomId, (data) => {
                console.log("RECEIVE ANSWER TO " + data.id + " MESSAGE " + data.message)
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendCloseWindow(data) {
        this.socket.emit('DISCONNECT', data);
    }

    closeWindowEvent(roomId: string) {
        let observable = new Observable<{ id: String }>(observer => {
            this.socket.on('DISCONNECT'+roomId, (data) => {
                console.log("DISCONNECT PEER" + data)
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

}
