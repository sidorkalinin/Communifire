
; (function ($, window, document, chat, utility, emoji, moment, chatTemplates, communifire) {

    var $chatArea = null,
        $tabs = null,
        $recentThreads = null,
        $favThreads = null,
        $favThreadsLabel = null,
        $threadsHistory = null,
        $submitButton = null,
        $newMessage = null,
        $roomActions = null,
        $toast = null,
        $disconnectDialog = null,
        $downloadIcon = null,
        $downloadDialog = null,
        $downloadDialogButton = null,
        $downloadRange = null,
        $logout = null,
        $help = null,
        $ui = null,
        $sound = null,
        templates = null,
        focus = true,
        readOnly = false,
        Keys = { Up: 38, Down: 40, Esc: 27, Enter: 13, Return: 45, Slash: 47, Space: 32, Tab: 9, Question: 191 },
        scrollTopThreshold = 75,
        roomHistoryStartPage = 1,
        toast = window.chat.toast,
        preferences = null,
        lastCycledMessage = null,
        $helpPopup = null,
        $helpBody = null,
        helpHeight = 0,
        $shortCutHelp = null,
        $globalCmdHelp = null,
        $roomCmdHelp = null,
        $userCmdHelp = null,
        $updatePopup = null,
        $window = $(window),
        $document = $(document),
        $lobbyRoomFilterForm = null,
        lobbyLoaded = false,
        $roomFilterInput = null,
        $closedRoomFilter = null,
        $typingIndicator = null,
        typingText = null,
        connectionToServerEstablishedText = null,
        connectionToServerLostText = null,
        connectionToServerTemporarilyLostText = null,
        updatingConversationText = null,
        updateTimeout = 15000,
        $richness = null,
        lastPrivate = null,
        getMessageItem = 'getMessageItem',
        roomCache = {},
        $reloadMessageNotification = null,
        messageDeliveryStatusSelector,
        iSelector = 'i',
        popoverTimer = null,
        $connectionStatus = null,
        // $connectionStatusIcon = null,
        $connectionMessage = null,
        connectionState = -1,
        $connectionStateChangedPopover = null,
        connectionStateIcon = null,
        $connectionInfoPopover = null,
        $connectionInfoContent = null,
        $fileUploadButton = null,
        $hiddenFile = null,
        $fileRoom = null,
        $fileConnectionId = null,
        connectionInfoStatus = null,
        connectionInfoTransport = null,
        $loadingHistoryIndicator = null,
        trimRoomHistoryFrequency = 1000 * 60 * 2, // 2 minutes in ms
        $loadMoreRooms = null,
        publicRoomList = null,
        sortedRoomList = null,
        maxRoomsToLoad = 100,
        lastLoadedRoomIndex = 0,
        $lobbyPrivateRooms = null,
        $lobbyOtherRooms = null,
        $roomLoadingIndicator = null,
        $brand = null,
        $logoutLink = null,
        roomLoadingDelay = 250,
        roomLoadingTimeout = null,
        Room = chat.Room,
        $unreadNotificationCount = null,
        $splashScreen = null,
        $createRoomButton = null,
        $updateRoomButton = null,
        $changeStatus = null,
        $changeStatusLinks = null,
        idleTime = 0,
        typedMessages = {},
        virtualDirectory = communifire.virtualDirectory,
        classKey = 'class',
        clear = 'clear',
        click = 'click',
        clickTouchStart = 'click touchstart',
        blurEvent = 'blur',
        hidden = 'hidden',
        shown = 'shown',
        destroy = 'destroy',
        show = 'show',
        hide = 'hide',
        href = 'href',
        title = 'title',
        left = 'left',
        bottom = 'bottom',
        top = 'top',
        dataOriginalTitle = 'data-original-title',
        dataStatus = 'data-status',
        dataHref = 'data-href',
        dataThreadID = 'data-threadid',
        dataMessageID = 'data-mid',
        dataID = 'data-id',
        dataName = 'data-name',
        dataUserID = 'data-userid',
        idAttr = 'id',
        midAttr = 'mid',
        href = 'href',
        visibility = 'visibility',
        hidden = 'hidden',
        visible = 'visible',
        baseAvatarClass = 'avatar-status ',
        readClassName = 'read',
        readClassNameSector = '.' + readClassName,
        setLastMessagesInCacheMethodNameKey = 'setLastMessagesInCache',
        getLastMessageIDMethodNameKey = 'getLastMessageID',
        messagesSelector = '.messages',
        connectingStatusIconClassName = 'fa fa-globe',
        disconnectedStatusIconClassName = 'fa fa-exclamation-triangle',
        updatingConversationIconClassName = 'fa fa-refresh fa-spin fa-fw',
        disconnectedClassName = 'alert disconnected',
        alertClassName = 'alert',
        alertWarningClassName = 'alert alert-warning',
        alertInfoClassName = 'alert alert-info',
        alertSuccessClassName = 'alert alert-success',
        newMessagesClassName = 'new-messages',
        newMessagesClassNameSelector = '.' + newMessagesClassName,
        documentSelector = 'document',
        messagePreSelector = '#m-',
        sentClassName = 'sent',
        deliveredClassName = 'delivered',
        processingClassName = 'fa fa-clock-o',
        unreadMessageClassName = 'unread',
        unreadMessageClassNameSelector = '.' + unreadMessageClassName,
        failedMessageSelector = '.failed',
        tabsSelector = '#tabs',
        liSelector = 'li',
        $roomsToogle = null,
        $body = null,
        $roomTopicsContainer = null,
        $closeRightMenuLink = null,
        $setNotificationsLink = null,
        $usersArea = null,
        $inputMessageContainer = null,
        $createRoomModal = null,
        $addPeopleModal = null,
        $addPeopleDopdownList = null,
        $addPeopleButton = null,
        $addPeopleToGroupModal = null,
        $addPeopleToGroupDropdownList = null,
        $addPeopleToGroupButton = null,
        $newMessagesDivider = null,
        $threadTitleTextBox = null,
        $manageMessageThreadModal = null,
        $manageMessageThreadModalTitleTextBox = null,
        $manageMessageThreadModalParticipantsDropdownList = null,
        $manageMessageThreadModalSaveButton = null,
        $startDiscussionUsersDropdownList = null,
        $startDiscussionButton = null,
        muteNotificationsSoundText = utility.getLanguageResource('MuteNotificationsSoundText'),
        enableNotificationsSoundText = utility.getLanguageResource('EnableNotificationsSoundText'),
        chatQuotedText = utility.getLanguageResource('ChatQuotedText'),
        enabledSoundClass = 'fa fa-bell',
        disabledSoundClass = 'fa fa-bell-o',
        allowEnterKeyAsSubmit = communifire.allowEnterKeyAsSubmit,
        desktopNotificationImageUrl = communifire.desktopNotificationImageUrl,
        CF_CHAT_STATUS = communifire.CF_CHAT_STATUS,
        cfUtilities = communifire.Utilities,
        activeRoomName = null,
        chatDingEnabled = true,
        chatSoundUrl = communifire.chatSoundUrl,
        chatVolume = 1, // Let's keep it to 1 for now. 1 is max
        chatSoundsCache = [],
        lastMessagesCache = [],
        chatSounds = {
            MESSAGE_RECEIVED: {
                url: chatSoundUrl,
                volume: chatVolume
            }
        },
        doDomProcessing = window.doDomProcessing || function () { },// For AD this method will be defined in chat.html in mobile app, so that image can be called via XHR.
        preloadChatSound = function () {
            for (var name in chatSounds) {
                if (!chatSoundsCache[name]) {
                    var sound = chatSounds[name]
                    var audio = chatSoundsCache[name] = new window.Audio()
                    audio.volume = sound.volume
                    audio.src = sound.url
                }
            }
        },
        playChatSound = function (name) {
            var audio = chatSoundsCache[name]
            if (!audio) {
                var sound = chatSounds[name]
                if (!sound) {
                    throw new Error('Invalid sound name')
                }
                audio = chatSoundsCache[name] = new window.Audio()
                audio.volume = sound.volume
                audio.src = sound.url
            }
            audio.currentTime = 0
            audio.play()
        },
        ipcRenderer,
        notificationAPISupported = false,
        electronNotificationAPISupported = false,
        currentUserID = communifire.currentUserID,
        canPlayType = !!document.createElement('audio').canPlayType,
        chatSound,
        ui,
        getLanguageResource = utility.getLanguageResource,
        getFriendsUrl = communifire.getFriendsUrl,
        isElectronPresent = cfUtilities.isElectronPresent(),
        newLineCharacter = '\n',
        $editMessageModal,
        $editMessageTextBox,
        $editMessageButton,
        apiToken = CF_API_TOKEN,
        getSearchResultsUrl = '/users?searchUsersOnly=true&excludeCurrentUser=true&token=' + apiToken,
        chosenContainerClass = '.chosen-container';

    try {
        chatSound = canPlayType == true && chatSoundUrl
            ? new Audio(chatSoundUrl)
            : {
                play: function () {
                }
            };
    } catch (e) {
        chatSound = null;
    }
    if (isElectronPresent) {
        // Ding disabled for shell platform so that notification sound is disables for web inside shell. Prevent Duplicate notifications
        chatDingEnabled = false;
        electronNotificationAPISupported = true;

        ipcRenderer = require('electron').ipcRenderer;

        ipcRenderer.on('asynchronous-reply', function (event, response) {
            // console.log(response); 
            if (!response.IsFocused) {
                sendNotification(response.roomName, response.message);
            }
        });

    }

    if (utility.isChrome) {
        // Allow Notifications API only in Chrome since silent notification option is only available in Chrome
        if (('Notification' in window)) {

            if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        notificationAPISupported = true;
                    }
                });
            }
        }
    }

    function notifyAndToast(roomName, message) {
        if (focus === false || isElectronPresent) {
            if (message.userid != currentUserID) {
                ui.notifyRoom(roomName);
                ui.toastRoom(roomName, message);
            }
        }
    }
    function sendNotification(roomName, message) {
        var body, notification, name = message.name;
        body = message.message;
        body = cfUtilities.htmlDecode(body);
        name = cfUtilities.htmlDecode(name);
        var options;
        if (isElectronPresent) {
            //options = { body: body, 'silent': !CF_CHAT_NOTIFICATIONS_SOUND_ENABLED };

            //notification = new Notification(name, options);


            //options = { body: body, 'silent': !CF_CHAT_NOTIFICATIONS_SOUND_ENABLED };
            options = {
                body: body,
                silent: true // We'll play our own sound
            };

            var notification = new window.Notification(name, options);

            notification.onclick = function () {
                //$ui.trigger(ui.events.notificationFocus, [roomName]);
                require('electron').remote.getCurrentWindow().show();
                this.close();
            };

            if (Communifire.CF_CHAT_NOTIFICATIONS_SOUND_ENABLED) {
                playChatSound('MESSAGE_RECEIVED');
            }
        }
        //else {
        //    options = { body: body, 'silent': !CF_CHAT_NOTIFICATIONS_SOUND_ENABLED, icon: desktopNotificationImageUrl };
        //}
        //notification = new Notification(name, options);
        //notification.onclick = function () {
        //    $ui.trigger(ui.events.notificationFocus, [roomName]);
        //    this.close();
        //};
    }

    preloadChatSound();



    function toastRoom(roomName, message) {
        var response,
            isAllowed = CF_CHAT_STATUS != 4;
        if (electronNotificationAPISupported) {
            if (isAllowed) {
                //ipcRenderer = require('electron').ipcRenderer;
                //response = ipcRenderer.sendSync('synchronous-message', message);
                //if (!response.IsFocused) {
                //    sendNotification(roomName, message);
                //}

                // Send asynchronous message
                ipcRenderer.send('asynchronous-message', { 'message': message, 'roomName': roomName });
            }
        } else {
            if (notificationAPISupported && isAllowed) {
                sendNotification(roomName, message);
            }
        }

    }

    function scrollIfNecessary(callback, room) {
        var nearEnd = ui.isNearTheEnd(room);

        callback();

        if (nearEnd) {
            ui.scrollToBottom(room);
        }
    }

    function onDeleteMessagLinkClick(e) {
        e.preventDefault();
        var self = $(this),
            selectors = ui.selectors,
            messageItem = self.closest(selectors.message),
            messageID,
            threadID,
            id,
            viewModel;

        $.confirm(utility.getLanguageResource('InboxDeleteMessageConfirmText'), function () {

            messageID = messageItem.attr(midAttr);
            id = messageItem.attr(idAttr).substr(2); // Remove the "m-",
            threadID = messageItem.attr(dataThreadID);

            viewModel = {
                id: id,
                isDeleted: true,
                message: utility.getLanguageResource('ChatMessageRemovedText')
            };
            scrollIfNecessary(function () {
                ui.overwriteMessage(id, viewModel);
            }, threadID);

            $ui.trigger(ui.events.deleteMessage, [threadID, messageID]);

        });
    };

    function onEditMessageButtonClick(e) {
        e.preventDefault();
        var messageID = $editMessageModal.attr(dataMessageID),
            threadID = $editMessageModal.attr(dataThreadID),
            id = $editMessageModal.attr(dataID),
            message = $.trim($editMessageTextBox.val()),
            msg,
            viewModel;

        if (!message) {
            return;
        }

        msg = utility.encodeHtml(message);
        msg = utility.processContent(msg);

        viewModel = {
            id: id,
            message: msg
        };
        scrollIfNecessary(function () {
            ui.replaceMessageContent(viewModel);
        }, threadID);

        $editMessageTextBox.val('');
        $editMessageModal.attr({
            'data-mid': '',
            'data-threadid': '',
            'data-id': ''
        }).modal(hide);


        $ui.trigger(ui.events.editMessage, [threadID, messageID, message]);
    };

    function onEditMessageLinkClick(e) {
        e.preventDefault();
        var self = $(this),
            selectors = ui.selectors,
            messageItem = self.closest(selectors.message),
            mes = messageItem.find(selectors.messageContent),
            message,
            messageID,
            threadID,
            id;

        message = $.trim(mes.html());
        message = utility.processContentForInput(message);
        messageID = messageItem.attr(midAttr);
        id = messageItem.attr(idAttr);
        threadID = messageItem.attr(dataThreadID);

        $editMessageTextBox.val(message);

        $editMessageModal.attr({
            'data-mid': messageID,
            'data-threadid': threadID,
            'data-id': id
        }).modal(show);
    }

    function onCreateNewGroupLink(e) {
        e.preventDefault();
        var $this = $(this),
            userID = $this.attr(dataUserID),
            name = $this.attr(dataName);

        var user = {
            Key: userID,
            Value: name
        };
        var users = [];
        users.push(user);
        populateDropDownList($addPeopleDropdownList, users);
        $addPeopleModal.modal(show);
        focusChosen($addPeopleDropdownList);
    }

    function onQuoteMessageLinkClick(e) {
        e.preventDefault();
        var self = $(this),
            selectors = ui.selectors,
            messageItem = self.closest(selectors.message),
            mes = messageItem.find(selectors.messageContent),
            name = utility.decodeHtml($.trim(messageItem.attr('data-displayname'))),
            val,
            date,
            time,
            name,
            message,
            timestamp = messageItem.attr('data-timestamp');

        date = moment(timestamp).format('MMMM Do YYYY');
        time = moment(timestamp).format('h:mm a');
        message = $.trim(mes.html());
        message = utility.processContentForInput(message);
        message = message.replace(/^/gm, '> ')
        var text = String.format(chatQuotedText, date, time, name);
        text = text + newLineCharacter + message;

        val = $newMessage.val();
        val = val.replace(/\n$/, '');
        if (!val) {
            text = text + newLineCharacter + newLineCharacter;
        } else {
            text = val + newLineCharacter + text + newLineCharacter + newLineCharacter;
        }

        $newMessage.val(text);
        utility.setCaretToPos($newMessage[0], text.length);
        $newMessage.trigger('reset');
    };

    function prePopulateUsers($dropdown, jsonString) {
        if (jsonString) {
            var users = JSON.parse(jsonString);
            var items = [];
            if (users.length > 0) {
                for (var i = 0, j = users.length; i < j; i++) {
                    var user = {
                        Key: users[i].id,
                        Value: users[i].name
                    };
                    items.push(user);
                }
            }
            populateDropDownList($dropdown, items);
        }
    }

    function onAddMorePeopleLink(ev) {
        ev.preventDefault();
        var $this = $(this),
            threadID = $this.attr(dataThreadID),
            thread;

        ui.showSplashScreen();
        $ui.trigger(ui.events.addMorePeopleClick, [threadID]);
    }

    function onUpdateRoomClick(ev) {
        ev.preventDefault();
        var threadID = ui.getActiveRoomID();
        ui.showSplashScreen();
        $ui.trigger(ui.events.updateRoomClick, [threadID]);
    }

    function onUpdateRoomModalHidden() {
        $manageMessageThreadModalTitleTextBox.val('');
        populateDropDownList($manageMessageThreadModalParticipantsDropdownList);
        $manageMessageThreadModal.attr(dataThreadID, '')
    };

    function isGroupChatUsersValid(val) {
        return val.length > 1;// In group chat 2 users are must else it will be direct chat
    }
    function isManageMessageThreadModalValid() {
        var isValid = true,
            val = $manageMessageThreadModalParticipantsDropdownList.chosen().val();
        if ($.trim(val) == '') {
            isValid = false;
        }
        if (!isGroupChatUsersValid(val)) {
            return;
        }
        return isValid;
    }

    function isAddPeopleToGroupFormValid() {
        var isValid = true;
        val = $addPeopleToGroupDropdownList.chosen().val();
        if ($.trim(val) == '') {
            isValid = false;
        }
        if (!isGroupChatUsersValid(val)) {
            return;
        }
        return isValid;
    }

    function isAddPeopleFormValid() {
        var isValid = true;

        var val = $addPeopleDropdownList.chosen().val();
        if ($.trim(val) == '') {
            isValid = false;
        }
        return isValid;
    }

    function isCreatePrivateGroupFormValid() {
        var isValid = true;
        //if ($.trim(threadTitleTextBox.val()) == '') {
        //    isValid = false;
        //}
        var val = $startDiscussionUsersDropdownList.chosen().val();
        if ($.trim(val) == '') {
            isValid = false;
        }
        //var users = val.split(',');
        ////if (users.length == 1) {
        ////    return;
        ////}
        return isValid;
    }

    function onManageMessageThreadModalSaveButtonClick(ev) {
        ev.preventDefault();
        var self = $(this);
        if (isManageMessageThreadModalValid()) {
            var threadID = $manageMessageThreadModal.attr(dataThreadID),
                threadTitle = $manageMessageThreadModalTitleTextBox.val(),
                participants = $manageMessageThreadModalParticipantsDropdownList.chosen().val().join(','),
                room = {
                    ThreadTitle: threadTitle,
                    ParticipantsIds: participants
                };
            $ui.trigger(ui.events.updateRoom, [threadID, threadTitle, participants]);
            $manageMessageThreadModal.modal(hide);
        }
    };

    function applyToolTip($element, placement) {
        placement = placement || top;
        $element.tooltip({ 'placement': placement, container: 'body' });
    }

    function onAddPeopleToGroupButtonClick(ev) {
        ev.preventDefault();
        if (isAddPeopleToGroupFormValid()) {
            ev.preventDefault();
            var threadID = $addPeopleToGroupModal.attr(dataThreadID),
                participants = $addPeopleToGroupDropdownList.chosen().val().join(',');
            $ui.trigger(ui.events.updateParticipants, [threadID, participants]);
            $addPeopleToGroupModal.modal(hide);
        }
    }

    function onAddPeopleButtonClick(e) {
        e.preventDefault();
        if (isAddPeopleFormValid()) {
            var threadTitle = '',
                participants = $addPeopleDropdownList.chosen().val().join(','),
                threadType = 1, // PrivateRoom;
                room = {
                    ThreadTitle: threadTitle,
                    //ThreadDescription: threadDescription,
                    ParticipantsIds: participants,
                    ThreadType: threadType
                };
            $ui.trigger(ui.events.addRoom, [room]);
            $addPeopleModal.modal(hide);
        }
    }
    function onStartDiscussionButtonClick(e) {
        e.preventDefault();
        if (isCreatePrivateGroupFormValid()) {
            var threadTitle = $threadTitleTextBox.val(),
                //var threadDescription = $threadDescTextBox.val();
                participants = $startDiscussionUsersDropdownList.chosen().val().join(','),
                threadType = 1, // PrivateRoom;
                room = {
                    ThreadTitle: threadTitle,
                    //ThreadDescription: threadDescription,
                    ParticipantsIds: participants,
                    ThreadType: threadType
                };
            $ui.trigger(ui.events.addRoom, [room]);
            $createRoomModal.modal(hide);
        }
    }
    function focusChosen($input) {
        $input.siblings(chosenContainerClass).find('input[type="text"]').focus();
    }

    function onCreateRoomModalShown() {
        focusChosen($startDiscussionUsersDropdownList);
    }

    function onCreateRoomModalHidden() {
        $threadTitleTextBox.val('');
        populateDropDownList($startDiscussionUsersDropdownList);
    }

    function onAddPeopleModalShown() {
        focusChosen($addPeopleDropdownList);
    }

    function onAddPeopleModalHidden() {
        populateDropDownList($addPeopleDropdownList);
    }

    function onAddPeopleToGroupModalShown() {
        focusChosen($addPeopleToGroupDropdownList);
    }

    function onAddPeopleToGroupModalHidden() {
        populateDropDownList($addPeopleDropdownList);
        $addPeopleToGroupModal.attr(dataThreadID, '');
    }

    function populateDropDownList(dropDownList, data) {
        if (!dropDownList) return;
        dropDownList.find('option').removeAttr('selected').prop('selected', false);
        dropDownList.html('');
        dropDownList.trigger('chosen:updated');
        if (!data) return;
        var html = '';
        $.each(data, function (index, item) {
            html = html + "<option value='" + item.Key + "'>" + item.Value + "</option>";
        });
        dropDownList.html(html);
        dropDownList.find('option').attr('selected', 'selected').prop('selected', true);
        dropDownList.trigger('chosen:updated');
    }

    function getTypedMessage(roomName) {
        return typedMessages[roomName];
    }

    function changeTypedMessage(roomName, message) {
        typedMessages[roomName] = message;
    }

    function setConnectionStatus(className, content, iconClassName) {
        $connectionStatus.show();
        //$connectionStatus.attr('class', className);
        //$connectionStatusIcon.attr('class', iconClassName);
        $connectionMessage.html(content);
    }

    function getActiveRoomName() {
        //TODO: make this less DOM-read-ey
        return activeRoomName;
        //return $tabs.find('li.current').data('name');
    }

    function triggerFocus() {
        if (!utility.isMobile && !readOnly) {
            if (getActiveRoomName() === 'Lobby') {
                $roomFilterInput.focus();
            } else {
                $newMessage.focus();
            }
        }

        if (focus === false) {
            focus = true;
            $ui.trigger(ui.events.focusit);
        }
    }

    function markMessagesAsRead(roomID) {
        $ui.trigger(ui.events.markMessagesAsRead, [roomID]);
    }

    function processSkypeUrl($skypeButton, roomInfo) {
        var users = roomInfo.users,
            i,
            j,
            user,
            skype,
            url,
            ims = '';

        for (i = 0, j = users.length; i < j; i++) {
            user = users[i];
            skype = user.SkypeIM;
            if (skype) {
                ims = ims + ';' + skype;
            }
        }
        if (ims) {
            url = 'skype:' + ims + '?call';
            $skypeButton.attr(href, url);
            //applyToolTip($skypeButton, left);
        } else {
            $skypeButton.hide();
        }

    }

    function setFavTabVisibility() {
        if ($favThreads.is(':empty')) {
            $favThreadsLabel.hide();
        } else {
            $favThreadsLabel.show();
        }
    }

    function processFavorite(link, isFavorite) {
        var $this = link;
        var text = utility.getLanguageResource((isFavorite) ? 'RemoveFromFavorites' : 'SetAsFavoriteText');
        $this.attr('class', (isFavorite) ? 'fa fa-star' : 'fa fa-star-o')
            .attr(title, text)
            .attr(dataOriginalTitle, text);

        applyToolTip($this, bottom);
    }

    function getRoomElements(roomName) {
        var roomId = getRoomId(roomName);
        var room = new Room($('#tabs-' + roomId),
            $('#userlist-' + roomId),
            $('#userlist-' + roomId + '-owners'),
            $('#userlist-' + roomId + '-active'),
            $('#messages-' + roomId),
            $('#roomTopic-' + roomId));
        return room;
    }

    function getMessagesContainer(roomId) {
        return $(ui.selectors.messages + '-' + roomId);
    }

    function getRoomLoadingIndicator(roomId) {
        var $messagesContainer = getMessagesContainer(roomId);
        return $messagesContainer.find(ui.selectors.loadingRoom);
    }

    function getCurrentRoomElements() {
        var $tab = $tabs.find('li.current');
        var room;
        if ($tab.data('name') === 'Lobby') {
            room = new Room($tab,
                $('#userlist-lobby'),
                $('#userlist-lobby-owners'),
                $('#userlist-lobby-active'),
                $('.messages.current'),
                $('.roomTopic.current'));
        } else {
            room = new Room($tab,
                $('.users.current'),
                $('.userlist.current .owners'),
                $('.userlist.current .active'),
                $('.messages.current'),
                $('.roomTopic.current'));
        }
        return room;
    }

    function getAllRoomElements() {
        //var rooms = [];
        //$("ul#tabs > li.room, ul#tabs-dropdown > li.room").each(function() {
        //    rooms[rooms.length] = getRoomElements($(this).data("name"));
        //});
        //return rooms;
    }

    function getRoomPreference(roomName, name) {
        //return (preferences[getRoomPreferenceKey(roomName)] || {})[name];
    }

    function getActiveRoomPreference(name) {
        var room = getCurrentRoomElements();
        return getRoomPreference(room.getName(), name);
    }

    function anyRoomPreference(name, value) {
        //var rooms = $.map(getAllRoomElements(), function(r) { return "_room_" + r.getName(); });
        //for (var key in preferences) {
        //    if (rooms.indexOf(key) !== -1) {
        //        if (preferences[key][name] === value) {
        //            return true;
        //        }
        //    }
        //}
        //return false;
    }


    function getRoomNameFromHash(hash) {
        if (hash.length && hash[0] === '/') {
            hash = hash.substr(1);
        }

        var parts = hash.split('/');
        if (parts[0] === 'threads') {
            return parts[1];
        }

        return null;
    }

    function navigateToRoom(roomName) {
        activeRoomName = roomName;

        var hash = (document.location.hash || '#').substr(1),
            hashRoomName = getRoomNameFromHash(hash);

        if (hashRoomName && hashRoomName === roomName) {
            ui.setActiveRoomCore(roomName);
        } else {
            document.location.hash = '#/threads/' + roomName;
        }
    }

    function updatePeopleCount(room, roomInfo) {
        var roomTopic = room.roomTopic,
            roomUsers = room.users,
            selectors = ui.selectors,
            peopleCount = roomInfo.count;

        roomTopic.find(selectors.peopleCount).html(peopleCount);
        roomUsers.find(selectors.usersOnline).html(peopleCount);
    }

    function updateRoomTopic(roomInfo) {
        var roomName = roomInfo.name,
            room = getRoomElements(roomName),
            isFavorite = roomInfo.isFavorite,
            //var topicHtml = topic === '' ? utility.getLanguageResource('Chat_DefaultTopic', roomName) : ui.processContent(topic);
            roomTopic = room.roomTopic,
            isVisibleRoom = getCurrentRoomElements().getName() === roomName,
            viewModel,
            topicContainer,
            html,
            $favoriteLink = null,
            $threadItem = null,
            $usersCountLink = null,
            $favoriteLinkStar = null,
            $skypeButton,
            $createNewGroupLink;

        if (isVisibleRoom) {
            roomTopic.hide();
        }

        viewModel = roomInfo,
            topicContainer = room.roomTopic,
            html = chatTemplates.process(templates.topic, viewModel),
            $html = $(html);

        topicContainer.html($html);
        doDomProcessing($html);

        if (roomInfo.roomType === 1) {

            $usersCountLink = topicContainer.find(ui.selectors.usersCountLink);
            $usersCountLink.on(click, function (ev) {
                ev.preventDefault();
                $body.toggleClass(ui.classes.showRightMenu);
            });
        }

        updatePeopleCount(room, roomInfo);

        $favoriteLink = topicContainer.find(ui.selectors.favoriteLink);
        $favoriteLinkStar = $favoriteLink.find('i');
        processFavorite($favoriteLinkStar, isFavorite);

        $favoriteLink.on(click, function (ev) {
            ev.preventDefault();
            var $this = $(this),
                $star = $favoriteLink.find('i'),
                threadID = $this.attr('data-threadid'),
                isFavorite = $star.hasClass('fa-star-o');

            moveThread(threadID, isFavorite);

            $ui.trigger(ui.events.markThreadAsFavorite, [threadID, isFavorite, $favoriteLink]);

            //chatHelper.markThreadAsFavorite(threadID, isFavorite, function () {
            //    processFavorite($star, isFavorite);
            //});
        });

        if (window.allowSkypeCallInChat) {
            $skypeButton = topicContainer.find(ui.selectors.skypeButton);
            processSkypeUrl($skypeButton, roomInfo);
        }

        //$createNewGroupLink = topicContainer.find(ui.selectors.createNewGroupLink);
        //applyToolTip($createNewGroupLink, left);

        if (isVisibleRoom) {
            roomTopic.show();
        }
    }

    function setRoomLoadingIndictor(isLoading, roomName) {
        if (!isLoading) {
            var roomId = getRoomId(roomName);
            var roomLoadingIndicator = getRoomLoadingIndicator(roomId);

            var room = getRoomElements(roomName);
            if (!room.isHistory()) {
                window.setTimeout(function () {

                    roomLoadingIndicator.remove();
                    room.markLoaded();

                }, roomLoadingDelay);
            }

        }
    }

    function setRoomLoading(isLoading, roomName) {
        if (!roomName) {
            return;
        }

        if (isLoading) {
            var room = getRoomElements(roomName);
            if (!room.isInitialized()) {
                roomLoadingTimeout = window.setTimeout(function () {
                    $roomLoadingIndicator.show();
                }, roomLoadingDelay);
            }

        } else {
            if (roomLoadingTimeout) {
                clearTimeout(roomLoadingTimeout);
            }
            $roomLoadingIndicator.hide();
        }

        setRoomLoadingIndictor(isLoading, roomName);
    }

    function isFromCollapsibleContentProvider(content) {
        return content.indexOf('class="collapsible_box') > -1; // leaving off trailing " purposefully
    }

    function shouldCollapseContent(content, roomName) {
        var collapsible = isFromCollapsibleContentProvider(content),
            collapseForRoom = roomName ? getRoomPreference(roomName, 'blockRichness') : getActiveRoomPreference('blockRichness');

        return collapsible && collapseForRoom;
    }

    function collapseRichContent(content) {
        content = content.replace(/class="collapsible_box/g, 'style="display: none;" class="collapsible_box');
        return content.replace(/class="collapsible_title"/g, 'class="collapsible_title" title="' + utility.getLanguageResource('Content_DisabledMessage') + '"');
    }

    function updateRoomDate(roomName) {
        var room = getRoomElements(roomName),
            $threadItem = room.tab,
            $time = $threadItem.find(ui.selectors.time),
            now = moment(new Date());
        $time.livestamp('destroy');
        $time.livestamp(now);
    }

    function setRoomDate($threadItem, when) {
        var $time = $threadItem.find(ui.selectors.time);
        var startDate = moment(when);
        var endDate = moment(new Date());

        // Apply live stamp to active threads only. Done for performance.
        if (endDate.diff(startDate, 'days') < 2) {
            $time.livestamp(when);
        } else {
            $time.html(startDate.fromNow());
        }
    }

    function processMessage(message, roomName) {
        var collapseContent = shouldCollapseContent(message.message, roomName);

        message.when = message.date.formatTime(true);
        message.fulldate = message.date.toLocaleString();

        if (collapseContent) {
            message.message = collapseRichContent(message.message);
        }
    }

    function processMessageContent(message, roomName) {
        var collapseContent = shouldCollapseContent(message.message, roomName);

        if (collapseContent) {
            message.message = collapseRichContent(message.message);
        }
    }

    function getRoomId(roomName) {
        return window.escape(roomName.toString().toLowerCase()).replace(/[^A-Za-z0-9]/g, '_');
    }

    function getUserClassName(userName) {
        return '[data-name="' + userName + '"]';
    }

    //function getRoomPreferenceKey(roomName) {
    //    return '_room_' + roomName;
    //}

    function addHistory() {
        // Do nothing if the room exists
        // processRoomDate(roomViewModel);

        var roomDisplayName = utility.getLanguageResource('FileHistoryText'),
            roomName = roomDisplayName.toLowerCase(),
            room = getRoomElements(roomName),
            roomId,
            viewModel,
            $messages,
            $threadItem,
            scrollHandler,
            topicContainer;


        if (room.exists()) {
            return false;
        }

        roomId = getRoomId(roomName);

        // Add the tab
        viewModel = {
            id: roomName,
            name: roomName,
            roomDisplayName: roomDisplayName

        };

        $threadItem = chatTemplates.process(templates.threadHistory, viewModel).data('name', roomName).appendTo($threadsHistory);
        $threadItem.addClass('history');

        doDomProcessing($threadItem);

        $messages = $('<ul/>').attr('id', 'messages-' + roomId)
            .addClass('messages ch-history-content')
            .appendTo($chatArea)
            .hide();

        doDomProcessing($messages);

        //Room topic
        $('<div/>').attr('id', 'roomTopic-' + roomId)
            .addClass('roomTopic')
            .appendTo($chatArea)
            .hide();

        topicContainer = $('<div/>').attr('id', 'roomTopic-' + roomId)
            .addClass('roomTopic')
            .appendTo($roomTopicsContainer).hide();

        chatTemplates.process(templates.historyTopic, viewModel)
            .appendTo(topicContainer);

        scrollHandler = function () {

            // Do nothing if there's nothing else
            if ($(this).data('full') === true) {
                return;
            }

            // If you're we're near the top, raise the event, but if the scroll
            // bar is small enough that we're at the bottom edge, ignore it.
            // We have to use the ui version because the room object above is
            // not fully initialized, so there are no messages.
            if ($(this).scrollTop() + $(this).innerHeight() + scrollTopThreshold >= $(this)[0].scrollHeight) {
                //var $child = $messages.children('.message:last');
                //if ($child.length > 0) {
                $ui.trigger(ui.events.scrollRoomHistoryBottom, [roomName, roomHistoryStartPage]);
                //}
            }
        };

        // Hookup the scroll handler since event delegation doesn't work with scroll events
        $messages.bind('scroll', scrollHandler);

        // Store the scroll handler so we can remove it later
        $messages.data('scrollHandler', scrollHandler);

        //ui.setInitialized(roomName);

        lobbyLoaded = false;
        return true;
    }

    function addRoom(roomViewModel, prepend) {
        // Do nothing if the room exists
        // processRoomDate(roomViewModel);

        var roomName = roomViewModel.Name,
            room = getRoomElements(roomViewModel.Name),
            roomId = null,
            viewModel = null,
            $messages = null,
            $favoriteLink = null,
            $threadItem = null,
            $usersCountLink = null,
            $favoriteLinkStar = null,
            scrollHandler = null,
            topicContainer = null,
            $frag = null,
            roomType = roomViewModel.RoomType,
            isFavorite = roomViewModel.IsFavorite,
            when = roomViewModel.When;

        //$tabsDropdown = $tabs.last();

        if (room.exists()) {
            ui.updateRoomTab(roomViewModel, roomName, room);
            return false;
        }

        roomId = getRoomId(roomName);

        // Add the tab
        viewModel = utility.getRoomViewModel(roomViewModel);


        $frag = chatTemplates.process(templates.thread, viewModel).data('name', roomName);
        if (prepend) {
            $threadItem = $frag.prependTo((isFavorite) ? $favThreads : $recentThreads);
        } else {
            $threadItem = $frag.appendTo((isFavorite) ? $favThreads : $recentThreads);
        }

        console.log('doDomProcessing for t$hreadItem')
        doDomProcessing($threadItem);

        // when should be iso date in user timezone
        setRoomDate($threadItem, when);

        $messages = $('<ul/>').attr('id', 'messages-' + roomId)
            .addClass('messages')
            .appendTo($chatArea)
            .hide();


        // Add loading room indicator before adding any messages to room
        chatTemplates.process(templates.loadingRoomIndicatorTemplate).appendTo($messages)

        //Room topic
        $('<div/>').attr('id', 'roomTopic-' + roomId)
            .addClass('roomTopic')
            .appendTo($chatArea)
            .hide();

        topicContainer = $('<div/>').attr('id', 'roomTopic-' + roomId)
            .addClass('roomTopic')
            .appendTo($roomTopicsContainer).hide();


        if (roomType === 1) {
            // Users list should be enabled only for Group Chats
            chatTemplates.process(templates.userlist, viewModel)
                .appendTo($usersArea).hide();
        }

        doDomProcessing($usersArea);

        scrollHandler = function () {
            var messageID = null;

            // Do nothing if there's nothing else
            if ($(this).data('full') === true) {
                return;
            }

            // If you're we're near the top, raise the event, but if the scroll
            // bar is small enough that we're at the bottom edge, ignore it.
            // We have to use the ui version because the room object above is
            // not fully initialized, so there are no messages.
            if ($(this).scrollTop() <= scrollTopThreshold && !ui.isNearTheEnd(roomId)) {
                var $child = $messages.children('.message:first');
                if ($child.length > 0) {
                    //messageId = $child.attr('id').substr(2); // Remove the "m-"
                    messageID = $child.attr('mid'); // Remove the "m-"
                    $ui.trigger(ui.events.scrollRoomTop, [{ name: roomName, messageID: messageID }]);
                }
            }
        };

        // Hookup the scroll handler since event delegation doesn't work with scroll events
        $messages.bind('scroll', scrollHandler);

        // Store the scroll handler so we can remove it later
        $messages.data('scrollHandler', scrollHandler);

        //setAccessKeys();

        lobbyLoaded = false;
        if ($inputMessageContainer.css(visibility) == hidden) {
            $inputMessageContainer.css(visibility, visible);
        }

        return true;
    }

    function triggerSend() {
        if (readOnly) {
            return;
        }

        var msg = $.trim($newMessage.val()),
            //roomName = $newMessage.attr(dataThreadID),
            roomName = getActiveRoomName(),
            room = getRoomElements(roomName),

            message,
            focus = true;

        ui.removeNewMessagesDivider(roomName, room);

        if (msg) {
            if (ui.isCommand(msg)) {
                if (!ui.confirmCommand(msg)) {
                    $ui.trigger(ui.events.sendMessage, [msg, null, true]);
                }
            } else {
                // if you're in the history, you can't send mesages
                if (room.isHistory()) {
                    ui.addErrorToActiveRoom(utility.getLanguageResource('Chat_CannotSendLobby'));
                    return false;
                }

                message = utility.encodeHtml(msg);
                message = ui.processContent(message);


                // Added the message to the ui first
                var viewModel = {
                    name: ui.getUserName(),
                    avatar: ui.getUserAvatar(),
                    message: message,
                    id: utility.newId(),
                    date: new Date(),
                    highlight: '',
                    isMine: true,
                    threadid: roomName,
                    userid: currentUserID
                };

                ui.addChatMessage(viewModel, roomName);

                $ui.trigger(ui.events.sendMessage, [roomName, msg, viewModel.id, false]);
            }
        }

        $newMessage.val('');
        $newMessage.trigger('reset');
        $newMessage.focus();

        // always scroll to bottom after new message sent
        room.scrollToBottom();
        room.removeSeparator();
    }

    function setRoomHistoryCore(roomName, room, currentRoom) {
        // Reset the start page for history so that we can bring the history data from server from scratch.
        // We are not storing history in JS cache
        roomHistoryStartPage = 1;
        room.makeActive();

        //ui.updateTabOverflow();


        $inputMessageContainer.hide();
        $ui.trigger(ui.events.openHistory, [roomName]);


        //ui.toggleDownloadButton(room.isLocked());

        //ui.toggleMessageSection(room.isClosed());

        $ui.trigger(ui.events.activeRoomChanged, [roomName]);
        //triggerFocus();
        //setRoomLoading(false);
        return true;
    }

    function moveThread(threadID, isFavorite) {
        var element = $('#tabs-' + threadID);
        var nameSelector = ui.selectors.threadTitle;
        var elementText = element.find(nameSelector).text();
        var added = false;
        var targetList = (isFavorite ? $favThreads : $recentThreads)[0];

        if (isFavorite) {
            $(nameSelector, targetList).each(function () {
                var sourceText = $(this).text();
                var targetText = elementText;
                if (sourceText.localeCompare(targetText) > 0) {
                    var item = $(this).closest('li');
                    $(element).insertBefore(item).show();
                    added = true;
                    return false;

                }
            });

            if (!added) $(element).appendTo($(targetList)).show();
        } else {
            $(element).prependTo($(targetList)).show();
        }
        setFavTabVisibility();
    }

    //function addRoomToLobby(roomViewModel) {
    //}

    ui = {

        //lets store any events to be triggered as constants here to aid intellisense and avoid
        //string duplication everywhere
        events: {
            closeRoom: 'cfChat.ui.closeRoom',
            prevMessage: 'cfChat.ui.prevMessage',
            openRoom: 'cfChat.ui.openRoom',
            loadRoom: 'cfChat.ui.loadRoom',
            openHistory: 'cfChat.ui.openHistory',
            nextMessage: 'cfChat.ui.nextMessage',
            activeRoomChanged: 'cfChat.ui.activeRoomChanged',
            scrollRoomTop: 'cfChat.ui.scrollRoomTop',
            scrollRoomHistoryBottom: 'cfChat.ui.scrollRoomHistoryBottom',
            typing: 'cfChat.ui.typing',
            sendMessage: 'cfChat.ui.sendMessage',
            editMessage: 'cfChat.ui.editMessage',
            deleteMessage: 'cfChat.ui.deleteMessage',
            focusit: 'cfChat.ui.focusit',
            blurit: 'cfChat.ui.blurit',
            preferencesChanged: 'cfChat.ui.preferencesChanged',
            loggedOut: 'cfChat.ui.loggedOut',
            reloadMessages: 'cfChat.ui.reloadMessages',
            fileUploaded: 'cfChat.ui.fileUploaded',
            tabOrderChanged: 'cfChat.ui.tabOrderChanged',
            changeStatus: 'cfChat.ui.changeStatus',
            addRoom: 'cfChat.ui.addRoom',
            updateRoom: 'cfChat.ui.updateRoom',
            updateParticipants: 'cfChat.ui.updateParticipants',
            notificationFocus: 'cfChat.ui.notificationFocus',
            bodyLoaded: 'cfChat.ui.bodyLoaded',
            markMessagesAsRead: 'cfChat.ui.markMessagesAsRead',
            updateRoomClick: 'cfChat.ui.updateRoomClick',
            addMorePeopleClick: 'cfChat.ui.addMorePeopleClick',
            markThreadAsFavorite: 'cfChat.ui.markThreadAsFavorite',
            enableCurentUserNotificationsSound: 'cfChat.ui.enableCurentUserNotificationsSound',
            checkMessagesReadStatus: 'cfChat.ui.checkMessagesReadStatus'
        },
        selectors: {
            message: '.cl-message',
            messageUserAvatar: '.cl-message-avatar',
            messageUserName: '.cl-message-user',
            messageDeliveryStatus: '.message-delivery-status',
            typingIndicator: '#ch-typingIndicator',
            peopleCount: '.people-count',
            favoriteLink: '.favorite-link',
            usersCountLink: '.user-count-link',
            usersOnline: '.users-online',
            time: '.time',
            drop: '.drop',
            historyContainer: '#messages-history',
            downloadLink: '.file-download',
            updateRoom: '.update-room',
            threadTitle: '.msg-thread-name',
            messageContent: '.content',
            failedMessage: '.cl-message.failed',
            quoteLink: '.quote',
            editMessageLink: '.edit-message',
            deleteMessageLink: '.delete-message',
            dropDownMenu: '.dropdown-menu',
            dropDownToggle: '.dropdown-toggle',
            skypeButton: '.skype-button',
            createNewGroupLink: '#CreateNewGroupLink',
            addMorePeopleLink: '#AddMorePeopleLink',
            loadingRoom: '.loading-room',
            messages: '#messages'
        },
        help: {
            shortcut: 'shortcut',
            global: 'global',
            room: 'room',
            user: 'user'
        },
        classes: {
            showLeftMenu: 'show-left-menu',
            showRightMenu: 'show-right-menu',
            failedMessage: 'failed',
            reverse: 'reverse'
        },
        addRoom: addRoom,
        isRoomLoaded: function (roomName) {
            var room = getRoomElements(roomName);
            var isLoaded = room.isLoaded();
            return isLoaded;
        },
        addHistory: addHistory,
        initialize: function (state) {
            $ui = $(this);
            var def = $.Deferred();
            $.get(virtualDirectory + '/assets/chat/templates/body.html?v=' + Communifire.cfVersion, function (markup) {
                var templateName = 'bodyTemplate';
                $.template(templateName, markup);

                var data = {
                    r: {
                        LoadingPreviousMessagesText: getLanguageResource('LoadingPreviousMessagesText'),
                        GlobalCloseText: getLanguageResource('GlobalCloseText'),
                        FavoritesText: getLanguageResource('FavoritesText'),
                        RecentText: getLanguageResource('RecentText'),
                        ChatStatusOnline: getLanguageResource('ChatStatusOnline'),
                        ChatStatusAway: getLanguageResource('ChatStatusAway'),
                        ChatStatusDND: getLanguageResource('ChatStatusDND'),
                        ChatStatusInvisible: getLanguageResource('ChatStatusInvisible'),
                        HeaderLogoutText: getLanguageResource('HeaderLogoutText'),
                        ChatInputPlaceHolderText: getLanguageResource('ChatInputPlaceHolderText'),
                        GlobalDropFilesUploadText: getLanguageResource('GlobalDropFilesUploadText'),
                        StartANewChatText: getLanguageResource('StartANewChatText'),
                        GlobalTitleText: getLanguageResource('GlobalTitleText'),
                        ITTicketPeopleText: getLanguageResource('ITTicketPeopleText'),
                        GlobalSubmitText: getLanguageResource('GlobalSubmitText'),
                        GlobalCancelText: getLanguageResource('GlobalCancelText'),
                        UserControlSettingCamelText: getLanguageResource('UserControlSettingCamelText'),
                        ChatEditMessageText: getLanguageResource('ChatEditMessageText'),
                        GlobalSaveText: getLanguageResource('GlobalSaveText'),
                        InviteOthersToJoin: getLanguageResource('ChatInviteOthers'),
                        ChatFindPeopleTypeName: getLanguageResource('ChatFindPeopleTypeName'),
                        ChatStartConversation: getLanguageResource('ChatStartConversation'),
                        GlobalSearchText: getLanguageResource('GlobalSearchText'),
                        GlobalSearchResultHeaderText: getLanguageResource('GlobalSearchResultHeaderText'),
                        NoEmojiFoundText: getLanguageResource('NoEmojiFoundText'),
                        ChatConversationSettings: getLanguageResource('ChatConversationSettings'),
                        ConversationTitleTopic: getLanguageResource('ConversationTitleTopic'),
                        SpaceSaveSettingText: getLanguageResource('SpaceSaveSettingText'),
                        InboxAddPeopleText: getLanguageResource('InboxAddPeopleText'),
                        ChatAddOthers: getLanguageResource('ChatAddOthers'),
                        ChatAddPeopleTypeName: getLanguageResource('ChatAddPeopleTypeName')
                    },
                    currentUserDisplayName: communifire.currentUserDisplayName,
                    logoutUrl: communifire.logoutUrl,
                    currentUserID: communifire.currentUserID,
                    currentUserPresenceClass: communifire.currentUserPresenceClass,
                    logoutUrl: communifire.logoutUrl,
                    currentUserAvatar: communifire.currentUserAvatar,
                    appLogoUrl: communifire.appLogoUrl,
                    appName: communifire.appName,
                    homeUrl: communifire.homeUrl,
                    isMobile: utility.isMobile
                };

                var html = $.tmpl(templateName, data),
                    $html = $(html);

                $('body').prepend($html);

                doDomProcessing($html);

                $ui.trigger(ui.events.bodyLoaded);
                ui.initializePost(state);
                def.resolve();
            });
            return def;
        },
        stopPropagation: function (e) {
            console.log('Stop propagation.');
            e.stopPropagation();
        },
        hideTextbox: function () {
            document.activeElement.blur();
            $newMessage.blur();
        },
        initializePost: function (state) {
            //$ui = $(this);
            preferences = state || {};
            $chatArea = $('#chat-area');
            $tabs = $('#tabs, #tabs-dropdown');
            $recentThreads = $('#recent-threads');
            $favThreads = $('#favorite-threads');
            $favThreadsLabel = $('.favorite-thread-section-label');
            $threadsHistory = $('#threads-history');
            $submitButton = $('#send');
            $newMessage = $('#new-message');
            $roomActions = $('#room-actions');
            $toast = $('#room-preferences .toast');
            $sound = $('#room-preferences .sound');
            $richness = $('#room-preferences .richness');
            $downloadIcon = $('#room-preferences .download');
            $downloadDialog = $('#download-dialog');
            $downloadDialogButton = $('#download-dialog-button');
            $downloadRange = $('#download-range');
            $logout = $('#preferences .logout');
            $help = $('#preferences .help');
            $disconnectDialog = $('#disconnect-dialog');
            //$helpPopup = $('#jabbr-help');
            //$helpBody = $('#jabbr-help .help-body');
            //$shortCutHelp = $('#jabbr-help #shortcut');
            //$globalCmdHelp = $('#jabbr-help #global');
            //$roomCmdHelp = $('#jabbr-help #room');
            //$userCmdHelp = $('#jabbr-help #user');
            //$updatePopup = $('#jabbr-update');
            focus = true;
            $lobbyRoomFilterForm = $('#room-filter-form');
            $roomFilterInput = $('#room-filter');
            $closedRoomFilter = $('#room-filter-closed');
            $typingIndicator = $('#ch-typingIndicator');
            $changeStatusLinks = $('.ch-user-status li[data-status]');
            $changeStatus = $('#chat-user-status');
            $brand = $('#brand');
            $logoutLink = $('#LogoutLink');
            $setNotificationsLink = $('#SetNotifications');
            typingText = utility.getLanguageResource('TypingText');
            connectionToServerEstablishedText = utility.getLanguageResource('ConnectionToServerEstablished');
            connectionToServerLostText = utility.getLanguageResource('ConnectionToServerLost');
            connectionToServerTemporarilyLostText = utility.getLanguageResource('ConnectionToServerTemporarilyLost');
            updatingConversationText = utility.getLanguageResource('UpdatingConversation');

            templates = {
                userlist: 'newUserListTemplate',
                user: 'newUserTemplate',
                message: 'newMessageTemplate',
                attachment: 'newAttachmentTemplate',
                //notification: $('#new-notification-template'),
                dateDivider: 'newDateDividerTemplate',
                //separator: $('#message-separator-template'),
                //tab: $('#new-tab-template'),
                //gravatarprofile: $('#gravatar-profile-template'),
                //commandhelp: $('#command-help-template'),
                multiline: 'newMultiLineContentTemplate',
                //lobbyroom: $('#new-lobby-room-template'),
                //otherlobbyroom: $('#new-other-lobby-room-template'),
                //commandConfirm: $('#command-confirm-template'),
                //modalMessage: $('#modal-message-template'),
                thread: 'newThreadTemplate',
                threadHistory: 'newThreadHistoryTemplate',
                threadHistoryMessage: 'newThreadHistoryMessageTemplate', // item template for history in right window
                topic: 'newTopicTemplate',
                historyTopic: 'newHistoryTopicTemplate',
                loadingRoomIndicatorTemplate: 'loadingRoomIndicatorTemplate',
                newMessagesDivider: 'newMessagesDividerTemplate'
            };

            $newMessagesDivider = ui.getNewMessagesDivider();

            messageDeliveryStatusSelector = ui.selectors.messageDeliveryStatus,
                $reloadMessageNotification = $('#reloadMessageNotification');
            $fileUploadButton = $('.upload-button');
            $hiddenFile = $('#hidden-file');
            $fileRoom = $('#file-room');
            $fileConnectionId = $('#file-connection-id');
            $connectionStatus = $('#connection-status');
            $connectionMessage = $connectionStatus.find('.connection-message');
            // $connectionStatusIcon = $connectionStatus.find('i');

            $connectionStateChangedPopover = $('#connection-state-changed-popover');
            connectionStateIcon = '#popover-content-icon';
            $connectionInfoPopover = $('#connection-info-popover');
            $connectionInfoContent = $('#connection-info-content');
            connectionInfoStatus = '#connection-status';
            connectionInfoTransport = '#connection-transport';
            $loadingHistoryIndicator = $('#loadingRoomHistory');

            $loadMoreRooms = $('#load-more-rooms-item');
            $lobbyPrivateRooms = $('#lobby-private');
            $lobbyOtherRooms = $('#lobby-other');
            $roomLoadingIndicator = $('#room-loading');
            $splashScreen = $('#splash-screen');

            $unreadNotificationCount = $('#notification-unread-count');
            $createRoomButton = $('#create-room');
            $roomsToogle = $('#rooms-menu-toggle');
            $closeRightMenuLink = $('#close-right-menu');
            $body = $('body');
            $roomTopicsContainer = $('#romm-topics-container');
            $usersArea = $('#ch-users');
            $inputMessageContainer = $('#ch-message-input');

            $createRoomModal = $('#create-room-modal');
            $threadTitleTextBox = $('#ThreadTitleTextBox');
            //$threadDescTextBox = $('#ThreadTitleTextBox');
            $startDiscussionUsersDropdownList = $('#StartDiscussionUsersDropdownList');
            $startDiscussionButton = $('#StartDiscussionButton');

            $addPeopleModal = $('#add-people-modal');
            $addPeopleDropdownList = $('#AddPeopleDropdownList');
            $addPeopleButton = $('#AddPeopleButton');

            $addPeopleToGroupModal = $('#add-people-to-group-modal');
            $addPeopleToGroupDropdownList = $('#AddPeopleToGroupDropdownList');
            $addPeopleToGroupButton = $('#AddPeopleToGroupButton');

            $manageMessageThreadModal = $('#ManageMessageThreadModal');
            $manageMessageThreadModalTitleTextBox = $('#ManageMessageThreadModalTitleTextBox');
            $manageMessageThreadModalParticipantsDropdownList = $('#ManageMessageThreadModalParticipantsDropdownList');
            $manageMessageThreadModalSaveButton = $('#ManageMessageThreadModalSaveButton');


            $editMessageModal = $('#EditMessageModal');
            $editMessageTextBox = $('#EditMessageTextBox');
            $editMessageButton = $('#EditMessageButton');

            applyToolTip($createRoomButton, bottom);

            // Fix: Textarea for send message was not getting hidden on clicking outside the textbox.
            if (utility.isMobile) {
                // Hide the textarea if clicked outside.
                $document.on(clickTouchStart, function () {
                    ui.hideTextbox();
                });
                // Hide the textarea if window is focused out
                $window.on(blurEvent, function () {
                    ui.hideTextbox();
                });

                // Do not hide the text area if clicked inside the textbox to send message.

                $inputMessageContainer.on(clickTouchStart, ui.stopPropagation);

                // var inputFocused = false;
                // $newMessage.focus(function () {
                //     setTimeout(function () {
                //         inputFocused = true;
                //     }, 100);
                // });

                // $(window).click(function () {
                //     if (inputFocused == true) {
                //         $(window).focus();
                //         //var input = $('input');
                //         $newMessage.blur();
                //         inputFocused = false;
                //     }
                // });
            }

            var activateOrOpenRoom = function (roomName) {
                activeRoomName = roomName;
                var room = getRoomElements(roomName);

                //if (room.isHistory()) {
                //    ui.setRoomLoading(true, roomName);
                //    ui.setActiveRoom(roomName);
                //    $ui.trigger(ui.events.openRoom, [roomName]);
                //} else {

                if (room.isHistory()) {
                    // Chat history will always be fetched from server instead of cache
                    $ui.trigger(ui.events.scrollRoomHistoryBottom, [roomName, 1]);
                    ui.setActiveRoom(roomName);
                }
                else if (room.isLoaded()) {
                    //if (room.isHistory()) {
                    //    // Chat history will always be fetched from server instead of cache
                    //    $ui.trigger(ui.events.scrollRoomHistoryBottom, [roomName, 1]);
                    //} else {
                    if (room.isInitialized()) {
                        ui.setRoomLoading(false, roomName);
                    } else {
                        ui.setRoomLoading(true, roomName);
                    }
                    //}
                    ui.setActiveRoom(roomName);
                } else {

                    // New room is about to load so mark it as active and mark current room as inactive
                    var currentRoom = getCurrentRoomElements();
                    currentRoom.makeInactive();

                    room.makeActive();
                    // window.setTimeout(function () {
                    $ui.trigger(ui.events.openRoom, [roomName]);
                    //}, 10000);
                }

                //Close the left menu if it is opened
                $body.removeClass(ui.classes.showLeftMenu);
            };

            var setNotificationsSoundIcon = function (enableSound) {
                var link = $setNotificationsLink;
                link.attr(dataOriginalTitle, enableSound ? muteNotificationsSoundText : enableNotificationsSoundText);
                link.find('i').attr(classKey, enableSound ? enabledSoundClass : disabledSoundClass);
                Communifire.CF_CHAT_NOTIFICATIONS_SOUND_ENABLED = enableSound;
            };

            $document.on('click', '#tabs li, #tabs-dropdown li, #messages-history li', function () {
                var roomName = $(this).data('name');
                activateOrOpenRoom(roomName);

            });

            // Returns true if a cycle was triggered
            function cycleMessage(messageHistoryDirection) {
                var currentMessage = $newMessage[0].value;
                if (currentMessage.length === 0 || lastCycledMessage === currentMessage) {
                    $ui.trigger(messageHistoryDirection);
                    return true;
                }
                return false;
            }

            $newMessage.autoResize({ MaxHeight: .5 });
            $newMessage.keydown(function (ev) {
                var key = ev.keyCode || ev.which;
                switch (key) {
                    case Keys.Up:
                        if (cycleMessage(ui.events.prevMessage)) {
                            ev.preventDefault();
                        }
                        break;
                    case Keys.Down:
                        if (cycleMessage(ui.events.nextMessage)) {
                            ev.preventDefault();
                        }
                        break;
                    case Keys.Esc:
                        $(this).val('');
                        break;
                    case Keys.Enter:
                    case Keys.Return:
                        //Do nothing if shift key is pressed. We need to support multi line messages.
                        if (!ev.shiftKey) {
                            if (allowEnterKeyAsSubmit) {
                                triggerSend();
                                ev.preventDefault();
                                return false;
                            }
                        }
                    case Keys.Space:
                        // Check for "/r " to reply to last private message
                        if ($(this).val() === "/r" && lastPrivate) {
                            ui.setMessage("/msg " + lastPrivate);
                        }
                        break;
                }
            });

            $newMessage.keypress(function (ev) {
                var key = ev.keyCode || ev.which;
                if ($newMessage.val()[0] === '/' || key === Keys.Slash) {
                    return;
                }
                switch (key) {
                    case Keys.Up:
                    case Keys.Down:
                    case Keys.Esc:
                    case Keys.Enter:
                        break;
                    default:
                        $ui.trigger(ui.events.typing);
                        break;
                }
            });

            $submitButton.on(click, function (ev) {
                triggerSend();
                ev.preventDefault();
                return false;
            });


            if (!readOnly) {
                $newMessage.focus();
            }

            $changeStatusLinks.on(click, function (ev) {
                ev.preventDefault();
                var self = $(this),
                    status,
                    statusClass = self.find('i').attr(classKey);
                $changeStatus.find('i').attr(classKey, statusClass);

                status = self.attr(dataStatus);
                CF_CHAT_STATUS = status;
                $ui.trigger(ui.events.changeStatus, [status]);
            });

            $submitButton.click(function (ev) {
                triggerSend();

                ev.preventDefault();
                return false;
            });

            $roomsToogle.click(function (e) {
                e.preventDefault();
                $body.toggleClass(ui.classes.showLeftMenu);
            });

            $closeRightMenuLink.click(function (ev) {
                ev.preventDefault();
                $body.removeClass(ui.classes.showRightMenu);
            });

            // Trigger click on touch in mobile device fix
            $createRoomButton.on('touchstart', function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(this).trigger('click');
            });

            $createRoomButton.on(click, function (ev) {
                ev.preventDefault();
                $createRoomModal.modal(show);
            });

            $(document).on(click, ui.selectors.updateRoom, onUpdateRoomClick);

            $(document).on(click, ui.selectors.addMorePeopleLink, onAddMorePeopleLink);

            $createRoomModal.on(hidden, onCreateRoomModalHidden);
            $createRoomModal.on(shown, onCreateRoomModalShown);

            $addPeopleModal.on(hidden, onAddPeopleModalHidden);
            $addPeopleModal.on(shown, onAddPeopleModalShown);

            $addPeopleToGroupModal.on(hidden, onAddPeopleToGroupModalHidden);
            $addPeopleToGroupModal.on(shown, onAddPeopleToGroupModalShown);

            $startDiscussionButton.on(click, onStartDiscussionButtonClick);
            $addPeopleButton.on(click, onAddPeopleButtonClick);
            $addPeopleToGroupButton.on(click, onAddPeopleToGroupButtonClick);
            
            var chosenOptions = {
                type: 'GET',
                url: Communifire.buildApiUrl(getSearchResultsUrl),
                dataType: 'json',
                minTermLength: 2,
                afterTypeDelay: 500,
                jsonTermKey: "searchText",
                keepTypingMsg: utility.getLanguageResource('KeepTypingText'),
                lookingForMsg: utility.getLanguageResource('SearchingText')
            };
            var chosenOnResults = function (data) {
                results = [];
                $.each(data.ResponseData, function (i, item) {
                    results.push({ value: item.UserID, text: item.UserInfoDisplayName });
                });
                return results;
            };
            var chosenOptions2 = { placeholder_text_multiple: utility.getLanguageResource('TypeNamesText') };
            $startDiscussionUsersDropdownList.ajaxChosen(chosenOptions, chosenOnResults, chosenOptions2);
            $addPeopleDropdownList.ajaxChosen(chosenOptions, chosenOnResults, chosenOptions2);
            $addPeopleToGroupDropdownList.ajaxChosen(chosenOptions, chosenOnResults, chosenOptions2);
            $manageMessageThreadModalParticipantsDropdownList.ajaxChosen(chosenOptions, chosenOnResults, chosenOptions2);

            // Popup keyboard in mobile fix
            if ($(chosenContainerClass).length > 0) {
                $(chosenContainerClass).on('touchstart', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(this).trigger('mousedown');
                });
            }

            $manageMessageThreadModal.on(hidden, onUpdateRoomModalHidden);
            $manageMessageThreadModalSaveButton.on(click, onManageMessageThreadModalSaveButtonClick);
            $manageMessageThreadModalTitleTextBox.keydown(function (ev) {
                var code = ev.which;
                if (code == 13 || code == 45) {
                    $manageMessageThreadModalSaveButton.trigger(click);
                }
            });

            $window.blur(function () {
                focus = false;
                $ui.trigger(ui.events.blurit);
            });

            $window.focus(function () {
                // clear unread count in active room
                var room = getCurrentRoomElements();
                room.makeActive();

                ui.updateTabOverflow();

                if (!room.isHistory()) {
                    // markMessagesAsRead(getActiveRoomName());
                }

                triggerFocus();
            });

            $(document).on('mousemove keydown click', function () {
                if (focus === false) {
                    // Set user as active if the user come after being idle
                    //focus = true;
                    // console.log('Focused');
                    triggerFocus();
                }
            });

            $(document).on(click, '.thumbnail', function (e) {
                e.preventDefault();
                var self = $(this);

                var src = self.attr(href);

                $.magnificPopup.open({
                    items: {
                        src: src,
                    },
                    type: 'image'
                });
            });

            $editMessageModal.on(shown, function () {
                $editMessageTextBox.focus();
            });

            $editMessageTextBox.keydown(function (ev) {
                var code = ev.which;
                if (code == 13 || code == 45) {
                    if (!ev.shiftKey) {
                        $editMessageButton.trigger(click);
                    }
                }
            });

            $editMessageButton.on(click, onEditMessageButtonClick);

            $(document).on(click, ui.selectors.deleteMessageLink, onDeleteMessagLinkClick);

            $(document).on(click, ui.selectors.editMessageLink, onEditMessageLinkClick);

            $(document).on(click, ui.selectors.quoteLink, onQuoteMessageLinkClick);

            //$(document).on(click, ui.selectors.skypeButton, onSkypeButtonClick);

            $(document).on(click, ui.selectors.createNewGroupLink, onCreateNewGroupLink);

            //$(document).on(click,function(e) {
            //    $('.btn-group.open').removeClass('open');
            //})
            $(document).on(click, ui.selectors.dropDownToggle, function (ev) {
                var self = $(this),
                    selectors = ui.selectors,
                    classes = ui.classes,
                    messageItem = self.closest(selectors.message),
                    dropDownMenu = messageItem.find(selectors.dropDownMenu),
                    threadID = messageItem.attr(dataThreadID),
                    diff = $('#messages-' + threadID).height() - self.offset().top;
                if (diff < 50) {
                    dropDownMenu.addClass(classes.reverse);
                } else {
                    dropDownMenu.removeClass(classes.reverse);
                }

            });

            $(document).on(click, ui.selectors.downloadLink, function (ev) {
                ev.preventDefault();
                var self = $(this),
                    href = self.attr(dataHref);

                window.location.href = href;
                return false;
            });

            function timerIncrement() {
                idleTime = idleTime + 1;
                if (idleTime > 5) { // 5 Minutes
                    // Set the user idle
                    focus = false;
                }
            }

            //Zero the idle timer on mouse movement.
            $(this).mousemove(function (e) {
                idleTime = 0;
            });
            $(this).keypress(function (e) {
                idleTime = 0;
            });

            if (!allowEnterKeyAsSubmit) {
                $submitButton.show();
            }

            if (utility.isElectronPresent()) {
                $brand.on(click, function (ev) {
                    ev.preventDefault();
                });

                $logoutLink.on(click, function (ev) {
                    ev.preventDefault();
                    var url = $(this).attr(href);
                    window.location.href = utility.appendQueryString(url, 'RedirectToLoginPage', '1');
                });
            }

            setNotificationsSoundIcon(Communifire.CF_CHAT_NOTIFICATIONS_SOUND_ENABLED);

            $setNotificationsLink.on(click, function (e) {
                e.preventDefault();
                var link = $setNotificationsLink,
                    enableSound = link.find('i').attr(classKey) == disabledSoundClass;
                setNotificationsSoundIcon(enableSound);
                $(this).tooltip(hide);
                Communifire.CF_CHAT_NOTIFICATIONS_SOUND_ENABLED = enableSound;

                $ui.trigger(ui.events.enableCurentUserNotificationsSound, [enableSound]);
                //chatHelper.enableCurentUserNotificationsSound(enableSound, function(response) {
                //    if (!response) {
                //        return;
                //    }
                //});
            }).tooltip({ 'placement': 'top', 'container': 'body' });

            $ui.bind(ui.events.notificationFocus, function (ev, roomName) {
                window.focus();

                // focus on the room
                activateOrOpenRoom(roomName);
            });

            var confirmModalOptions = {
                confirmButtonText: utility.getLanguageResource('GlobalYesText'),
                cancelButtonText: utility.getLanguageResource('GlobalNoText')
            };
            $.confirm.defaults = $.extend({}, $.confirm.defaults, confirmModalOptions);

            emoji.init('#new-message', utility);

        },
        setUserID: function (id) {
            ui.id = parseInt(id, 0);
        },
        getUserID: function () {
            return ui.id;
        },
        getUserAvatar: function () {
            return ui.avatar;
        },
        setUserAvatar: function (avatar) {
            ui.avatar = avatar;
        },
        setUserName: function (name) {
            ui.name = name;
        },
        getUserName: function () {
            return ui.name;
        },
        handleUpdateRoomClick: function (thread) {
            var threadID = thread.ThreadID;
            $manageMessageThreadModalTitleTextBox.val(cfUtilities.htmlDecode(thread.ThreadTitleOriginal));

            prePopulateUsers($manageMessageThreadModalParticipantsDropdownList, thread.ParticipantsJsonString);

            $manageMessageThreadModal.attr(dataThreadID, threadID);
            $manageMessageThreadModal.modal(show);
            $manageMessageThreadModalTitleTextBox.focus();

            ui.hideSplashScreen();
        },
        handleAddMorePeopleClick: function (thread) {
            var threadID = thread.ThreadID;
            prePopulateUsers($addPeopleToGroupDropdownList, thread.ParticipantsJsonString);
            $addPeopleToGroupModal.attr(dataThreadID, threadID);
            $addPeopleToGroupModal.modal(show);
            focusChosen($addPeopleToGroupDropdownList);
            ui.hideSplashScreen();
        },
        handleMarkThreadAsFavorite: function ($favoriteLink, isFavorite) {
            var $star = $favoriteLink.find('i');
            processFavorite($star, isFavorite);
        },
        setSelfStatus: function (userViewModel) {
            var chatStatus = userViewModel.onlineChatStatus;
            $changeStatus.find('i').attr(classKey, 'fa fa-circle ' + userViewModel.presenceClass);
            CF_CHAT_STATUS = chatStatus;
        },
        setMessageStatus: function ($messageItem, status) {
            var $status = $messageItem.find('.status'),
                className;
            if (status == 2) {// Edited
                className = 'fa fa-pencil';
            }
            else if (status == 3) {// Deleted
                className = 'fa fa-trash';
            }
            if (className) {
                $status.html('<i class="' + className + '"></i>');
            }

        },
        deleteMessage: function (id, message) {
            var $message = ui[getMessageItem](id);
            $message.find('.content').html(message.message);
            ui.setMessageStatus($message, 3);
            $message.addClass('deleted');
        },
        overwriteMessage: function (id, message) {
            if (message.isDeleted) {
                ui.deleteMessage(id, message);
                return;
            }
            var $message = ui[getMessageItem](id);
            processMessage(message);
            if (!message.attachment) {
                $message.find('.content').html(message.message);
            }
            $message.find('.timestamp').text(message.when);
            $message.attr('id', 'm-' + message.id);
            $message.attr('mid', message.messageID);
            if (message.isEdited) {
                ui.setMessageStatus($message, 2);
            }
            $message.find(messageDeliveryStatusSelector).find(iSelector).attr(classKey, sentClassName);
        },
        replaceMessage: function (message) {
            processMessage(message);

            $(messagePreSelector + message.id).find('.content')
                .html(message.message);
        },
        replaceMessageContent: function (message) {
            processMessageContent(message);

            var $message = $('#' + message.id);

            ui.setMessageStatus($message, 2);
            $message.find('.content')
                .html(message.message);
        },
        messageExists: function (id, context) {
            context = context || document;
            return $(messagePreSelector + id, context).length > 0;
        },
        getMessagesContainer: function (roomName) {
            var room = getRoomElements(roomName),
                $messages = room.messages;
            return $messages;
        },
        roomExists: function (roomName) {
            var room = getRoomElements(roomName);
            return room.exists();
        },
        incrementRoomHistoryStartPage: function () {
            roomHistoryStartPage = roomHistoryStartPage + 1;
        },
        setUserTyping: function (userViewModel, roomName) {
            //var room = getRoomElements(roomName);
            //$user = room.getUser(userViewModel.id),
            //timeout = null;

            //// if the user is somehow missing from room, add them
            //if ($user.length === 0) {
            //    ui.addUser(userViewModel, roomName);
            //}

            // Do not show typing indicator for current user
            if (userViewModel.id === ui.getUserID()) {
                return;
            }

            ////// Mark the user as typing
            ////$user.addClass('typing');
            ////var oldTimeout = $user.data('typing');

            ////if (oldTimeout) {
            ////    clearTimeout(oldTimeout);
            ////}

            ////timeout = window.setTimeout(function () {
            ////    $user.removeClass('typing');
            ////},
            ////3000);
            ////$user.data('typing', timeout);

            var _this = this;
            if (roomName == getActiveRoomName()) {
                var indicator = $typingIndicator;
                var name = userViewModel.name;
                var id = userViewModel.id;
                var typingMessage = typingText.replace("{0}", name);
                if (indicator.find("[data-user-id=" + id + "]").length == 0) {
                    indicator.append("<span data-user-id='" + id + "'>" + typingMessage + "</span>");
                }
                if (_this.typingSignalTimeout)
                    clearTimeout(_this.typingSignalTimeout);
                _this.typingSignalTimeout = setTimeout(function () {
                    indicator.find("[data-user-id=" + id + "]").remove();
                    indicator.html('&nbsp;');
                }, 3000);
            }


        },
        markMessageAsUnread: function (id, messagesContainer) {
            var $message = ui[getMessageItem](id, messagesContainer);
            $message.addClass(unreadMessageClassName);
        },
        addChatMessageContent: function (id, content, roomName) {
            var $message = ui[getMessageItem](id),
                $middle = $message.find('.middle'),
                $body = $message.find('.content');

            if (shouldCollapseContent(content, roomName)) {
                content = collapseRichContent(content);
            }

            //$body.append(content);

            if ($middle.length === 0) {
                $body.append('<p>' + content + '</p>');
            } else {
                $middle.append(content);
            }
        },
        notifyRoom: function (roomName) {
            if (chatDingEnabled && CF_CHAT_STATUS != 4 && Communifire.CF_CHAT_NOTIFICATIONS_SOUND_ENABLED) {
                chatSound.play();
            }
        },
        updateRoomDate: updateRoomDate,
        toastRoom: toastRoom,
        addChatMessage: function (message, roomName, unread) {
            var room = getRoomElements(roomName),
                $messages = room.messages,
                $previousMessage = room.messages.children().last(),
                previousUser = null,
                previousTimestamp = new Date().addDays(1), // Tomorrow so we always see a date line
                showUserName = true,
                isMention = message.highlight,
                isNotification = message.messageType === 1;


            // load the fresh instance of room from db
            if (!room.exists()) {
                $ui.trigger(ui.events.loadRoom, [roomName, message]);
                return;
            }

            if ($previousMessage.length > 0) {
                previousUser = $previousMessage.data('name');
                previousTimestamp = new Date($previousMessage.data('timestamp') || new Date());
            }

            // Force a user name to show if a header will be displayed
            if (message.date.toDate().diffDays(previousTimestamp.toDate())) {
                previousUser = null;
            }

            // Determine if we need to show the user name next to the message
            showUserName = previousUser != message.userid && !isNotification;
            message.showUser = showUserName;
            if (!message.messageID) {
                // New message case
                // Show clock icon if the message is not submitted to server yet
                message.messageDeliveryStatusClass = message.messageDeliveryStatusClass || 'fa fa-clock-o';
            }

            processMessage(message, roomName);

            if (showUserName === false) {
                $previousMessage.addClass('continue');
            }

            // check to see if room needs a separator
            if (room.needsSeparator()) {
                // if there's an existing separator, remove it
                if (room.hasSeparator()) {
                    room.removeSeparator();
                }
                room.addSeparator();
            }

            if (isNotification === true) {
                var model = {
                    id: message.id,
                    content: message.message,
                    img: message.imageUrl,
                    source: message.source,
                    encoded: true
                };

                ui.addMessage(model, 'postedNotification', roomName);
            } else {
                if (showUserName === true) {
                    var $user = room.getUser(message.name),
                        $flag = $user.find('.flag');
                    message.flagClass = $flag.attr('class');
                    message.flagTitle = $flag.attr('title');
                }
                if (!message.attachment) {

                    this.appendMessage(chatTemplates.process(templates.message, message), room);
                } else {
                    var self = this;
                    scrollIfNecessary(function () {
                        self.appendMessage(chatTemplates.process(templates.attachment, message), room);
                    }, roomName);
                    ui.watchMessageScroll([message.id], roomName);
                }
            }

            if (unread) {
                ui.markMessageAsUnread(message.id, $messages);
            }
            if (message.htmlContent) {
                ui.addChatMessageContent(message.id, message.htmlContent, room.getName());
            }

            if (room.isInitialized()) {
                if (message.userid != currentUserID) {
                    if (isMention) {
                        // Always do sound notification for mentions if any room as sound enabled
                        if (anyRoomPreference('hasSound', true) === true) {
                            ui.notify(true);
                        }

                        if (focus === false && anyRoomPreference('canToast', true) === true) {
                            // Only toast if there's no focus (even on mentions)
                            ui.toast(message, true, roomName);
                        }
                    } else {
                        // Only toast if chat isn't focused
                        notifyAndToast(roomName, message);
                    }
                }
            }
        },
        notifyAndToast: notifyAndToast,
        initializeConnectionStatus: function (transport) {
            ////$connectionStatus.popover(getConnectionInfoPopoverOptions(transport));
        },
        setMessageDeliveryStatus: function (id, className) {
            var $message = ui[getMessageItem](id);
            $message.find(messageDeliveryStatusSelector).find(iSelector).not(readClassNameSector).attr(classKey, className);
        },
        messageDeliveredToAll: function (id, roomName) {
            ui.setMessageDeliveryStatus(id, deliveredClassName);
        },
        messageReadByAll: function (id, roomName) {
            ui.setMessageDeliveryStatus(id, readClassName);
        },
        messageThreadRead: function (roomName, userID) {
            var room = getRoomElements(roomName);
            var currentUserMessages = room.messages.find('li[data-name=' + currentUserID + ']');
            var $iSelectors = currentUserMessages.find(messageDeliveryStatusSelector).find(iSelector).not(readClassNameSector);

            // Get the message ids which are still unread
            var messageIDs = $.map($iSelectors, function (elem, index) {
                return $(elem).closest('li.message').attr('mid')
            }).join(',');
            // console.log(messageIDs);
            $ui.trigger(ui.events.checkMessagesReadStatus, messageIDs);
        },
        messageThreadDeliveredToAll: function (roomName) {
            var room = getRoomElements(roomName);
            var currentUserMessages = room.messages.find('li[data-name=' + currentUserID + ']');
            var $iSelectors = currentUserMessages.find(messageDeliveryStatusSelector).find(iSelector).not(readClassNameSector);
            $iSelectors.attr(classKey, deliveredClassName);
        },
        showUpdateUI: function () {
            $updatePopup.modal();

            window.setTimeout(function () {
                // Reload the page
                document.location = document.location.pathname;
            },
                updateTimeout);
        },
        setReadOnly: function (isReadOnly) {
            //readOnly = isReadOnly;

            //if (readOnly === true) {
            //    $hiddenFile.attr('disabled', 'disabled');
            //    $submitButton.attr('disabled', 'disabled');
            //    $newMessage.attr('disabled', 'disabled');
            //    $fileUploadButton.attr('disabled', 'disabled');
            //    $('.message.failed .resend').addClass('disabled');
            //}
            //else {
            //    $hiddenFile.removeAttr('disabled');
            //    $submitButton.removeAttr('disabled');
            //    $newMessage.removeAttr('disabled');
            //    $fileUploadButton.removeAttr('disabled');
            //    $('.message.failed .resend').removeClass('disabled');
            //}
        },
        isCommand: function (msg) {
            ////if (msg[0] === '/') {
            ////    var parts = msg.substr(1).split(' ');
            ////    if (parts.length > 0) {
            ////        var cmd = ui.getCommand(parts[0].toLowerCase());
            ////        if (cmd) {
            ////            return cmd.Name;
            ////        }
            ////    }
            ////}
            return null;
        },
        showStatus: function (status, transport) {
            // Change the status indicator here
            if (connectionState !== status) {
                if (popoverTimer) {
                    clearTimeout(popoverTimer);
                }
                connectionState = status;
                $connectionStatus.hide();
                switch (status) {
                    case 0: // Connected
                        setConnectionStatus(alertSuccessClassName, connectionToServerEstablishedText, connectingStatusIconClassName);
                        popoverTimer = setTimeout(function () {
                            $connectionStatus.hide();
                            popoverTimer = null;
                        }, 3000);
                        break;
                    case 1: // Reconnecting
                        ui[setLastMessagesInCacheMethodNameKey]();
                        setConnectionStatus(alertClassName, connectionToServerTemporarilyLostText, connectingStatusIconClassName);
                        break;
                    case 2: // Disconnected
                        ui[setLastMessagesInCacheMethodNameKey]();
                        setConnectionStatus(disconnectedClassName, connectionToServerLostText, disconnectedStatusIconClassName);
                        break;
                    case 3: // Reconnecting
                        ui[setLastMessagesInCacheMethodNameKey]();
                        setConnectionStatus(alertWarningClassName, connectionToServerTemporarilyLostText, connectingStatusIconClassName);
                        break;
                    case 4: // Updating Conversation
                        setConnectionStatus(alertInfoClassName, updatingConversationText, updatingConversationIconClassName);
                }
            }
        },
        clearRoom: function (roomName) {
            var roomId = getRoomId(roomName);
            var container = getMessagesContainer(roomId);
            container.html('');
        },
        setLastMessagesInCache: function () {
            var $tabs = $(tabsSelector).find(liSelector),
                roomName,
                lastMessageID;

            $.each($tabs, function (index, tab) {
                roomName = $(tab).attr(dataName);
                if (roomName) {
                    lastMessageID = ui[getLastMessageIDMethodNameKey](roomName);
                    if (lastMessageID) {
                        lastMessagesCache[roomName] = lastMessageID
                    }
                }
            });
        },
        getLastMessageID: function (roomName) {
            var room = getRoomElements(roomName),
                $messages = room.messages,
                $lastMessage = room.messages.children().not(failedMessageSelector).last(),
                lastMessageID = $lastMessage.attr(midAttr);

            return lastMessageID;
        },
        getLastMessageIDFromCache: function (roomName) {
            var lastMessageID = lastMessagesCache[roomName];
            return lastMessageID;
        },
        addNewMessagesDivider: function (roomName) {
            var room = getRoomElements(roomName),
                $messages = room.messages,
                $lastMessage = room.messages.children().last(),
                newMessagesDivider = ui.getNewMessagesDivider(),
                existingDivider = $messages.find(newMessagesClassNameSelector);

            if (!existingDivider.length) {
                newMessagesDivider.insertAfter($lastMessage);
            }
            room.setNewMessagesStatus();
        },
        removeNewMessagesDivider: function (roomName, roomElements) {
            var room = roomElements || getRoomElements(roomName),
                $messages,
                existingDivider;

            if (room.hasNewMessages()) {

                $messages = room.messages;
                existingDivider = $messages.find(newMessagesClassNameSelector);

                if (existingDivider.length) {
                    existingDivider.remove();
                }

                room.removeNewMessagesStatus();

                $messages.find(unreadMessageClassNameSelector).removeClass(unreadMessageClassName);
            }


        },
        setRoomLoading: setRoomLoading,
        setActiveRoom: navigateToRoom,
        hasFocus: function () {
            return focus;
        },
        updateUsersWindow: function (roomName) {
            var room = getRoomElements(roomName),
                $tab = room.tab;
            if ($tab.data('threadtype') == '1') {
                $body.removeClass('hide-right-menu');
            } else {
                $body.addClass('hide-right-menu');
            }
        },
        deleteTypedMessage: function (roomName) {
            delete typedMessages[roomName];
        },
        updateTypedMessage: changeTypedMessage,
        setActiveRoomCore: function (roomName) {
            var room = getRoomElements(roomName),
                isHistory = room.isHistory();

            ////loadRoomPreferences(roomName);

            if (room.isActive() && !isHistory) {
                $inputMessageContainer.show();
                // Still trigger the event (just do less overall work)
                $ui.trigger(ui.events.activeRoomChanged, [roomName]);
                if (room.isLoaded()) {
                    return true;
                }
            }

            var currentRoom = getCurrentRoomElements();

            if (room.exists()) {
                if (currentRoom.exists()) {

                    // Store the current room message
                    changeTypedMessage(getActiveRoomName(), $newMessage.val());

                    currentRoom.makeInactive();
                    if (currentRoom.isHistory()) {
                        $inputMessageContainer.show();
                    }
                }

                if (isHistory) {
                    return setRoomHistoryCore(roomName, room, currentRoom);
                }

                //$newMessage.attr(dataThreadID, roomName);

                if (room.isUnread()) {
                    markMessagesAsRead(roomName);
                }

                room.makeActive();

                // Set the message which was written before
                $newMessage.val(getTypedMessage(roomName));
                $newMessage.trigger('reset');



                //ui.updateTabOverflow();

                //ui.toggleDownloadButton(room.isLocked());

                ui.toggleMessageSection(room.isClosed());

                $ui.trigger(ui.events.activeRoomChanged, [roomName]);
                triggerFocus();
                if (room.isLoaded()) {
                    setRoomLoading(false, roomName);
                }
                return true;
            }

            return false;
        },
        setLoadingHistory: function (loadingHistory) {
            if (loadingHistory) {
                var room = getCurrentRoomElements();
                $loadingHistoryIndicator.appendTo(room.messages);
                $loadingHistoryIndicator.show();
            } else {
                $loadingHistoryIndicator.hide();
            }
        },
        setRoomTrimmable: function (roomName, canTrimMessages) {
            var room = getRoomElements(roomName);
            room.setTrimmable(canTrimMessages);
        },
        prependChatMessages: function (messages, roomName) {
            var room = getRoomElements(roomName),
                $messages = room.messages,
                $target = $messages.children().first(),
                $previousMessage = null,
                previousUser = null,
                previousTimestamp = new Date().addDays(1); // Tomorrow so we always see a date line

            if (messages.length === 0) {
                // Mark this list as full
                $messages.data('full', true);
                return;
            }

            // If our top message is a date header, it might be incorrect, so we
            // check to see if we should remove it so that it can be inserted
            // again at a more appropriate time.
            if ($target.is('.list-header.date-header')) {
                var postedDate = new Date($target.text()).toDate();
                var lastPrependDate = messages[messages.length - 1].date.toDate();

                if (!lastPrependDate.diffDays(postedDate)) {
                    $target.remove();
                    $target = $messages.children().first();
                }
            }

            // Populate the old messages
            $.each(messages, function () {
                processMessage(this, roomName);

                if ($previousMessage) {
                    previousUser = $previousMessage.data('name');
                    previousTimestamp = new Date($previousMessage.data('timestamp') || new Date());
                }

                if (this.date.toDate().diffDays(previousTimestamp.toDate())) {
                    var dateDisplay = moment(this.date);
                    ui.addMessageBeforeTarget(dateDisplay.format('dddd, MMMM Do YYYY'), 'list-header', $target)
                        .addClass('date-header')
                        .find('.right').remove(); // remove timestamp on date indicator

                    // Force a user name to show after the header
                    previousUser = null;
                }

                // Determine if we need to show the user
                this.showUser = !previousUser || previousUser !== this.name;

                // Render the new message
                var $newMessage = chatTemplates.process(templates.message, this);

                $target.before($newMessage);

                doDomProcessing($newMessage);

                if (this.showUser === false) {
                    $previousMessage.addClass('continue');
                }

                $previousMessage = $(messagePreSelector + this.id);
            });

            // If our old top message is a message from the same user as the
            // last message in our prepended history, we can remove information
            // and continue
            if ($target.is('.message') && $target.data('name') === $previousMessage.data('name')) {
                $target.find(ui.selectors.messageUserAvatar).children().not('.state').remove();
                $target.find(ui.selectors.messageUserName).remove();
                $previousMessage.addClass('continue');
            }

            // Scroll to the bottom element so the user sees there's more messages
            $target[0].scrollIntoView();
        },
        appendChatMessages: function (messages, roomName) {
            var room = getRoomElements(roomName),
                $messages = room.messages,
                $target = $messages.children().last(),
                $previousMessage = null,
                $threadItem = null,
                previousTimestamp = new Date().addDays(1); // Tomorrow so we always see a date line

            if (messages.length === 0) {
                // Mark this list as full
                $messages.data('full', true);
                return;
            }

            //// If our top message is a date header, it might be incorrect, so we
            //// check to see if we should remove it so that it can be inserted
            //// again at a more appropriate time.
            //if ($target.is('.list-header.date-header')) {
            //    var postedDate = new Date($target.text()).toDate();
            //    var lastPrependDate = messages[messages.length - 1].date.toDate();

            //    if (!lastPrependDate.diffDays(postedDate)) {
            //        $target.remove();
            //        $target = $messages.children().last();
            //    }
            //}

            // Populate the old messages
            $.each(messages, function () {
                // processMessage(this, roomName);

                if ($previousMessage) {
                    //previousUser = $previousMessage.data('name');
                    previousTimestamp = new Date($previousMessage.data('timestamp') || new Date());
                }

                //if (this.date.toDate().diffDays(previousTimestamp.toDate())) {
                //    var dateDisplay = moment(this.date);
                //    ui.addMessageBeforeTarget(dateDisplay.format('dddd, MMMM Do YYYY'), 'list-header', $target)
                //      .addClass('date-header')
                //      .find('.right').remove(); // remove timestamp on date indicator

                //    // Force a user name to show after the header
                //    previousUser = null;
                //}

                // Render the new message
                $threadItem = chatTemplates.process(templates.threadHistoryMessage, this);
                $messages.append($threadItem);

                doDomProcessing($threadItem);

                //$target.after($threadItem);

                // when should be iso date in user timezone
                setRoomDate($threadItem, this.when);

                if (this.showUser === false) {
                    $previousMessage.addClass('continue');
                }

                $previousMessage = $(messagePreSelector + this.id);
            });

            // If our old top message is a message from the same user as the
            // last message in our prepended history, we can remove information
            // and continue
            if ($target.is('.message') && $target.data('name') === $previousMessage.data('name')) {
                $target.find(ui.selectors.messageUserAvatar).children().not('.state').remove();
                $target.find(ui.selectors.messageUserName).remove();
                $previousMessage.addClass('continue');
            }

            // Scroll to the bottom element so the user sees there's more messages
            if ($target.length > 0) {
                $target[0].scrollIntoView();
            }
        },
        toggleMessageSection: function (disabledIt) {
            //if (disabledIt) {
            //    // disable send button, textarea and file upload
            //    $newMessage.attr('disabled', 'disabled');
            //    $submitButton.attr('disabled', 'disabled');
            //    $fileUploadButton.attr('disabled', 'disabled');
            //    $hiddenFile.attr('disabled', 'disabled');
            //    $('.message.failed .resend').addClass('disabled');
            //} else if (!readOnly) {
            //    // re-enable textarea button
            //    $newMessage.attr('disabled', '');
            //    $newMessage.removeAttr('disabled');

            //    // re-enable submit button
            //    $submitButton.attr('disabled', '');
            //    $submitButton.removeAttr('disabled');

            //    // re-enable file upload button
            //    $fileUploadButton.attr('disabled', '');
            //    $fileUploadButton.removeAttr('disabled');
            //    $hiddenFile.attr('disabled', '');
            //    $hiddenFile.removeAttr('disabled');

            //    // re-enable send failed message button
            //    $('.message.failed .resend').removeClass('disabled');
            //}
        },
        toggleDownloadButton: function (disabled) {
            //if (disabled) {
            //    $downloadIcon.addClass("off");
            //    $downloadIcon.attr("title", "download messages disabled for private rooms");
            //} else {
            //    $downloadIcon.removeClass("off");
            //    $downloadIcon.attr("title", "download messages");
            //}
        },
        run: function () {
            $.history.init(function (hash) {
                var roomName = getRoomNameFromHash(hash);

                if (roomName) {
                    if (ui.setActiveRoomCore(roomName) === false) {
                        if (roomName !== 'history') {
                            $ui.trigger(ui.events.openRoom, [roomName]);
                        }
                    }
                }
            });
            // Blank call made to initiatefind users search, done to make it fast when users types.
            $.get(getFriendsUrl);
            setFavTabVisibility();
        },
        removeUser: function (user, roomName) {
            //var room = getRoomElements(roomName),
            //$user = room.getUser(user.Name),
            //$userMessages = room.messages.find(getUserClassName(user.Name));

            //$user.data('active', 'false');
            //room.setListState(room.activeUsers);

            //$user.addClass('removing')
            //    .hide('slow', function () {
            //        var owner = $user.data('owner') || false;
            //        $(this).remove();

            //        if (owner === true) {
            //            room.setListState(room.owners);
            //        } else {
            //            room.setListState(room.activeUsers);
            //        }
            //    });

            //$userMessages.find('.user').removeClass('absent present').addClass('absent');
            var $user = $('.user' + user.id);
            var target = $user.find('i');
            var baseClass = 'avatar-status ';
            target.attr('class', baseClass + 'status-offline');
            var $userStatus = $('.user-status' + user.id);
            $userStatus.text(utility.getLanguageResource('ChatStatusOffline'));
            // console.log(user.name + ' user left');

        },
        setUserActivity: function (userViewModel) {
            var $user = $('.user' + userViewModel.id);
            var target = $user.find('i');
            var $userStatus = $('.user-status' + userViewModel.id);
            var baseClass = baseAvatarClass;
            if (userViewModel.active === true) {
                target.attr('class', baseClass + userViewModel.presenceClass)
                $userStatus.text(utility.getPresenceText(userViewModel.presenceClass));
            } else {
                // If the self user has become inactive set "focus" property equals to false
                // So that when user clicks/focuses on his creen next time we can update his activity to server
                if (userViewModel.id == window.currentUserID) {
                    focus = false;
                    // console.log('Current user is marked as away');
                }

                // User presence is not active, mark him offline.
                target.attr('class', baseClass + 'status-offline');
                $userStatus.text(utility.getLanguageResource('ChatStatusOffline'));

                //if (userViewModel.presenceClass == 'status-offline') {

                //    target.attr('class', baseClass + 'status-offline');
                //    $userStatus.text(utility.getLanguageResource('ChatStatusOffline'));
                //} else {
                //    target.attr('class', baseClass + 'status-away');
                //    $userStatus.text(utility.getLanguageResource('ChatStatusAway'));
                //}
            }

            //var $user = $('.users .user' + getUserClassName(userViewModel.name)),
            //    $inactiveSince = $user.find('.inactive-since');

            //if (userViewModel.active === true && userViewModel.afk === false) {
            //    if ($user.hasClass('inactive')) {
            //        $user.removeClass('inactive');
            //        $inactiveSince.livestamp('destroy');
            //    }

            //    $('.message-user' + getUserClassName(userViewModel.name))
            //        .removeClass('offline inactive')
            //        .addClass('active');
            //} else {
            //    if (!$user.hasClass('inactive')) {
            //        $user.addClass('inactive');

            //        $('.message-user' + getUserClassName(userViewModel.name))
            //            .removeClass('offline active')
            //            .addClass('inactive');
            //    }

            //    if (!$inactiveSince.html()) {
            //        $inactiveSince.livestamp(userViewModel.lastActive);
            //    }
            //}

            //updateNote(userViewModel, $user);
        },
        setRoomListStatuses: function (roomName) {
            var room = roomName ? getRoomElements(roomName) : getCurrentRoomElements();
            room.setListState(room.owners);
        },
        processContent: function (content) {
            return utility.processContent(content, templates, roomCache);
        },
        setInitialized: function (roomName) {
            var room = roomName ? getRoomElements(roomName) : getCurrentRoomElements();
            room.setInitialized();

        },
        updateTabOverflow: function () {
        },
        updateUnread: function (roomName, isMentioned, userID) {
            if (userID == currentUserID) {
                // No need to change the unread count for current user
                return;
            }
            var room = roomName ? getRoomElements(roomName) : getCurrentRoomElements();

            if (ui.hasFocus() && room.isActive()) {
                return;
            }

            room.updateUnread(isMentioned);
            ui.updateTabOverflow();
        },
        scrollToBottom: function (roomName) {
            var room = roomName ? getRoomElements(roomName) : getCurrentRoomElements();

            if (room.isActive()) {
                room.scrollToBottom();
            }
        },
        getActiveRoomID: getActiveRoomName,
        watchMessageScroll: function (messageIds, roomName) {
            // Given an array of message ids, if there is any embedded content
            // in it, it may cause the window to scroll off of the bottom, so we
            // can watch for that and correct it.
            messageIds = $.map(messageIds, function (id) { return messagePreSelector + id; });

            var $messages = $(messageIds.join(',')),
                $content = $messages.expandableContent(),
                room = getRoomElements(roomName),
                nearTheEndBefore = room.messages.isNearTheEnd(),
                scrollTopBefore = room.messages.scrollTop();

            if (nearTheEndBefore && $content.length > 0) {
                // Note that the load event does not bubble, so .on() is not
                // suitable here.
                $content.load(function (event) {
                    // If we used to be at the end and our scrollTop() did not
                    // change, then we can safely call scrollToBottom() without
                    // worrying about interrupting the user. We skip this if the
                    // room is already at the end in the event of multiple
                    // images loading at the same time.
                    if (!room.messages.isNearTheEnd() && scrollTopBefore === room.messages.scrollTop()) {
                        room.scrollToBottom();
                        // Reset our scrollTopBefore so we know we are allowed
                        // to move it again if another image loads and the user
                        // hasn't touched it
                        scrollTopBefore = room.messages.scrollTop();
                    }

                    // unbind the event from this object after it executes
                    $(this).unbind(event);
                });
            }
        },
        isNearTheEnd: function (roomName) {
            var room = roomName ? getRoomElements(roomName) : getCurrentRoomElements();

            return room.isNearTheEnd();
        },
        addMessageBeforeTarget: function (content, type, $target) {
            var $element = ui.prepareNotificationMessage(content, type);

            $target.before($element);

            return $element;
        },
        confirmMessage: function (id) {
            ui[getMessageItem](id).removeClass(ui.classes.failedMessage)
                .removeClass('loading');
        },
        failMessage: function (id, isCommand) {
            var $message = ui[getMessageItem](id);
            $message.removeClass('loading');
            if ($message.hasClass(ui.classes.failedMessage) === false &&
                $message.hasClass('failed-command') === false) {
                if (isCommand) {
                    $message.addClass('failed-command');
                } else {
                    $message.addClass(ui.classes.failedMessage);
                }
            }
        },
        markMessagePending: function (id) {
            var $message = ui[getMessageItem](id);

            if ($message.hasClass(ui.classes.failedMessage) === false &&
                $message.hasClass('failed-command') === false) {
                $message.addClass('loading');
            }
        },
        resendFailedMessage: function ($msg) {
            var id = $msg.attr('id').slice(2),
                threadid = $msg.attr(dataThreadID),
                msg = ui.processContent($msg.find(ui.selectors.messageContent).text());
            $msg.removeClass(ui.classes.failedMessage);
            $ui.trigger(ui.events.sendMessage, [threadid, msg, id, false]);
        },
        resendFailedMessages: function () {
            var failedItems = $(ui.selectors.failedMessage);
            $.each(failedItems, function (index, item) {
                ui.resendFailedMessage($(item));
            });
        },
        changeRoomTopic: function (roomInfo) {
            updateRoomTopic(roomInfo);
        },
        //TODO swap around type and roomName parameters for consistency
        addMessage: function (content, type, roomName) {
            var room = roomName ? getRoomElements(roomName) : getCurrentRoomElements(),
                nearEnd = room.isNearTheEnd(),
                $element = ui.prepareNotificationMessage(content, type);

            this.appendMessage($element, room);

            if (type === 'notification' && room.isLobby() === false) {
                ui.collapseNotifications($element);
            }

            if (nearEnd) {
                ui.scrollToBottom(roomName);
            }
            doDomProcessing($element);
            return $element;
        },
        updateRoom: function (roomInfo) {
            var roomName = roomInfo.name,
                displayName = roomInfo.roomDisplayName,
                room = getRoomElements(roomName);
            if (room.exists()) {
                room.clearUserList();

                $.each(roomInfo.users, function () {
                    var userViewModel = utility.getUserViewModel(this);
                    ui.addUser(userViewModel, roomName);
                    ui.setUserActivity(userViewModel);
                });

                ui.changeRoomTopic(roomInfo);

                room.tab.find(ui.selectors.threadTitle).html(displayName);
            }
        },
        getMessageItem: function (id, context) {
            context = context || document;
            return $(messagePreSelector + id, context);
        },
        addUser: function (userViewModel, roomName) {
            var room = getRoomElements(roomName),
                $user = null;
            //$userMessages = room.messages.find('.message-user' + getUserClassName(userViewModel.name));

            // Remove all users that are being removed
            room.users.find('.removing').remove();

            // Get the user element
            $user = room.getUser(userViewModel.id);

            if ($user.length) {
                return false;
            }

            $user = chatTemplates.process(templates.user, userViewModel);
            $user.data('inroom', roomName);
            $user.data('active', userViewModel.active);
            //$user.data('owner', userViewModel.owner);
            //$user.data('admin', userViewModel.admin);

            //$userMessages.removeClass('offline active inactive absent present').addClass('active present');

            room.addUser(userViewModel, $user);

            doDomProcessing($user);
            ////updateNote(userViewModel, $user);
            ////updateFlag(userViewModel, $user);

            return true;
        },
        appendMessage: function (newMessage, room) {
            // Determine if we need to show a new date header: Two conditions
            // for instantly skipping are if this message is a date header, or
            // if the room only contains non-chat messages and we're adding a
            // non-chat message.
            var isMessage = $(newMessage).is('.message');
            if (!$(newMessage).is('.date-header') && (isMessage || room.hasMessages())) {
                var lastMessage = room.messages.find('li[data-timestamp]').last(),
                    lastDate = new Date(lastMessage.data('timestamp')),
                    thisDate = new Date($(newMessage).data('timestamp'));

                if (!lastMessage.length || thisDate.toDate().diffDays(lastDate.toDate())) {
                    var dateDisplay = moment(thisDate);
                    ui.addMessage(dateDisplay.format('dddd, MMMM Do YYYY'), 'date-header list-header', room.getName())
                        .find('.right').remove(); // remove timestamp on date indicator
                }
            }

            if (isMessage) {
                room.updateMessages(true);
            }

            $(newMessage).appendTo(room.messages);

            doDomProcessing($(newMessage));
        },
        addNotification: function (message, roomName) {
            //this.addMessage(message, 'notification', roomName);
        },
        getNewMessagesDivider: function () {
            return $(chatTemplates.process(templates.newMessagesDivider));
        },
        updateRoomTab: function (roomViewModel, roomName, room) {
            var viewModel = utility.getRoomViewModel(roomViewModel),
                $roomTab = room.tab,
                $updatedRoomTab = chatTemplates.process(templates.thread, viewModel).data('name', roomName),
                isActive = room.isActive(),
                when = roomViewModel.When,
                newTabHtml = $updatedRoomTab.html();

            var $tab = $roomTab.html(newTabHtml);

            room.setTab($tab);

            setRoomDate($tab, when);

            if (isActive) {
                room.makeActive();
            }

            doDomProcessing($tab);
        },
        prepareNotificationMessage: function (options, type) {
            if (typeof options === 'string') {
                options = { content: options, encoded: false };
            }

            if (type == 'date-header list-header' || type == 'list-header') {
                // Use date divider template
                var now = new Date(),
                    message = {
                        type: type,
                        date: now,
                        message: options.encoded ? options.content : ui.processContent(options.content)
                    }
                return chatTemplates.process(templates.dateDivider, message);
            } else {


                //var now = new Date(),
                //    message = {
                //        message: options.encoded ? options.content : ui.processContent(options.content),
                //        type: type,
                //        date: now,
                //        when: now.formatTime(true),
                //        fulldate: now.toLocaleString(),
                //        img: options.img,
                //        source: options.source,
                //        id: options.id
                //    };

                //return templates.notification.tmpl(message);
            }
        },
        getState: function () {
            return preferences;
        },
        showSplashScreen: function () {
            $splashScreen.show();
        },
        hideSplashScreen: function () {
            $splashScreen.hide();
        },
        hideConnectionStatus: function () {
            $connectionStatus.hide();
        }
    };
    if (!window.chat) {
        window.chat = {};
    }
    window.chat.ui = ui;
})(window.jQuery, window, window.document, window.chat, window.chat.utility, window.Emoji, window.moment, window.chat.templates, window.Communifire);