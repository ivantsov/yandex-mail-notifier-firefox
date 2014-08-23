var widgets = require('sdk/widget').Widget;

var BadgedWidget = function (options) {
    this.makeContentURL = function (imageURL, badge) {
        return 'data:text/html,<html><body style="margin:0; padding:0;"><div style="position: relative;">' +
            '<img src="' + imageURL + '">' +
            '<span style="font-size: 13px; position: absolute; top: -2px; left: 20px; padding: 0; margin: 0;">' +
            (badge || '') + '</span></div></body></html>';
    };

    this.updateBadge = function (badge) {
        widget.contentURL = this.makeContentURL(options.imageURL, badge);
    };

    options.contentURL = this.makeContentURL(options.imageURL);
    var widget = widgets(options);
};

exports.BadgedWidget = BadgedWidget;