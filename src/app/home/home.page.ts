import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}
  ngOnInit() {}

  audioCall() {
    this.router.navigate(['home/audio-call'], {
      replaceUrl: true,
    });
  }

  videoCall() {
    this.router.navigate(['home/video-call'], {
      replaceUrl: true,
    });
  }
}
