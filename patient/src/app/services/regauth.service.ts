import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RegauthService {

domain = 'http://localhost:9000';
authenticationToken;
user;

  constructor(
    private http: Http
  ) { }

signupUser(user) {
  return this.http.post(this.domain + '/registration/register', user).map(res => res.json());
}
  login(user) {
    return this.http.post(this.domain + '/registration/login', user).map(res => res.json());
  }
  browserUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify('user'));
    this.authenticationToken = token;
    this.user = user;
  }
}
