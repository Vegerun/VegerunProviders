import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ApiTokenUri } from './config/server.config';
import { LoginRequest } from './models/login-request.model';

@Injectable()
export class SessionService {

    public userData: LoginResult = null;

    private error: any = null;

    constructor(private http: Http) { }

    login(request: LoginRequest) : Promise<LoginResult> {
        let userDataPromise = this.http.post(ApiTokenUri, request)
            .map(r => r.json() as LoginResult)
            .toPromise();

        userDataPromise.then(
            data => this.userData = data,
            error => this.error = error
        );

        return userDataPromise;
    }

    isLoggedIn() {
        return this.userData !== null;
    }
}

export interface LoginResult {
    access_token: string,
    restaurant_id: string
}