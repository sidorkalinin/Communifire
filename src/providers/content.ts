import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { AuthenticationProvider } from './authentication';
import { Platform } from 'ionic-angular';

@Injectable()
export class ContentProvider {

  constructor(
    public http: Http,
    public authenticationProvider: AuthenticationProvider,
    public transfer: FileTransfer,
    private platform: Platform,
  ) { }

  private checkAuthentication(err) {
    if (err.status === 401) {
      this.authenticationProvider.clearUser();
    } else {
      err = err.json();
    }

    return Observable.throw(err || 'Server Error');
  }

  getContentLike(contentId: number, entitytype?: number) {

    if (!entitytype) entitytype = 4;
    let url = `content/${contentId}/likes?entitytype=${entitytype}`;
    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getAccountActivity(page: number) {
    let url = `wall/stream?&setLikeDislikeHTML=false`;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url += `&startPage=${page}&pageLength=20`;
    } else {
      url += `&startPage=${page}&pageLength=10`;
    }

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getUserActivity(userid: number, page: number) {
    let url = `wall/stream?userid=${userid}&setLikeDislikeHTML=false`
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url += `&startPage=${page}&pageLength=20`
    } else {
      url += `&startPage=${page}&pageLength=10`
    }
    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getUserNotification(page: number) {
    let url;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url = `notifications?startpage=${page}&pagelength=20`;
    } else {
      url = `notifications?startpage=${page}&pagelength=20`;
    }

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getUserTicker(page: number) {
    let url;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url = `wall/ticker?startpage=${page}&pagelength=20`;
    } else {
      url = `wall/ticker?startpage=${page}&pagelength=20`;
    }

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getContentByID(contentid) {
    // Increase view number.
    let url2 = `content/${contentid}/views`;
    this.http
      .post(url2, {})
      .catch(err => {
        console.log(err);
        return this.checkAuthentication(err);
      })

    // Get content detail.
    let url = `content/${contentid}`
    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getActivitiesForMySpace(page: number = 1) {
    let url;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url = `content/list?pagelength=20&startpage=${page}&forMySpaces=true`;
    } else {
      url = `content/list?pagelength=15&startpage=${page}&forMySpaces=true`;
    }

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getContentBySpace(spaceId: number, page: number, length: number) {
    return this.http
      .get(`content/list?spaceid=${spaceId}&SortColumn=3&SortOrder=1&StartPage=${page}&PageLength=${length}`)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getContentByEntity(options) {
    let url;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url = `?entitytype=${options.EntityType}&SortColumn=3&SortOrder=1&StartPage=${options.page}&PageLength=20`;
    } else {
      url = `?entitytype=${options.EntityType}&SortColumn=3&SortOrder=1&StartPage=${options.page}&PageLength=10`;
    }
    if (options.SpaceID != undefined) {
      url += `&spaceid=${options.SpaceID}`;
    }
    if (!options.SpaceID && !options.UserID) {
      url += `&spaceid=0`;
    }
    if (options.UserID) {
      url += `&userid=${options.UserID}`;
    }
    if (options.ParentID) {
      url += `&ParentContentID=${options.ParentID}`
    }
    if (options.IsUnanswered != null) {
      url += `&IsUnanswered=${options.IsUnanswered}`;
    }
    console.log(options);
    console.log(url);
    return this.http
      .get(`content/list` + url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getPhotosByParent(parentId) {
    return this.http
      .get(`content/list?entitytype=6&ParentContentID=${parentId}`)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getCases(options, page, length) {
    let url = ``;
    console.log(options);
    if (options.SpaceID) {
      url += `?spaceid=${options.SpaceID}`;
    }
    if (options.SpaceID == 0) {
      url += `?spaceid=0`;
    }
    if (options.UserID) {
      url += `?reportedByUserID=${options.UserID}`;
    }
    if (options.keyword) {
      url += `&keyword=${options.keyword}`
    }
    if (options.statusId) {
      url += `&issueStatusID=${options.statusId}`
    }
    if (options.projectId) {
      url += `&projectID=${options.projectId}`;
    }

    if (options.categoryId) {
      url += `&categoryID=${options.categoryId}`;
    }

    if (options.milestoneId) {
      url += `&milestoneID=${options.milestoneId}`;
    }

    if (options.priorityId) {
      url += `&priorityID=${options.priorityId}`;
    }
    if (options.reportedByUserID) {
      url += `&reportedByUserID=${options.reportedByUserID}`
    }
    if (options.assignedToUserID) {
      url += `&assignedToUserID=${options.assignedToUserID}`
    }
    url += `&StartPage=${page}&PageLength=${length}`;
    console.log(url);
    return this.http
      .get(`cases` + url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getCase(id) {
    return this.http
      .get(`cases/${id}`)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getEventByID(eventId) {
    let url = `events/${eventId}`;

    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  createWallPost(ToUserID, SpaceID, content) {
    let url = `wall`;

    let data = {
      'WallText': content
    }

    if (ToUserID) {
      data['ToUserId'] = ToUserID;
    }

    if (SpaceID) {
      data['SpaceID'] = SpaceID;
    } else {
      data['SpaceID'] = 0;
    }

    console.log(data);

    return this.http.post(url, data).catch(error => {
      return this.checkAuthentication(error);
    });

  }

  getContentComments(id: number, page: number) {
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      return this.http.get(`comments?entityid=${id}&startpage=${page}&pagelength=20&SortOrder=0`).catch(error => {
        return this.checkAuthentication(error);
      });
    } else {
      return this.http.get(`comments?entityid=${id}&startpage=${page}&pagelength=10&SortOrder=0`).catch(error => {
        return this.checkAuthentication(error);
      });
    }
  }

  getCaseComments(id: number) {
    return this.http.get(`case/comments?caseid=${id}`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getNestedChildren(arr, parent) {
    var out = [];
    for (let i in arr) {
      if (arr[i].ParentCommentID == parent) {
        var children = [];
        if (arr[i].children) {
          children = arr[i].children;
        }
        children = children.concat(this.getNestedChildren(arr, arr[i].CommentID));

        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i]);
      }
    }
    return out;
  }

  createComment(data: any) {
    if (data.EntityType === 10) {
      let newData = {
        CommentText: data.CommentText,
        WallID: data.EntityID
      }
      return this.http.post(`wall/comment`, newData).catch(error => {
        return this.checkAuthentication(error);
      });
    }
    return this.http.post(`comments`, data).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  postLike(contentID: number, entitytype?: number) {
    if (!entitytype) entitytype = 4;
    return this.http.post(`content/${contentID}/likes?entitytype=${entitytype}`, null).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  deleteLike(contentID: number, entitytype?: number) {
    if (!entitytype) entitytype = 4;
    return this.http.delete(`content/${contentID}/likes?entitytype=${entitytype}`, null).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  setEventStatus(eventId, userId, rsvpStatus) {
    //return this.http.put(`events/${eventId}/rsvp/status?userid=${userId}`, rsvpStatus).catch(error => {
    return this.http.put(`events/${eventId}/rsvp/me/status`, rsvpStatus).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getEventStatus(eventId) {
    return this.http.get(`events/${eventId}/rsvp/me/status`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  ideaVoteUp(id) {
    return this.http.post(`content/${id}/voteup`, null).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  ideaVoteDown(id) {
    return this.http.post(`content/${id}/votedown`, null).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  createCaseComment(commentText: string, issueID: number, isInternal?: boolean, parentCommentID?: number) {
    let data = {
      CommentText: commentText,
      IssueID: issueID
    }
    return this.http.post(`case/comments`, data).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getCasePermission(spaceId) {
    return this.http.get(`permissions/access?entitytype=19&permissionsCsv=AssignToUser,UpdateIssuePriority,UpdateIssueStatus,AddRecipients,UploadAttachment&spaceID=${spaceId}`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getCasesStatuses(spaceId) {
    return this.http
      .get(`spaces/${spaceId}/cases/statuses`)
      .catch(error => {
        return this.checkAuthentication(error);
      });
  }

  getCasesPriorities(spaceId) {
    return this.http.get(`spaces/${spaceId}/cases/priorities`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getCasesProjects(spaceId) {
    return this.http.get(`spaces/${spaceId}/cases/projects`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getCasesRecipients(spaceId: number, projectId: number) {
    return this.http.get(`spaces/${spaceId}/cases/projects/${projectId}/recipients`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getCasesAssignTo(spaceId: number, projectId: number, page?: number, keyword?: string) {
    let url = `?forAssignToUsersList=true`;
    if (page) {
      if (this.platform.is('ipad') || this.platform.is('tablet')) {
        url += `&pagelength=20&startpage=${page}`;
      } else {
        url += `&pagelength=10&startpage=${page}`;
      }
    }
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return this.http.get(`spaces/${spaceId}/cases/projects/${projectId}/assignto` + url).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getCasesCategories(spaceId: number, projectId: number) {
    return this.http.get(`spaces/${spaceId}/cases/projects/${projectId}/categories`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getCasesMilestones(spaceId: number, projectId: number) {
    return this.http.get(`spaces/${spaceId}/cases/projects/${projectId}/milestones`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  updateCase(caseID: number, data: any) {
    return this.http.put(`cases/${caseID}`, JSON.stringify(data)).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getEvents(page: number, order: number, column: number, dateragne?: number, attendanceType?: number, userid?: number, startdate?: string, enddate?: string) {
    let url;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url = `events?startpage=${page}&pagelength=20&SortColumn=${column}&sortorder=${order}`;
    } else {
      url = `events?startpage=${page}&pagelength=10&SortColumn=${column}&sortorder=${order}`;
    }

    if (dateragne) {
      url += `&daterange=${dateragne}`;
    }
    if (attendanceType) {
      url += `&attendanceType=${attendanceType}`;
    }
    if (userid) {
      url += `&userid=${userid}`;
    }
    if (startdate) {
      url += `&startdate=${startdate}`;
    }
    if (enddate) {
      url += `&enddate=${enddate}`;
    }
    console.log(url);
    return this.http.get(url).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getEventAttendees(eventId: number) {
    return this.http.get(`events/${eventId}/attendees`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  invitePeopleToEvent(eventId: number, data: string) {
    return this.http.put(`events/${eventId}/invitees/members`, data).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getContentList(data: any) {
    let url = `content/list?`;
    if (data.EntityType) {
      url += `EntityType=${data.EntityType}&`;
    }
    if (data.CategoryID) {
      url += `CategoryID=${data.CategoryID}&`;
    }
    if (data.SpaceID) {
      url += `SpaceID=${data.SpaceID}&`;
    }
    if (data.UserID) {
      url += `UserID=${data.UserID}&`;
    }
    if (data.EntityStatus) {
      url += `EntityStatus=${data.EntityStatus}&`;
    }
    if (data.IsFeatured) {
      url += `IsFeatured=${data.IsFeatured}&`;
    }
    if (data.SortColumn) {
      url += `SortColumn=${data.SortColumn}&`;
    }
    if (data.SortOrder) {
      url += `SortOrder=${data.SortOrder}&`;
    }
    if (data.DatePublishedTime) {
      url += `DatePublishedTime=${data.DatePublishedTime}&`;
    }
    if (data.StartPage) {
      url += `StartPage=${data.StartPage}&`;
    }
    if (data.PageLength) {
      url += `PageLength=${data.PageLength}&`;
    }
    if (data.ParentContentID) {
      url += `ParentContentID=${data.ParentContentID}&`;
    }
    return this.http.get(url.substring(0, url.length - 1)).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  createForumTopicComment(data: any) {
    return this.http.post(`content`, data).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getIdeaVote(ideaId: number) {
    return this.http.get(`content/${ideaId}/votes/me`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getWallPost(wallId: number) {
    return this.http.get(`wall/${wallId}`).catch(error => {
      return this.checkAuthentication(error);
    });
  }

  getContentCategories(data: any) {
    let url = 'content/categories?';
    if (data.spaceId != undefined) {
      url += `spaceid=${data.spaceId}&`;
    }
    if (data.entityTypeID != undefined) {
      url += `entitytypeid=${data.entityTypeID}&`;
    }
    if (data.parentCategoryID != undefined) {
      url += `parentcategoryid=${data.parentCategoryID}&`;
    }
    return this.http.get(url.substring(0, url.length - 1)).catch(error => {
      return this.checkAuthentication(error);
    })
  }

  //Get Content Stages
  getContentStages(data) {
    let url = 'content/stages?';
    if (data.spaceId) {
      url += `spaceid=` + data.spaceId;
    }
    return this.http.get(url).catch(error => {
      return this.checkAuthentication(error);
    })
  }

  // Create new Content
  createContent(content) {
    let url = 'content';
    return this.http
      .post(url, content)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  // Update Content
  updateContent(c_id, content) {
    console.log(content);
    let url = 'content' + '/' + c_id;
    return this.http
      .put(url, content)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  //Upload Featured Image
  uploadFeaturedImage(file): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = localStorage.getItem('community_url');
      let apiKey = localStorage.getItem('communifire_token');
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        headers: {
          "Rest-Api-Key": apiKey,
          'Content-Type': 'application/octet-stream',
          'fileName': file.name,
          Connection: "close"
        }
      }

      fileTransfer.upload(file.fullPath, url + `/api/content/${file.contentID}/image`, options)
        .then((data) => {
          console.log(data, 'data');
          resolve();
        }, (err) => {
          console.log(err, 'err');
          //return this.checkAuthentication(err);
          reject();
        })
    })
  }

  uploadAttachFile(item): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = localStorage.getItem('community_url');
      let apiKey = localStorage.getItem('communifire_token');
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        headers: {
          "Rest-Api-Key": apiKey,
          Connection: "close"
        },
        'fileName': item.name,
      }
      console.log(item.fullPath);

      fileTransfer.upload(item.fullPath, url + `/api/content/${item.contentID}/attachments`, options)
        .then((data) => {
          console.log(data, 'data');
          resolve();
        }, (err) => {
          console.log(err, 'err');
          //return this.checkAuthentication(err);
          reject();
        })
    })
  }

  uploadCaseFile(item): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = localStorage.getItem('community_url');
      let apiKey = localStorage.getItem('communifire_token');
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        headers: {
          "Rest-Api-Key": apiKey,
          Connection: "close"
        },
        'fileName': item.name,
      }

      fileTransfer.upload(item.fullPath, url + `/api/cases/${item.contentID}/attachments`, options)
        .then((data) => {
          console.log(data, 'data');
          resolve();
        }, (err) => {
          console.log(err, 'err');
          reject();
          //return this.checkAuthentication(err);
        })
    })
  }

  attachFileToContent(id: number, file: any) {
    let url = localStorage.getItem('community_url');
    let apiKey = localStorage.getItem('communifire_token');
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: file.filename,
      fileName: file.filename,
      chunkedMode: false,
      headers: {
        "Rest-Api-Key": apiKey,
        Connection: "close"
      },
    }


    fileTransfer.upload(file.path, url + `/api/content/${id}/attachments`, options)
      .then((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.log(err, 'err');
      })
  }

  getAttachmentsById(id: number, entityType: number) {
    return this.http.get(`content/${id}/attachments?entitytype=${entityType}`).catch(error => {
      return this.checkAuthentication(error);
    })
  }

  search(keyword, entityId, page, spaceId, userId, parentId = -1) {
    let temp = ``;
    if (spaceId) {
      temp = `&SpaceIDCSV=${spaceId}`;
    }
    if (userId) {
      temp = `&UserIDCSV=${userId}`;
    }
    if (parentId != -1) {
      temp = `&ParentContentID=${parentId}`;
    }
    let url;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url = `search?keyword=${keyword}&EntityTypeCSV=${entityId}&StartPage=${page}&pagelength=20&SortBy=1&isGenericContentSearch=true` + temp;
    } else {
      url = `search?keyword=${keyword}&EntityTypeCSV=${entityId}&StartPage=${page}&pagelength=10&SortBy=1&isGenericContentSearch=true` + temp;
    }
    console.log(url);
    return this.http.get(url).catch(error => {
      return this.checkAuthentication(error);
    })
  }

  searchByKeyword(keyword, page) {
    let url;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url = `search?keyword=${keyword}&StartPage=${page}&pagelength=30`;
    } else {
      url = `search?keyword=${keyword}&StartPage=${page}&pagelength=20`;
    }
    return this.http.get(url).catch(error => {
      return this.checkAuthentication(error);
    })
  }

  searchByParent(keyword, entityId, page, spaceId, parentId) {
    let temp = ``;
    if (spaceId) {
      temp = `&SpaceIDCSV=${spaceId}`;
    }
    if (parentId) {
      temp = `&parentcontentid=${parentId}`;
    }
    let url;
    if (this.platform.is('ipad') || this.platform.is('tablet')) {
      url = `search?keyword=${keyword}&EntityTypeCSV=${entityId}&StartPage=${page}&pagelength=20&SortBy=1&isGenericContentSearch=true` + temp;
    } else {
      url = `search?keyword=${keyword}&EntityTypeCSV=${entityId}&StartPage=${page}&pagelength=10&SortBy=1&isGenericContentSearch=true` + temp;
    }
    console.log(url);
    return this.http.get(url).catch(error => {
      return this.checkAuthentication(error);
    })
  }

  createCase(body) {
    let url = 'cases';
    return this.http
      .post(url, body)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  //Upload Featured Image
  uploadAlbumPhoto(file) {
    let url = localStorage.getItem('community_url');
    let apiKey = localStorage.getItem('communifire_token');
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      headers: {
        "Rest-Api-Key": apiKey,
        //'Content-Type': 'application/octet-stream',
        'fileName': file.name,
        Connection: "close"
      }
    }

    fileTransfer.upload(file.fullPath, url + `/api/albums/${file.contentID}/photos`, options)
      .then((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.log(err, 'err');
        return this.checkAuthentication(err);
      })
  }


  // Get Space Directory
  getDirectories(data: any) {
    let url = 'spaces/' + data.spaceid + '/file/directories/' + data.parentid;
    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  getFiles(data: any) {
    let url = 'directory/' + data.parentid + '/files/list';
    return this.http
      .get(url)
      .catch(err => {
        console.log(err);
        return this.checkAuthentication(err);
      });
  }

  deleteFile(id: any) {
    let url = 'files/' + id;
    return this.http
      .delete(url)
      .catch(err => {
        console.log(err);
        return this.checkAuthentication(err);
      });
  }
  removeDirectory(id: any) {
    let url = 'file/directories/' + id;
    return this.http
      .delete(url)
      .catch(err => {
        console.log(err);
        return this.checkAuthentication(err);
      });
  }

  uploadFileToDirectory(item: any) {
    return new Promise((resolve, reject) => {
      let url = localStorage.getItem('community_url');
      let apiKey = localStorage.getItem('communifire_token');
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        headers: {
          "Rest-Api-Key": apiKey,
          'Content-Type': 'application/octet-stream',
          Connection: "close"
        }
      }

      fileTransfer.upload(item.fullPath, encodeURI(url + `/api/files?filedirectoryid=${item.directoryID}&spaceid=${item.spaceID}&filename=${item.name}`), options)
        .then((data) => {
          resolve(data);
        }, (err) => {
          resolve(err);
        })
    })
  }
  move(contentid: any, parentid: any) {
    let url = 'content/' + contentid + '/move?parentContentID=' + parentid;
    return this.http
      .put(url, {})
      .catch(err => {
        console.log(err);
        return this.checkAuthentication(err);
      })
  }
  updateDirectory(body, id) {
    let url = 'file/directories/' + id;
    return this.http
      .put(url, body)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }
  createDirectory(body) {
    let url = 'file/directories';
    return this.http
      .post(url, body)
      .catch(err => {
        return this.checkAuthentication(err);
      });
  }

  checkPermission(body, permissionsToCheck?: string) {
    let temp = ``;
    if (body.entitytype)
      temp += `?entitytype=${body.entitytype}`;

    if (permissionsToCheck == null) {
      temp += '&permissionsCsv=create,update,delete,AdminEntityUpdate,copy,MarkContentAsReadRequired,MarkAsFeatured,Download,Lock,CreateDirectory';
    }
    else {
      temp += '&permissionsCsv=' + permissionsToCheck;
    }

    if (body.entityid != undefined) {
      temp += `&entityid=${body.entityid}`;
    }
    if (body.spaceid != undefined) {
      temp += `&spaceid=${body.spaceid}`;
    }
    let url = 'permissions/access' + temp;
    console.log(url);
    return this.http
      .get(url)
      .catch(err => {
        return this.checkAuthentication(err);
      })
  }

  createVideo(data: any, file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = localStorage.getItem('community_url');
      let apiKey = localStorage.getItem('communifire_token');
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        headers: {
          "Rest-Api-Key": apiKey,
          Connection: "close"
        },
        fileKey: "file",
        fileName: file.filename + '.mp4',
        params: data,
        mimeType: 'video/mp4'
      }

      let onSuccess = function (result) { resolve(result); }
      let onError = function (error) { reject(error) }

      fileTransfer.upload(file.path, url + `/api/videos`, options)
        .then((data) => {
          onSuccess(data);
        }, (err) => {
          onError(err);
        })
    })
  }
}
