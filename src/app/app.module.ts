import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { ActiveOrdersPage } from '../pages/active-orders/active-orders';

import { SessionService } from '../services/session.service';
import { MenuService } from '../services/menu.service';
import { OrderService } from '../services/order.service';
import { FirebaseWorkerFactory } from '../services/firebase-worker.factory';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    MenuPage,
    ActiveOrdersPage
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
    LoginPage,
    MenuPage,
    ActiveOrdersPage
  ],
  providers: [
    SessionService,
    MenuService,
    OrderService,
    FirebaseWorkerFactory
  ]
})
export class AppModule {}
