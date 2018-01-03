import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RegauthService {

domain = 'http://localhost:9000';

  constructor(
    private http: Http
  ) { }

signupUser(user) {
  return this.http.post(this.domain + '/registration/register', user).map(res => res.json());
}
}
