import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoComponent } from './photo';

@NgModule({
  declarations: [
    PhotoComponent,
  ],
  imports: [
    IonicPageModule.forChild(PhotoComponent),
  ],
  exports: [
    PhotoComponent
  ]
})
export class PhotoPageModule { }
