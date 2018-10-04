(function ($, window, wdtEmojiBundle, Communifire) {
    "use strict";

    var getLanguageResource;

    if (!window.Emoji) {
        window.Emoji = {};
    }
    wdtEmojiBundle.defaults.emojiSheets = {
        'apple': Communifire.virtualDirectory + '/assets/chat/emoji/sheets/sheet_apple_64.png'
    };
    wdtEmojiBundle.defaults.include_title = true;
    wdtEmojiBundle.defaults.include_text = true;

    window.Emoji = Emoji;
    window.Emoji.parse = function(content) {
        return wdtEmojiBundle.render(content);
    };
    window.Emoji.init = function ($elementSelector, utility) {
        wdtEmojiBundle.init($elementSelector);
        getLanguageResource = utility.getLanguageResource;
    }


    wdtEmojiBundle.getTitle = function(title) {
        switch (title) {
            case "People":
                title = getLanguageResource("ChatEmojiPeopleGroup");
                break;
            case "Nature":
                title = getLanguageResource("ChatEmojiNatureGroup");
                break;
            case "Foods":
                title = getLanguageResource("ChatEmojiFoodsGroup");
                break;
            case "Activity":
                title = getLanguageResource("ChatEmojiActivityGroup");
                break;
            case "Places":
                title = getLanguageResource("ChatEmojiPlacesGroup");
                break;
            case "Objects":
                title = getLanguageResource("ChatEmojiObjectsGroup");
                break;
            case "Symbols":
                title = getLanguageResource("ChatEmojiSymbolsGroup");
                break;
            case "Flags":
                title = getLanguageResource("ChatEmojiFlagsGroup");
                break;
            default:
                break;
        }
        return title;
    }

})(window.jQuery, window, window.wdtEmojiBundle, window.Communifire);
