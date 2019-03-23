import { Message } from './../../models/message';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { UsersService } from '../../users/services/users.service';

import { User } from '../../users/models/user';

interface Response {
  status: boolean;
  data?: any;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];

  constructor(private usersService: UsersService) {
    this.users = this.usersService.users;
  }

  get authenticated(): Observable<boolean> {
    return new Observable((observer) => {
      this.getUser().subscribe((response) => {
        if (response.status) {
          if (
            response.data &&
            (response.data.blocked || response.data.deleted)
          ) {
            observer.next(false);
            observer.complete();
          } else {
            observer.next(true);
            observer.complete();
          }
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  getUser(): Observable<Response> {
    return new Observable((observer) => {
      chrome.storage.local.get('authenticated-email', (result) => {
        const results = _.filter(this.users, function(item) {
          return item.email.indexOf(result['authenticated-email']) > -1;
        });

        observer.next({
          status: !!results[0],
          data: results[0]
        });
      });
    });
  }

  emailSignIn(email: string, passowrd: string): Observable<Response> {
    const results = _.filter(this.users, function(item) {
      return item.email.indexOf(email) > -1;
    });
    return new Observable((observer) => {
      if (
        results.length > 0 &&
        !results[0].blocked &&
        !results[0].deleted &&
        results[0].emailVerified
      ) {
        chrome.storage.local.set({ 'authenticated-email': email });

        observer.next({
          status: true
        });
      } else if (results[0].deleted) {
        chrome.storage.local.set({ 'authenticated-email': email });

        observer.next({
          status: false,
          error: {
            code: 'user-deleted',
            message: 'User Deleted'
          }
        });
      } else if (results[0].blocked) {
        observer.next({
          status: false,
          error: {
            code: 'user-blocked',
            message: 'User blocked'
          }
        });
      } else if (!results[0].emailVerified) {
        observer.next({
          status: false,
          error: {
            code: 'email-not-verified',
            message: 'Email not verified'
          }
        });
      } else {
        observer.next({
          status: false,
          error: {
            code: 'user-not-found',
            message: 'User not found'
          }
        });
      }
      observer.complete();
    });
  }

  emailSignUp(email: string, passowrd: string): Observable<Response> {
    const results = _.filter(this.users, function(item) {
      return item.email.indexOf(email) > -1;
    });
    return new Observable((observer) => {
      if (results.length <= 0) {
        this.emailSignIn(email, passowrd).subscribe((response) => {
          if (response.status) {
            observer.next({
              status: true
            });
          }
        });
      } else {
        observer.next({
          status: false,
          error: 'User exist'
        });
      }
      observer.complete();
    });
  }

  recoveryPassword(email: string): Observable<Response> {
    return new Observable((observer) => {
      observer.next({
        status: true
      });
      observer.complete();
    });
  }

  signOut(): Observable<Response> {
    return new Observable((observer) => {
      chrome.storage.local.remove('authenticated-email');

      observer.next({
        status: true
      });
      observer.complete();
    });
  }
}
