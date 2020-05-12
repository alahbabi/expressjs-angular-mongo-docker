import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AuthenticationService, RealTimeService } from '@/services';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'room.component.html',
    providers: [RealTimeService]
})
export class RoomComponent implements OnInit {
    currentUser: any;
    user: string;
    messageText: string;
    messageArray: Array<{ user: String, message: String }> = [];
    room: string;
    roomId: string;
    profile: string;
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

    status: string;
    enableStartCapture: boolean;
    enableStopCapture: boolean;
    enableDownloadRecording: boolean;
    recording: any;
    chunks: any[];
    mediaRecorder: any;

    downloadLink: ElementRef;
    subscriptionCandidateEvent: any;
    subscriptionOffreEvent: any;
    @ViewChild('downloadLink', { static: false }) set contentrt(content: ElementRef) {
        if (content) { // initially setter gets called with undefined
            this.downloadLink = content;
        }
    };

    private teacherStreamingAudio: ElementRef;
    @ViewChild('teacherStreamingAudio', { static: false }) set contentStreamingAudio(content: ElementRef) {
        if (content) { // initially setter gets called with undefined
            this.teacherStreamingAudio = content;
        }
    };

    private teacherStreamingVideo: ElementRef;
    @ViewChild('teacherStreamingVideo', { static: false }) set contensdfqsdt(content: ElementRef) {
        if (content) { // initially setter gets called with undefined
            this.teacherStreamingVideo = content;
        }
    };

    private teacherStreamingScreen: ElementRef
    @ViewChild('teacherStreamingScreen', { static: false }) set contedent(content: ElementRef) {
        if (content) { // initially setter gets called with undefined
            this.teacherStreamingScreen = content;
        }
    };

