import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { RestaurantService } from '../services/restaurant.service';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { ActiveOrdersPage } from '../pages/active-orders/active-orders';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
      public platform: Platform,
      private restaurantService: RestaurantService)
  {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Stock Management', component: MenuPage },
      { title: 'Orders', component: ActiveOrdersPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
