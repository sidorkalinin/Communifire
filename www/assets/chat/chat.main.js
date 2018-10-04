!(function (Communifire) {

    String.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }

        return s;
    };
    var globalPropertyAccessor = Communifire || window;

    //private variables
    var virtualDirectory = window['CF_VD'] || globalPropertyAccessor['CF_VD'], // if the CF_VD was not set at global level then get the value from "Communifire" object.
        locale = globalPropertyAccessor['CF_LOCALE'],
        theme = globalPropertyAccessor['CF_THEME'],
        modalContainerClass = 'generic-dialog',
        loadingImage = '<img src="' + virtualDirectory + '/assets/Themes/' + theme + '/images/spinner.gif">',
        loadingImageSRC = virtualDirectory + '/assets/Themes/' + theme + '/images/spinner.gif',
        spinnerAbsoluteCenter = $('#spinner-absolute-center'),
        remoteHostKey = 'CF_REMOTE_HOST',
        host = window[remoteHostKey] || globalPropertyAccessor[remoteHostKey] || (virtualDirectory || ''),
        pingUrl = host + '/ping-do-not-delete.ico';

    //spinnerAbsoluteCenter.appendTo('body');
    //spinnerContainerCenter.appendTo('body');
    var mainContainer = '.axero-community-wrapper';

    var baseApiPath = host + '/api';
    var jsonFormatParam = 'format=json';
    var localeParam;
    if (locale) {
        localeParam = '&locale=' + locale;
    }
    else {
        localeParam = '';
    }

    //private methods
    var addLocaleToUrl = function (url) {

        if (locale) {
            if (url.indexOf('?') > -1) {
                return String.format('{0}&locale={1}',
                    url, locale);
            } else {
                return String.format('{0}?locale={1}',
                    url, locale);
            }

        } else {
            return url;
        }
    };

    var buildApiUrl = function (path) {
        var url, separator;
        if (!path) {
            return path;
        }

        if (path.indexOf('?') > -1) {
            separator = '&';
        } else {
            separator = '?';

        }
        url = baseApiPath + path + separator + jsonFormatParam + localeParam;
        return url;
    },
        buildAjaxUrl = function (path, reqPathMsg, basePath) {
            if (!path) {
                //The mandatory argument pageName is not present
                alert(reqPathMsg);
                return;
            }

            if (locale) {
                if (path.indexOf('?') > -1) {
                    return String.format('{0}{1}{2}&locale={3}',
                        virtualDirectory,
                        basePath,
                        path,
                        locale);
                } else {
                    return String.format('{0}{1}{2}?locale={3}',
                        virtualDirectory,
                        basePath,
                        path,
                        locale);
                }

            } else {
                return String.format('{0}{1}{2}',
                    virtualDirectory,
                    basePath,
                    path);
            }
        };

    //public variables and methods
    var my = {
        mainContainer: mainContainer,
        spinnerAbsoluteCenter: spinnerAbsoluteCenter,
        virtualDirectory: virtualDirectory,
        loadingImage: loadingImage,
        loadingImageSRC: loadingImageSRC,
        locale: locale,
        theme: theme,
        addLocaleToUrl: addLocaleToUrl,
        buildApiUrl: buildApiUrl,
        buildAjaxUrl: buildAjaxUrl,
        buildHTTPHandlersUrl: function (pageName) {
            ///	<summary>
            ///		Builds the url by appending the page name to HTTPHandlers directory url.
            ///     If locale param is available via routing, that param will added as querystring
            ///     to url. For example, if the local is 'en-US' and the methodName is 'AttachmentUploader.ashx'
            ///     this method will return '/HTTPHandlers/AttachmentUploader.ashx?locale=en-US'
            ///	</summary>
            ///	<param name="pageName" type="String">The name of the page</param>
            ///	<returns type="String">The page url</returns>

            return buildAjaxUrl(pageName, 'Please provide a page name to call', '/HTTPHandlers/');
        },
        whenConnectedToInternet: function () {
            var def = $.Deferred();

            $.retryAjax({
                url: pingUrl + '?d=' + (new Date()).toString(),
                timeout: 5000,
                retryLimit: 1,
                deferred: def,
                type: 'GET'
            });

            return def.promise();
        }
    };

    window.Communifire = Communifire;

    for (var property in my) {
        //if (my.hasOwnProperty(property)) {
        Communifire[property] = my[property];
        //}
    }

    //return my;


})(Communifire);

