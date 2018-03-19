import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { LogoutComponent } from './logout';

@NgModule({
  declarations: [
    LogoutComponent,
  ],
  imports: [
    IonicPageModule.forChild(LogoutComponent),
    CommonModule,
    HttpModule,
  ],
  exports: [
    LogoutComponent
  ],
})
export class LogoutModule {}
