import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { Twilio } from 'twilio';
// import { Video } from 'twilio-video';
import * as Video from 'twilio-video';
import { TwillioService } from '../../../services/twillio.service';
@Component({
  selector: 'app-audio-call',
  templateUrl: './audio-call.page.html',
  styleUrls: ['./audio-call.page.scss'],
})
export class AudioCallPage implements OnInit {
  username: string;
  remoteUserName: string;
  roomName: string;
  accessToken: string;
  room: Video.Room;
  tracks: any;
  constructor(
    private twilioService: TwillioService,
    private nav: NavController
  ) {}
  ngOnInit() {
    // this.addLocalVideo();
  }
  // async addLocalVideo() {
  //   this.tracks = await Video.createLocalTracks();
  //   const videoTrack = this.tracks.find((track) => track.kind === 'video');
  //   console.log('video track', videoTrack);
  //   const trackElement = videoTrack.attach();
  //   document.getElementById('localParticipant').appendChild(trackElement);
  // }
  async call() {
    console.log(this.username);
    console.log(this.roomName);
    await this.twilioService.getToken(this.username, this.roomName).then(
      (d) => {
        this.accessToken = d['token'];
        console.log('access token ', this.accessToken);
        localStorage.setItem('token', this.accessToken);
      },
      (error) => console.log(JSON.stringify(error))
    );
    this.connectToRoom();
  }
  connectParticipants(participant) {
    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        console.log('IN IF......');
        const track = publication.track;
        console.log(track, 'first track');
        // if (track.kind === 'video') {
        //   document
        //     .getElementById('remoteParticipant')
        //     .appendChild(track.attach());
        // }
      }
    });
    participant.on('trackSubscribed', (track) => {
      if (track.kind === 'audio') {
        document
          .getElementById('remoteParticipant')
          .appendChild(track.attach());
      }
      // if (track.kind === 'video') {
      //   document
      //     .getElementById('remoteParticipant')
      //     .appendChild(track.attach());
      // }
    });
  }

  async connectToRoom() {
    let options = {
      name: this.roomName,
      audio: true,
      video: false,
    };

    await Video.connect(this.accessToken, options).then(
      (room) => {
        console.log(`Successfully joined a Room: ${room}`);
        this.room = room;
        room.on('participantConnected', (participant) => {
          console.log(`A remote Participant connected: ${participant}`);
        });
      },
      (error) => {
        console.error(`Unable to connect to Room: ${error.message}`);
      }
    );
    const localParticipant = this.room.localParticipant;
    console.log(
      `Connected to the Room as LocalParticipant "${localParticipant.identity}"`
    );
    this.room.participants.forEach((participant) => {
      console.log(
        `Participant "${participant.identity}" is connected to the Room`
      );
      this.remoteUserName = participant.identity;
      this.connectParticipants(participant);
    });
    console.log(this.room, 'roommmm');
    // Attach the Participant's Media to a <div> element.
    this.room.on('participantConnected', (participant) => {
      console.log(`Participant "${participant.identity}" connected`);
      this.remoteUserName = participant.identity;
      this.connectParticipants(participant);
    });
  }

  // end call function

  end() {
    console.log('click on end');
    this.nav.navigateBack('home');

    this.room.on('disconnected', (room) => {
      // Detach the local media elements
      room.localParticipant.tracks.forEach((publication) => {
        const track = publication.track;
        if (track.kind === 'video') {
          document.getElementById('remoteParticipant').innerHTML = '';
          // const attachedElements = publication.track.detach();
          // attachedElements.forEach((element) => element.remove());
        }
      });
    });
    // To disconnect from a Room
    this.room.disconnect();
  }
}
