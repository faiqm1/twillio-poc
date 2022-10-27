import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TwillioService {
  constructor(private http: HttpClient) {}

  async getToken(username, roomName) {
    return await this.http
      .post('https://twillio-token.herokuapp.com/token/', {
        identity: username,
        room: roomName,
      })
      .toPromise();
  }
}