    private studentStreamingVideo: ElementRef;
    @ViewChild('studentStreamingVideo', { static: false }) set contentt(contentt: ElementRef) {
        if (contentt) { // initially setter gets called with undefined
            this.studentStreamingVideo = contentt;
        }
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.stopLive();
        this.subscriptionCandidateEvent && this.subscriptionCandidateEvent.unsubscribe();
        this.subscriptionOffreEvent && this.subscriptionOffreEvent.unsubscribe();
    }

    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private realTimeService: RealTimeService) {
        this.route.queryParamMap.subscribe(params => this.roomId = params.get('id'));

        this.currentUser = this.authenticationService.currentUserValue;

        this.realTimeService.userJoinedRoom()
            .subscribe(data => this.messageArray.push(data));

        this.realTimeService.userLeftRoom()
            .subscribe(data => this.messageArray.push(data));

        this.realTimeService.message()
            .subscribe(data => this.messageArray.push(data));

        this.realTimeService.broadcastEvent().subscribe(data => {
            this.broadcasterSocketId = data.broadcasterId;
            console.log("THE BROADCASTER ID IS : " + data.broadcasterId)
        });

        this.realTimeService.watcherEvent().subscribe(id => {
            setTimeout(() => {
                this.watcherEventTreatement(id);
            }, 5000);
        });

        this.subscriptionOffreEvent = this.realTimeService.offerEvent().subscribe(data => {
            this.offerEventTreatment(data);
        });

        this.subscriptionCandidateEvent = this.realTimeService.candidateEvent().subscribe(data => {
            setTimeout(() => {
                this.candidateEventTreatement(data);
            }, 3000);
        });

        this.realTimeService.answerEvent().subscribe(data => {
            this.answerEventTreatement(data);
        });

        this.realTimeService.closeWindowEvent().subscribe(id => {
            this.closeWindowEventTreatement(id);
        });

        this.join();
        this.profile = this.currentUser.data.user.profile;
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

    watcherEventTreatement(id) {
        let peerConnection = new RTCPeerConnection(config);
        this.peerConnections[id] = peerConnection;

        let video = this.teacherStreamingVideo.nativeElement;
        let stream = video.srcObject;

        let audio = this.teacherStreamingAudio.nativeElement;
        //let audioStream = audio.srcObject;

        let tracks = stream.getTracks();
        //let audiotracks = audioStream.getTracks();
        tracks.forEach((track) => peerConnection.addTrack(track, stream));
        //audiotracks.forEach((track) => peerConnection.addTrack(track, audioStream));

        peerConnection
            .createOffer()
            .then((sdp) => peerConnection.setLocalDescription(sdp))
            .then(() => {
                this.realTimeService.sendOffer({ id: id, message: peerConnection.localDescription });
            });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.realTimeService.sendCandidate({ id: id, message: event.candidate });
            }
        };
    }

    candidateEventTreatement(data) {
        if (data.id == this.broadcasterSocketId) {
            this.peerConnections[data.id].addIceCandidate(new RTCIceCandidate(data.message));
        } else {
            this.peerConnection
                .addIceCandidate(new RTCIceCandidate(data.message))
                .catch(e => console.error(e));
        }
    }

    offerEventTreatment(data) {
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

    answerEventTreatement(data) {
        this.peerConnections[data.id].setRemoteDescription(data.message);
    }

    startStreamingVideo() {
        if(this.mediaRecorder) {
            this.stopSharingVideo(event);
        }
        const video = this.teacherStreamingVideo.nativeElement;

        this._navigator.getUserMedia =
            this._navigator.getUserMedia ||
            this._navigator.webkitGetUserMedia ||
            this._navigator.mozGetUserMedia ||
            this._navigator.msGetUserMedia;

        this._navigator.getUserMedia(
            {
                audio: false,
                video: true,
                mandatory: {
                    OfferToReceiveAudio: true,
                    OfferToReceiveVideo: true,
                }
            },
            function (stream) {
                video.srcObject = stream;
            },
            function (err) {
                console.log("The following error occured: " + err);
            }
        );
        this.realTimeService.emitBroadcasterEvent();
    }

    startAudio() {
        const audio = this.teacherStreamingAudio.nativeElement;

        this._navigator.getUserMedia =
            this._navigator.getUserMedia ||
            this._navigator.webkitGetUserMedia ||
            this._navigator.mozGetUserMedia ||
            this._navigator.msGetUserMedia;

        this._navigator.getUserMedia(
            {
                video: false,
                audio: true,
                mandatory: {
                    OfferToReceiveAudio: true,
                    OfferToReceiveVideo: false
                }
            },
            function (stream) {
                audio.srcObject = stream;
            },
            function (err) {
                console.log("The following error occured: " + err);
            }
        );
    }

    stopLive() {
        const video = this.teacherStreamingVideo.nativeElement;
        const stream = video.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(function (track) {
                track.stop();
            });
            video.srcObject = null;
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        this.realTimeService.sendCloseWindow();
    }

    closeWindowEventTreatement(id) {
        if (id) {
            this.peerConnections[id].close();
            delete this.peerConnections[id];
        } else {
            this.peerConnection.close();
        }
    }


    static getDevicesSharingVideo() {
        let mediaDevices = navigator.mediaDevices as any;
        if (navigator.getDisplayMedia) {
            return navigator.getDisplayMedia({video: true});
          } else if (mediaDevices.getDisplayMedia) {
            return mediaDevices.getDisplayMedia({video: true});
          } else {
            return mediaDevices.getUserMedia({video: {mediaSource: 'screen'}});
          }
    }

    async startSharingVideo(e) {
        this.stopLive();
        console.log('Start capturing.');
        this.status = 'Screen recording started.';
        const video = this.teacherStreamingScreen.nativeElement;

        if (this.recording) {
            window.URL.revokeObjectURL(this.recording);
        }

        this.chunks = [];
        this.recording = null;
        const stream = await RoomComponent.getDevicesSharingVideo();
        stream.addEventListener('inactive', (e) => {
            console.log('Capture stream inactive - stop recording!');
            this.stopSharingVideo(e);
          });
        video.srcObject = stream;

        this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        this.mediaRecorder.addEventListener('dataavailable', event => {
            if (event.data && event.data.size > 0) {
                this.chunks.push(event.data);
            }
        });
        this.mediaRecorder.start(10);
        this.realTimeService.emitBroadcasterEvent();
    }

    stopSharingVideo(e) {
        console.log('Stop capturing.');
        const video = this.teacherStreamingScreen.nativeElement;
        const stream = video.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(function (track) {
                console.log(track);
                track.stop();
            });
            video.srcObject = null;
        }
        this.status = 'Screen recorded completed.';

        this.mediaRecorder.stop();
        this.mediaRecorder = null;
        this.recording = window.URL.createObjectURL(new Blob(this.chunks, { type: 'video/webm' }));
    }


    downloadStream(e) {
        console.log('Download recording.');
        this.downloadLink.nativeElement.addEventListener('progress', e => console.log(e));
        this.downloadLink.nativeElement.href = this.recording;
        this.downloadLink.nativeElement.download = 'screen-recording.webm';
        this.downloadLink.nativeElement.click();
    }
}