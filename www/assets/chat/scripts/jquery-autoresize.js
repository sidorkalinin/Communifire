/*!
 * jQuery Textarea AutoSize plugin
 */;
(function ($, window, document, undefined) {

    var pluginName = "autoResize";
    var pluginDataName = "plugin_" + pluginName;

    var setSelectionRange = function(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    };

    var setCaretToPos = function(input, pos) {
        setSelectionRange(input, pos, pos);
    };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.init(options);
    }

    Plugin.prototype = {
        init: function (options) {
            var height = this.$element.outerHeight();
            var originaleHeight;
            var self = this.$element;
            function resize() {
                $(self).height('auto');
                var ht = $(self)[0].scrollHeight;
                if (options && options.MaxHeight && ht > ($(window).height() * options.MaxHeight)) ht = $(window).height() * options.MaxHeight
                $(self).height(ht + 'px');
            }

            function reset() {
                self.value = '';
                resize();

                window.setTimeout(resize, function() {
                    setCaretToPos($(self)[0], 0);
                }, 0);
            }

            /* 0-timeout to get the already changed text */
            function delayedResize() {
                window.setTimeout(resize, 0);
            }

            this.$element.on('change', resize);
            this.$element.on('cut paste drop keydown', delayedResize);

            this.$element.on('reset', reset);
            reset();
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, pluginDataName)) {
                $.data(this, pluginDataName, new Plugin(this, options));
            }
        });
        return this;
    };

})(jQuery, window, document);