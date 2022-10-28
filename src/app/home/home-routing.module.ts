import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'audio-call',
    loadChildren: () => import('./audio-call/audio-call.module').then( m => m.AudioCallPageModule)
  },
  {
    path: 'video-call',
    loadChildren: () => import('./video-call/video-call.module').then( m => m.VideoCallPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
