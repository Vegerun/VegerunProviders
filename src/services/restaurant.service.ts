import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

import { SessionService, LoginResult } from './session.service';
import { VegerunHttp } from './../extensions/vegerun-http.service';

import { Restaurant } from './models/restaurant.model';

const RestaurantPollingIntervalMinutes: number = 5;

@Injectable()
export class RestaurantService {

    private _restaurant: BehaviorSubject<Restaurant> = new BehaviorSubject(null);
    private _restaurantPollingSub: Subscription = null;

    public restaurant: Observable<Restaurant> = this._restaurant.asObservable();

    constructor(
        private http: VegerunHttp,
        private sessionService: SessionService)
    {
        sessionService.userData$.subscribe(
            userData => {
                if (userData) {
                    this.startPolling(userData);
                } else {
                    this.endPolling();
                }
            }
        )
    }

    private startPolling(userData: LoginResult) {
        let restaurantObs = this.http.get(`/restaurants/get/${userData.restaurant_id}`)
            .map(r => r.json() as Restaurant); 

        this._restaurantPollingSub = restaurantObs
            .expand(
                () => Observable
                    .timer(RestaurantPollingIntervalMinutes * 60 * 1000)
                    .concatMap<Restaurant>(() => restaurantObs)
            )
            .subscribe(r => {
                if (this._restaurantPollingSub) {
                    console.log(`Restaurant updated: ${r.name}`);
                    this._restaurant.next(r);
                }
            })
    }

    private endPolling() {
        if (this._restaurantPollingSub) {
            this._restaurantPollingSub.unsubscribe();
            this._restaurantPollingSub = null;
            this._restaurant.next(null);
        }
    }
}