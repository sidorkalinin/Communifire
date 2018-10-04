/// <reference path="Scripts/jquery-2.0.3.js" />
/// <reference path="Scripts/jQuery.tmpl.js" />
/// <reference path="chat.utility.js" />
 
/*jshint evil:true, bitwise:false*/
(function ($, utility) {
    "use strict";

    var newUserTemplateMarkup =
            '<li data-name="${id}" data-displayname="${name}">\
            <a class="user-link">\
                <span class="msg-thread">\
                    <span class="msg-thread-avatar user${id}">\
                        <img src="${avatar}">\
                        <i class="avatar-status ${presenceClass}"></i>\
                    </span>\
                    <span class="msg-thread-info">\
                        <span class="msg-thread-name overflow-ellipsis">${name}</span>\
                    </span>\
                </span>\
            </a>\
         </li>',
        newUserListTemplateMarkup =
            '<div id="userlist-${id}" class="users">\
        <div class="user-section-label"><h5 class="userlist-header"><span class="users-online"></span> ' + utility.getLanguageResource('FooterPeopleText') + ' </h5></div>\
            <ul id="userlist-${id}-active"></ul>\
        </div>',
        newAttachmentTemplateMarkup =
        '<li id="m-${id}" mid="${messageID}" data-threadid="${threadid}" data-name="${userid}" data-timestamp="${date}" class="cl-message message current-user {{if isDeleted}}deleted{{/if}}">\
            {{if showUser}}\
            <div class="cl-message-avatar avatar-container">\
                <img src="${avatar}">\
            </div>\
            {{/if}}\
            <div class="cl-message-body">\
                {{if showUser}}\
                <div class="cl-message-user">${name}</div>\
                {{/if}}\
                <div class="cl-message-inner clearfix">\
                    <div class="message-options">\
                        <div class="status">{{if isEdited}}<i class="fa fa-pencil"></i>{{/if}}{{if isDeleted}}<i class="fa fa-trash"></i>{{/if}}</div>\
                        <div class="timestamp">${when}</div>\
                            <div class="drop">\
                                <div class="btn-group">\
                                    <a class="btn btn-link dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-chevron-circle-down"></i></a>\
                                    <ul class="dropdown-menu pull-right" data-messageid="${messageID}">\
                                        <li><a class="quote" href="#">' + utility.getLanguageResource('ChatQuoteMessageText') + '</a></li>\
                                        {{if userid == Communifire.currentUserID && Communifire.allowMessageEditDelete}}<li><a class="delete-message" href="#">' + utility.getLanguageResource('ChatRemoveMessageText') + '</a></li>{{/if}}\
                                    </ul>\
                                </div>\
                            </div>\
                    </div>\
                    <div class="message content">\
                    {{if attachment.IsImage}}\
                        <a href="${attachment.Url}" target="_blank">${attachment.Name}</a>\
                        <p class="image-attachment-container">\
                            <a class="thumbnail" href="${attachment.Url}" target="_blank">\
                                <img class="image-attachment" alt="${attachment.name}" src="${attachment.ThumbUrl}">\
                                <span class="file-download" data-href="${attachment.Url}&attachment=1" title="' + utility.getLanguageResource('FileDownloadText') + '"><i class="fa fa-download"></i></span>\
                            </a>\
                        </p>\
                    {{else}}\
                    <div class="file-container">\
                        <a class="file-link" href="${attachment.Url}" target="_blank"> <div class="row-fluid">\
                            <div class="span1 file-extension-icon">\
                                <i class="fa fa-file${attachment.ExtensionClass}"></i>\
                            </div>\
                            <div class="span11 file-info overflow-ellipsis"><h4 class="file-title overflow-ellipsis">${attachment.Name}</h4>\
                                <p class="file-meta">\
                                    ${attachment.Size} ${attachment.Extension}\
                                </p>\
                            </div>\
                            </div>\
                        </a>\
                        <span class="file-download" data-href="${attachment.Url}&attachment=1" title="' + utility.getLanguageResource('FileDownloadText') + '"><i class="fa fa-download"></i></span>\
                    </div>\
                    {{/if}}\
                </div>\
            </div>\
        </div>\
        </li>',
        newMessageTemplateMarkup =
        '<li id="m-${id}" mid="${messageID}" data-threadid="${threadid}" data-name="${userid}" data-displayname="${name}" data-timestamp="${date}" class="cl-message message current-user {{if isDeleted}}deleted{{/if}}">\
            {{if showUser}}\
            <div class="cl-message-avatar avatar-container">\
                <img src="${avatar}">\
            </div>\
            {{/if}}\
            <div class="cl-message-body">\
                {{if showUser}}\
                <div class="cl-message-user">${name}</div>\
                {{/if}}\
                <div class="cl-message-inner clearfix">\
                    <div class="message-options">\
                    <i class="fa fa-circle status-unread"></i><div class="message-delivery-status"><i class="${messageDeliveryStatusClass}"></i></div><div class="status">{{if isEdited}}<i class="fa fa-pencil"></i>{{/if}}{{if isDeleted}}<i class="fa fa-trash"></i>{{/if}}</div>\
                    <div class="timestamp">${when}</div>\
                            <div class="drop">\
                                <div class="btn-group">\
                                    <a class="btn btn-link dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-chevron-circle-down"></i></a>\
                                    <ul class="dropdown-menu pull-right" data-messageid="${messageID}">\
                                        <li><a class="quote" href="#">' + utility.getLanguageResource('ChatQuoteMessageText') + '</a></li>\
                                        {{if userid == Communifire.currentUserID && Communifire.allowMessageEditDelete}}<li><a class="edit-message" href="#">' + utility.getLanguageResource('ChatEditMessageText') + '</a></li><li><a class="delete-message" href="#">' + utility.getLanguageResource('ChatRemoveMessageText') + '</a></li>{{/if}}\
                                    </ul>\
                                </div>\
                            </div>\
                    </div>\
                    <div class="message content">{{html message}}</div>\
                </div>\
            </div>\
        </li>',
        newMessageHistoryTemplateMarkup =
        '<li id="m-${id}" mid="${messageID}" data-name="${name}" data-timestamp="${date}" class="cl-message message current-user">\
            {{if showUser}}\
            <div class="cl-message-avatar avatar-container">\
                <img src="${avatar}">\
            </div>\
            {{/if}}\
            <div class="cl-message-body">\
                <div class="cl-message-user">${name}</div>\
                <div class="cl-message-inner clearfix">\
                    <div class="message-options">\
                        <div class="timestamp">${when}</div>\
                    </div>\
                    <div class="message content">{{html message}}</div>\
                </div>\
            </div>\
        </li>',
        newMultiLineContentTemplateMarkup =
        '<div class="collapsible_content">\
            <div class="collapsible_box">\
                <pre class="multiline">${content}</pre>\
            </div>\
        </div>',
        newThreadTemplateMarkup =
            '<li id="tabs-${id}" data-name="${name}" class="thread-li{{if unreadMessageCount>0}} unread{{/if}}" data-threadtype="${roomType}">\
                    <a class="thread-link" ><span class="msg-thread"><span class="message-count">${unreadMessageCount}</span>\
                        <span class="msg-thread-avatar user${userID}">\
                       <img src="${roomImageUrl}" />\
                       {{if roomType==3}}<i  data-userid="${userID}" class="avatar-status ${presenceClass} "></i>{{/if}}\
                        </span>\
                        <span class="msg-thread-info"><span class="msg-thread-name overflow-ellipsis">${roomDisplayName}</span>\
                            <span class="msg-thread-date time"></span>\
                        </span>\
                        </span>\
                        <span class="thread-item-desc hide"></span>\
                        </a>\
                </li>',
        newThreadHistoryTemplateMarkup =
            '<li id="tabs-${id}" class="history-li">\
            <a class="thread-link msg-thread msg-thread-history" >\
                <span class="msg-thread-avatar user${userID}">\
                    <i class="fa fa-clock-o"></i>\
                </span>\
                <span class="msg-thread-info">' + utility.getLanguageResource('ChatHistoryText') + '\
                </span>\
            </a>\
        </li>',
        newThreadHistoryMessageTemplateMarkup =
            '<li id="tabs-history-${id}" class="ch-history-section"  data-name="${id}">\
            <a class="history-link">\
                <span class="ch-history-avatar user${userID}">\
                    <img src="${roomImageUrl}">\
                    {{if roomType==3}}<i  data-userid="${userID}" class="avatar-status ${presenceClass} "></i>{{/if}}\
                    </span>\
                <span class="ch-history-info">\
                    <span class="ch-history-date time"></span>\
                    <span class="ch-history-people overflow-ellipsis">${roomDisplayName}</span>\
                    <span class="ch-history-message clearfix">${message}</span>\
                </span>\
            </a>\
        </li>',
        newHistoryTopicTemplateMarkup =
            '<div class="cf-header cf-chat-header cf-header-history">\
             <div class="history-title">${roomDisplayName}</div>\
        </div>',
        newTopicTemplateMarkup =
        '        <div class="cf-header cf-chat-header"> \
                    <div class="person-container pull-left" >\
                        <span class="msg-thread">\
                            <span class="msg-thread-avatar user${userID}">\
                                <img src="${roomImageUrl}">\
                                {{if roomType==3}}<i class="avatar-status ${presenceClass}"></i>{{/if}}\
                            </span> \
                            <span class="msg-thread-info">\
                                <span class="msg-thread-name overflow-ellipsis">${roomDisplayName}</span>\
                                {{if roomType==3}}\
                                <span class="user-status${userID}">${presenceText}</span>\
                                {{else}}\
                                <span class="user-status"><a class="user-count-link" href="#"><span class="people-count">${count}</span> ' + utility.getLanguageResource('HeaderMenuPeopleText') + '</a></span>\
                                {{/if}}\
                                </span>\
                                <span class="msg-thread-star"><a href="#" class="favorite-link" data-threadid="${id}"><i></i></a></span>\
                                </span>\
                        </div>\
                        <div id="ManageMessageThreadContainer" class="btn-group actions pull-right">\
                         {{if (allowSkypeCallInChat) }}  <a class="btn skype-button" href="#" title="' + utility.getLanguageResource('CallSkypeText') + '"><i class="fa fa-skype"></i></a>{{/if}}\
                         {{if (isOwner==true && roomType==1)}}\
                                <a id="ManageMessageThreadLink" class="btn dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-cog"></i> <span class="caret"></span></a>\
                                <ul class="dropdown-menu">\
                                    <li id="ManageMessageThreadAnchorContainer"><a class="update-room" href="#"><i class="fa fa-cog"></i> ' + utility.getLanguageResource('UserControlSettingCamelText') + '</a></li>\
                                </ul><a class="btn" id="AddMorePeopleLink" data-threadid="${id}" href="#" title="' + utility.getLanguageResource('InboxAddPeopleText') + '"><i class="fa fa-user-plus" aria-hidden="true"></i></a>            \
                        {{/if}}\
                        {{if roomType==3}}\
                            <a class="btn" id="CreateNewGroupLink" href="#" title="' + utility.getLanguageResource('StartANewChatText') + '" data-userid="${userID}" data-name="${roomDisplayName}"><i class="fa fa-user-plus" aria-hidden="true"></i></a>            \
                        {{/if}}\
            </div>\
            </div>',
        newDateDividerTemplateMarkup =
            '<li class="day-divider ${type}" data-timestamp="${date}"><hr><div class="day-divider-label">{{html message}}</div></li>',
        newMessagesDividerTemplateMarkup =
            '<li class="day-divider new-messages" data-timestamp="${date}"><hr><div class="day-divider-label">' + utility.getLanguageResource('NewMessages') +'</div></li>',
        loadingRoomIndicatorTemplateMarkup = '<div class="loading-room alert alert-info">          <i class="fa fa-spinner fa-spin"></i> ' + utility.getLanguageResource('LoadingRoomText') + '</div>'

    // Compile the markup as a named template
    $.template("newUserTemplate", newUserTemplateMarkup);
    $.template("newUserListTemplate", newUserListTemplateMarkup);
    $.template("newAttachmentTemplate", newAttachmentTemplateMarkup);
    $.template("newMessageTemplate", newMessageTemplateMarkup);
    $.template("newMessageHistoryTemplate", newMessageHistoryTemplateMarkup);
    $.template("newMultiLineContentTemplate", newMultiLineContentTemplateMarkup);
    $.template("newThreadTemplate", newThreadTemplateMarkup);
    $.template("newThreadHistoryTemplate", newThreadHistoryTemplateMarkup);
    $.template("newThreadHistoryMessageTemplate", newThreadHistoryMessageTemplateMarkup);
    $.template("newHistoryTopicTemplate", newHistoryTopicTemplateMarkup);
    $.template("newTopicTemplate", newTopicTemplateMarkup);
    $.template("newDateDividerTemplate", newDateDividerTemplateMarkup);
    $.template("newMessagesDividerTemplate", newMessagesDividerTemplateMarkup);
    $.template("loadingRoomIndicatorTemplate", loadingRoomIndicatorTemplateMarkup);


 

    var templates = {
        process: function(templateName, data) {
            return $.tmpl(templateName, data)
        }
    };

    if (!window.chat) {
        window.chat = {};
    }

    window.chat.templates = templates;

})(window.jQuery, window.chat.utility);