Communifire.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = Communifire,
        i;

    // strip redundant leading global
    if (parts[0] === "Communifire") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

Communifire.GlobalSetting = function () {
    var isFileControlEnabled;
    return {
        isFileControlEnabled: isFileControlEnabled
    };
};

Communifire.Utilities = function () {

    var _yaxisOffset = 100;
    var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

    var executeFunctionByName = function (functionName, context /*, args */) {
        var args = Array.prototype.slice.call(arguments).splice(2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(this, args);
    };

    var executeScripts = function (dom) {
        dom.find('script').each(function () {
            $.globalEval(this.text || this.textContent || this.innerHTML || '');
        });
    };

    var appendQueryString = function (url, qsKey, qsValue) {
        if (!url) return;
        if (url.indexOf("?") == -1) {
            url = url + '?' + qsKey + '=' + qsValue;
        } else {
            url = url;
            url = url + '&' + qsKey + '=' + qsValue;
        }
        return url;
    };

    var setSelectionRange = function (input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd(keys.character, selectionEnd);
            range.moveStart(keys.character, selectionStart);
            range.select();
        }
    };

    var deleteType = 'DELETE',
        postType = 'POST',
        putType = 'PUT',
        getType = 'GET',
        contentTypeKey = 'Content-Type',
        jsonContentType = 'application/json; charset=utf-8',
        jsonDataType = 'json';


    var makeWebApiRequest = function (url, verb, data, success, error, always) {
        if (data) {
            $.ajax({
                url: url,
                type: verb,
                data: JSON.stringify(data),
                contentType: jsonContentType,
                headers: { contentTypeKey: jsonContentType },
            }).success(success).error(error).always(always);
        } else {
            $.ajax({
                url: url,
                type: verb,
                contentType: jsonContentType,
                headers: { contentTypeKey: jsonContentType },
            }).success(success).error(error).always(always);
        }
    };

    var makeWebApiGetRequest = function (url, success, error, always) {
        $.getJSON(url).success(success)
            .error(error)
            .always(always);
    };

    var makeWebApiPostRequest = function (url, data, success, error, always) {
        makeWebApiRequest(url, postType, data, success, error, always);
    };

    var makeWebApiPutRequest = function (url, data, success, error, always) {
        makeWebApiRequest(url, putType, data, success, error, always);
    };

    var makeWebApiDeleteRequest = function (url, success, error, always) {
        makeWebApiRequest(url, deleteType, null, success, error, always);
    };



    var getSpinnerImg = function (css) {
        var img = $(Communifire.loadingImage).addClass('ajax-loader');
        css && img.css(css);
        return img;
    };
    var removeSpinner = function () {
        $('img.ajax-loader').remove();
    };
    var addSpinner = function (a, css) {
        $(a).append(getSpinnerImg(css));
    };

    var browserInfo = function () {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    };

    var my =
        {

            htmlEncode: function (value) {
                return $('<div/>').text(value).html();
            },
            htmlDecode: function (value) {
                return $('<div/>').html(value).text();
            },
            urldecode: function (str) {
                return decodeURIComponent((str + '').replace(/\+/g, '%20'));
            },
            parseSmileys: function (text) {

                var pattern = /:[()]/ig;

                return text.replace(pattern, function (match, p) {
                    if (match == ':)') {
                        return "<i class=\"icon-smile\"></i>";
                    } else if (match == ':(') {
                        return "<i class=\"icon-frown\"></i>";
                    } else {
                        return match;
                    }
                });
            },
            ie: (function () {
                // ----------------------------------------------------------
                // If you're not in IE (or IE version is less than 5) then:
                //     ie === undefined
                // If you're in IE (>5) then you can determine which version:
                //     ie === 7; // IE7
                // Thus, to detect IE:
                //     if (ie) {}
                // And to detect the version:
                //     ie === 6 // IE6
                //     ie> 7 // IE8, IE9 ...
                //     ie <9 // Anything less than IE9
                // ----------------------------------------------------------
                var undef,
                    v = 3,
                    div = document.createElement('div');

                while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    div.getElementsByTagName('i')[0]);

                return v > 4 ? v : undef;
            }()),
            executeFunctionByName: executeFunctionByName,
            executeScripts: executeScripts,
            appendQueryString: appendQueryString,

            getSpinnerImg: getSpinnerImg,
            removeSpinner: removeSpinner,
            addSpinner: addSpinner,

            makeWebApiRequest: makeWebApiRequest,
            makeWebApiGetRequest: makeWebApiGetRequest,
            makeWebApiPostRequest: makeWebApiPostRequest,
            makeWebApiPutRequest: makeWebApiPutRequest,
            makeWebApiDeleteRequest: makeWebApiDeleteRequest,
            setCaretToPos: function (input, pos) {
                setSelectionRange(input, pos, pos);
            },
            isiOS: function () {
                return iOS;
            },
            parseInt: function (n) {
                return parseInt(n, 10);
            },
            browserInfo: browserInfo,
            isIE: function () {
                var browser = browserInfo()
                return (browser.indexOf("Edge") > -1 || browser.indexOf("IE") > -1);
            },
            ieVersion: function () {
                var rv = -1; // Return value assumes failure.
                if (navigator.appName == 'Microsoft Internet Explorer') {
                    var ua = navigator.userAgent;
                    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                    if (re.exec(ua) != null)
                        rv = parseFloat(RegExp.$1);
                }
                return rv;
            },
            getQueryString: function (obj) {
                var str = [];
                for (var p in obj)
                    if (obj.hasOwnProperty(p)) {
                        var val = obj[p];
                        if (val != undefined) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                    }
                return str.join("&");
            },
            scrollToBottom: function (element) {
                if (!element) {
                    return;
                }
                var scrollHeight = element.scrollHeight;
                element.scrollTop = scrollHeight;
            },
            getArrayIndexForKey: function (arr, key, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][key] == val)
                        return i;
                }
                return -1;
            },
            isRequireModulePresent: function () {
                return window['require'] !== undefined;
            },

            //By Vivek
            isElectronPresent: function () {
                return navigator.userAgent.match(/Electron/i) !== null;
            },
            isDarwinPlatform: function () {
                return window['process'] !== undefined && window['process'].platform == 'darwin';
            },
            isNotificationSoundEnabed: function () {
                //var isEnabled = false;
                //if (isElectronPresent()) {
                //    // Ding disabled for shell platform so that notification sound is disabled for web inside shell. Prevent Duplicate notifications.
                //    chatDingEnabled = false;
                //    notificationAPISupported = true;
                //}
            }
        };
    return my;
}();


