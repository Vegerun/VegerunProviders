import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ApiRoot } from './../config/server.config';
import { SessionService } from './../services/session.service';

@Injectable()
export class VegerunHttp {

    constructor(
        private http: Http,
        private sessionService: SessionService) { }

    get(path: string, options?: VegerunHttpOptions) : Observable<Response> {
        return this.http.get(this.getUrl(path), this.getRequestOptions(options));
    } 

    post(path: string, body: any, options?: VegerunHttpOptions) : Observable<Response> {
        return this.http.post(this.getUrl(path), body, this.getRequestOptions(options));
    }

    private getUrl(path: string) : string {
        return ApiRoot + path;
    }

    private getRequestOptions(options?: VegerunHttpOptions) : RequestOptions {
        if (!options) {
            options = new VegerunHttpOptions();
        }

        let requestOptions = new RequestOptions();
        if (options.requireAuth) {
            if (!this.sessionService.isLoggedIn()) {
                throw new Error('Request to Vegerun API required authentication but user not logged in');
            }

            let userData = this.sessionService.userData
            requestOptions.headers = new Headers({
                'Authorization': `Bearer ${userData.access_token}`
            });
        }
        return requestOptions;
    }
}

export class VegerunHttpOptions {
    requireAuth: boolean = true;
}