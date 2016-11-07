import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ApiRoot } from './../config/server.config';
import { LoginRequest } from './models/login-request.model';

@Injectable()
export class SessionService {

    public userData: LoginResult = null;

    private error: any = null;


    private _userDataSub: BehaviorSubject<LoginResult> = new BehaviorSubject(null);
    public userData$: Observable<LoginResult> = this._userDataSub.asObservable();

    constructor(private http: Http) { }

    login(request: LoginRequest) : Promise<LoginResult> {
        let userDataObs = this.http.post(`${ApiRoot}/token`, request)
            .map(r => r.json() as LoginResult)
            .share();

        userDataObs.subscribe(
            res => {
                this.userData = res;
                this._userDataSub.next(res);
            },
            error => this.error = error);

        return userDataObs.toPromise();
    }

    isLoggedIn() {
        return this.userData !== null;
    }
}

export interface LoginResult {
    access_token: string,
    restaurant_id: string,
    firebase_access_token: string
}