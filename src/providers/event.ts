import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { AuthenticationProvider } from './authentication';

@Injectable()
export class EventProvider {

  constructor(
    public http: Http,
    public authenticationProvider: AuthenticationProvider,
  ) { }

  private checkAuthentication (err) {
    if (err.status === 401) {
      this.authenticationProvider.clearUser();
    } else {
      err = err.json();
    }

    return Observable.throw(err || 'Server Error');
  }

  getEventByID(eventId) {
    let url =`events/${eventId}`;

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getEventTypes(spaceid){
    let url = 'events/types?';
    if(spaceid){
      url += `spaceid=`+spaceid;
    }
    return this.http.get(url).catch(error =>{
      return this.checkAuthentication(error);
    })
  }

  getEventResources(body){
    let url = 'events/resources';
    if(body.spaceid){
      url += '?spaceID='+body.spaceid;
    }
    return this.http.get(url).catch(err=>{
      return this.checkAuthentication(err);
    })
  }

  crateEvent(body){
    let url = 'events';
    return this.http
    .post(url, body)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }
  updateEvent(e_id, body){
    let url = 'events/'+e_id;
    return this.http
    .put(url, body)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }
  createNewEventType(body){
    let url = 'eventtypes';
    return this.http
    .post(url, body)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }

  getCountries(){
    let url = 'countries';
    return this.http
    .get(url)
    .catch(err => {
      return this.checkAuthentication(err);
    })
  }
  getStates(id){
    let url = 'states?countryid='+id;
    return this.http
    .get(url)
    .catch(err =>{
      return this.checkAuthentication(err);
    })
  }

  addAlert(body){
    let url = 'events/reminder';
    return this.http
    .put(url, body)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }    
}
