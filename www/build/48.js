webpackJsonp([48],{

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileListPageModule", function() { return FileListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__file_list__ = __webpack_require__(789);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_path__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_photo_library__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var FileListPageModule = /** @class */ (function () {
    function FileListPageModule() {
    }
    FileListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__file_list__["a" /* FileListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__file_list__["a" /* FileListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_taptic_engine__["a" /* TapticEngine */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_vibration__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_photo_library__["a" /* PhotoLibrary */]
            ]
        })
    ], FileListPageModule);
    return FileListPageModule;
}());

//# sourceMappingURL=file-list.module.js.map

/***/ }),

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_media_capture__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_chooser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_picker__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_file_path__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_comment_modal_comment_modal__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_transfer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modals_folder_select_modal_folder_select__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_photo_library__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















var FileListPage = /** @class */ (function () {
    function FileListPage(navCtrl, navParams, content, taptic, vibration, platform, appCenterAnalytics, translate, actionSheetCtrl, alertCtrl, toastCtrl, loadingCtrl, camera, mediaCapture, fileChooser, filePicker, device, modalCtrl, transfer, file, filePath, photoLibrary) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.content = content;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.appCenterAnalytics = appCenterAnalytics;
        this.translate = translate;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.mediaCapture = mediaCapture;
        this.fileChooser = fileChooser;
        this.filePicker = filePicker;
        this.device = device;
        this.modalCtrl = modalCtrl;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.photoLibrary = photoLibrary;
        this.title = this.navParams.get('title');
        this.subTitle = this.navParams.get('subTitle');
        this.entityType = 14;
        this.userId = Number(localStorage.getItem('UserID'));
        this.spaceId = this.navParams.get('SpaceID') ? this.navParams.get('SpaceID') : localStorage.getItem('SpaceID');
        this.parentId = this.navParams.get('ParentID') ? this.navParams.get('ParentID') : 0;
        this.profile = this.navParams.get('profile');
        this.searchfilter = "";
        this.page = 0;
        this.isLoadingFolders = false;
        this.isLoadingFiles = false;
        this.files = [];
        this.folders = [];
        this.p_downLoad = false;
        this.p_directory = false;
        this.isLoadingSearch = false;
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('File List Load Event.', { spaceId: _this.spaceId.toString(), userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('File List Load Event tracked');
                });
            }
        });
    }
    FileListPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    FileListPage.prototype.isImage = function (name) {
        var extArr = ["jpg", "jpeg", "png", "svg", "ico"];
        var ext = name.split(".");
        ext = ext[ext.length - 1];
        for (var i = 0; i < extArr.length; ++i) {
            if (ext.toLowerCase() === extArr[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    };
    FileListPage.prototype.ionViewWillEnter = function () {
    };
    FileListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.files = [];
        this.folders = [];
        var options = {
            EntityType: this.entityType,
        };
        options['parentid'] = this.parentId;
        if (this.spaceId) {
            options['spaceid'] = this.spaceId;
        }
        this.isLoadingFolders = true;
        this.isLoadingFiles = true;
        new Promise(function (resolve, reject) {
            if (_this.parentId == 0) {
                _this.content.getDirectories(options)
                    .subscribe(function (response) {
                    resolve(response.ResponseData[0].DirectoryID);
                }, function (err) {
                    reject(err);
                });
            }
            else {
                resolve(_this.parentId);
            }
        }).then(function (parentid) {
            _this.parentId = parentid;
            var options1 = options;
            options1['parentid'] = parentid;
            _this.content.getDirectories(options1)
                .finally(function () {
                _this.isLoadingFolders = false;
            })
                .subscribe(function (response) {
                console.log(response);
                for (var i = 0; i < response.ResponseData.length; i++) {
                    _this.folders.push({
                        title: response.ResponseData[i].DirectoryName,
                        ID: response.ResponseData[i].DirectoryID
                    });
                }
            });
            _this.content.getFiles(options1)
                .finally(function () {
                _this.isLoadingFiles = false;
            })
                .subscribe(function (response) {
                console.log(response.ResponseData);
                for (var i = 0; i < response.ResponseData.length; i++) {
                    _this.files.push({
                        title: response.ResponseData[i].ContentTitle,
                        ID: response.ResponseData[i].ContentID,
                        type: response.ResponseData[i].EntityType,
                        icon: 'assets/icon/' + _this.getIconName(response.ResponseData[i].ContentTitle)
                    });
                }
            });
        });
        this.checkPermission();
    };
    FileListPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.searchfilter = "";
        this.files = [];
        this.folders = [];
        this.vibrate();
        if (refresher) {
            refresher.complete();
        }
        var options = {
            EntityType: this.entityType,
        };
        options['parentid'] = this.parentId;
        if (this.spaceId) {
            options['spaceid'] = this.spaceId;
        }
        this.isLoadingFolders = true;
        this.isLoadingFiles = true;
        new Promise(function (resolve, reject) {
            if (_this.parentId == 0) {
                _this.content.getDirectories(options)
                    .subscribe(function (response) {
                    resolve(response.ResponseData[0].DirectoryID);
                }, function (err) {
                    reject(err);
                });
            }
            else {
                resolve(_this.parentId);
            }
        }).then(function (parentid) {
            var options1 = options;
            options1['parentid'] = parentid;
            _this.content.getDirectories(options1)
                .finally(function () {
                _this.isLoadingFolders = false;
            })
                .subscribe(function (response) {
                for (var i = 0; i < response.ResponseData.length; i++) {
                    _this.folders.push({
                        title: response.ResponseData[i].DirectoryName,
                        ID: response.ResponseData[i].DirectoryID
                    });
                }
            });
            _this.content.getFiles(options1)
                .finally(function () {
                _this.isLoadingFiles = false;
            })
                .subscribe(function (response) {
                for (var i = 0; i < response.ResponseData.length; i++) {
                    _this.files.push({
                        title: response.ResponseData[i].ContentTitle,
                        ID: response.ResponseData[i].ContentID,
                        type: response.ResponseData[i].EntityType,
                        icon: 'assets/icon/' + _this.getIconName(response.ResponseData[i].ContentTitle)
                    });
                }
            });
        });
    };
    FileListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.searchfilter.length === 0) {
            this.files = [];
            this.folders = [];
            this.doRefresh();
            return 0;
        }
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.page = 0;
            this.files = [];
        }
        if (this.files.length != 0 && this.files.length < 10) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoadingSearch = true;
        }
        var options = {
            EntityType: this.entityType,
            page: this.page,
        };
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        this.content.search(this.searchfilter, this.entityType, this.page, this.spaceId, this.userId)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingSearch = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (response) {
            _this.files = _this.files.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    FileListPage.prototype.search = function (infiniteScroll) {
        var _this = this;
        if (this.searchfilter.length === 0) {
            this.files = [];
            this.folders = [];
            this.doRefresh();
            return 0;
        }
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.page = 0;
            this.folders = [];
            this.files = [];
        }
        if (this.files.length != 0 && this.files.length < 10) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoadingSearch = true;
        }
        var options = {
            EntityType: this.entityType,
            page: this.page,
        };
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        // File Search
        this.content.search(this.searchfilter, this.entityType, this.page, this.spaceId, this.userId, this.parentId)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingSearch = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (response) {
            console.log(response);
            for (var i = 0; i < response.ResponseData.length; i++) {
                _this.files.push({
                    ID: response.ResponseData[i].ContentID,
                    title: response.ResponseData[i].Title,
                    type: 14,
                    icon: 'assets/icon/' + _this.getIconName(response.ResponseData[i].Title)
                });
            }
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
        // Folder Search
        /*
        this.content.search(this.searchfilter, 40, this.page, this.spaceId, this.userId, this.parentId)
          .finally(() => {
            if (infiniteScroll) {
              infiniteScroll.complete();
            } else {
              this.isLoadingSearch = false;
            }
          })
          .do((response: any) => {
            if (!response.ResponseData.length && infiniteScroll) {
              infiniteScroll.enable(false);
            }
          })
          .subscribe(response => {
            console.log(response);
            for(var i = 0; i < response.ResponseData.length; i++) {
              this.folders.push({
                title: response.ResponseData[i].Title,
                ID: response.ResponseData[i].ContentID
              })
            }
            if (infiniteScroll && response.ResponseData.length < 10){
              infiniteScroll.enable(false);
            }
          }, err => {
            if (infiniteScroll) {
              infiniteScroll.enable(false)
            }
          });
          */
    };
    // GoTo folder
    FileListPage.prototype.gotoFolder = function (item) {
        this.navCtrl.push("file-list", {
            title: item.title,
            SpaceID: this.spaceId,
            ParentID: item.ID
        });
    };
    FileListPage.prototype.gotoFile = function (item) {
        this.navCtrl.push('files', {
            id: item.ID
        });
    };
    FileListPage.prototype.download = function (item) {
    };
    FileListPage.prototype.createFolder = function () {
        var _this = this;
        this.translate.get(["EXTRA.CREATEFOLDER", "EXTRA.FOLDERNAME", "COMPONENT.CANCEL", "TOAST.OK"]).subscribe(function (res) {
            var alert = _this.alertCtrl.create({
                title: res['EXTRA.CREATEFOLDER'],
                inputs: [
                    {
                        name: 'folder',
                        placeholder: res['EXTRA.FOLDERNAME']
                    }
                ],
                buttons: [
                    {
                        text: res['COMPONENT.CANCEL'],
                        role: 'cancel',
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: res['TOAST.OK'],
                        handler: function (data) {
                            var foldername = data.folder;
                            var saveloader = _this.loadingCtrl.create({});
                            saveloader.present();
                            _this.content.createDirectory({
                                ParentID: _this.parentId,
                                DirectoryName: foldername,
                                SpaceID: _this.spaceId
                            })
                                .finally(function () {
                                saveloader.dismiss();
                            })
                                .subscribe(function (res) {
                                if (res.IsError == false) {
                                    _this.folders.push({
                                        title: foldername,
                                        ID: res.ResponseData
                                    });
                                }
                                else {
                                    _this.translate.get("EXTRA.FOLDERFAILED").subscribe(function (res) {
                                        _this.presentToast(res);
                                    });
                                }
                            });
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    FileListPage.prototype.uploadFile = function () {
        var _this = this;
        this.translate.get(["EXTRA.CONFIRMUPLOAD", "EXTRA.AREYOUSURE", "COMPONENT.CANCEL", "TOAST.OK"]).subscribe(function (res) {
            var alert = _this.alertCtrl.create({
                title: res['EXTRA.CONFIRMUPLOAD'],
                message: res['EXTRA.AREYOUSURE'],
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
                            console.log(_this.newfile);
                            _this.content.uploadFileToDirectory({
                                fullPath: _this.newfile.path,
                                directoryID: _this.parentId,
                                spaceID: _this.spaceId,
                                name: _this.newfile.filename
                            }).then(function (res) {
                                saveloader.dismiss();
                                console.log(res);
                                if (JSON.parse(res.response).ResponseMessage == 'ToBePublished') {
                                    _this.translate.get("TOAST.PENDING").subscribe(function (res) {
                                        _this.presentToast(res);
                                    });
                                }
                                else if (JSON.parse(res.response).IsError == false) {
                                    _this.files.push({
                                        title: _this.newfile.filename,
                                        ID: JSON.parse(res.response).ResponseData,
                                        type: 14,
                                        icon: 'assets/icon/' + _this.getIconName(_this.newfile.filename)
                                    });
                                    _this.translate.get("EXTRA.FILECREATESUCCESS").subscribe(function (res) {
                                        _this.presentToast(res);
                                    });
                                }
                                else {
                                    _this.translate.get("EXTRA.FILECREATEFAILED").subscribe(function (res) {
                                        _this.presentToast(res);
                                    });
                                }
                            });
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    FileListPage.prototype.openGallery = function () {
        var _this = this;
        var self = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            targetHeight: 1000,
            targetWidth: 1000
        };
        if (this.platform.is('android')) {
            options.destinationType = this.camera.DestinationType.NATIVE_URI;
        }
        this.camera.getPicture(options).then(function (imageURI) {
            var temp = imageURI.split("?");
            if (temp.length && temp.length > 1) {
                temp.pop();
            }
            imageURI = temp.join("?");
            imageURI.replace(/unsafe:/i, '');
            temp = {
                filename: "",
                path: imageURI,
            };
            var array = imageURI.split("/");
            temp.filename = array[array.length - 1];
            _this.newfile = temp;
            _this.uploadFile();
        }, function (error) {
            console.log(error);
        });
    };
    FileListPage.prototype.openVideoGallery = function () {
        var _this = this;
        var self = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: this.camera.MediaType.VIDEO,
            saveToPhotoAlbum: false,
            targetHeight: 1000,
            targetWidth: 1000
        };
        if (this.platform.is('android')) {
            options.destinationType = this.camera.DestinationType.NATIVE_URI;
        }
        this.camera.getPicture(options).then(function (imageURI) {
            console.log(imageURI);
            var temp = imageURI.split("?");
            if (temp.length && temp.length > 1) {
                temp.pop();
            }
            imageURI = temp.join("?");
            imageURI.replace(/unsafe:/i, '');
            temp = {
                filename: "",
                path: imageURI,
            };
            var array = imageURI.split("/");
            temp.filename = array[array.length - 1];
            temp.filename = temp.filename.split('.')[0] + '.mp4';
            _this.newfile = temp;
            _this.uploadFile();
        }, function (error) {
            console.log(error);
        });
    };
    FileListPage.prototype.captureImage = function () {
        var _this = this;
        var self = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageURI) {
            var temp = {
                filename: "",
                path: imageURI,
            };
            var array = imageURI.split("/");
            temp.filename = array[array.length - 1];
            _this.newfile = temp;
            _this.uploadFile();
        }, function (error) {
            console.log(error);
        });
    };
    FileListPage.prototype.captureVideo = function () {
        var _this = this;
        this.mediaCapture.captureVideo({ limit: 1 })
            .then(function (data) {
            console.log(data);
            var temp = {
                filename: data[0].name.split('.')[0] + '.mp4',
                path: data[0].fullPath,
            };
            _this.newfile = temp;
            _this.uploadFile();
        }, function (err) { return console.error(err); });
    };
    FileListPage.prototype.chooseFile = function () {
        if (this.platform.is("ios")) {
            this.chooseFileIos();
        }
        else if (this.platform.is("android")) {
            this.chooseFileAndroid();
        }
    };
    FileListPage.prototype.chooseFileIos = function () {
        var _this = this;
        this.filePicker.pickFile()
            .then(function (uri) {
            var temp = {
                filename: "",
                path: uri,
            };
            var array = uri.split("/");
            temp.filename = array[array.length - 1];
            _this.newfile = temp;
            _this.uploadFile();
        })
            .catch(function (err) { return console.log('Error', err); });
    };
    FileListPage.prototype.chooseFileAndroid = function () {
        var _this = this;
        this.fileChooser.open()
            .then(function (uri) {
            _this.filePath.resolveNativePath(uri)
                .then(function (filePath) {
                var temp = {
                    filename: "",
                    path: uri,
                };
                var array = filePath.split("/");
                var filename = array[array.length - 1];
                array = filename.split('%2F');
                if (array.length > 0) {
                    temp.filename = array[array.length - 1];
                }
                else {
                    temp.filename = filename;
                }
                _this.newfile = temp;
                _this.uploadFile();
            })
                .catch(function (err) { return console.log(err); });
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    FileListPage.prototype.presentActionSheet = function () {
        var _this = this;
        this.translate.get(["COMPONENT.CHANGETYPE", "COMPONENT.CAPTUREIMAGE", "COMPONENT.CAPTUREVIDEO",
            "COMPONENT.IMAGEGALLERY", "COMPONENT.VIDEOGALLERY", "COMPONENT.CHOOSEFILE", "COMPONENT.CANCEL"]).subscribe(function (res) {
            var actionSheet = _this.actionSheetCtrl.create({
                title: res['COMPONENT.CHANGETYPE'],
                buttons: [
                    {
                        text: res['COMPONENT.CAPTUREIMAGE'],
                        handler: function () {
                            _this.captureImage();
                        }
                    },
                    {
                        text: res['COMPONENT.CAPTUREVIDEO'],
                        handler: function () {
                            _this.captureVideo();
                        }
                    },
                    {
                        text: res['COMPONENT.IMAGEGALLERY'],
                        handler: function () {
                            _this.openGallery();
                        }
                    },
                    {
                        text: res['COMPONENT.VIDEOGALLERY'],
                        handler: function () {
                            _this.openVideoGallery();
                        }
                    },
                    {
                        text: res['COMPONENT.CHOOSEFILE'],
                        handler: function () {
                            _this.chooseFile();
                        }
                    },
                    {
                        text: res['COMPONENT.CANCEL'],
                        role: 'cancel'
                    }
                ]
            });
            actionSheet.present();
        });
    };
    FileListPage.prototype.checkPermission = function () {
        var _this = this;
        this.content.checkPermission({ spaceid: this.spaceId, entitytype: 14, entityid: this.parentId })
            .finally(function () {
        })
            .subscribe(function (response) {
            if (!response.IsError) {
                _this.p_directory = response.ResponseData.CreateDirectory;
                console.log(_this.p_directory);
            }
        });
    };
    FileListPage.prototype.addClick = function () {
        var _this = this;
        this.translate.get(["TITLES.FILES", "EXTRA.CREATEFOLDER", "EXTRA.UPLOADFILE", "COMPONENT.CANCEL"]).subscribe(function (res) {
            var buttons = [];
            if (_this.p_directory) {
                buttons.push({
                    text: res['EXTRA.CREATEFOLDER'],
                    handler: function () {
                        _this.createFolder();
                    }
                });
            }
            buttons.push({
                text: res['EXTRA.UPLOADFILE'],
                handler: function () {
                    _this.presentActionSheet();
                }
            });
            buttons.push({
                text: res['COMPONENT.CANCEL'],
                role: 'cancel'
            });
            var actionSheet = _this.actionSheetCtrl.create({
                title: res['TITLES.FILES'],
                buttons: buttons
            });
            actionSheet.present();
        });
    };
    FileListPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    FileListPage.prototype.moveToGallery = function (dest) {
        var _this = this;
        this.photoLibrary.requestAuthorization().then(function () {
            _this.photoLibrary.saveImage(encodeURI(dest), "Communifire").then((function (entry) {
                console.log('download complete: ' + entry.photoURL);
                // this.translate.get("EXTRA.GALLERYMOVED").subscribe(res => {
                //   this.presentToast(res);
                // });
            }), function (error) {
                // handle error
                console.log('err' + error);
                throw new Error(error);
            });
        })
            .catch(function (err) { return console.log('permissions weren\'t granted'); });
    };
    FileListPage.prototype.getIconName = function (name) {
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
    FileListPage.prototype.downloadFile = function (item) {
        var _this = this;
        this.content.getContentByID(item.ID)
            .finally(function () { })
            .subscribe(function (res) {
            var dest;
            var contentDetail = res.ResponseData;
            var fileTransfer = _this.transfer.create();
            var domain = localStorage.getItem("community_url");
            var link = contentDetail.ContentMediaUrl;
            if (_this.platform.is("android")) {
                dest = _this.file.externalDataDirectory + '/Downloads/' + contentDetail.SpaceName + '/' + contentDetail.ContentTitle;
            }
            else if (_this.platform.is("ios")) {
                dest = _this.file.syncedDataDirectory + '/Downloads/' + contentDetail.SpaceName + '/' + contentDetail.ContentTitle;
            }
            _this.translate.get("COMMONS.DOWNLOADSTART").subscribe(function (res) {
                _this.presentToast(contentDetail.ContentTitle + ' ' + res);
            });
            var url = localStorage.getItem('community_url');
            var apiKey = localStorage.getItem('communifire_token');
            var options = {
                headers: {
                    "Rest-Api-Key": apiKey
                }
            };
            fileTransfer.download(encodeURI(domain + link), dest, true, options).then(function (entry) {
                console.log('download complete: ' + entry.toURL());
                if (_this.isImage(contentDetail.ContentTitle))
                    _this.moveToGallery(dest);
                _this.translate.get("COMMONS.DOWNLOADED").subscribe(function (res) {
                    _this.presentToast(contentDetail.ContentTitle + ' ' + res);
                });
            }, function (error) {
                _this.translate.get("COMMONS.DOWNLOADERROR").subscribe(function (res) {
                    _this.presentToast(contentDetail.ContentTitle + ' ' + res);
                });
            })
                .catch(function (err) {
                _this.translate.get("COMMONS.DOWNLOADERROR").subscribe(function (res) {
                    _this.presentToast(contentDetail.ContentTitle + ' ' + res);
                });
            });
        });
    };
    FileListPage.prototype.deleteFile = function (item) {
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
                            _this.content.deleteFile(item.ID)
                                .finally(function () {
                                saveloader.dismiss();
                            })
                                .subscribe(function (res) {
                                if (res.IsError == false) {
                                    _this.translate.get("EXTRA.FILEDELETED").subscribe(function (res) {
                                        _this.presentToast(res);
                                    });
                                    _this.files = _this.files.filter(function (v) {
                                        return v.ID != item.ID;
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
    FileListPage.prototype.moveFile = function (item) {
        var _this = this;
        var data = {
            SpaceID: this.spaceId,
        };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_18__modals_folder_select_modal_folder_select__["a" /* FolderSelectModalComponent */], data);
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data != undefined) {
                var saveloader_1 = _this.loadingCtrl.create({});
                saveloader_1.present();
                _this.content.move(item.ID, data.ID)
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
    FileListPage.prototype.downloadFile2 = function (contentDetail) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var domain = localStorage.getItem("community_url");
        var link = contentDetail.ContentMediaUrl;
        var dest;
        if (this.platform.is("android")) {
            dest = this.file.externalDataDirectory + '/Downloads/' + contentDetail.SpaceName + '/' + contentDetail.ContentTitle;
        }
        else if (this.platform.is("ios")) {
            dest = this.file.documentsDirectory + '/Downloads/' + contentDetail.SpaceName + '/' + contentDetail.ContentTitle;
        }
        this.translate.get("COMMONS.DOWNLOADSTART").subscribe(function (res) {
            _this.presentToast(contentDetail.ContentTitle + ' ' + res);
        });
        var url = localStorage.getItem('community_url');
        var apiKey = localStorage.getItem('communifire_token');
        var options = {
            headers: {
                "Rest-Api-Key": apiKey
            }
        };
        fileTransfer.download(encodeURI(domain + link), dest, true, options).then(function (entry) {
            if (_this.isImage(contentDetail.ContentTitle))
                _this.moveToGallery(dest);
            console.log('download complete: ' + entry.toURL());
            _this.translate.get("COMMONS.DOWNLOADED").subscribe(function (res) {
                _this.presentToast(contentDetail.ContentTitle + ' ' + res);
            });
        }, function (error) {
            _this.translate.get("COMMONS.DOWNLOADERROR").subscribe(function (res) {
                _this.presentToast(contentDetail.ContentTitle + ' ' + res);
            });
        })
            .catch(function (err) {
            _this.translate.get("COMMONS.DOWNLOADERROR").subscribe(function (res) {
                _this.presentToast(contentDetail.ContentTitle + ' ' + res);
            });
        });
    };
    FileListPage.prototype.downloadFile_promise = function (contentDetail) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fileTransfer = _this.transfer.create();
            var domain = localStorage.getItem("community_url");
            var link = contentDetail.ContentMediaUrl;
            var dest;
            if (_this.platform.is("android")) {
                dest = _this.file.externalDataDirectory + '/Downloads/' + contentDetail.SpaceName + '/' + contentDetail.ContentTitle;
            }
            else if (_this.platform.is("ios")) {
                dest = _this.file.documentsDirectory + '/Downloads/' + contentDetail.SpaceName + '/' + contentDetail.ContentTitle;
            }
            var url = localStorage.getItem('community_url');
            var apiKey = localStorage.getItem('communifire_token');
            var options = {
                headers: {
                    "Rest-Api-Key": apiKey
                }
            };
            fileTransfer.download(encodeURI(domain + link), dest, true, options).then(function (entry) {
                if (_this.isImage(contentDetail.ContentTitle))
                    _this.moveToGallery(dest);
                // console.log('download complete: ' + entry.toURL());
                resolve();
                // this.translate.get("COMMONS.DOWNLOADED").subscribe(res => {
                //   this.presentToast(contentDetail.ContentTitle + ' ' + res);
                // });        
            }, function (error) {
                reject(error);
                // this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
                //   this.presentToast(contentDetail.ContentTitle + ' ' + res);
                // });
            })
                .catch(function (err) {
                reject(err);
                // this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
                //   this.presentToast(contentDetail.ContentTitle + ' ' + res);
                // });
            });
        });
    };
    FileListPage.prototype.downloadFolder = function (item) {
        var _this = this;
        var options = {
            'parentid': item.ID
        };
        this.content.getFiles(options)
            .finally(function () {
        })
            .subscribe(function (response) {
            console.log(response);
            var promise_all = [];
            for (var i = 0; i < response.ResponseData.length; i++) {
                promise_all.push(_this.downloadFile_promise(response.ResponseData[i]));
            }
            _this.translate.get("EXTRA.DOWNLOADSTART").subscribe(function (res) {
                _this.presentToast(res);
            });
            Promise.all(promise_all)
                .then(function () {
                _this.translate.get("EXTRA.DOWNLOADED").subscribe(function (res) {
                    _this.presentToast(res);
                });
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    };
    FileListPage.prototype.deleteFolder = function (item) {
        var _this = this;
        this.translate.get(["EXTRA.DELETEDIRECTORY", "EXTRA.AREYOUSURETODELETE", "COMPONENT.CANCEL", "TOAST.OK"]).subscribe(function (res) {
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
                            _this.content.removeDirectory(item.ID)
                                .finally(function () {
                                saveloader.dismiss();
                            })
                                .subscribe(function (res) {
                                if (res.IsError == false) {
                                    _this.translate.get("EXTRA.FOLDERDELETED").subscribe(function (res) {
                                        _this.presentToast(res);
                                    });
                                    _this.folders = _this.folders.filter(function (v) {
                                        return v.ID != item.ID;
                                    });
                                }
                                else {
                                    _this.translate.get("EXTRA.FOLDERDELETEDFAILED").subscribe(function (res) {
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
    FileListPage.prototype.moveFolder = function (item) {
        var _this = this;
        var data = {
            SpaceID: this.spaceId,
        };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_18__modals_folder_select_modal_folder_select__["a" /* FolderSelectModalComponent */], data);
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data != undefined) {
                var saveloader_2 = _this.loadingCtrl.create({});
                saveloader_2.present();
                _this.content.move(item.ID, data.ID)
                    .finally(function () {
                    saveloader_2.dismiss();
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
    FileListPage.prototype.openModal = function (item) {
        var _this = this;
        this.content.getContentByID(item.ID)
            .finally(function () { })
            .subscribe(function (res) {
            var data = {
                entity: res.ResponseData,
            };
            var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_16__components_comment_modal_comment_modal__["a" /* CommentModalComponent */], data);
            modal.present();
            modal.onDidDismiss(function (data) {
            });
        });
    };
    FileListPage.prototype.opensheet1 = function (item) {
        var _this = this;
        this.translate.get(["EXTRA.DOWNLOAD", "EXTRA.DELETE", "EXTRA.COMMENT", "EXTRA.MOVE", "COMPONENT.CANCEL"]).subscribe(function (res) {
            var buttons = [];
            if (_this.p_downLoad) {
                buttons.push({
                    text: res['EXTRA.DOWNLOAD'],
                    handler: function () {
                        _this.downloadFolder(item);
                    }
                });
            }
            buttons.push({
                text: res['EXTRA.DELETE'],
                handler: function () {
                    _this.deleteFolder(item);
                }
            });
            buttons.push({
                text: res['COMPONENT.CANCEL'],
                role: 'cancel'
            });
            var actionSheet = _this.actionSheetCtrl.create({
                title: item.title,
                buttons: buttons
            });
            actionSheet.present();
        });
    };
    FileListPage.prototype.opensheet2 = function (item) {
        var _this = this;
        this.translate.get(["EXTRA.DOWNLOAD", "EXTRA.DELETE", "EXTRA.COMMENT", "EXTRA.MOVE", "COMPONENT.CANCEL"]).subscribe(function (res) {
            var buttons = [];
            if (_this.p_downLoad) {
                buttons.push({
                    text: res['EXTRA.DOWNLOAD'],
                    handler: function () {
                        _this.downloadFile(item);
                    }
                });
            }
            buttons.push({
                text: res['EXTRA.COMMENT'],
                handler: function () {
                    _this.openModal(item);
                }
            });
            buttons.push({
                text: res['EXTRA.MOVE'],
                handler: function () {
                    _this.moveFile(item);
                }
            });
            buttons.push({
                text: res['EXTRA.DELETE'],
                handler: function () {
                    _this.deleteFile(item);
                }
            });
            buttons.push({
                text: res['COMPONENT.CANCEL'],
                role: 'cancel'
            });
            var actionSheet = _this.actionSheetCtrl.create({
                title: item.title,
                buttons: buttons
            });
            actionSheet.present();
        });
    };
    FileListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-file-list',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/files/file-list/file-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title *ngIf=\'!title\'>{{ "TITLES.FILES" | translate}}</ion-title>\n\n    <ion-title *ngIf=\'title\'>{{ title }}</ion-title>\n\n    <ion-buttons right *ngIf=\'profile == undefined\'>\n\n      <button end add-button ion-button clear (click)="addClick()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar [(ngModel)]="searchfilter" (keydown)="isLoadingSearch = true; files = []" (ionInput)="search()" showCancelButton="true"\n\n    placeholder="{{\'MODAL.SEARCH...\'|translate}}" cancelButtonText="{{\'TOAST.CANCEL\'|translate}}"></ion-searchbar>\n\n  <ion-refresher *ngIf="!isLoadingFolders && !isLoadingFiles" (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <searching-for *ngIf="isLoadingSearch && searchfilter.length != 0" [text]="searchfilter"></searching-for>\n\n  <div *ngIf="isLoadingFolders || isLoadingFiles">\n\n    <loader *ngIf="isLoadingFolders || isLoadingFiles"></loader>\n\n  </div>\n\n  <no-results-found *ngIf="files.length == 0 && folders.length == 0 && !isLoadingFolders &&!isLoadingFiles && !isLoadingSearch"></no-results-found>\n\n  <ion-item class="mt-10" *ngIf="folders.length != 0">\n\n    <h2>{{"EXTRA.FOLDERS" | translate}}</h2>\n\n  </ion-item>\n\n  <ion-list class=\'folders\' *ngIf="folders.length != 0">\n\n    <ion-item *ngFor="let item of folders">\n\n      <span (click)=\'gotoFolder(item)\'>{{item.title}}</span>\n\n      <ion-icon grey-color ios="ios-arrow-down" md="md-arrow-down" item-end (click)="opensheet1(item)"></ion-icon>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-item class="mt-10 border" *ngIf="files.length != 0">\n\n    <h2>{{"EXTRA.FILES" | translate}}</h2>\n\n  </ion-item>\n\n  <ion-list class=\'files\' *ngIf="files.length != 0">\n\n    <ion-item *ngFor="let item of files">\n\n      <ion-thumbnail item-start>\n\n        <ng-container>\n\n          <img [src]="item.icon | secure | async">\n\n        </ng-container>\n\n      </ion-thumbnail>\n\n      <p (click)=\'gotoFile(item)\'>{{item.title}}</p>\n\n      <ion-icon grey-color ios="ios-arrow-down" md="md-arrow-down" item-end (click)="opensheet2(item)"></ion-icon>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-infinite-scroll *ngIf="searchfilter.length > 0" (ionInfinite)="doInfinite($event)" threshold="1000px">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/files/file-list/file-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_picker__["a" /* IOSFilePicker */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_photo_library__["a" /* PhotoLibrary */]])
    ], FileListPage);
    return FileListPage;
}());

//# sourceMappingURL=file-list.js.map

/***/ })

});
//# sourceMappingURL=48.js.map