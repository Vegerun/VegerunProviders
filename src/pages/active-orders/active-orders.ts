import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OrderService } from '../../services/order.service';

@Component({
    selector: 'active-orders',
    templateUrl: 'active-orders.html'
})
export class ActiveOrdersPage implements OnInit {
    
    constructor(
        private $nav: NavController,
        private $order: OrderService) { }

    ngOnInit() {
        
    }
}