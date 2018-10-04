webpackJsonp([49],{

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDetailPageModule", function() { return FileDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__file_detail__ = __webpack_require__(787);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_modals_module__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_document_viewer__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_opener__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_photo_library__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var FileDetailPageModule = /** @class */ (function () {
    function FileDetailPageModule() {
    }
    FileDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__file_detail__["a" /* FileDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__file_detail__["a" /* FileDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__modals_modals_module__["a" /* ModalModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_15__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_taptic_engine__["a" /* TapticEngine */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_vibration__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_document_viewer__["a" /* DocumentViewer */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_opener__["a" /* FileOpener */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_photo_library__["a" /* PhotoLibrary */]
            ]
        })
    ], FileDetailPageModule);
    return FileDetailPageModule;
}());

//# sourceMappingURL=file-detail.module.js.map

/***/ }),

/***/ 787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_invite_people_modal_invite_people_modal__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_comment_modal_comment_modal__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_single_content_like_single_content_like__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_transfer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_document_viewer__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_opener__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__modals_folder_select_modal_folder_select__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_photo_library__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















var FileDetailPage = /** @class */ (function () {
    function FileDetailPage(navCtrl, navParams, modalCtrl, contentProvider, loadingCtrl, taptic, iab, vibration, platform, translate, appCenterAnalytics, transfer, file, toastCtrl, zone, document, fileOpener, actionSheetCtrl, alertCtrl, photoLibrary, domSanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.contentProvider = contentProvider;
        this.loadingCtrl = loadingCtrl;
        this.taptic = taptic;
        this.iab = iab;
        this.vibration = vibration;
        this.platform = platform;
        this.translate = translate;
        this.appCenterAnalytics = appCenterAnalytics;
        this.transfer = transfer;
        this.file = file;
        this.toastCtrl = toastCtrl;
        this.zone = zone;
        this.document = document;
        this.fileOpener = fileOpener;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.photoLibrary = photoLibrary;
        this.domSanitizer = domSanitizer;
        this.contentId = this.navParams.get('id');
        this.isRefreshing = false;
        this.icon = 'assets/images/jpg-2.png';
        this.isLoadingImage = false;
        this.p_downLoad = false;
        this.isPdf = false;
        this.dest = '';
        this.i_url = '';
        this.page = 0;
        this.comments = [];
        this.communityUrl = localStorage.getItem("community_url");
    }
    FileDetailPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    FileDetailPage.prototype.ngOnInit = function () {
        this.getUserByContentId();
        this.getComments();
    };
    FileDetailPage.prototype.setCount = function ($event) {
        this.likesCount = $event;
    };
    FileDetailPage.prototype.adduser = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modals_invite_people_modal_invite_people_modal__["a" /* InvitePeopleModalComponent */]);
        modal.present();
    };
    FileDetailPage.prototype.getUserByContentId = function () {
        var _this = this;
        this.translate.get("COMMONS.LOADING_FILE").subscribe(function (res) {
            var loading = _this.loadingCtrl.create({
                content: res
            });
            loading.present();
            _this.contentProvider.getContentByID(_this.contentId)
                .finally(function () { return loading.dismiss(); })
                .subscribe(function (res) {
                _this.zone.run(function () {
                    _this.contentDetail = res.ResponseData;
                    console.log(_this.contentDetail);
                    if (_this.isImage())
                        _this.showImage(_this.contentDetail.ContentMediaUrl);
                    if (_this.checkPdf()) {
                        _this.isPdf = true;
                        var tmp = "http://docs.google.com/gview?url="; //http://remote.url.tld/path/to/document.doc&embedded=true
                        tmp += localStorage.getItem("community_url") + '/' + _this.contentDetail.ContentMediaUrl + '&embedded=true';
                        // console.log(tmp);
                        _this.pdfLink = _this.domSanitizer.bypassSecurityTrustResourceUrl(tmp);
                    }
                    _this.contentProvider.checkPermission({
                        entitytype: 14,
                        spaceid: _this.contentDetail.SpaceID,
                    })
                        .finally(function () {
                    })
                        .subscribe(function (res) {
                        _this.p_downLoad = res.ResponseData.Download;
                    });
                });
                _this.appCenterAnalytics.isEnabled().then(function (b) {
                    if (b) {
                        _this.appCenterAnalytics.trackEvent('File Detail Load.', { id: _this.contentId, userid: localStorage.getItem('UserID') }).then(function () {
                            console.log('File Detail Load Event tracked');
                        });
                    }
                });
            });
        });
    };
    FileDetailPage.prototype.showImage = function (link) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var domain = localStorage.getItem("community_url");
        var tmp;
        console.log('showimage');
        if (this.platform.is("android")) {
            tmp = this.file.externalDataDirectory + "/tmp/" + this.contentDetail.ContentTitle;
        }
        else if (this.platform.is("ios")) {
            tmp = this.file.documentsDirectory + "/tmp/" + this.contentDetail.ContentTitle;
        }
        var url = localStorage.getItem('community_url');
        var apiKey = localStorage.getItem('communifire_token');
        var options = {
            headers: {
                "Rest-Api-Key": apiKey
            }
        };
        this.isLoadingImage = true;
        fileTransfer.download(encodeURI(domain + link), tmp, true, options).then(function (entry) {
            _this.zone.run(function () {
                _this.i_url = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* normalizeURL */])(tmp);
                _this.isLoadingImage = false;
            });
        }, function (error) {
        });
    };
    FileDetailPage.prototype.moveToGallery = function (dest) {
        var _this = this;
        this.photoLibrary.requestAuthorization().then(function () {
            _this.photoLibrary.saveImage(dest, "Communifire").then((function (entry) {
                console.log('download complete: ' + entry.photoURL);
                _this.translate.get("EXTRA.GALLERYMOVED").subscribe(function (res) {
                    _this.presentToast(res);
                });
            }), function (error) {
                // handle error
                console.log('err' + error);
                throw new Error(error);
            });
        })
            .catch(function (err) { return console.log('permissions weren\'t granted'); });
    };
    FileDetailPage.prototype.downloadFile = function (link) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var domain = localStorage.getItem("community_url");
        if (this.platform.is("android")) {
            this.dest = this.file.externalDataDirectory + '/Downloads/' + this.contentDetail.SpaceName + '/' + this.contentDetail.ContentTitle;
        }
        else if (this.platform.is("ios")) {
            this.dest = this.file.documentsDirectory + '/Downloads/' + this.contentDetail.SpaceName + '/' + this.contentDetail.ContentTitle;
        }
        this.translate.get("COMMONS.DOWNLOADSTART").subscribe(function (res) {
            _this.presentToast(_this.contentDetail.ContentTitle + ' ' + res);
        });
        var url = localStorage.getItem('community_url');
        var apiKey = localStorage.getItem('communifire_token');
        var options = {
            headers: {
                "Rest-Api-Key": apiKey
            }
        };
        fileTransfer.download(encodeURI(domain + link), this.dest, true, options).then(function (entry) {
            console.log('download complete: ' + entry.toURL());
            _this.translate.get("COMMONS.DOWNLOADED").subscribe(function (res) {
                _this.presentToast(_this.contentDetail.ContentTitle + ' ' + res);
            });
            if (_this.isImage())
                _this.moveToGallery(_this.dest);
            var options = {
                title: _this.contentDetail.ContentTitle
            };
            var onShow = function () {
                console.log('show');
            };
            var onClose = function () {
                console.log('close');
            };
            var onMissingApp = function (appId, installer) {
                _this.translate.get("COMMONS.INSTALLWARNING").subscribe(function (res) {
                    if (confirm("Do you want to install to Viewer App "
                        + appId + " ?")) {
                        installer();
                    }
                });
            };
            var onError = function (err) {
                console.log(err);
            };
            var m_type;
            _this.file.resolveLocalFilesystemUrl(_this.dest)
                .then(function (entry) {
                return new Promise(function (resolve, reject) {
                    entry.file(function (meta) { return resolve(meta); }, function (error) { return reject(error); });
                });
            })
                .then(function (meta) {
                m_type = meta.type; // This is a value compatible with the 'Content-Type' HTTP header
                console.log(m_type);
                _this.fileOpener.open(_this.dest, m_type)
                    .then(function () { return console.log('File is opened'); })
                    .catch(function (e) { return console.log('Error opening file', e); });
                // this.document.viewDocument(this.dest, m_type, options, onShow, onClose, onMissingApp, onError);
            });
        }, function (error) {
            _this.translate.get("COMMONS.DOWNLOADERROR").subscribe(function (res) {
                _this.presentToast(_this.contentDetail.ContentTitle + ' ' + res);
            });
        })
            .catch(function (err) {
            _this.translate.get("COMMONS.DOWNLOADERROR").subscribe(function (res) {
                _this.presentToast(_this.contentDetail.ContentTitle + ' ' + res);
            });
        });
    };
    FileDetailPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        if (this.infiniteScroll) {
            this.infiniteScroll.enable(true);
        }
        this.taptic.impact({ style: 'light' });
        this.vibrate();
        this.contentProvider.getContentByID(this.contentId)
            .finally(function () { return refresher.complete(); })
            .subscribe(function (res) {
            _this.contentDetail = res.ResponseData;
            _this.singleComponentLikeComponent.getLikeCount();
        });
        this.page = 1;
        this.comments = [];
        this.contentProvider.getContentComments(this.contentId, this.page)
            .subscribe(function (res) {
            _this.handleComments(res);
        });
    };
    FileDetailPage.prototype.getComments = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            this.infiniteScroll = infiniteScroll;
        }
        if (this.comments.length == 0 && infiniteScroll) {
            infiniteScroll.enable(false);
        }
        if (this.comments.length >= 0 && this.comments.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
        }
        this.page++;
        this.contentProvider.getContentComments(this.contentId, this.page)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
        })
            .do(function (response) {
            if (!response.ResponseData && infiniteScroll) {
                infiniteScroll.enable(false);
                _this.page--; // Restore page back to the last correct page
            }
        })
            .subscribe(function (res) {
            _this.handleComments(res);
            if (res.ResponseData && res.ResponseData.length < 10 && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    FileDetailPage.prototype.handleComments = function (response) {
        if (response.ResponseData) {
            this.comments = this.comments.concat(response.ResponseData);
            this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
        }
    };
    FileDetailPage.prototype.getTitle = function () {
        return "TITLES.File";
    };
    FileDetailPage.prototype.openModal = function ($event) {
        var _this = this;
        var data = {
            entity: this.contentDetail,
        };
        if ($event) {
            data['parentComment'] = $event;
        }
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__components_comment_modal_comment_modal__["a" /* CommentModalComponent */], data);
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.comments = data.comments;
            _this.contentDetail.CommentCount += data.count;
        });
    };
    FileDetailPage.prototype.openMoveModal = function () {
        var _this = this;
        var data = {
            SpaceID: this.contentDetail.SpaceID,
        };
        console.log(data);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_17__modals_folder_select_modal_folder_select__["a" /* FolderSelectModalComponent */], data);
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data != undefined) {
                var saveloader_1 = _this.loadingCtrl.create({});
                saveloader_1.present();
                _this.contentProvider.move(_this.contentId, data.ID)
                    .finally(function () {
                    saveloader_1.dismiss();
                })
                    .subscribe(function (res) {
                    if (res.IsError == false) {
                        _this.translate.get("EXTRA.MOVED").subscribe(function (res) {
                            _this.presentToast(res);
                            _this.navCtrl.pop();
                        });
                    }
                    else {
                        _this.translate.get("EXTRA.MOVEFAILED").subscribe(function (res) {
                            _this.presentToast(res);
                        });
                    }
                });
            }
        });
    };
    FileDetailPage.prototype.isImage = function () {
        if (!this.contentDetail) {
            return false;
        }
        var extArr = ["jpg", "jpeg", "png", "svg", "ico"];
        var ext = this.contentDetail.ContentTitle.split(".");
        ext = ext[ext.length - 1];
        for (var i = 0; i < extArr.length; ++i) {
            if (ext.toLowerCase() === extArr[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    };
    FileDetailPage.prototype.checkPdf = function () {
        var ext = this.contentDetail.ContentTitle.split(".");
        ext = ext[ext.length - 1];
        if (ext.toLowerCase() === 'pdf') {
            return true;
        }
        return false;
    };
    FileDetailPage.prototype.deleteFile = function () {
        var _this = this;
        this.translate.get(["EXTRA.DELETEFILE", "EXTRA.AREYOUSURETODELETE", "COMPONENT.CANCEL", "TOAST.OK"]).subscribe(function (res) {
            var alert = _this.alertCtrl.create({
                title: res['EXTRA.DELETEFILE'],
                message: res['EXTRA.AREYOUSURETODELETE'],
                buttons: [
                    {
                        text: res['COMPONENT.CANCEL'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: res['TOAST.OK'],
                        handler: function () {
                            var saveloader = _this.loadingCtrl.create({});
                            saveloader.present();
                            _this.contentProvider.deleteFile(_this.contentId)
                                .finally(function () {
                                saveloader.dismiss();
                            })
                                .subscribe(function (res) {
                                if (res.IsError == false) {
                                    _this.translate.get("EXTRA.FILEDELETED").subscribe(function (res) {
                                        _this.presentToast(res);
                                        _this.navCtrl.pop();
                                    });
                                }
                                else {
                                    _this.translate.get("EXTRA.FILEDELETEDFAILED").subscribe(function (res) {
                                        _this.presentToast(res);
                                    });
                                }
                            });
                        }
                    },
                ]
            });
            alert.present();
        });
    };
    FileDetailPage.prototype.navToList = function () {
        var active = this.navCtrl.getActive();
        var parent = this.navCtrl.getPrevious();
        if (this.contentDetail.SpaceID === 0) {
            this.navCtrl.push("file-list", {
                title: this.contentDetail.ReportedByUserName,
                UserID: this.contentDetail.UserID
            }, {
                direction: "back"
            });
        }
        else {
            this.navCtrl.push("file-list", {
                title: this.contentDetail.SpaceName,
                SpaceID: this.contentDetail.SpaceID
            }, {
                direction: "back"
            });
        }
        this.navCtrl.removeView(active);
        this.navCtrl.removeView(parent);
    };
    FileDetailPage.prototype.clickOption = function () {
        var _this = this;
        this.translate.get(["EXTRA.DOWNLOAD", "EXTRA.DELETE", "EXTRA.COMMENT", "EXTRA.MOVE", "COMPONENT.CANCEL"]).subscribe(function (res) {
            var buttons = [];
            if (_this.p_downLoad) {
                buttons.push({
                    text: res['EXTRA.DOWNLOAD'],
                    handler: function () {
                        _this.downloadFile(_this.contentDetail.ContentMediaUrl);
                    }
                });
            }
            buttons.push({
                text: res['EXTRA.COMMENT'],
                handler: function () {
                    _this.openModal();
                }
            });
            buttons.push({
                text: res['EXTRA.MOVE'],
                handler: function () {
                    _this.openMoveModal();
                }
            });
            buttons.push({
                text: res['EXTRA.DELETE'],
                handler: function () {
                    _this.deleteFile();
                }
            });
            buttons.push({
                text: res['COMPONENT.CANCEL'],
                role: 'cancel'
            });
            var actionSheet = _this.actionSheetCtrl.create({
                title: _this.contentDetail.ContentTitle,
                buttons: buttons
            });
            actionSheet.present();
        });
    };
    FileDetailPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    FileDetailPage.prototype.getIconName = function (name) {
        if (name == null)
            return;
        var ext = name.split(".");
        ext = ext[ext.length - 1];
        switch (ext.toLowerCase()) {
            case 'jpg':
                return 'jpg.png';
            case 'pdf':
                return 'pdf.jpg';
            case 'doc':
                return 'doc.png';
            case 'docx':
                return 'doc.jpg';
            case 'xsl':
                return 'xsl.jpg';
            case 'ppt':
                return 'ppt.png';
            default:
                return 'other.png';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_7__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */])
    ], FileDetailPage.prototype, "singleComponentLikeComponent", void 0);
    FileDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-file-detail',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/files/file-detail/file-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title (click)="navToList()" *ngIf=\'!contentDetail\'>{{ getTitle() | translate}}</ion-title>\n\n    <ion-title (click)="navToList()" *ngIf=\'contentDetail\'>{{ contentDetail?.ContentTitle }}</ion-title>\n\n    <ion-buttons right>\n\n      <button end add-button ion-button clear (click)="clickOption()">\n\n        {{ "EXTRA.OPTIONS" | translate}}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <div class="banner" *ngIf="contentDetail?.ContentFeaturedImageFullURL">\n\n    <img [src]="contentDetail?.ContentFeaturedImageFullURL | secure | async">\n\n  </div>\n\n\n\n  <div class="article-content" padding>\n\n    <div class="article-title-detail" text-center>\n\n      <!-- <img class="profile-img" [class.hasCover]="!!contentDetail?.ContentFeaturedImageFullURL" *ngIf="contentDetail?.AuthorAvatarImageUrl"\n\n        [src]="contentDetail?.AuthorAvatarImageUrl"> -->\n\n      <ion-item [style.cursor]="\'pointer\'">\n\n        <ion-thumbnail item-start>\n\n          <ng-container>\n\n            <img [src]="\'assets/icon/\'+ getIconName(contentDetail?.ContentTitle) | secure | async">\n\n          </ng-container>\n\n        </ion-thumbnail>\n\n        <h2 [innerHTML]="contentDetail?.ContentTitle"></h2>\n\n        <p>\n\n          <span>{{ "EXTRA.MODIFIED" | translate}} </span>\n\n          <span [innerHtml]="contentDetail?.DateCreatedString"></span>\n\n        </p>\n\n      </ion-item>\n\n    </div>\n\n\n\n    <div style="text-align: center; margin: -16px;">\n\n      <img [style.paddingTop]="\'16px\'" [src]="i_url | secure | async" *ngIf="isImage()">\n\n    </div>\n\n    <div *ngIf="isLoadingImage">\n\n      <loader></loader>\n\n    </div>\n\n    <ion-row [style.paddingTop]="\'20px\'" style=\'text-align: center;\' *ngIf="contentDetail?.ContentBody != \'\'">\n\n      <span>{{contentDetail?.ContentBody}}</span>\n\n    </ion-row>\n\n    <ion-row [style.paddingTop]="\'20px\'" style=\'text-align: center;\' *ngIf="contentDetail?.AuthorDisplayName != \'\'">\n\n      {{ "EXTRA.CRATEDBY" | translate }}\n\n    </ion-row>\n\n    <ion-row style=\'text-align: center; font-family: sans-serif; font-size: 1.1em;\' *ngIf="contentDetail?.AuthorDisplayName != \'\'">\n\n      <span [innerHTML]="contentDetail?.AuthorDisplayName"></span>\n\n    </ion-row>\n\n    <!-- <iframe *ngIf="isPdf" [src]="pdfLink" width="100%" height="100%" frameborder="0" ></iframe> -->\n\n    <!-- <ion-row [style.paddingTop]="\'20px\'" style=\'text-align: center;\'>\n\n      <ion-col no-padding>\n\n        <h6 (click)="downloadFile(contentDetail?.ContentMediaUrl)">{{ contentDetail?.ContentTitle }} <fa-icon name="external-link" item-end></fa-icon></h6>\n\n      </ion-col>\n\n    </ion-row> -->\n\n  </div>\n\n  <ion-row class="article-likes-comments" padding-horizontal>\n\n    <ion-col no-padding>\n\n      <content-like [likesCount]="likesCount"></content-like>\n\n    </ion-col>\n\n    <ion-col no-padding (click)="openModal()">\n\n      <p text-right *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</p>\n\n      <p text-right *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</p>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="article-response like-button-section" padding-horizontal>\n\n    <single-content-like *ngIf="!isRefreshing" (getCount)="setCount($event)" [contentID]="contentDetail?.ContentID" [entityType]="14"></single-content-like>\n\n  </div>\n\n  <!-- <ion-list no-margin class="article-tags" padding-horizontal *ngIf="contentDetail?.TagsCSV" no-lines> \n\n    <ion-item>\n\n      <h6>{{"ARTICLE.TAGS" | translate}}</h6>\n\n      <h6>{{contentDetail?.TagsCSV}}</h6>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-row class="article-likes-comments" padding-horizontal>\n\n    <ion-col no-padding>\n\n      <content-like [likesCount]="likesCount"></content-like>\n\n    </ion-col>\n\n    <ion-col no-padding>\n\n      <p text-right *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</p>\n\n      <p text-right *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</p>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="article-response like-button-section" padding-horizontal>\n\n    <single-content-like *ngIf="!isRefreshing" (getCount)="setCount($event)" [contentID]="contentDetail?.ContentID" [entityType]="14"></single-content-like>\n\n  </div>\n\n  <div class="article-response write-comment-section" padding-horizontal>\n\n    <write-comment (click)="openModal()"></write-comment>\n\n  </div>\n\n  <div class="article-comments">\n\n    <comment [comments]="comments" (sendParent)="openModal($event)" [step]="0"></comment>\n\n    <ion-infinite-scroll (ionInfinite)="getComments($event)" threshold="1000px">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </div> -->\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/files/file-detail/file-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_document_viewer__["a" /* DocumentViewer */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_photo_library__["a" /* PhotoLibrary */],
            __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser__["c" /* DomSanitizer */]])
    ], FileDetailPage);
    return FileDetailPage;
}());

//# sourceMappingURL=file-detail.js.map

/***/ })

});
//# sourceMappingURL=49.js.map