//window.onerror = function (msg, url, line, col, error) {
//    // Note that col & error are new to the HTML 5 spec and may not be 
//    // supported in every browser.  It worked for me in Chrome.
//    var extra = !col ? '' : '\ncolumn: ' + col;
//    extra += !error ? '' : '\nerror: ' + error;

//    // You can view the information in an alert to see things working like this:
//    console.error("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

//    // TODO: Report this error via ajax so you can keep track
//    //       of what pages have JS issues

//    var suppressErrorAlert = true;
//    // If you return true, then error alerts (like in older versions of 
//    // Internet Explorer) will be suppressed.
//    return suppressErrorAlert;
//};

//if (Communifire.Utilities.isRequireModulePresent() && Communifire.Utilities.isElectronPresent()) {
//    // Application MainMenu
//    var template = [
//      {
//          label: 'Edit',
//          submenu: [
//            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
//            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
//            { type: "separator" },
//            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
//            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
//            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
//            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
//          ]
//      },
//      {
//          label: 'View',
//          submenu: [
//            {
//                label: 'Reload',
//                accelerator: 'CmdOrCtrl+R'
//                , click: function (item, focusedWindow) {
//                    if (focusedWindow)
//                        focusedWindow.reload();
//                    //require('browser-window').getFocusedWindow().reload();
//                }
//            },
//            {
//                label: 'Toggle Full Screen',
//                accelerator: (function () {
//                    if (process.platform == 'darwin')
//                        return 'Ctrl+Command+F';
//                    else
//                        return 'F11';
//                })()
//                , click: function (item, focusedWindow) {
//                    if (focusedWindow)
//                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
//                    //require('browser-window').getFocusedWindow().setFullScreen(!require('browser-window').getFocusedWindow().isFullScreen());
//                }
//            },
//             {
//                 label: 'Toggle Developer Tools',
//                 accelerator: (function () {
//                     if (process.platform == 'darwin')
//                         return 'Alt+Command+I';
//                     else
//                         return 'Ctrl+Shift+I';
//                 })()
//                 , click: function (item, focusedWindow) {
//                     if (focusedWindow)
//                         focusedWindow.toggleDevTools();
//                 }
//             }
//          ]
//      },
//      {
//          label: 'Window',
//          role: 'window',
//          submenu: [
//            {
//                label: 'Minimize',
//                accelerator: 'CmdOrCtrl+M',
//                role: 'minimize'
//            },
//            {
//                label: 'Close',
//                accelerator: 'CmdOrCtrl+W',
//                role: 'close'
//            },
//          ]
//      },
//      {
//          label: 'Help',
//          role: 'help',
//          submenu: [
//            {
//                label: 'Learn More',
//                click: function () { require('electron').shell.openExternal('https://my.axerosolutions.com/spaces/5/communifire-documentation/wiki/view/5722/communifire-desktop-apps') }
//            },
//          ]
//      },
//    ];

