import { Pipe, PipeTransform } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { AuthenticationProvider } from '../../providers/authentication';
import 'rxjs/add/observable/of';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {
  // This pipe is being used for AD to pass Auhthorization header to server to overcome 401 response for images.
  // For non-AD requests, this pipe will simply return the original URL.

  constructor(private http: Http, private sanitizer: DomSanitizer, private authenticationProvider: AuthenticationProvider) { }

  transform(url): Observable<SafeUrl> {

    // If AD is enabled then we need to pass the image through HTTP module
    // so that we can send Authorization headers with it.
    if (this.authenticationProvider.isAdEnabled()) {
      return this.http
        .get(url, { responseType: ResponseContentType.Blob })
        .catch(err => Observable.throw(err))
        .map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)));
    }
    else {
      // Bypass the url as it is for non-AD case.

      // console.log('Without AD image');
      return Observable.of(url);

    }
  }
}