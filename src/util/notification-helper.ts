import { Injectable, ViewChild } from "@angular/core";
import { Http } from "@angular/http";
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationProvider } from '../providers/authentication';
import { SpacesProvider } from '../providers/spaces';
import { Subscription } from 'rxjs/Subscription';
import { Nav, Platform, /* AlertController, */ NavController, ToastController } from 'ionic-angular';
import { PAGES } from '../util/constants';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Badge } from "@ionic-native/badge";


@Injectable()
export class NotificationHelper {
    //private alertCtrl: AlertController;
    subs$: Subscription[] = [];
    translationText = ['COMMONS.SUCCESS', 'COMMONS.NEW_NOTIFICATION', 'COMMONS.IGNORE', 'COMMONS.VIEW'];
    pushObject: PushObject;
    nav: Nav;

    constructor(private http: Http,
        private translate: TranslateService,
        private authenticationProvider: AuthenticationProvider,
        private toastCtrl: ToastController,
        private platform: Platform,
        private push: Push,
        private badge: Badge,        
        private spacesProvider: SpacesProvider
    ) {
        /**
         * Get all translations for messages.
         */
        this.translationText.map(translate => {
            this.subs$.push(
                this.translate.get(translate).subscribe((res: string) => {
                    this.translationText[translate] = res;
                })
            );
        });
    }

    private getSpace(id: number) {
        return this.spacesProvider.getSpace(id);
    }