//    if (process.platform == 'darwin') {
//        var name = require('electron').remote.app.getName();
//        template.unshift({
//            label: name,
//            submenu: [
//              {
//                  label: 'About ' + name,
//                  role: 'about'
//              },
//              {
//                  type: 'separator'
//              },
//              {
//                  label: 'Services',
//                  role: 'services',
//                  submenu: []
//              },
//              {
//                  type: 'separator'
//              },
//              {
//                  label: 'Hide ' + name,
//                  accelerator: 'Command+H',
//                  role: 'hide'
//              },
//              {
//                  label: 'Hide Others',
//                  accelerator: 'Command+Alt+H',
//                  role: 'hideothers'
//              },
//              {
//                  label: 'Show All',
//                  role: 'unhide'
//              },
//              {
//                  type: 'separator'
//              },
//              {
//                  label: 'Quit',
//                  accelerator: 'Command+Q',
//                  click: function () { require('electron').remote.app.quit(); }
//              },
//            ]
//        });
//        // Window menu.
//        template[3].submenu.push(
//          {
//              type: 'separator'
//          },
//          {
//              label: 'Bring All to Front',
//              role: 'front'
//          }
//        );
//    }

//    var remote = require('electron').remote;
//    var Menu = remote.Menu;
//    var MenuItem = remote.MenuItem;
//    var menu = Menu.buildFromTemplate(template);
//    Menu.setApplicationMenu(menu);

//}
//Usage
//Communifire.virtualDirectory
//Communifire.loadingImage
//Communifire.modalContainerClass
//Communifire.Utilities.getCenterXPosition
//Communifire.Utilities.getCenterYPosition
//Communifire.Utilities.getQuerystringParamValue
//Communifire.Utilities.jumpPage
//Communifire.Utilities.fadeInfadeOutAnimation
//Communifire.Utilities.print
//Communifire.Utilities.htmlEncode()
//Communifire.Utilities.htmlDecode()
//Communifire.buildCommonWSUrl('FindCountries');
//Communifire.buildAjaxTemplatesUrl('LatestArticlesList.aspx');
//Communifire.buildJsonResourcesUrl('GetArticles.aspx');
//Communifire.buildHTTPHandlersUrl('AttachmentUploader.ashx');
//Communifire.buildModalDialogsUrl('FriendsModal.aspx');
//Communifire.buildTaskWSUrl('xxx');
//Communifire.buildApiUrl('/api/users/me')