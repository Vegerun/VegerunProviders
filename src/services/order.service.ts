import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { RestaurantOrdersFirebase } from './config/firebase.config';
import { SessionService } from './session.service';
import { Order, OrderStatus } from './models/order.model';
import { FirebaseWorkerFactory } from './firebase-worker.factory';
import { VegerunHttp } from './../extensions/vegerun-http.service';

@Injectable()
export class OrderService {

    private _activeOrders: BehaviorSubject<Order[]> = new BehaviorSubject([]);
    
    public activeOrders: Observable<Order[]> = this._activeOrders.asObservable();
    public pendingOrders: Observable<Order[]> = this.activeOrders.map(orders => orders.filter(o => o.status === OrderStatus.Placed));

    constructor(
        private http: VegerunHttp,
        private sessionService: SessionService,
        private firebaseWorkerFactory: FirebaseWorkerFactory)
    {
        this.watchActiveOrdersFirebase();
        this.pollActiveOrdersApi();
    }

    private watchActiveOrdersFirebase() {
        let firebasePath = `${RestaurantOrdersFirebase}/${this.sessionService.userData.restaurant_id}`;
        this.firebaseWorkerFactory.createFirebaseWorkerValue(firebasePath)
            .map<Order[]>(data => Object.keys(data).map(k => data[k]))
            .subscribe(orders => this.updateOrders(orders));
    }

    private pollActiveOrdersApi() {
        let activeOrders$ = this.http.get(`/orders/list-restaurant/${this.sessionService.userData.restaurant_id}`)
            .map(r => r.json() as Order[]);

        activeOrders$
            .expand(
                () => Observable
                    .timer(60 * 1000)
                    .concatMap<Order[]>(() => activeOrders$)
            )
            .subscribe(orders => this.updateOrders(orders));
    }
    
    private updateOrders(orders: Order[]) {
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
}