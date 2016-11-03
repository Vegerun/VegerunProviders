import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import Firebase from 'firebase';

import { ApiRoot } from './config/server.config';
import { RestaurantOrdersFirebase } from './config/firebase.config';
import { SessionService } from './session.service';
import { Order, OrderStatus } from './models/order.model';
import { FirebaseWorkerFactory } from './firebase-worker.factory';


@Injectable()
export class OrderService {

    private _activeOrders: BehaviorSubject<Order[]> = new BehaviorSubject([]);
    
    public activeOrders: Observable<Order[]> = this._activeOrders.asObservable();
    public pendingOrders: Observable<Order[]> = this.activeOrders.map(orders => orders.filter(o => o.status === OrderStatus.Placed));

    constructor(
        private http: Http,
        private sessionService: SessionService,
        private firebaseWorkerFactory: FirebaseWorkerFactory)
    {
        let firebasePath = `${RestaurantOrdersFirebase}/${this.sessionService.userData.restaurant_id}`;
        firebaseWorkerFactory.createFirebaseWorkerValue(firebasePath)
            .map<Order[]>(data => Object.keys(data).map(k => data[k]))
            .subscribe(orders => this._updateOrders(orders));

        let activeOrders$ = this._listActiveOrders();
        activeOrders$
            .expand(
                () => Observable
                    .timer(60 * 1000)
                    .concatMap<Order[]>(() => activeOrders$)
            )
            .subscribe(orders => this._updateOrders(orders));
    }
    
    _updateOrders(orders: Order[]) {
        let updatedOrders$ = Observable
            .from([
                ...orders,
                ...this._activeOrders.getValue()
            ])
            .groupBy(o => o.id)
            .flatMap(g => g.reduce((acc, val) => {
                if (acc) {
                    return acc.timestamp > val.timestamp ? acc : val;
                } else {
                    return val;
                }
            }))
            .reduce((acc, val) => [...acc, val], []);
        
        updatedOrders$.subscribe(
            res => {
                this._activeOrders.next(res);
            }
        );
    }

    _listActiveOrders() : Observable<Order[]> {
        let userData = this.sessionService.userData;

        let options = new RequestOptions({
            headers: new Headers({
                'Authorization': `Bearer ${userData.access_token}`
            })
        });

        let url = `${ApiRoot}/orders/list-restaurant/${userData.restaurant_id}`;

        return this.http.get(url, options).map(r => r.json() as Order[]);
    }
}