    private redirectUser(notification: any, nav: Nav) {
        // the custom data which comes as a part of notification from Communifire
        // Example of notification: {"additionalData":{"activityAction":"25","foreground":false,"entityID":"7662","entityType":"3","coldstart":false},"message":"Vaishali Agarwal liked your article: Lorem Ipsum is simply dummy text","sound":"default"}
        var additionalData = notification.additionalData;
        var entityID = additionalData.entityID;
        var parentEntityID = additionalData.parentEntityID;
        var spaceID = additionalData.spaceID;
        var entityType = Number(additionalData.entityType);
        var activityAction = Number(additionalData.activityAction);
        var url: string;
        var dataToPush: any;
        var spaceName: string;

        if (!spaceID) {
            spaceID = 0;
        }

        console.log(notification);
        console.log('SpaceID: ' + spaceID);
        console.log('ParentEntityID: ' + parentEntityID);
        console.log('EntityID: ' + entityID);
        console.log('EntityType: ' + entityType);
        if(entityType == 15) {
            var pages;
            switch(activityAction) {
                case 13:
                    pages = [
                        {
                            page: 'page-my-account',
                            params: {
                                type: 'notification'
                            }
                        },
                        {
                            page: 'profile',
                            params: {
                                id: localStorage.getItem('UserID')
                            }
                        },
                        {
                            page: 'manage-friend',
                            params: {
                                isRequest: true
                            }
                        }
                    ];
                    break;
                case 15:
                    pages = [
                        {
                          page: 'page-my-account',
                          params: {
                              type: 'notification'
                          }  
                        },
                        {
                            page: 'page-invite',
                            params: {
                                data: notification
                            }
                        }
                    ];
                    break;
                case 55:
                    pages = [
                        {
                            page: 'page-my-account',
                            params: {
                                type: 'notification'
                            }  
                        },
                        {
                            page: 'manage-user',
                            params: {
                                id: spaceID
                            }
                        }
                    ]
                    break;
            }
            nav.setPages(pages);
        } else if(entityType == 64) {
            pages = [
                {
                    page: "spaces"
                },
                {
                    page: "space-details",
                    params: {
                        id: spaceID
                    }
                },
                {
                    page: 'page-space-announcement',
                    params: {
                        SpaceID: spaceID
                    }
                },
                {
                    page: 'announcement-detail',
                    params: {
                        SpaceID: spaceID,
                        EntityID: entityID
                    }
                }
            ];
            nav.setPages(pages);
        } else if(entityType == 10) {
            pages = [
                {
                  page: 'page-my-account',
                  params: {
                      type: 'notification'
                  }  
                },
                {
                    page: 'wallpost',
                    params: {
                        id: entityID
                    }
                }
            ];
            nav.setPages(pages);
        } else {
            this.getSpace(spaceID).subscribe((res) => {
                spaceName = res.SpaceName;
    
                let pages = [];
    
                switch (entityType) {
                    case 3: // Article 
                        {
                            console.log('Notification for article, articleid: ' + entityID);
                            // url = PAGES.ARTICLE_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "article-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "articles",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 24: // Article Comment
                        {
                            console.log('Notification for article, articleid: ' + parentEntityID + ', commentID: ' + entityID);
                            // url = PAGES.ARTICLE_DETAIL;
                            // dataToPush = {
                            //     id: parentEntityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "article-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "articles",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 4: // Blog
                        {
                            console.log('Notification for blog, blogid: ' + entityID);
                            // url = PAGES.BLOG_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "blog-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "blogs",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 25: // Blog Comment
                        {
                            console.log('Notification for blog, blogid: ' + parentEntityID + ', commentID: ' + entityID);
                            // url = PAGES.BLOG_DETAIL;
                            // dataToPush = {
                            //     id: parentEntityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "blog-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "blogs",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 19: // Issue
                        {
                            console.log('Notification for issue, issueid: ' + entityID);
                            // url = PAGES.ISSUE_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "case-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "cases",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 20: // Issue Comment
                        {
                            console.log('Notification for issue, issueid: ' + parentEntityID + ', commentID: ' + entityID);
                            // url = PAGES.ISSUE_DETAIL;
                            // dataToPush = {
                            //     id: parentEntityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "case-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "cases",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 6: // Photo
                        {
                            console.log('Notification for photo, photoid: ' + entityID);
                            // url = PAGES.PHOTO_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "photo-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "photos",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 27: // Photo Comment
                        {
                            console.log('Notification for photo, photo: ' + parentEntityID + ', commentID: ' + entityID);
                            url = PAGES.PHOTO_DETAIL;
                            dataToPush = {
                                id: parentEntityID
                            };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "photo-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "photos",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 44: // Idea
                        {
                            console.log('Notification for idea, ideaid: ' + entityID);
                            // url = PAGES.IDEA_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "idea-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "ideas",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 45: // Idea Comment
                        {
                            console.log('Notification for idea, idea: ' + parentEntityID + ', commentID: ' + entityID);
                            url = PAGES.IDEA_DETAIL;
                            // dataToPush = {
                            //     id: parentEntityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "idea-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "ideas",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 9: // Wiki
                        {
                            console.log('Notification for wiki, wikiid: ' + entityID);
                            url = PAGES.WIKI_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "wiki-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "wikis",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 31: // Wiki Comment
                        {
                            console.log('Notification for wiki, wikiid: ' + parentEntityID + ', commentID: ' + entityID);
                            url = PAGES.WIKI_DETAIL;
                            // dataToPush = {
                            //     id: parentEntityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "wiki-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "wikis",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 7: // Video
                        {
                            console.log('Notification for video, videoid: ' + entityID);
                            // url = PAGES.VIDEO_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };
    
                            pages = [                            
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "video-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "videos",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 29: // Video Comment
                        {
                            console.log('Notification for video, videoid: ' + parentEntityID + ', commentID: ' + entityID);
                            // url = PAGES.VIDEO_DETAIL;
                            // dataToPush = {
                            //     id: parentEntityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "video-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "videos",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 55: // Discussion
                        {
                            console.log('Notification for discussion, discussionid: ' + entityID);
                            url = PAGES.DISCUSSION_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };
    
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "discussion-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "discussion-item",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];
    
                            break;
                        }
                    case 20: // Discussion Comment
                        {
                            console.log('Notification for discussion, discussionid: ' + entityID);
                            url = PAGES.DISCUSSION_DETAIL;
                            // dataToPush = {
                            //     id: entityID
                            // };

                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "discussion-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "discussion-item",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ];

                            break;
                        }
                    case 14: // File
                        {
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "file-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "files",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ]
                            break;
                        }
                    case 32:  // File Comment
                        {
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "file-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "files",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ]
                            break;
                        }
                    case 18: // Photo
                        {
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "photo-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "photos",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ]
                            break;
                        }
                    case 27: // Photo Comment
                        {
                            pages = [
                                {
                                    page: "spaces"
                                },
                                {
                                    page: "space-details",
                                    params: {
                                        id: spaceID
                                    }
                                },
                                {
                                    page: "photo-list",
                                    params: {
                                        title: spaceName,
                                        SpaceID: spaceID
                                    }
                                },
                                {
                                    page: "photos",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ]
                            break;
                        }
                    case 5: // Event
                        {
                            pages = [                                
                                {
                                    page: "event-list"                                    
                                },
                                {
                                    page: "events",
                                    params: {
                                        id: entityID
                                    }
                                }
                            ]
                            break;
                        }
                    case 26: // Event Comment
                        {
                            pages = [                                
                                {
                                    page: "event-list"                                    
                                },
                                {
                                    page: "events",
                                    params: {
                                        id: parentEntityID
                                    }
                                }
                            ]
                            break;
                        }
                    default:
                    {
                        pages = [
                            {
                                page: 'page-my-account',
                                params: {
                                    type: 'notification'
                                }
                            }
                        ];
                        break;
                    }
                }
    
                // nav.push(url, dataToPush);
                // this.viewCtrl.dismiss();
                nav.setPages(pages);
            });
        }
    }

    unsubscribePushNotifications() {
        this.authenticationProvider.setPushNotificationsOff();
        this.authenticationProvider.removeDeviceTokenFromServer(this.authenticationProvider.getDeviceToken());
        this.pushObject.unregister();
    }

    initPushNotification(nav: Nav) {       
        if(nav == undefined) return;
        console.log('Here ', nav);
        // if (!this.platform.is('cordova')) {
        //     return;
        // }
        // to check if we have permission
        this.push.hasPermission()
            .then((res: any) => {
                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                } else {
                    console.log('We do not have permission to send push notifications');
                }
            });

        // // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
        // this.push.createChannel({
        // id: "testchannel1",
        // description: "My first test channel",
        // // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        // importance: 3
        // }).then(() => console.log('Channel created'));

        // // Delete a channel (Android O and above)
        // this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

        // // Return a list of currently configured channels
        // this.push.listChannels().then((channels) => console.log('List of channels', channels))

        // to initialize push notifications

        // https://ionicframework.com/docs/native/push/ for reference to push Docs
        const options: any = {
            android: {
                senderID: '1066246631997'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false',
                clearBadge: true
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };

        this.pushObject = this.push.init(options);

        console.log('helper ', nav);
        this.pushObject.on('notification').subscribe((notification: any) => {
            console.log(notification);
            if (nav) {
                console.log("this.nav is not null");
                this.processNotification(notification, nav, this)
            }
            else {
                console.log("this.nav is null");
            }
        });

        this.pushObject.on('registration').subscribe((registration: any) => {
           // if (!this.authenticationProvider.isPushNotificationOff()) {
                let registrationId: string;
                registrationId = registration.registrationId;
                console.log('Device registered', registration)
                console.log("json", JSON.stringify(registration));
                console.log('Device token: ', registrationId);

                if (this.platform.is('ios') || this.platform.is('android')) {
                    this.authenticationProvider.setDeviceToken(registrationId);

                    var deviceToken = this.authenticationProvider.getDeviceToken();

                    if (deviceToken != null) {
                        this.authenticationProvider.sendDeviceTokenToServer(this.authenticationProvider.getDeviceToken())
                            .subscribe(deviceTokenResponse => {
                                if (deviceTokenResponse.ResponseData) {
                                    console.log("response of device token request: " + deviceTokenResponse.ResponseData);
                                } else {
                                    this.presentToast(this.translationText['LOGIN.INVALID_CREDENTIALS']);
                                }
                            });
                    }

                }
            //}

        });

        this.pushObject.on('error').subscribe(error => {
            // var errorJson = error.message json();
            console.error('Error with Push plugin', error.message);
        });
    }

    processNotification(notification: any, nav: Nav, self) {
        console.log('Received a notification', notification)
        console.log('Stringify notification', JSON.stringify(notification))

        console.log('Push notification clicked');
        console.log('Notification: ' + notification);

        //if user using app and push notification comes
        if (notification.additionalData.foreground) {
            console.log('Notification came when the user was in foreground');
            // TODO: Notification counter should be increased

            // if application open, show popup
            // let confirmAlert = this.alertCtrl.create({
            //     title: this.translationText['COMMONS.NEW_NOTIFICATION'],
            //     message: notification.message,
            //     buttons: [{
            //         text: this.translationText['COMMONS.IGNORE'],
            //         role: 'cancel'
            //     }, {
            //         text: this.translationText['COMMONS.VIEW'],
            //         handler: () => {
            //             this.redirectUser(notification, nav);
            //         }
            //     }]
            // });
            // confirmAlert.present();
        }
        else {
            console.log('Notification came when the user was in background');
            this.redirectUser(notification, nav);
        }
    }

    /**
 * Present Ionic Toast to user.
 * @param msg Message to display in Ionic Toast
 */
    private presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

}