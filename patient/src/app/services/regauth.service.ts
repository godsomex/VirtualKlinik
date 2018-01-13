import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class RegauthService {

domain = 'http://localhost:9000';
authenticationToken;
user;
options;

  constructor(
    private http: Http
  ) { }


  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authenticationToken // Attach token
      })
    });
  }

  loadToken() {
    this.authenticationToken = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
  }

signupUser(user) {
  return this.http.post(this.domain + '/registration/register', user).map(res => res.json());
}
  login(user) {
    return this.http.post(this.domain + '/registration/login', user).map(res => res.json());
  }

  // Function to logout
  logout() {
    this.authenticationToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  browserUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify('user'));
    this.authenticationToken = token;
    this.user = user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/registration/profile', this.options).map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired();
  }

}

