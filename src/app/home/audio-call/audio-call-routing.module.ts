import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioCallPage } from './audio-call.page';

const routes: Routes = [
  {
    path: '',
    component: AudioCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioCallPageRoutingModule {}
