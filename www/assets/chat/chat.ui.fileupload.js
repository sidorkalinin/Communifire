(function ($, ui, utility, communifire) {
    "use strict";

    var $ui = $(ui),
        uiEvents = ui.events,
        init = function() {
            var getFileProgressContainer = function(fileID) {
                    return $('div[data-qqfileid=' + fileID + ']');
                },
                click = 'click',
                messageEntityTypeID = 60,
                sizeLimit = communifire.sizeLimit,
                allowedExtensions = communifire.allowedExtensions.split(','),
                fileuploader = document.getElementById('file-uploader'),
                fileProgressBarContainer = '#progress-bar',
                fileProgressFileNameContainer = '.filename',
                fileProgressPercentageContainer = '#progress-percentage',
                fileProgressCancelLink = '#progress-cancel-link',
                fileAttachmentTemplate =
                    '<div id="ax-file-progress">\
            <div id="progress-bar" style="width: 0%;" class="progress-bar"></div>\
            <div id="progress-text" class="progress-bar"><a id="progress-cancel-link" class="pull-right upload-cancel">' + utility.getLanguageResource('GlobalCancelSmallText') + '</a><span id="progress_label">' + utility.getLanguageResource('UploadingText') + ' <strong class="filename upload-file"></strong> ...</span> <span id="progress-percentage" class="progress-percentage">0%</span> <span class="upload-size"></span><span class="upload-spinner"></span><span class="upload-retry"></span><span class="upload-status-text"></span><span class="upload-success"></span><span class="upload-fail"></span><span id="progress_queue"></span></div>\
        </div>';
            qq.CFChatAttachmentUploader = function(o) {
                var showDragAndDrop = !(navigator.appName == 'Microsoft Internet Explorer');
                var template = '<a class="chat-attachment-button btn" ref="#"><i class="fa fa-paperclip"></i></a><div class="qq-uploader hide">' +
                    '<div class="qq-upload-drop-area"><span>' + utility.getLanguageResource('GlobalDragDropFilesText') + '</span></div>';
                if (showDragAndDrop) {
                    template += '<div class="axero-files-upload-drag-label" >' + utility.getLanguageResource('GlobalDragDropFilesText') + '</div>';
                }
                if (!showDragAndDrop) {
                    template += '<button id="FakeAttachmentUploadButton" class="btn"  >'
                        + utility.getLanguageResource('GlobalSelectFilesText')
                        + '</button><div class="qq-upload-button" style="display:none;" ></div>' +
                        '<div class="axero-file-upload-window hide"><table class="width100"><tbody class="uploader-media-server-urls"></tbody></table></div>' +
                        '</div>';

                    $(function() {
                        $('#FakeAttachmentUploadButton').on(click, function(e) {
                            $('.qq-upload-button').find('input[type=file]').click();
                            return false;
                        });
                    });
                } else {
                    template += '<div class="qq-upload-button" >' + utility.getLanguageResource('GlobalSelectFilesText') + '</div>' +
                        '<div class="axero-file-upload-window hide"><table class="width100"><tbody class="uploader-media-server-urls"></tbody></table></div>' +
                        '</div>';
                }
                var defaults = {
                    request: {
                        endpoint: communifire.attachmentUploadUrl
                    },
                    callbacks: {},
                    validation: {
                        allowedExtensions: [],
                        sizeLimit: 1000000000,
                        minSizeLimit: 0,
                        stopOnFirstInvalidFile: true
                    },
                    dragAndDrop: {
                        extraDropzones: [],
                        hideDropzones: true,
                        disableDefaultDropzone: false
                    },
                    showMessage: function (message) {
                        $.showMessageBar({ message: message });
                    },
                    limit: 20,
                    maxConnections: 999,
                    sizeLimit: 0,
                    template: template,
                    fileTemplate: fileAttachmentTemplate,
                    classes: {
                        // used to get elements from templates
                        button: 'chat-attachment-button',
                        //drop: 'drag-files-container',
                        //dropActive: 'qq-upload-drop-area-active',
                        list: 'uploader-media-server-urls',
                        progressBar: 'progress-bar',
                        file: 'upload-file',
                        spinner: 'upload-spinner',
                        size: 'upload-size',
                        cancel: 'upload-cancel',
                        retry: 'upload-retry',
                        statusText: 'upload-status-text',
                        // added to list item when upload completes
                        // used in css to hide progress spinner
                        success: 'upload-success',
                        fail: 'upload-fail'
                    },
                    messages: {
                        typeError: utility.getLanguageResource('FileUploaderTypeErrorText'),
                        sizeError: utility.getLanguageResource('FileUploaderSizeErrorText'),
                        minSizeError: utility.getLanguageResource('FileUploaderMinSizeErrorText'),
                        emptyError: utility.getLanguageResource('FileUploaderEmptyErrorText'),
                        onLeave: utility.getLanguageResource('FileUploaderOnLeaveText'),
                        limitError: utility.getLanguageResource('PhotoLimitText')
                    },
                    onProgress: function(id, fileName, loaded, total, listItem) {
                        $(listItem).closest('table').closest('div.axero-file-upload-window').show();
                    },
                    onCompleteAll: function() {


                    },
                    debug: !communifire.isRelease
                };

                if (o.action) {
                    defaults.request['endpoint'] = o.action;
                }
                if (o.params) {
                    defaults.request['params'] = o.params;
                }
                if (o.sizeLimit) {
                    defaults.validation['sizeLimit'] = o.sizeLimit;
                }
                if (o.allowedExtensions) {
                    defaults.validation['allowedExtensions'] = o.allowedExtensions;
                }
                if (o.onComplete) {
                    defaults.callbacks['onComplete'] = o.onComplete;
                }


// Extend the default options with the user supplied options
                qq.extend(defaults, o);

                //Set the arguments with the extended options

                arguments[0] = defaults;

                // call parent constructor
                qq.FineUploader.apply(this, arguments);

            };

            // inherit from CFFileUploader
            qq.extend(qq.CFChatAttachmentUploader.prototype, qq.FineUploader.prototype);


            qq.extend(qq.CFChatAttachmentUploader.prototype, {
                _find: function(parent, type) {
                    if (!parent) {
                        return;
                    }
                    var element = qq(parent).getByClass(this._options.classes[type])[0];
                    //if (!element){
                    //    throw new Error('element not found ' + type);
                    //}

                    return element;
                },
                getItemByFileId: function(id) {
                    var item = this._listElement.firstChild;
                    item = $('div[data-qqfileid=' + id + ']');
                    if (item.length == 0) {
                        return [];
                    }
                    return item[0];
                },
                _clearList: function() {
                    // this._listElement.innerHTML = '';
                    this.clearStoredFiles();
                },
                _uploadFile: function(fileContainer) {
                    var id = this._handler.add(fileContainer);
                    var fileName = this._handler.getName(id);

                    if (this._options.callbacks.onSubmit(id, fileName) !== false) {
                        this._onSubmit(id, fileName);
                        var self = this;
                        this._addToListCustom(id, ui.getActiveRoomID(), fileName, fileContainer.size).done(function(p) {
                            //alert(p.firstName + " saved.");

                            if (self._options.autoUpload) {
                                self._handler.upload(id, self._options.request.params);
                            } else {
                                self._storeFileForLater(id);
                            }
                        });
                    }
                },
                _onProgress: function(id, fileName, loaded, total) {
                    qq.FineUploaderBasic.prototype._onProgress.apply(this, arguments);

                    var p;
                    p = Math.round(loaded / total * 100);


                    var percentText = p + '%';
                    var item, progressBar, text, cancelLink, size, percentage, container;
                    container = getFileProgressContainer(id)
                    container.find(fileProgressBarContainer).css('width', percentText);
                    container.find(fileProgressPercentageContainer).html(percentText);

                    //qq(progressBar).css({ width: percent + '%' });
                    //qq(percentage).setText(percentText);
                    //var item, progressBar, text, cancelLink, size;

                    //// Get the row of single file
                    ////item = this. (id);
                    //item = $('div[data-qqfileid=' + id + ']')[0];
                    //// Get progress bar inside this row
                    //progressBar = this._find(item, 'progressBar');


//if (loaded === total) {
                    //    if (item) {
                    //        cancelLink = this._find(item, 'cancel');
                    //        qq(cancelLink).hide();

                    //        qq(progressBar).hide();
                    //        $(progressBar).parent().hide();

                    //        qq(this._find(item, 'statusText')).setText(this._options.text.waitingForResponse);

                    //        // If last byte was sent, just display final size
                    //        text = this._formatSize(total);
                    //    }
                    //}
                    //else {
                    //    // If still uploading, display percentage
                    //    text = this._formatProgress(loaded, total);

                    //    qq(progressBar).css({ display: 'block' });
                    //}

                    //// Update progress bar element
                    //qq(progressBar).css({ width: percent + '%' });

                    //size = this._find(item, 'size');
                    //qq(size).css({ display: 'inline' });
                    //qq(size).setText(text);
                },
                _addToList: function(id, fileName) {
                },
                _addToListCustom: function(id, threadID, fileName, fileSize) {
                    var self = this;
                    var deferred = $.Deferred();

                    var percentage = '0%';
                    //fileProgressContainer.show();
                    var fragment = $(fileAttachmentTemplate);
                    fragment.attr({ 'data-qqfileid': id, 'data-threadid': threadID });
                    fragment.find(fileProgressBarContainer).css('width', percentage);
                    fragment.find(fileProgressPercentageContainer).html(percentage);
                    fragment.find(fileProgressFileNameContainer).html(fileName);
                    deferred.resolve();
                    fragment.appendTo('body');
                    return deferred;
                },
                _onSubmit: function(id, fileName) {
                    qq.FineUploader.prototype._onSubmit.apply(this, arguments);
                },
                //_setupDragDrop: function() {
                //    var self, dropArea;

                //    self = this;

                //    if (!this._options.dragAndDrop.disableDefaultDropzone) {
                //        dropArea = $('.drag-files-container ')[0];
                //        this._options.dragAndDrop.extraDropzones.push(dropArea);
                //    }

                //    var dropzones = this._options.dragAndDrop.extraDropzones;
                //    var i;
                //    for (i = 0; i < dropzones.length; i++) {
                //        this._setupDropzone(dropzones[i]);
                //    }

                //    // IE <= 9 does not support the File API used for drag+drop uploads
                //    if (!this._options.dragAndDrop.disableDefaultDropzone && (!qq.ie() || qq.ie10())) {
                //        this._attach(document, 'dragenter', function(e) {
                //            if (qq(dropArea).hasClass(self._classes.dropDisabled)) return;

                //            dropArea.style.display = 'block';
                //            for (i = 0; i < dropzones.length; i++) {
                //                dropzones[i].style.display = 'block';
                //            }

                //        });
                //    }
                //    this._attach(document, 'dragleave', function(e) {
                //        if (self._options.dragAndDrop.hideDropzones && qq.FineUploader.prototype._leaving_document_out(e)) {
                //            for (i = 0; i < dropzones.length; i++) {
                //                qq(dropzones[i]).hide();
                //            }
                //        }
                //    });
                //    qq(document).attach('drop', function(e) {
                //        if (self._options.dragAndDrop.hideDropzones) {
                //            for (i = 0; i < dropzones.length; i++) {
                //                qq(dropzones[i]).hide();
                //            }
                //        }
                //        e.preventDefault();
                //    });
                //},
                _bindCancelAndRetryEvents: function() {
                    var self = this,
                        list = this._listElement;
                    $(document).on('click', fileProgressCancelLink, function(e) {
                        e = e || window.event;
                        var target = e.target || e.srcElement;

                        if (qq(target).hasClass(self._classes.cancel) || qq(target).hasClass(self._classes.retry)) {
                            qq.preventDefault(e);

                            var $item = $(target).closest('div[data-qqfileid]');
                            var qqfileid = $item.attr('data-qqfileid');
                            var item = $item[0];

                            if (qq(target).hasClass(self._classes.cancel)) {
                                self.cancel(qqfileid);
                                qq(item).remove();
                                //deleteMessageInner($item);
                            } else {
                                qq(item).removeClass(self._classes.retryable);
                                self.retry(qqfileid);
                            }
                        }
                    });
                },
                _bindCancelEvent: function() {
                    var self = this,
                        list = this._listElement;

                    qq.attach(list, keys.click, function(e) {
                        e = e || window.event;
                        var target = e.target || e.srcElement;

                        if (qq.hasClass(target, self._classes.cancel)) {
                            qq.preventDefault(e);

                            //var item = target.parentNode;
                            var item = target.parentNode.parentNode.parentNode;
                            self._handler.cancel(item.qqFileId);
                            qq.remove(item);
                        }
                    });
                },
                _onComplete: function(id, fileName, result) {
                    // mark completed
                    //alert('fileuploaded');
                    var item = this.getItemByFileId(id);

                    qq(this._find(item, 'statusText')).clearText();

                    qq(item).removeClass(this._classes.retrying);
                    qq(this._find(item, 'progressBar')).hide();

                    if (!this._options.disableCancelForFormUploads || qq.UploadHandlerXhr.isSupported()) {
                        qq(this._find(item, 'cancel')).hide();
                    }
                    qq(this._find(item, 'spinner')).hide();
                    $(item).hide();
                    var responseData = result.ResponseData;

                    if (result.IsError == true) {
                    } else {
                        var roomName = $(item).attr('data-threadid');

                        var msg = '';
                        var viewModel = {
                            name: ui.getUserName(),
                            avatar: ui.getUserAvatar(),
                            attachment: utility.getAttachmentViewModel(responseData),
                            message: msg,
                            id: utility.newId(),
                            date: new Date(),
                            highlight: '',
                            isMine: true,
                            threadid: roomName,
                            userid: communifire.currentUserID
                        };
                        ui.addChatMessage(viewModel, roomName);

                        // Send the original attachment response to the event so that we can link that attachment with the message
                        $ui.trigger(ui.events.sendMessage, [roomName, msg, viewModel.id, false, responseData]);
                        //var threadID = $(item).attr('data-threadid');
                        //var message = new Communifire.Common.BusinessEntities.Message({
                        //    messageID: 0,
                        //    timeText: '',
                        //    messageBody: '',
                        //    messageBodyHtmlFormatted: '',
                        //    senderUserID: currentUserID,
                        //    senderUserDisplayName: currentUserDisplayName,
                        //    senderAvatarImageURL: currentUserAvatarImageURL,
                        //    messageType: Communifire.Enum.MessageType.Attachment,
                        //    threadID: threadID,
                        //    qqfileid: id,
                        //    attachment: responseData,
                        //    hasAttachment: true,
                        //});
                        //postMessage(message);
                    }

                    this._filesInProgress--;
                    if (this._filesInProgress == 0) {
                        this._options.onCompleteAll();
                    }
                },

                _validateFile: function (file) {
                    if (!this._isAllowedExtension(file.name)) {
                        alert(this._options.messages.typeError.replace("{0}", file.name).replace("{1}", allowedExtensions));
                        return false;
                    }
                    return true;
                }
            });

            var uploader = new qq.CFChatAttachmentUploader({
                element: fileuploader,
                params: { 'entityTypeID': messageEntityTypeID },
                sizeLimit: sizeLimit,
                allowedExtensions: allowedExtensions
            });
            uploader.addExtraDropzone($('.drag-files-container')[0]);
        };

    $ui.bind(uiEvents.bodyLoaded, function(ev) {
        init();
    });

})(window.jQuery, window.chat.ui, window.chat.utility, window.Communifire);