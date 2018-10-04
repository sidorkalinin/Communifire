/*globals jQuery, window */
(function($) {
    $.retryAjax = function (ajaxParams) {
        var errorCallback,
            timeout = ajaxParams.timeout,
            deferred = ajaxParams.deferred

        ajaxParams.tryCount = (!ajaxParams.tryCount) ? 0 : ajaxParams.tryCount;
        //ajaxParams.retryLimit = (!ajaxParams.retryLimit) ? 2 : ajaxParams.retryLimit;
        ajaxParams.suppressErrors = true;

        ajaxParams.success = function (json) {
            //do something
            deferred.resolve();
        };

        ajaxParams.error = function (xhr, textStatus, errorThrown) {

            var self = this;
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {

                // fire error handling on the last try
                if (self.tryCount === self.retryLimit) {
                    self.error = errorCallback;
                    delete self.suppressErrors;
                }
                if (timeout > 0) {
                    setTimeout(function () {
                        $.ajax(self);
                    }, timeout);
                }
                else {
                    //try again
                    $.ajax(self);
                }
            }
        };

        $.ajax(ajaxParams);
    };
}(jQuery));
