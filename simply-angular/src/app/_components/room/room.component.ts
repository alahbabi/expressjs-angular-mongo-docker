import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService, RealTimeService } from '@/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'room.component.html',
    providers: [RealTimeService, { provide: Window, useValue: window }]
})
export class RoomComponent implements OnInit {
    currentUser: any;
    user: string;
    messageText: string;
    messageArray: Array<{ user: String, message: String }> = [];
    room: string;
    roomId: string;
    //typingEventMessage: { messageTyping: String };
    profile: string;
    localStream: any;
    peerConnections = {};
    broadcasterSocketId: string;
    peerConnection;
    _navigator = <any>navigator;
    message: string;

    config = {
        iceServers: [
          {
            urls: [
              "stun:108.177.15.127:19302"
            ]
          }
        ],
        iceTransportPolicy: "all",
      };


    private teacherStreamingVideo: ElementRef;
    @ViewChild('teacherStreamingVideo', { static: false }) set content(content: ElementRef) {
        if (content) { // initially setter gets called with undefined
            this.teacherStreamingVideo = content;
        }
    };

    private studentStreamingVideo: ElementRef;
    @ViewChild('studentStreamingVideo', { static: false }) set contente(contente: ElementRef) {
        if (contente) { // initially setter gets called with undefined
            this.studentStreamingVideo = contente;
        }
    }



    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private realTimeService: RealTimeService) {
        this.route.queryParamMap.subscribe(params => this.roomId = params.get('id'));

        this.currentUser = this.authenticationService.currentUserValue;

        this.realTimeService.newUserJoined()
            .subscribe(data => this.messageArray.push(data));

        this.realTimeService.userLeftRoom()
            .subscribe(data => this.messageArray.push(data));

        this.realTimeService.newMessageReceived()
            .subscribe(data => this.messageArray.push(data));



        this.realTimeService.receiveBroadcasterEvent().subscribe(data => {
            this.broadcasterSocketId = data.broadcasterId;
            console.log("THE BROADCASTER ID IS : " + data.broadcasterId)
        });

        this.realTimeService.receiveWatcherEvent().subscribe(id => {
            setTimeout(() => {
                this.watcher(id);
            }, 5000);
        });

        this.realTimeService.receiveOffer().subscribe(data => {
            setTimeout(() => {
                this.receiveOffer(data);
            }, 2000);
        });

        this.realTimeService.receiveCandidate().subscribe(data => {
            setTimeout(() => {
                this.receiveCandidate(data);
            }, 2000);
        });

        this.realTimeService.receiveAnswer().subscribe(data => {
            setTimeout(() => {
                this.receiveAnswer(data);
            }, 2000);
        });

        this.join();
        this.profile = this.currentUser.data.user.profile;
    }

    receiveAnswer(data) {
        console.log("1" + JSON.stringify(this.peerConnections))
        this.peerConnections[data.id].setRemoteDescription(data.message);
    }

    watcher(id) {
        let peerConnection = new RTCPeerConnection(config);
        console.log("4" + JSON.stringify(peerConnection))
        this.peerConnections[id] = peerConnection;
        console.log("2" + JSON.stringify(this.peerConnections))

        let video = this.teacherStreamingVideo.nativeElement;
        let stream = video.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach((track) => peerConnection.addTrack(track, stream));

        peerConnection
            .createOffer()
            .then((sdp) => peerConnection.setLocalDescription(sdp))
            .then(() => {
                console.log("5" + JSON.stringify(peerConnection.localDescription));
                this.realTimeService.sendOffer({ id: id, message: peerConnection.localDescription });
            });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.realTimeService.sendCandidate({ id: id, message: event.candidate });
            }
        };
    }

    receiveCandidate(data) {
        if (data.id == this.broadcasterSocketId) {
            console.log("3" + JSON.stringify(this.peerConnections))
            this.peerConnections[data.id].addIceCandidate(new RTCIceCandidate(data.message));
        } else {
            this.peerConnection
                .addIceCandidate(new RTCIceCandidate(data.message))
                .catch(e => console.error(e));
        }
    }

    receiveOffer(data) {
        this.peerConnection = new RTCPeerConnection(config);
        this.peerConnection
            .setRemoteDescription(data.message)
            .then(() => this.peerConnection.createAnswer())
            .then(sdp => this.peerConnection.setLocalDescription(sdp))
            .then(() => {
                this.realTimeService.sendAnswer({ id: data.id, message: this.peerConnection.localDescription })
            });

        this.peerConnection.onicecandidate = event => {
            if (event.candidate) {
                this.realTimeService.sendCandidate({ id: data.id, message: event.candidate });
            }
        };

        this.peerConnection.ontrack = event => {
            const video = this.studentStreamingVideo.nativeElement;
            video.srcObject = event.streams[0];
        };
    }



    ngOnInit() {

    }

    join() {
        this.realTimeService.joinRoom({ user: this.currentUser.data.user.lastname, room: this.roomId });
    }

    leave() {
        this.realTimeService.leaveRoom({ user: this.currentUser.data.user.lastname, room: this.roomId });
    }

    sendMessage() {
        this.realTimeService.sendMessage({ user: this.currentUser.data.user.lastname, room: this.roomId, message: this.messageText });
    }

    startStream() {
        const video = this.teacherStreamingVideo.nativeElement;

        this._navigator.getUserMedia =
            this._navigator.getUserMedia ||
            this._navigator.webkitGetUserMedia ||
            this._navigator.mozGetUserMedia ||
            this._navigator.msGetUserMedia;

        this._navigator.getUserMedia(
            // constraints
            {
                //audio: true,
                video: true,
                mandatory: {
                    OfferToReceiveAudio: true,
                    OfferToReceiveVideo: true,
                }
            },
            // successCallback
            function (stream) {
                video.srcObject = stream;
            },
            // errorCallback
            function (err) {
                console.log("The following error occured: " + err);
            }
        );
        this.realTimeService.emitBroadcasterEvent();
    }

    stopStream() {
        const video = this.teacherStreamingVideo.nativeElement;
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        video.srcObject = null;
    }

}