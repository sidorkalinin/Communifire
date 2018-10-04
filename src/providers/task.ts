import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationProvider } from './authentication';

@Injectable()
export class TaskProvider {

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

  getList(spaceid){
    let url = 'lists?spaceid='+spaceid;
    return this.http
    .get(url)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }
  getTasks(listid){
    let url = 'lists/'+listid+'/tasks'
    return this.http
    .get(url)
    .catch(err =>{
      return this.checkAuthentication(err);
    })
  }
  createList(body){
    let url = 'lists';
    return this.http
    .post(url, body)
    .catch(err =>{
      return this.checkAuthentication(err);
    })
  }
  createTask(body){
    let url = 'tasks';
    return this.http
    .post(url, body)
    .catch(err =>{
      return this.checkAuthentication(err);
    })
  }
}
