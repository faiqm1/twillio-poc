import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioCallPageRoutingModule } from './audio-call-routing.module';

import { AudioCallPage } from './audio-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioCallPageRoutingModule
  ],
  declarations: [AudioCallPage]
})
export class AudioCallPageModule {}
