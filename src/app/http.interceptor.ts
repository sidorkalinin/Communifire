import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http,
  Headers,
  XHRBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptedHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).map(res => {
      if (!res.url.includes('assets/i18n')) {
        return res.json();
      }
      return res;
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    console.log('Requested URL for GET: ' + url);
    return super.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    // console.log
    return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.delete(url, this.getRequestOptionArgs(options));
  }

  private updateUrl(req: string) {
    const endpoint = localStorage.getItem('community_url') ? localStorage.getItem('community_url') : '';

    // endpoint check
    if (req === '/ping-do-not-delete.ico') {
      return endpoint + req;
    }

    // translate files skip 
    if (req.indexOf('/assets/i18n/') !== -1) {
      return req;
    }

    // console.log('Orignal Requested url: ' + req);

    // If the url already contains http or https then do not assume that it is API url (i.e add "api" to it) and simply use the original url
    var url: string;
    if (req.indexOf('http://') === -1 && req.indexOf('https://') === -1) {
      url = endpoint + '/api/' + req;
    }
    else {
      url = req;
    }

    // console.log('Requested url: ' + url);
    return url;
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Rest-Api-Key', localStorage.getItem('communifire_token'));
    // console.log(localStorage.getItem('communifire_token'));
    if (this.isAdEnabled()) {

      // For AD we need to send these credentials in "Authorization Header" so that it can be used by 
      // Domain controller to authenticate this user. This authorization header will be sent with each request.

      // console.log("Ad Enabled, Sending Basic Authorization Header.");
      var username = localStorage.getItem('username'),
        password = localStorage.getItem('password'),
        combination = username + ":" + password,
        authHeader = 'Basic ' + btoa(combination);
      // console.log(authHeader);
      options.headers.append('Authorization', authHeader);
    }
    return options;
  }

  private isAdEnabled() {
    if (localStorage.getItem('adenabled') != null) {
      return true;
    }
    else {
      return false;
    }
  }
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new InterceptedHttp(xhrBackend, requestOptions);
}