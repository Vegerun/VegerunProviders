import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';

import { SessionService } from '../services/session.service';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage
  ],
  providers: [
    SessionService
  ]
})
export class AppModule {}
