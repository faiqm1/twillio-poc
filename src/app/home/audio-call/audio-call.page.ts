import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  audioOutputDevice: MediaDeviceInfo;
  constructor(
    private twilioService: TwillioService,
    private nav: NavController
  ) {}
  ngOnInit() {}

  // ========================= PUBLIC METHODS ===========================

  /**
   * Function to Initiate Audio Call
   */
  async call() {
    try {
      const tokenResponse = await this.twilioService.getToken(
        this.username,
        this.roomName
      );

      this.accessToken = tokenResponse['token'];
      console.log('access token ', this.accessToken);
      localStorage.setItem('token', this.accessToken);

      await this.connectToRoom();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  /**
   * Function to Enter in Room
   */
  async connectToRoom() {
    let options = {
      name: this.roomName,
      audio: true,
      video: false,
    };

    try {
      const room = await Video.connect(this.accessToken, options);

      console.log(`Successfully joined a Room: ${room}`);
      this.room = room;
      room.on('participantConnected', (participant) => {
        console.log(`A remote Participant connected: ${participant}`);
      });
    } catch (error) {
      console.error(`Unable to connect to Room: ${error.message}`);
    }

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

  /**
   * Function To Connect with Remote Participant
   * @param participant
   */
  connectParticipants(participant: Video.RemoteParticipant) {
    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        const track = publication.track;
        console.log(track, 'first track');
      }
    });
    participant.on('trackSubscribed', (track) => {
      if (track.kind === 'audio') {
        document
          .getElementById('remoteParticipant')
          .appendChild(track.attach());
      }
    });
  }

  /**
   * Function to End Audio Call
   */
  end() {
    localStorage.removeItem('token');
    this.nav.navigateBack('home');
    this.room.on('disconnected', (room) => {
      // Detach the local media elements
      room.localParticipant.tracks.forEach((publication) => {
        const track = publication.track;
        if (track.kind === 'video') {
          document.getElementById('remoteParticipant').innerHTML = '';
        }
      });
    });
    // To disconnect from a Room
    this.room.disconnect();
  }
}
