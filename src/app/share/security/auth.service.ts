import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {Subject} from "rxjs/Subject";
import {AuthInfo} from "./auth-info";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor (private auth: AngularFireAuth) { }

  login (email, password): Observable<any> {
    return this.fromFirebaseAuthPromise(this.auth.auth.signInWithEmailAndPassword(email, password));
  }

  logout () {
    this.auth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
  }

  signUp (email, password) {
    return this.fromFirebaseAuthPromise(this.auth.auth.createUserWithEmailAndPassword(email, password));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {

    const subject = new Subject<any>();
    promise
      .then(
        res => {
          const vm = this;
          this.auth.auth.onAuthStateChanged(function (user) {
            if (user) {
              const authInfo = new AuthInfo(user.uid);
              vm.authInfo$.next(authInfo);
            }
          });
          subject.next(res);
          subject.complete();
        },
        err => {
          this.authInfo$.error(err);
          subject.next(err);
          subject.complete();
        }
      );
    return subject.asObservable();
  }
}
