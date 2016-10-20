import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { ApiRoot } from './config/server.config';
import { SessionService } from './session.service';
import { MenuItem } from './models/menu-item.model';

@Injectable()
export class MenuService {

    constructor(
        private http: Http,
        private session: SessionService) { }

    public findAllItems() : Observable<MenuItem[]> {
        let userData = this.session.userData;

        let options = new RequestOptions({
            headers: new Headers({
                'Authorization': `Bearer ${userData.access_token}`
            })
        });

        let url = `${ApiRoot}/menus/list-items/${userData.restaurant_id}`;

        return this.http.get(url, options)
            .map(r => r.json() as MenuItem[]);
    }

    public disableItem(menuItem: MenuItem) {
        return this.setItemEnabled(menuItem, false);
    }

    public enableItem(menuItem: MenuItem) {
        return this.setItemEnabled(menuItem, true);
    }


    private setItemEnabled(menuItem: MenuItem, enabledValue: boolean) {

    }
}

export interface LoginResult {
    access_token: string,
    restaurant_id: string
}