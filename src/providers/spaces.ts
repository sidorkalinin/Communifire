import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { AuthenticationProvider } from './authentication';

@Injectable()
export class SpacesProvider {

  constructor(
    public http: Http,
    public authenticationProvider: AuthenticationProvider,
    public transfer: FileTransfer
  ) { }

  private checkAuthentication (err) {
    if (err.status === 401) {
      this.authenticationProvider.clearUser();
    } else {
      if (err.json()){
        err = err.json();
      }
    }

    return Observable.throw(err || 'Server Error');
  }

  /**
   * Get Spaces by status.
   * Default will return 'Published'
   * @param status Status Of Space
   * Status:
   * PendingWorkflow = 0
   * Published = 1
   * Declined = 3
   * All = 7
   */
  getSpaces(status: number = 1) {
    return this.http
      .get(`spaces?status=${status}`)
      .map((response: any) => response.ResponseData)
      .catch(err => {
        return this.checkAuthentication(err);
      });
    }

  getSpace(id: number) {
    return this.http
      .get(`spaces/${id}`)
      .map((response: any) => response.ResponseData)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  /**
   * 
   * @param spaces Get User Spaces
   */
  getMySpaces() {
    return this.http
      .get('users/me/spaces')
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  /**
   * Get users in a Space
   * @param spaceid Space Id
   */
  getSpaceUsers(spaceid: number, page: number, length: number) {
    return this.http
    .get(`spaces/${spaceid}/users?startPage=${page}&pageLength=${length}`)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }

  getSpaceRequests(spaceid: number, page: number, length: number) {
    return this.http
    .get(`spaces/${spaceid}/users?spaceid=${spaceid}&spaceUserMembershipStatus=0`)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }

  /**
   * Get space activities
   * @param spaceID Space Id
   */
  getSpaceActivity(spaceID: number, page: number = 1) {
    let url=`wall/stream?spaceid=${spaceID}`;
    url += `&sortorder=0&startpage=${page}&pagelength=10`;

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getFolderList(spaceID: number){
    let url = `spaces/${spaceID}/directories?checkCreatePermission=true`;
    return this.http
    .get(url)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }

  attachFileToWall(item, spaceId, directoryId, wallId){
    let url = localStorage.getItem('community_url');
    let apiKey = localStorage.getItem('communifire_token');
    const fileTransfer: FileTransferObject = this.transfer.create();

    if (!item.fullPath){
      let temp = item;
      let array = temp.split("/");
      let extention = array[array.length - 1].split(".");
      extention = extention[extention.length - 1];
      console.log(name, "name");
      item = {
        fullPath: temp,
        name: new Date().getTime() + "." + extention,
        lastModifiedDate: array[array.length - 1]
      }
      console.log(item);
    }
    
    let options: FileUploadOptions = {
      fileKey: item.lastModifiedDate,
      fileName: item.name,
      chunkedMode: false,
      headers: {
        "Rest-Api-Key": apiKey,
        Connection: "close"
      }
    }
  
    fileTransfer.upload(item.fullPath, url + `/api/spaces/${spaceId}/wall/${wallId}/files?directoryid=${directoryId}`, options)
      .then((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.log(err, 'err');
      })
  }

  attachFileToCaseComment(item, caseId, commentId, spaceId){
    let url = localStorage.getItem('community_url');
    let apiKey = localStorage.getItem('communifire_token'); 
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: item.filename,
      fileName: item.filename,
      chunkedMode: false,
      headers: {
        "Rest-Api-Key": apiKey,
        Connection: "close"
      }
    }
  
    fileTransfer.upload(item.path, url + `/api/cases/${caseId}/comments/${commentId}/attachments?spaceid=${spaceId}`, options)
      .then((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.log(err, 'err');
      })
  }

  checkEntities(spaceId: number, string: string){
    let url = `spaces/${spaceId}/entityaccess?entityCsv=${string}`;
    return this.http
    .get(url)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }

  createSpace(body){
    let url = 'spaces';
    return this.http
    .post(url, body)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }
  setMemberShip(spaceID, userID, body) {
    let url = 'spaces/'+spaceID+'/users/'+userID+'/membership/status';
    return this.http
    .put(url, body)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }
  setMember(spaceID, body) {
    let url = 'spaces/'+spaceID+'/users';
    return this.http
    .post(url, body)
    .catch(err => {
      return this.checkAuthentication(err);
    });
  }
  getAnnouncements(spaceID) {
    let url = 'announcements?spaceid='+spaceID;
    console.log(url);
    return this.http
    .get(url)
    .catch(err => {
      return this.checkAuthentication(err);
    })
  }
}
