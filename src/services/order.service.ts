import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { ApiRoot } from './config/server.config';
import { SessionService } from './session.service';
import { Order } from './models/order.model';

@Injectable()
export class OrderService {

    constructor(
        private http: Http,
        private session: SessionService) { }

    listActiveOrders() : Observable<Order[]> {
        let userData = this.session.userData;

        let options = new RequestOptions({
            headers: new Headers({
                'Authorization': `Bearer ${userData.access_token}`
            })
        });

        let url = `${ApiRoot}/orders/list-restaurant-orders/${userData.restaurant_id}`;

        return this.http.get(url, options)
            .map(r => r.json() as Order[]);
    }
    
}