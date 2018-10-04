import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

import { AuthenticationProvider } from './authentication';

/**
 * PeopleProvider
 * Provider is responsible for
 * fetching Community People Details
 * Dependency: Http
 */

@Injectable()
export class PeopleProvider {

  constructor(
    public http: Http,
    public authenticationProvider: AuthenticationProvider
  ) { }

  private checkAuthentication (err) {
    if (err.status === 401) {
      this.authenticationProvider.clearUser();
    } else {
      err = err.json();
    }

    return Observable.throw(err || 'Server Error');
  }

  /**
   * Get all people
   * @param searchText Search string for user
   */
  getPeople (searchText?: string, page?: number) {
    let url = 'users';
    if (searchText) {
      url += `?username=${searchText}`;
    } else {
      url += `?sortorder=0&startpage=${page}&pagelength=15`
    }

    return this.http.get(url).catch(err => {
      return this.checkAuthentication(err);
    });;
  }

  /**
   * Get all people
   * @param spaceId id of Space
   * @param searchText Search string for user
   * @param page page number
   */
  getSpaceMembers (spaceId: number, searchText?: string, page?: number) {
    console.log(searchText, page);
    let url = `spaces/${spaceId}/members`;
    if (searchText) {
      url += `?username=${searchText}`;
    } else {
      url += `?startpage=${page}&pagelength=15`
    }

    return this.http.get(url).catch(err => {
      return this.checkAuthentication(err);
    });;
  }

  /**
   * Get details of a single person
   * @param userID User id of the person
   */
  getUser(userID) {
    const fieldsToFetch = ['UserID', 'ProfilePhoto', 'Department', 'Email', 'Phone', 'Bio', 'Interests', 'CoverPhoto', 'FirstName', 'LastName', 'UserInfoDisplayName', 'Company', 'State', 'City'];
    let url = `content/${userID}?contenttypeid=15&fields=${fieldsToFetch.join()}`;
    // let url = `/api/users/{userid}/details`;

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  /**
   * Get details of a single person
   * @param userID User id of the person
   */
  getUserDetail(userID) {
    let url = `users/${userID}/details`;

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  /**
   * get activity of a person
   * TODO: Implement infinite scroll
   * @param userid User id of the person
   */
  getUserActivity(userid: number, page?: number) {
    let url =`wall/stream/?userid=${userid}`;
    url += `&sortorder=0&startpage=${page}&pagelength=10`;

    return this.http
    .get(url)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }

  getUserConnections(userID) {
    return this.http
      .get(`users/${userID}/friends?isconfirmed=true`)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }
  getFriends(userID, page, pagelength) {
    return this.http
      .get(`users/${userID}/friends?isconfirmed=true&page=${page}&pagelength=${pagelength}`)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }
  getRequests(userID, page, pagelength) {
    return this.http
      .get(`users/${userID}/friends?isConfirmed=false&page=${page}&pagelength=${pagelength}&includeListHTML=false`)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }
  aproveFriend(userid, connectionuserid) {
    return this.http
      .put(`users/connections?userid=${userid}&connectionuserid=${connectionuserid}`, {})
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }
  declineFriend(userid, connectionuserid) {
    return this.http
      .delete(`users/connections?userid=${userid}&connectionuserid=${connectionuserid}`)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }
}
