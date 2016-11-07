import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Firebase from 'firebase';

import { FirebaseHost } from './config/firebase.config';
import { SessionService } from './session.service';

export interface IFirebaseWorkerFactory {
    createFirebaseWorker(path: string) : Observable<FirebaseWorker>;
}

@Injectable()
export class FirebaseWorkerFactory implements IFirebaseWorkerFactory {

    private _firebaseRootRef: Firebase;
    private _firebaseAuthenticated$: Observable<FirebaseAuthData>;

    constructor(private session: SessionService) {
        this._firebaseRootRef = new Firebase(FirebaseHost);

        let authPromise = this._firebaseRootRef.authWithCustomToken(this.session.userData.firebase_access_token);
        this._firebaseAuthenticated$ = Observable.fromPromise(authPromise);
    }

    createFirebaseWorker(path: string) : Observable<FirebaseWorker> {
        let ref = this._firebaseRootRef.child(path);
        return this._firebaseAuthenticated$
            .map(auth => {
                return new FirebaseWorker(ref)
            });
    }

    createFirebaseWorkerValue(path: string): Observable<FirebaseDataSnapshot> {
        return this.createFirebaseWorker(path)
            .switchMap(fw => fw.value$);
    }
}

export class FirebaseWorker {

    public value$: Observable<FirebaseDataSnapshot> = null;

    constructor(private ref: Firebase) {
        this.value$ = 
            Observable.create(observer => {
                ref.on(
                    'value',
                    snapshot => observer.next(snapshot.val()),
                    error => observer.error(error))
                })
            .catch(err => {
                console.log(err);
                return Observable.empty();
            })
    }
}