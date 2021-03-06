import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../services/models/menu-item.model';

import { OrderService } from '../../services/order.service';

@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuPage implements OnInit {

    public menuItems: MenuItem[];
    
    constructor(
        private $nav: NavController,
        private $menu: MenuService,
        private $orders: OrderService){ }

    ngOnInit() {
        this.$menu.findAllItems().subscribe(
            data => this.menuItems = data
        );
    }
}