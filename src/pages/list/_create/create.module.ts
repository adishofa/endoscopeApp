import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateComponent } from './create';

@NgModule({
  declarations: [
    CreateComponent,
  ],
  imports: [
    IonicPageModule.forChild(CreateComponent),
  ],
  exports: [
    CreateComponent
  ]
})
export class CreatePageModule {}
