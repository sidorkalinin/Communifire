import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { empty } from "rxjs/observable/empty";

export interface LOGIN {
  UserName: string;
  Password: string;
}

@Injectable()
export class AuthenticationProvider {
  private user: BehaviorSubject<any> = new BehaviorSubject(null);
  user$ = this.user.asObservable();

  constructor(public http: Http, private platform: Platform) { }

  login(data: LOGIN) {
    return this.http.put('users/token', data)
      .catch(err => Observable.throw(err));
  }

  getSAMLDetails() {
    return this.http.get('saml/details')
      .catch(err => Observable.throw(err));
  }

  getMyDetails() {
    return this.http.get('users/me')
      .catch(err => Observable.throw(err));
  }

  getUserDetails() {
    var userDetails = localStorage.getItem('userDetails');
    if (userDetails != null) {
      return JSON.parse(userDetails);
    }
    return null;
  }

  getMyAvatarImageURL() {
    var userDetails = this.getUserDetails();
    return userDetails.AvatarImageURL;
  }

  setUser(response) {
    this.user.next(response);
    if (response != null) {
      localStorage.setItem('userDetails', JSON.stringify(response));
    }
  }
  clearUser() {
    console.log('Clearing up the user on logout');

    var deviceToken = this.getDeviceToken();

    this.removeDeviceTokenFromServer(deviceToken).subscribe(
      resp => {
        console.log('Device token removed from server: ', deviceToken)
      },
      error => console.log('Error occured while removing device token from server: ', deviceToken)
    );

    this.removeToken();
    this.removeAdEnabled();
    this.user.next(null);
  }

  setToken(token) {
    localStorage.setItem('communifire_token', token);
  }

  getToken() {
    return localStorage.getItem('communifire_token') ? localStorage.getItem('communifire_token') : null;
  }

  removeToken() {
    return localStorage.removeItem('communifire_token') ? true : false;
  }

  removeDeviceTokenFromServerAndDevice(deviceToken: string) {

    this.removeDeviceTokenFromServer(deviceToken).subscribe(
      resp => {
        localStorage.removeItem('device_token') ? true : false;
        console.log('Device token removed device token from server: ', deviceToken)
      },
      error => console.log('Error occured while removing device token from server: ', deviceToken)
    );
  }

  isPushNotificationEnabled() {
    return localStorage.getItem('device_token') != null;
  }

  getDeviceToken() {
    return localStorage.getItem('device_token') ? localStorage.getItem('device_token') : null;
  }

  setDeviceToken(deviceToken: string) {
    console.log('Storing device token to local storage: ', deviceToken);
    localStorage.setItem('device_token', deviceToken);
  }

  isPushNotificationOff() {
    if (localStorage.getItem('push_notification_off') == null) {
      return false;
    }
    else {
      return true;
    }
  }

  setPushNotificationsOff() {
    localStorage.setItem('push_notification_off', "1");
  }

  setPushNotificationsOn() {
    localStorage.removeItem('push_notification_off');
  }

  sendDeviceTokenToServer(deviceToken: string) {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    // Wrap the device token with double quotes so that it can be passed as single parameter in request body
    // Reference: http://jasonwatmore.com/post/2014/04/18/post-a-simple-string-value-from-angularjs-to-net-web-api
    deviceToken = '"' + deviceToken + '"';
    console.log('Sending device token to server: ' + deviceToken);

    return this.http.post(this.getUrlToSendDeviceTokenToServer(), deviceToken)
      .catch(err => Observable.throw(err));
  }

  getUrlToSendDeviceTokenToServer() {
    if (this.platform.is('ios')) {
      return 'users/me/devicetokens/ios';
    }
    else if (this.platform.is('android')) {
      return 'users/me/devicetokens/android';
    }
  }

  removeDeviceTokenFromServer(deviceToken: string) {
    if (!this.platform.is('cordova')) {
      return empty();
    }
    console.log('Removing device token from server: ', deviceToken);
    var url = 'users/me/devicetokens?deviceToken=' + deviceToken + '&Rest-Api-Key=' + this.getToken();

    // console.log('Url to hit for removing device token from server: ', url);

    return this.http.delete(url)
      .catch(err => Observable.throw(err));
  }

  setUserName(username) {
    localStorage.setItem('username', username);
  }

  setPassword(password) {
    localStorage.setItem('password', password);
  }

  getUserName() {
    return localStorage.getItem('username') ? localStorage.getItem('username') : null;
  }

  getPassword() {
    return localStorage.getItem('password') ? localStorage.getItem('password') : null;
  }

  setADEnabled() {
    // Adds the AD enables status from local storage.
    console.log('Setting AD Enabled status to true');
    localStorage.setItem('adenabled', "1");
    console.log('Getting AD Enabled status: ' + localStorage.getItem('adenabled'));
  }

  removeAdEnabled() {
    // Removes the AD enables status from local storage.
    return localStorage.removeItem('adenabled') ? true : false;
  }

  isAdEnabled() {
    if (localStorage.getItem('adenabled') != null) {
      return true;
    }
    else {
      return false;
    }
  }

}
