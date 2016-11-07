import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestaurantService } from './restaurant.service';

import { Location } from './models/location.model';

@Injectable()
export class LocationService {

    public location: Observable<Location>;

    constructor(
        private restaurantService: RestaurantService)
    {
        this.location = this.restaurantService.restaurant.map(r => r.town);
    }
}
