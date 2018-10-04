!(function () {
    "use strict";
    var applicationHost = CF_HOST,
        remoteHost = CF_REMOTE_HOST,
        apiToken = CF_API_TOKEN,
        virtualDirectory = CF_VD,
        script = 'script',
        link = 'link',
        jsFileType = 'js',
        cssFileType = 'css',

        isRelease,
        loadJsFilesSequentially = function (scriptsCollection, filetype, startIndex, onLoadAll, deferred, host) {
            var version = Communifire.cfVersion || '',
                filename,
                fileref;

            host = host || (virtualDirectory || '');
            if (scriptsCollection[startIndex]) {
                filename = scriptsCollection[startIndex];

                filename = host + filename + '?v=' + version;
                // console.log('filename' + filename);

                if (filetype == jsFileType) { //if filename is a external JavaScript file
                    fileref = document.createElement(script)
                    fileref.setAttribute("type", "text/javascript");
                    fileref.setAttribute("src", filename);

                } else if (filetype == cssFileType) { //if filename is an external CSS file
                    fileref = document.createElement(link)
                    fileref.setAttribute("rel", "stylesheet")
                    fileref.setAttribute("type", "text/css")
                    fileref.setAttribute("href", filename)
                }
                if (fileref) {
                    fileref.onload = function () {
                        startIndex = startIndex + 1;
                        loadJsFilesSequentially(scriptsCollection, filetype, startIndex, onLoadAll, deferred, host);
                    };
                }

                if (typeof fileref != "undefined") {
                    document.getElementsByTagName("body")[0].appendChild(fileref);
                }
            } else {
                if (onLoadAll) {
                    onLoadAll();
                }
                if (deferred) {
                    deferred.resolve();
                }
            }
        },
        loadCustomOverideCss = function () {
            var fileref = document.createElement(link);
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", Communifire.customOverrideCss + '?v=' + Communifire.cfVersion);
            document.getElementsByTagName("body")[0].appendChild(fileref);

        },
        loadFavicon = function () {
            var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = Communifire.favicon + '?v=' + Communifire.cfVersion;
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        loadCssCollection = function () {
            var deferred = $.Deferred();
            var cssCollection = isRelease
                ? [ '/assets/chat/css/chat.all.css' ]
                : [
                    '/assets/chat/emoji/wdt-emoji-bundle.css',
                    '/assets/chat/scripts/bootstrap/css/bootstrap.min.css',
                    '/assets/chat/scripts/bootstrap/css/bootstrap-responsive.min.css',
                    '/assets/chat/css/font-awesome.min.css',
                    '/assets/chat/scripts/bootstrap-lightbox/bootstrap-lightbox.min.css',
                    '/assets/chat/scripts/jquery.fineuploader/fineuploader-custom.css',
                    '/assets/chat/emoji/wdt-emoji-bundle.css',
                    '/assets/chat/css/styles.css',
                    '/assets/scripts/jquery-chosen/chosen/chosen.css'
                ];

            loadJsFilesSequentially(cssCollection, cssFileType, 0, null, deferred, applicationHost);
            return deferred.promise();
        },
        loadJsCollection1 = function () {
            var deferred = $.Deferred();
            var jsCollection1 = isRelease
                ? [
                    '/assets/chat/scripts/chat1.js'
                ]
                : [
                    '/assets/chat/scripts/jquery-migrate-1.2.1.min.js',
                    '/assets/chat/scripts/json2.min.js',
                    '/assets/chat/scripts/bootstrap.min.js',
                    '/assets/chat/scripts/jquery.signalr-2.3.0.js'
                ];

            loadJsFilesSequentially(jsCollection1, jsFileType, 0, null, deferred, applicationHost);

            return deferred.promise();
        },
        loadSignalRHubJS = function () {
            var deferred = $.Deferred();
            var signalRHubJS = [
                '/signalr/cf/default/hubs'
            ];
            // set 

            if (Communifire.isADEnabled && remoteHost) {
                console.log('AD Enabled, hubs script will be loaded via JS code:' + remoteHost + signalRHubJS);
                // AD is enabled and is remote host
                // We need to make a XHR request instead of simply calling the JS file
                // XHR request is needed to pass ing authorization header so that 
                // the server can authnticate the request.
                $.get(remoteHost + signalRHubJS,
                    function (data) {
                        // if (remoteHost) {
                        // We have the JS code now, lets execute it.
                        jQuery.globalEval(data);

                        $.connection.hub.url = remoteHost + '/signalr/cf/default/hubs';

                        // For AD with each signalr AJAX request we have to send Authorization header
                        // so that server can authenticate the inital request.
                        // CF_AuthorizationHeader will be set by /chat.html 
                        $.signalR.ajaxDefaults.headers = { Authorization: "Bearer " + CF_AuthorizationHeader };
                        //}
                        // Our work is done, lets move to calling further JS requests
                        deferred.resolve();
                    });
            } else {
                loadJsFilesSequentially(signalRHubJS, jsFileType, 0, null, deferred, remoteHost);
                deferred.done(function () {
                    if (remoteHost) {
                        $.connection.hub.url = remoteHost + '/signalr/cf/default/hubs';
                    }
                });

            }

            return deferred.promise();
        },
        loadJsCollection2 = function () {
            var deferred = $.Deferred();

            var jsCollection2 = [
                '/assets/chat/emoji/emoji.min.js',
                '/assets/chat/emoji/wdt-emoji-bundle.js'
            ];

            loadJsFilesSequentially(jsCollection2, jsFileType, 0, null, deferred, applicationHost);

            return deferred.promise();

        },
        loadJsCollection3 = function () {
            var deferred = $.Deferred();

            var jsCollection3 = isRelease
                ? [
                    '/assets/chat/scripts/chat2.js'
                ]
                : [
                    '/assets/chat/scripts/jquery.retryajax.js',
                    '/assets/chat/chat.main.js',
                    '/assets/chat/scripts/bootstrap-lightbox/bootstrap-lightbox.min.js',
                    '/assets/chat/scripts/jquery.fineuploader/jquery.fineuploader.js',
                    '/assets/chat/scripts/loopj-jquery-tokeninput/src/jquery.tokeninput.js',
                    '/assets/chat/scripts/bootstrap-confirm.js',
                    '/assets/chat/scripts/jquery.tmpl.js',
                    '/assets/chat/scripts/jquery.cookie.js',
                    '/assets/chat/scripts/jquery.timeago.0.10.js',
                    '/assets/chat/scripts/ba-linkify.min.js',
                    '/assets/chat/scripts/jquery.history.js',
                    '/assets/chat/scripts/moment.min.js',
                    '/assets/chat/scripts/livestamp.min.js',
                    '/assets/chat/scripts/jquery-autoresize.js',
                    '/assets/chat/chat.emoji.js',
                    '/assets/scripts/jquery-chosen/chosen/chosen.jquery.min.js',
                    '/assets/scripts/jquery-chosen/ajax-chosen.min.js',
                    '/assets/chat/chat.utility.js',
                    '/assets/chat/chat.ui.room.js',
                    '/assets/chat/chat.ui.templates.js',
                    '/assets/chat/chat.ui.js',
                    '/assets/chat/chat.ui.fileupload.js',
                    '/assets/chat/chat.js'
                ];

            loadJsFilesSequentially(jsCollection3, jsFileType, 0, null, deferred, applicationHost);

            return deferred.promise();
        },
        //loadjQuery = function () {
        //    loadJsFilesSequentially(['/assets/chat/scripts/jquery-2.0.3.min.js'], jsFileType, 0, onjQueryLoad, null, applicationHost);
        //},
        //initOfflineJs = function () {
        //    Offline.options = {
        //        checks: {
        //            xhr: {
        //                url: virtualDirectory + '/ping-do-not-delete.ico'
        //            }
        //        },
        //        reconnect: {
        //            // How many seconds should we wait before rechecking.
        //            initialDelay: 3,

        //            // How long should we wait between retries.
        //            delay: 3
        //        },
        //    };
        //},
        initPage = function () {
            loadFavicon();
            loadCssCollection().then(loadCustomOverideCss);
            loadJsCollection1().then(loadSignalRHubJS).then(loadJsCollection2).then(loadJsCollection3);
        },
        getDefaultRoomName = function() {
            var hash = (document.location.hash || '#').substr(1);

            if (hash.length && hash[0] === '/') {
                hash = hash.substr(1);
            }

            var parts = hash.split('/');
            if (parts[0] === 'threads') {
                return parts[1];
            }

            return null;
        },
        onjQueryLoad = function () {
            var activeRoomQuery = 'activeThreadID=' + getDefaultRoomName(),
                url = remoteHost
                    ? (remoteHost + '/api/chat/ui/globals' + '?token=' + apiToken + '&' + activeRoomQuery)
                    : virtualDirectory + '/api/chat/ui/globals?' + activeRoomQuery;

            return $.get(url).done(function (response) {
                Communifire = response;

                for (var property in response) {
                    //if (my.hasOwnProperty(property)) {
                    Communifire[property] = response[property];
                    //}
                }


                if (Communifire.currentUserID == 0) {
                    window.location.href = Communifire.loginUrl + '?ReturnUrl=' + encodeURIComponent(location.href);;
                }

                isRelease = Communifire.isRelease;
                //virtualDirectory = Communifire.virtualDirectory || '';
                document.title = Communifire.docTitle;
                // console.log(Communifire);

                initPage();
            });
        },
        init = function () {
            //loadjQuery();
            onjQueryLoad();
        };

    window.Communifire = { Globals: { Chat: { init: init } } };

    Communifire.Globals.Chat.init();


})();