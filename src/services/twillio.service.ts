import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TwillioService {
  constructor(private http: HttpClient) {}

  /**
   * get token service to asses token from api
   * @param username
   * @param roomName
   * @returns
   */
  getToken(username: string, roomName: string) {
    let headers = {
      'Content-Type': 'application/json',
    };
    return this.http
      .post(
        'https://twillio-token.herokuapp.com/video-token/',
        {
          identity: username,
          room: roomName,
        },
        { headers: new HttpHeaders(headers) }
      )
      .toPromise();
  }
}
