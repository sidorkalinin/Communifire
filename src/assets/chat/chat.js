

!(function ($, connection, window, ui, utility, moment, communifire, offline) {
    "use strict";

    var chat = connection.globalHub,
        currentUserID = communifire.currentUserID,
        currentUserDisplayName = communifire.currentUserDisplayName,
        currentUserAvatar = communifire.currentUserAvatar,
        whenConnectedToInternet = communifire.whenConnectedToInternet,
        messageHistory = [],
        historyLocation = 0,
        originalTitle = document.title,
        unread = 0,
        isUnreadMessageForUser = false,
        loadingHistory = false,
        checkingStatus = false,
        typing = false,
        $ui = $(ui),
        uiEvents = ui.events,
        messageSendingDelay = 1500,
        pendingMessages = {},
        privateRooms = null,
        roomsToLoad = 0,
        roomsToLoadOnReconnect = 0,
        banDialogShown = false,
        getRoomInfoMaxRetries = 5,
        getRoomInfoRetries = 0,
        isReload = false, // is page reloading/refreshing/redirecting to other location
        getConnectionID = function () {
            return $.connection.hub.id;
        },
        unReadMessageCount = [],
        TRUE = true,
        FALSE = false,
        isConnectionLoggingEnabled = communifire.isSignalRClientConnectionLoggingEnabled || FALSE,
        isADEnabled = communifire.isADEnabled,
        connectionTransport = (isADEnabled) ? ['longPolling'] : ['webSockets', 'serverSentEvents', 'longPolling'], // For Windows AD, force "longPolling" as the default transport else it will give intermittently login prompts for websockets and others.
        connectionOptions = { transport: connectionTransport },
        connectionStateEnum = $.connection.connectionState,
        reEstablishConnection,
        reestablishConnectionInterval = 10000,
        apiToken = CF_API_TOKEN;


    connection.hub.logging = isConnectionLoggingEnabled;
    // Adds the rest-api-key too for mobile client to authenticate end user.
    connection.hub.qs = { 'Rest-Api-Key': apiToken, 'version': communifire.cfVersion };

    function getMessageViewModel(message) {
        //var re = new RegExp("\\b@?" + chat.state.name.replace(/\./g, '\\.') + "\\b", "i");
        return {
            name: message.User.Name,
            ////hash: message.User.Hash,
            //message: message.HtmlEncoded ? message.Content : ui.processContent(message.Content),
            message: message.HtmlEncoded ? message.Content : ui.processContent(message.Content),
            htmlContent: message.HtmlContent,
            id: message.ID,
            messageID: message.MessageID,
            date: moment.utc(message.When).toDate(),
            //highlight: re.test(message.Content) ? 'highlight' : '',
            //isOwn: re.test(message.User.name),
            isMine: message.User.Name === chat.state.name,
            imageUrl: message.ImageUrl,
            source: message.Source,
            messageType: message.MessageType,
            //presence: (message.UserRoomPresence || 'absent').toLowerCase(),
            status: getMessageUserStatus(message.User).toLowerCase(),
            avatar: message.User.AvatarImageURL,
            attachment: message.Attachment,
            userid: message.User.UserID,
            threadid: message.ThreadID,
            isDeleted: message.IsDeleted,
            isEdited: message.IsEdited,
            messageDeliveryStatusClass: message.MessageDeliveryStatusClass
        };
    }

    function getRoomHistoryViewModel(roomViewModel) {
        var roomName = roomViewModel.Name,
            userID = roomViewModel.UserID,
            roomType = roomViewModel.RoomType,
            roomDisplayName = roomViewModel.RoomDisplayName,
            presenceClass = roomViewModel.Presence,
            roomImageUrl = roomViewModel.RoomImageUrl,
            when = roomViewModel.When,
            message = roomViewModel.MessageBody,
            unreadMessageCount = roomViewModel.UnreadMessageCount;
        return {
            id: roomName,
            name: roomName,
            userID: userID,
            roomType: roomType,
            roomDisplayName: roomDisplayName,
            presenceClass: presenceClass,
            presenceText: utility.getPresenceText(presenceClass),
            roomImageUrl: roomImageUrl,
            when: when,
            message: message,
            unreadMessageCount: unreadMessageCount
        };

    }


    function updateUnread(room, isMentioned, userID, wasUnreadBefore) {
        if (ui.hasFocus() === false) {
            isUnreadMessageForUser = (isUnreadMessageForUser || isMentioned);

            unread = unread + 1;
        } else {
            //we're currently focused so remove
            //the * notification
            isUnreadMessageForUser = false;

            if (wasUnreadBefore) {
                chat.server.markMessagesAsRead(room);
            }
        }

        ui.updateUnread(room, isMentioned, userID);

        updateTitle();
    }

    function clearUnread() {
        isUnreadMessageForUser = false;
        var wasUnreadBefore;
        if (unread > 0) {
            wasUnreadBefore = true;
        }
        unread = 0;
        updateUnread(ui.getActiveRoomID(), false, null, wasUnreadBefore);
    }

    function failPendingMessages() {
        for (var id in pendingMessages) {
            if (pendingMessages.hasOwnProperty(id)) {
                clearTimeout(pendingMessages[id]);
                ui.failMessage(id);
                delete pendingMessages[id];
            }
        }
    }

    function isSelf(user) {
        return user.id === currentUserID;
    }

    function performLogout() {
        //TODO:
        var d = $.Deferred();
        //$.post('account/logout', {}).done(function () {
        //    d.resolveWith(null);
        //    document.location = document.location.pathname;
        //});

        return d.promise();
    }

    function logout() {
        performLogout().done(function () {
            //chat.server.send('/logout', chat.state.activeRoom)
            //    .fail(function (e) {
            //        if (e.source === 'HubException') {
            //            ui.addErrorToActiveRoom(e.message);
            //        }
            //    });
        });
    }


    function updateRoomCore(roomInfo) {
        ui.updateRoom(utility.getRoomViewModel(roomInfo));
        ui.hideSplashScreen();
    }

    function updateRoom(roomName) {
        chat.server.getRoomInfo(roomName, null)
            .done(function (roomInfo) {
                connection.hub.log('updateRoom.getRoomInfo.done(' + roomInfo + ')');
                updateRoomCore(roomInfo);
            }).fail(function (e) {
                connection.hub.log('updateRoom.getRoomInfo.failed(' + roomName + ', ' + e + ')');
                ui.hideSplashScreen();
            });
    }

    function populateRoomFromInfoOnReconnect(roomInfo, lastMessageID) {
        if (!roomInfo) {
            return;
        }
        var roomName = roomInfo.Name,
            recentMessages = roomInfo.RecentMessages;

        ui.updateRoom(utility.getRoomViewModel(roomInfo));

        //$.each(roomInfo.Users, function () {
        //    var userViewModel = utility.getUserViewModel(this);
        //    ui.addUser(userViewModel, room);
        //    ui.setUserActivity(userViewModel);
        //});

        //ui.changeRoomTopic(utility.getRoomViewModel(roomInfo));

        // Clear room before adding any message to it 
        //ui.clearRoom(room);
        // return;
        if (recentMessages.length > 0) {


            var messageIds = [],
                viewModels = [],
                $messagesContainer = ui.getMessagesContainer(roomName);

            $.each(recentMessages,
                function () {
                    var id = this.ID,
                        viewModel;
                    if (!ui.messageExists(id, $messagesContainer)) {
                        viewModel = getMessageViewModel(this);
                        messageIds.push(viewModel.id);
                        viewModels.push(viewModel);
                    }
                });

            if (viewModels.length > 0) {
                ui.addNewMessagesDivider(roomName);
            }

            $.each(viewModels,
                function () {
                    var viewModel = this;
                    connection.hub.log(viewModel);
                    ui.addChatMessage(viewModel, roomName, TRUE);
                });


            //ui.changeRoomTopic(roomInfo);

            // mark room as initialized to differentiate messages
            // that are added after initial population
            ui.setInitialized(roomName);
            ui.scrollToBottom(roomName);
            ui.setRoomListStatuses(roomName);

            // Watch the messages after the defer, since room messages
            // may be appended if we are just joining the room
            ui.watchMessageScroll(messageIds, roomName);
        }
    }

    function populateRoomFromInfo(roomInfo) {
        if (!roomInfo) {
            return;
        }
        var roomName = roomInfo.Name;

        $.each(roomInfo.Users, function () {
            var userViewModel = utility.getUserViewModel(this);
            ui.addUser(userViewModel, roomName);
            ui.setUserActivity(userViewModel);
        });

        ui.changeRoomTopic(utility.getRoomViewModel(roomInfo));
        // Clear room before adding any message to it 
        ui.clearRoom(roomName);
        var messageIds = [],
            viewModel,
            id,
            $messagesContainer = ui.getMessagesContainer(roomName);

        $.each(roomInfo.RecentMessages, function () {
            id = this.ID;
            if (!ui.messageExists(id, $messagesContainer)) {
                viewModel = getMessageViewModel(this);
                messageIds.push(viewModel.id);
                ui.addChatMessage(viewModel, roomName);
            }
        });

        //ui.changeRoomTopic(roomInfo);

        // mark room as initialized to differentiate messages
        // that are added after initial population
        ui.setInitialized(roomName);
        ui.scrollToBottom(roomName);
        ui.setRoomListStatuses(roomName);

        // Watch the messages after the defer, since room messages
        // may be appended if we are just joining the room
        ui.watchMessageScroll(messageIds, roomName);
    }

    function populateRoom(room, d, lastMessageID) {
        var deferred = d || $.Deferred();

        connection.hub.log('getRoomInfo(' + room + ')');

        // Populate the list of users rooms and messages 
        chat.server.getRoomInfo(room, lastMessageID)
            .done(function (roomInfo) {
                connection.hub.log('getRoomInfo.done(' + room + ')');
                if (lastMessageID) {
                    populateRoomFromInfoOnReconnect(roomInfo, lastMessageID);
                }
                else {
                    populateRoomFromInfo(roomInfo);
                }

                deferred.resolveWith(chat);
            })
            .fail(function (e) {
                connection.hub.log('getRoomInfo.failed(' + room + ', ' + e + ')');
                getRoomInfoRetries++;
                if (getRoomInfoRetries < getRoomInfoMaxRetries) {
                    // This was causing a forever loading screen if a user attempts to join a
                    // private room that is not in their allowed rooms list.
                    // Added a retry count so it will stop trying to populate the room
                    // and close the loading screen
                    setTimeout(function () {
                        populateRoom(room, deferred);
                    },
                        1000);
                }
                else {
                    deferred.rejectWith(chat);
                }
            });

        return deferred.promise();
    }

    function populateRooms(rooms) {
        connection.hub.log('loadRooms(' + rooms.join(', ') + ')');

        // Populate the list of users rooms and messages 
        chat.server.loadRooms(rooms)
            .done(function () {
                connection.hub.log('loadRooms.done(' + rooms.join(', ') + ')');
            })
            .fail(function (e) {
                connection.hub.log('loadRooms.failed(' + rooms.join(', ') + ', ' + e + ')');
            })
            .always(function (e) {
                ui.hideSplashScreen();
                chat.server.updateActivity();
            });
    }

    function getMessageUserStatus(user) {
        if (user.Status === 'Active' && user.IsAfk === true) {
            return 'Inactive';
        }

        return (user.Status || 'Offline');
    }

    // Save some state in a cookie
    //function updateCookie() {
    //    var state = {
    //        activeRoom: chat.state.activeRoom,
    //        preferences: ui.getState()
    //    },
    //        jsonState = window.JSON.stringify(state);

    //    $.cookie('CF_CHAT.state', jsonState, { path: '/', expires: 30 });
    //}

    function updateTitle() {
        // ugly hack via http://stackoverflow.com/a/2952386/188039
        setTimeout(function () {
            if (unread === 0) {
                document.title = originalTitle;
            } else {
                document.title = (isUnreadMessageForUser ? '*' : '') + '(' + unread + ') ' + originalTitle;
            }
        }, 200);
    }

    function scrollIfNecessary(callback, room) {
        var nearEnd = ui.isNearTheEnd(room);

        callback();

        if (nearEnd) {
            ui.scrollToBottom(room);
        }
    }

    chat.client.updateRoom = updateRoom;

    chat.client.updateRoomCore = updateRoomCore;

    chat.client.addUser = function (user, room, isOwner) {
        var viewModel = utility.getUserViewModel(user, isOwner);

        var added = ui.addUser(viewModel, room);

        if (added) {
            if (!isSelf(user)) {
                ui.addNotification(utility.getLanguageResource('Chat_UserEnteredRoom', user.Name, room), room);
            }
        }
    };

    chat.client.markInactive = function (users) {
        $.each(users, function () {
            var viewModel = utility.getUserViewModel(this);
            ui.setUserActivity(viewModel);
        });
    };

    chat.client.changeStatus = function (user) {
        user = utility.getUserViewModel(user);
        ui.setUserActivity(user);
        if (user.id == currentUserID) {
            ui.setSelfStatus(user);
        }
    };

    chat.client.updateActivity = function (user) {
        var viewModel = utility.getUserViewModel(user);
        ui.setUserActivity(viewModel);
    };

    chat.client.addMessageContent = function (id, content, room) {
        scrollIfNecessary(function () {
            ui.addChatMessageContent(id, content, room);
        }, room);

        updateUnread(room, false /* isMentioned: this is outside normal messages and user shouldn't be mentioned */);

        ui.watchMessageScroll([id], room);
    };

    var replaceMessage = function (id, message, room) {

        ui.confirmMessage(id);

        var viewModel = getMessageViewModel(message);

        scrollIfNecessary(function () {

            // Update your message when it comes from the server
            ui.overwriteMessage(id, viewModel);
        }, room);
    };

    chat.client.replaceMessage = function (id, message, room) {

        replaceMessage(id, message, room);

    };

    chat.client.addMessage = function (id, roomName) {
        chat.server.getMessage(id)
            .done(function (message) {
                var viewModel = getMessageViewModel(message);
                scrollIfNecessary(function () {
                    // Update your message when it comes from the server
                    if (ui.messageExists(viewModel.id)) {
                        ui.replaceMessage(viewModel);
                    } else {
                        ui.addChatMessage(viewModel, roomName);
                        ui.updateRoomDate(roomName)
                    }

                    // Mark this message as delivered for current user after it has been appended in UI
                    chat.server.markMessageAsDelivered(viewModel.messageID, currentUserID);

                    if (ui.hasFocus() === true) {
                        // Mark this message as delivered for current user after it has been appended in UI
                        chat.server.markMessageAsRead(viewModel.messageID, currentUserID);
                        var previousCount = unReadMessageCount[roomName] || 0;
                        unReadMessageCount[roomName] = previousCount + 1;

                        connection.hub.log('message read in focused mode');
                    } else {

                        connection.hub.log('message just delivered not read in blur mode');
                    }
                },
                    roomName);

                var isMentioned = viewModel.highlight === 'highlight';

                updateUnread(roomName, isMentioned, message.User.UserID);
            });
    };

    chat.client.leave = function (user, room) {
        user = utility.getUserViewModel(user);
        if (isSelf(user)) {
            ui.setRoomLoading(false, room);
            if (chat.state.activeRoom === room) {
                //ui.setActiveRoom('Lobby');
            }

            // ui.removeRoom(room);
        }
        else {
            ui.removeUser(user, room);
            ui.addNotification(utility.getLanguageResource('Chat_UserLeftRoom', user.Name, room), room);
        }
    }

    chat.client.reconnected = function () {
        connection.hub.log('Client reconnected');

        chat.server.joinHub(TRUE).fail(function (e) {
            connection.hub.log("Error while joining hub after reconnect: " + e.message);
            // So refresh the page, our auth token is probably gone
            performLogout();
        });
    };

    chat.client.logOnWithReconnect = function (rooms) {
        connection.hub.log('logOnWithReconnect fired');
        ui.showStatus(4);

        var firstRoomID;
        if (rooms.length > 0) {
            firstRoomID = rooms[0].Name;
        }

        $.each(rooms, function (index, room) {
            ui.addRoom(room);
        });

        var loadRoomsOnReconnect = function () {
            var filteredRooms = [],
                isRoomLoaded,
                lastMessageID,
                roomName;
            $.each(rooms, function (index, room) {
                roomName = room.Name;
                if (chat.state.activeRoom !== roomName) {
                    isRoomLoaded = ui.isRoomLoaded(roomName);
                    if (isRoomLoaded) {
                        // Populate loaded rooms only
                        filteredRooms.push(roomName);
                    }
                }
            });

            // Set the amount of rooms to load
            roomsToLoadOnReconnect = filteredRooms.length;

            $.each(filteredRooms,
                function (index, room) {

                    lastMessageID = ui.getLastMessageIDFromCache(room);


                    // Always populate the active room first then load the other rooms so it looks fast :)
                    populateRoom(room, null, lastMessageID).done(function () {

                        //ui.hideConnectionStatus();
                        roomsToLoadOnReconnect--;
                        // No rooms to load just hide the splash screen
                        if (roomsToLoadOnReconnect === 0) {
                            ui.hideConnectionStatus();
                        }
                    }).fail(function (e) {
                        roomsToLoadOnReconnect--;
                        if (roomsToLoadOnReconnect === 0) {
                            ui.hideConnectionStatus();
                        }
                        console.error("Error while populating room: ", e.message);
                    });
                });

        };

        //// Process any urls that may contain room names
        //ui.run();

        // Otherwise set the active room
        var activeRoom = this.state.activeRoom || firstRoomID,
            lastMessageID;

        if (activeRoom) {

            this.state.activeRoom = activeRoom;
            ui.setActiveRoom(activeRoom);


            lastMessageID = ui.getLastMessageIDFromCache(activeRoom);

            // Always populate the active room first then load the other rooms so it looks fast :)
            populateRoom(activeRoom, null, lastMessageID).done(function () {

                loadRoomsOnReconnect();

                // No rooms to load just hide the splash screen
                if (roomsToLoadOnReconnect === 0) {
                    ui.hideConnectionStatus();
                }
            }).fail(function (e) {
                ui.hideConnectionStatus();
                console.error("Error while populating room: ", e.message);
                roomsToLoadOnReconnect = roomsToLoadOnReconnect - 1;
                //loadRooms();
                ////display error message
                //connection.hub.log('logOn.populateRoom(' + this.state.activeRoom + ') failed');
                //ui.addMessage('Failed to populate \'' + this.state.activeRoom + '\'', 'error', this.state.activeRoom);
            });
        }
        else {

            //ui.hideSplashScreen();
            ui.hideConnectionStatus();
        }

    };

    var logOn = function(rooms, myRooms, userPreferences) {

        chat.currentUserID = chat.state.id;
        privateRooms = myRooms;
        var firstRoomID;
        if (rooms.length > 0) {
            firstRoomID = rooms[0].Name;
        }

        var loadRooms = function() {
            var filteredRooms = [];
            $.each(rooms,
                function(index, room) {
                    if (chat.state.activeRoom !== room.Name) {
                        filteredRooms.push(room.Name);
                    }
                });

            // Set the amount of rooms to load
            roomsToLoad = filteredRooms.length;

            populateRooms(filteredRooms);
        };

        $.each(rooms,
            function(index, room) {
                ui.addRoom(room);
            });



        // Called when a returning users join chat
        ////chat.client.logOn = logOn;


        ui.setUserID(currentUserID);
        ui.setUserName(currentUserDisplayName);
        ui.setUserAvatar(currentUserAvatar);
        ////ui.setUnreadNotifications(chat.state.unreadNotifications);

        // Process any urls that may contain room names
        ui.run();


        chat.state.activeRoom = communifire.activeRoom;
        ui.setActiveRoom(communifire.activeRoom);

        // Otherwise set the active room
        //ui.setActiveRoom(this.state.activeRoom || 'Lobby');
        ////var activeRoom = this.state.activeRoom || firstRoomID;

        ////if (activeRoom) {

        ////    this.state.activeRoom = activeRoom;
        ////    ui.setActiveRoom(activeRoom);

        ////    // Always populate the active room first then load the other rooms so it looks fast :)
        ////    populateRoom(activeRoom, null, null).done(function() {
        ////            //loadCommands();
        ////            //populateLobbyRooms();

        ////            ui.hideSplashScreen();
        ////            // loadRooms();

        ////            // No rooms to load just hide the splash screen
        ////            if (roomsToLoad === 0) {
        ////                ui.hideSplashScreen();
        ////            }
        ////        })
        ////        .fail(function(e) {
        ////            console.error("Error while populating room: ", e.message);
        ////            loadRooms();
        ////            //display error message
        ////            connection.hub.log('logOn.populateRoom(' + this.state.activeRoom + ') failed');
        ////            ui.addMessage('Failed to populate \'' + this.state.activeRoom + '\'',
        ////                'error',
        ////                this.state.activeRoom);
        ////        });
        ////} else {

        ////    ui.hideSplashScreen();
        ////}

        ui.hideSplashScreen();

        ui.addHistory();
        //loadRooms();

    };

    chat.client.roomLoaded = function (roomInfo) {
        populateRoomFromInfo(roomInfo);

        if (roomsToLoad === 1) {
            ui.hideSplashScreen();
        }
        else {
            if (roomsToLoad === 0) {
                ui.hideSplashScreen();
            } else {
                roomsToLoad = roomsToLoad - 1;
            }
        }
    };

    chat.client.setTyping = function (user, room) {
        var viewModel = utility.getUserViewModel(user);
        ui.setUserTyping(viewModel, room);
    };

    function loadRoom(roomName, message) {
        try {
            chat.server.getRoomInfo(roomName, null)
                .done(function (room) {
                    var added = ui.addRoom(room, true);
                    if (added) {
                        populateRoom(room.Name).done(function () {
                            if (message) {
                                ui.notifyAndToast(roomName, message);
                            }
                        });
                    }
                })
                .fail(function (e) {
                    connection.hub.log('loadRoom.failed(' + roomName + ', ' + e + ')');
                });
        }
        catch (e) {
            connection.hub.log('loadRoom.failed(' + roomName + ', ' + e + ')');
        }

    }

    function joinRoom(room) {
        if (room) {
            var roomName = room.Name;
            ui.setRoomLoading(true, roomName);
            var added = ui.addRoom(room, true);

            ui.setActiveRoom(roomName);

            //if (room.Private) {
            //    ui.setRoomLocked(room.Name);
            //}
            //if (room.Closed) {
            //    ui.setRoomClosed(room.Name);
            //}

            if (!ui.isRoomLoaded(roomName)) {
                populateRoom(roomName).done(function () {
                    ui.setRoomLoading(false, roomName);
                    ui.hideSplashScreen();
                    //ui.addNotification(utility.getLanguageResource('Chat_YouEnteredRoom', room.Name), room.Name);

                    //if (room.Welcome) {
                    //    ui.addWelcome(room.Welcome, room.Name);
                    //}
                });
            } else {
                ui.setRoomLoading(false, roomName);
                ui.hideSplashScreen();
            }

            if (room.UnreadMessageCount > 0) {
                // Since the room is active now, mark it as read for current user
                chat.server.markMessagesAsRead(roomName);
            }

        } else {
            ui.setRoomLoading(false, roomName);
            ui.hideSplashScreen();
        }
    }

    chat.client.joinRoom = joinRoom;

    chat.client.forceUpdate = function () {
        ui.showUpdateUI();
    };

    chat.client.messageDeliveredToAll = function (id, roomName) {
        ui.messageDeliveredToAll(id, roomName);
    };

    chat.client.messageReadByAll = function (id, roomName) {
        ui.messageReadByAll(id, roomName);
    };

    chat.client.messageThreadDelivered = function (threadID, userID) {
        ui.messageThreadDelivered(threadID, userID);
    };

    chat.client.messageThreadRead = function (roomName, userID) {
        ui.messageThreadRead(roomName, userID);
    };

    chat.client.testMessageToClient = function (message) {
        connection.hub.log('TestMessageToClient: ' + message);
    };

    chat.client.testMessageToRoom = function (message) {
        connection.hub.log('TestMessageToRoom: ' + message);
    };

    chat.client.outOfSync = function () {

        // Chat application updated from server side.
        // Lets refresh this page.
        ui.showStatus(1, '');
        window.location.reload();
    };

    chat.client.exceptionHandler = function (error) {
        connection.hub.log('SignalR Exception:' + error);
    };

    $ui.bind(uiEvents.changeStatus, function (ev, status) {
        chat.server.changeStatus(status);
    });

    $ui.bind(uiEvents.checkMessagesReadStatus, function (ev, messageIDs) {
        chat.server.checkMessagesReadStatus(messageIDs);
    });

    $ui.bind(uiEvents.typing, function () {
        // If not in a room, don't try to send typing notifications
        if (!chat.state.activeRoom) {
            return;
        }

        if (checkingStatus === false && typing === false) {
            typing = true;

            try {
                ui.setRoomTrimmable(chat.state.activeRoom, typing);
                chat.server.typing(chat.state.activeRoom);
            }
            catch (e) {
                connection.hub.log('Failed to send via websockets');
            }

            window.setTimeout(function () {
                typing = false;
            },
                3000);
        }
    });

    $ui.bind(uiEvents.deleteMessage, function (ev, roomName, msgId) {
        chat.server.deleteMessage(roomName, msgId);
    });

    $ui.bind(uiEvents.editMessage, function (ev, roomName, msgId, messageBody) {
        chat.server.editMessage(roomName, msgId, messageBody);
    });

    $ui.bind(uiEvents.sendMessage, function (ev, roomName, msg, msgId, isCommand, attachment) {
        clearUnread();

        var id = msgId || utility.newId(),
            room = roomName,
            clientMessage = {
                id: id,
                content: msg,
                roomID: roomName,
                attachment: attachment
            },
            messageCompleteTimeout = null;

        if (!isCommand) {
            // If there's a significant delay in getting the message sent
            // mark it as pending
            messageCompleteTimeout = window.setTimeout(function () {
                if ($.connection.hub.state === $.connection.connectionState.reconnecting) {
                    ui.failMessage(id);
                }
                else {
                    // If after a second
                    ui.markMessagePending(id);
                }
            },
                messageSendingDelay);

            pendingMessages[id] = messageCompleteTimeout;
            ui.updateTypedMessage(room, null);

        }

        try {
            chat.server.send(clientMessage)
                .done(function () {
                    if (messageCompleteTimeout) {
                        clearTimeout(messageCompleteTimeout);
                        delete pendingMessages[id];
                    }

                    ui.confirmMessage(id);
                })
                .fail(function (e) {
                    isCommand = msg.match(/^\/[A-Za-z0-9?]+?/) !== null;
                    ui.failMessage(id, isCommand);
                    if (e.source === 'HubException') {
                        ui.addErrorToActiveRoom(e.message);
                    }
                });
        }
        catch (e) {
            connection.hub.log('Failed to send via websockets');

            clearTimeout(pendingMessages[id]);
            ui.failMessage(id);
        }

        // Store message history
        messageHistory.push(msg);

        // REVIEW: should this pop items off the top after a certain length?
        historyLocation = messageHistory.length;
    });

    $ui.bind(uiEvents.focusit, function () {
        clearUnread();

        try {
            connection.hub.log('Calling chat.server.updateActivity()');
            chat.server.updateActivity();
        }
        catch (e) {
            connection.hub.log('updateActivity failed');
        }
    });

    $ui.bind(uiEvents.enableCurentUserNotificationsSound, function (ev, enableSound) {
        chat.server.enableCurentUserNotificationsSound(enableSound);
    });

    $ui.bind(uiEvents.markMessagesAsRead, function (ev, roomName) {
        //var previousCount = unReadMessageCount[roomName] || 0;

        //if (previousCount > 0) {
        chat.server.markMessagesAsRead(roomName);
        //    unReadMessageCount[roomName] = 0;
        //}
    });

    $ui.bind(uiEvents.updateRoomClick, function (ev, roomID) {
        chat.server.getChatRoom(roomID).done(function (thread) {
            ui.handleUpdateRoomClick(thread);
        }).fail(function (e) {
            ui.hideSplashScreen();
        });
    });

    $ui.bind(uiEvents.markThreadAsFavorite, function (ev, threadID, isFavorite, $favoriteLink) {
        chat.server.markThreadAsFavorite(threadID, isFavorite).done(function () {
            ui.handleMarkThreadAsFavorite($favoriteLink, isFavorite);
        }).fail(function (e) {
            //ui.hideSplashScreen();
        });
    });

    $ui.bind(uiEvents.addMorePeopleClick, function (ev, roomID) {
        chat.server.getChatRoom(roomID).done(function (thread) {
            ui.handleAddMorePeopleClick(thread);
        }).fail(function (e) {
            ui.hideSplashScreen();
        });
    });

    $ui.bind(uiEvents.loadRoom, function (ev, roomName, message) {
        loadRoom(roomName, message);
    });

    $ui.bind(uiEvents.addRoom, function (ev, room) {
        ui.showSplashScreen();
        try {
            chat.server.addRoom(room)
                .done(joinRoom)
                .fail(function (e) {
                    connection.hub.log('addRoom.failed(' + e + ')');
                    ui.hideSplashScreen();
                });
        }
        catch (e) {
            connection.hub.log('addRoom.failed(' + e + ')');
        }
    });
    $ui.bind(uiEvents.updateParticipants, function (ev, roomName, participantsIds) {
        ui.showSplashScreen();
        try {
            chat.server.updateParticipants(roomName, participantsIds)
                .done(updateRoomCore)
                .fail(function (e) {
                    connection.hub.log('updateParticipants.failed(' + e + ')');
                    ui.hideSplashScreen();
                });
        } catch (e) {
            connection.hub.log('updateParticipants.failed(' + e + ')');
        }
    });
    $ui.bind(uiEvents.updateRoom, function (ev, roomName, threadTitle, participantsIds) {
        ui.showSplashScreen();
        try {
            chat.server.updateRoom(roomName, threadTitle, participantsIds)
                .done(updateRoomCore)
                .fail(function (e) {
                    connection.hub.log('updateRoom.failed(' + e + ')');
                    ui.hideSplashScreen();
                });
        } catch (e) {
            connection.hub.log('updateRoom.failed(' + e + ')');
        }
    });
    $ui.bind(uiEvents.openRoom, function (ev, roomName) {
        // ui.showSplashScreen();
        try {
            chat.server.getRoomInfo(roomName, null)
                .done(joinRoom)
                .fail(function (e) {
                    connection.hub.log('getRoom.failed(' + roomName + ', ' + e + ')');
                    // ui.hideSplashScreen();
                    ui.setRoomLoading(false, roomName);
                });
        }
        catch (e) {
            connection.hub.log('getRoom.failed(' + roomName + ', ' + e + ')');
        }
    });

    $ui.bind(uiEvents.activeRoomChanged, function (ev, roomName) {
        if (roomName === 'Lobby') {
            // Remove the active room
            chat.state.activeRoom = undefined;
        }
        else {
            // When the active room changes update the client state and the cookie
            chat.state.activeRoom = roomName;
        }
        ui.updateUsersWindow(roomName)
        ui.scrollToBottom(roomName);
        //updateCookie();
    });
    $ui.bind(uiEvents.blurit, function () {
        updateTitle();
    });

    $ui.bind(uiEvents.scrollRoomTop, function (ev, roomInfo) {
        // Do nothing if we're loading history already or if we recently loaded history
        if (loadingHistory === true) {
            return;
        }

        loadingHistory = true;

        try {
            // Show a little animation so the user experience looks fancy
            ui.setLoadingHistory(true);

            ui.setRoomTrimmable(roomInfo.name, false);
            connection.hub.log('getPreviousMessages(' + roomInfo.name + ')');
            chat.server.getPreviousMessages(roomInfo.messageID)
                .done(function (messages) {
                    connection.hub.log('getPreviousMessages.done(' + roomInfo.name + ')');
                    ui.prependChatMessages($.map(messages, getMessageViewModel), roomInfo.name);
                    window.setTimeout(function () {
                        loadingHistory = false;
                    }, 1000);

                    ui.setLoadingHistory(false);
                })
                .fail(function (e) {
                    connection.hub.log('getPreviousMessages.failed(' + roomInfo.name + ', ' + e + ')');
                    window.setTimeout(function () {
                        loadingHistory = false;
                    }, 1000);

                    ui.setLoadingHistory(false);
                });
        }
        catch (e) {
            connection.hub.log('getPreviousMessages failed');
            ui.setLoadingHistory(false);
        }
    });
    $ui.bind(uiEvents.scrollRoomHistoryBottom, function (ev, roomName, startPage) {
        // Do nothing if we're loading history already or if we recently loaded history
        if (loadingHistory === true) {
            return;
        }

        loadingHistory = true;

        if (startPage == 1) {
            // Clear the previous history if the history is being fetched from scratch.
            ui.showSplashScreen();
            $(ui.selectors.historyContainer).empty();
        }
        try {
            // Show a little animation so the user experience looks fancy
            ui.setLoadingHistory(true);

            ui.setRoomTrimmable(roomName, false);
            connection.hub.log('getRoomsHistory(' + roomName + ')');
            chat.server.getRoomsHistory(startPage)
                .done(function (messages) {
                    connection.hub.log('getRoomsHistory.done(' + roomName + ')');
                    ui.incrementRoomHistoryStartPage();
                    ui.appendChatMessages($.map(messages, getRoomHistoryViewModel), roomName);
                    window.setTimeout(function () {
                        loadingHistory = false;
                    }, 1000);

                    ui.setLoadingHistory(false);
                    ui.hideSplashScreen();
                })
                .fail(function (e) {
                    connection.hub.log('getRoomsHistory.failed(' + roomName + ', ' + e + ')');
                    window.setTimeout(function () {
                        loadingHistory = false;
                    }, 1000);

                    ui.setLoadingHistory(false);
                    ui.hideSplashScreen();
                });
        }
        catch (e) {
            connection.hub.log('getRoomsHistory failed');
            ui.setLoadingHistory(false);
        }
    });
    //$(function () {
        //var stateCookie = $.cookie('CF_CHAT.state'),
            //state = stateCookie ? JSON.parse(stateCookie) : {},
    var state = {},
        initial = true,
        initialized = false;
        //connectionIntervalHandle,
        //disconnectionIntervalHandle;


        reEstablishConnection = function (forceConnect) {
            // https://stackoverflow.com/questions/2384167/check-if-internet-connection-exists-with-javascript
            //Being online only entails that you are connected to a network, not the availability nor reachability of the services you are trying to connect to.
            // Wait for internet check
            whenConnectedToInternet().then(function () {
                if (chat.connection.state === connectionStateEnum.disconnected || forceConnect) {
                    ui.showStatus(1, '');
                    connection.hub.start(connectionOptions)
                        .done(function () {
                            ui.hideConnectionStatus();

                            //clearInterval(connectionIntervalHandle);
                            //connectionIntervalHandle = 0;

                            //clearInterval(disconnectionIntervalHandle);
                            //disconnectionIntervalHandle = 0;

                            connection.hub.log(
                                'Connection re-established after get disconnected. Connection connected with id: ' +
                                getConnectionID());

                            // When this works uncomment it.
                            // ui.showReloadMessageNotification();

                            // Call join hub again so that the current connection can be added to all the groups the user is part of 
                            // so that this connection can receive messages for these groups.
                            chat.server.joinHub(initialized).fail(function (e) {
                                connection.hub.log("Error while joining hub: " + e.message);
                                // So refresh the page, our auth token is probably gone
                                performLogout();
                            });
                            // ui.showStatus(0, '');
                            initialized = true;
                        }).fail(function (reason) {
                            connection.hub.log("SignalR connection failed: " + reason);
                        });
                }
                else if (chat.connection.state === connectionStateEnum.connected) {
                    ui.hideConnectionStatus();
                    //clearInterval(connectionIntervalHandle);
                    //connectionIntervalHandle = 0;
                }
            });
        }

        function reEstablishConnectionPolling() {
            if (connection.hub.state !== connectionStateEnum.connected) {
                // If the user is not connected, connect him. 
                reEstablishConnection();
            }
        }

        function initConnection() {


            connection.hub.logging = isConnectionLoggingEnabled;
            // Adds the rest-api-key too for mobile client to authenticate end user.
            connection.hub.qs = { 'Rest-Api-Key': apiToken, 'version': Communifire.cfVersion };

            connection.hub.start(connectionOptions)
                .done(function () {

                    connection.hub.log('Connection started with id: ' + getConnectionID());

                    chat.server.joinHub()
                        .fail(function (e) {
                            connection.hub.log('joinHub.failed(' + e + ')');
                            // So refresh the page, our auth token is probably gone
                            performLogout();
                        });

                    //// Update the user so as to let others that this user has come online.
                    //chat.server.updateActivity()
                    //    .fail(function () {
                    //        connection.hub.log('Server join failed');
                    //    });

                    initialized = true;
                }).fail(function (reason) {
                    connection.hub.log("SignalR connection failed: " + reason);
                });

            connection.hub.stateChanged(function (change) {

                switch (change.newState) {
                    //case connectionStateEnum.connecting:
                    //    if (!initial) {
                    //    }
                    //    break;
                    case connectionStateEnum.reconnecting:
                        failPendingMessages();
                        if (!isReload) {
                            ui.showStatus(1, '');
                        }
                        break;
                    case connectionStateEnum.connected:
                        if (!initial) {
                            //clearInterval(connectionIntervalHandle);
                            //connectionIntervalHandle = 0;

                            //clearInterval(disconnectionIntervalHandle);
                            //disconnectionIntervalHandle = 0;
                            // connectingViaConnectionStateZero = FALSE;

                            // ui.showStatus(0, $.connection.hub.transport.name);
                            ui.setReadOnly(false);
                            ui.resendFailedMessages();
                            connection.hub.log('Connection state changed. Connection connected with id: ' + getConnectionID());
                        } else {
                            ui.initializeConnectionStatus($.connection.hub.transport.name);
                        }

                        initial = false;
                        break;
                    case connectionStateEnum.disconnected:
                        initial = false;
                        connection.hub.log('Connection state changed. Connection disconnected with id: ' + getConnectionID());
                        break;
                }

            });

            connection.hub.disconnected(function () {

                connection.hub.log('Connection state changed. Connection disconnected');

                if (initialized === true) {
                    connection.hub.log('Dropped the connection from the server. Restarting in 5 seconds.');

                    failPendingMessages();
                }
                if (!isReload) {
                    ui.showStatus(2, '');
                }
                ui.setReadOnly(true);
                // reEstablishConnection();
                // Restart the connection
                // setTimeout(function () {
                //     disconnectionIntervalHandle = setInterval(reEstablishConnection, reestablishConnectionInterval);
                // }, 5000);
            });

            connection.hub.error(function (e) {
                console.error("Error in connection hub: ", e.message);
                // Make all pending messages failed if there's an error
                failPendingMessages();
            });

            $ui.bind(uiEvents.focusit, function () {
                if (connection.hub.state === connectionStateEnum.disconnected) {
                    // Window focused while disconnected. Reconnecting again.
                    reEstablishConnection();
                }
            });
        }


        // Initialize the ui, passing the user preferences
        ui.initialize(state.preferences).done(function () {
            if (communifire.rooms) {
                // User already fetched data
                logOn(communifire.rooms);
                populateRoomFromInfo(communifire.activeRoomInforCore);
                chat.state.activeRoom = communifire.activeRoom;
                ui.hideSplashScreen();
            }
            initConnection();
        });

        //offline.on('up', function gotOnline() {
        //    console.log("I am online");
        //    reEstablishConnection();
        //});

        // Show "Reconnecting" status when the user's machine goes offline.
        window.addEventListener('offline', function (e) {
            ui.showStatus(1, '');
        });

        // Try "Reconnecting" the user back when the user's machine goes online.
        window.addEventListener('online', function (e) {

            // Immediately establish the connection.
            reEstablishConnection(TRUE);
            // https://stackoverflow.com/questions/2384167/check-if-internet-connection-exists-with-javascript
            // Being online only entails that you are connected to a network, not the availability nor reachability of the services you are trying to connect to.
            // connectionIntervalHandle = setInterval(reEstablishConnection, reestablishConnectionInterval);
        });

        // Run a constant loop to check if the user is disconnected even with internet connection.
        // No need to call any other loop on ther events like focus, disconnected because
        // this interval will never exprire and will constantly keep on polling after 10 seconds
        // Do note that this polling will not hit the server every time, it will hit only after 
        // the connection has been disconnected. 
        setInterval(reEstablishConnectionPolling, reestablishConnectionInterval);

    //});


    window.onbeforeunload = function (e) {
        isReload = true;
        chat.connection.stop();
    };
    window.getActiveConnectionID = getConnectionID;

})(window.jQuery, window.jQuery.connection, window, window.chat.ui, window.chat.utility, window.moment, window.Communifire, window.Offline);