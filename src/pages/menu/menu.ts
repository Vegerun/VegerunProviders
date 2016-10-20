import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../services/models/menu-item.model';

@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuPage implements OnInit {

    public menuItems: MenuItem[];
    
    constructor(
        private $nav: NavController,
        private $menu: MenuService) { }

    ngOnInit() {
        this.$menu.findAll().subscribe(
            data => this.menuItems = data
        );
    }
}