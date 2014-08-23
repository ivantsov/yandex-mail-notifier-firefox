var {Cc, Ci} = require('chrome');
var widgets = require('sdk/widget').Widget;
var parser = Cc["@mozilla.org/parserutils;1"].getService(Ci.nsIParserUtils);

var BadgedWidget = function (options) {
    this.makeContentURL = function (imageURL, badge) {
        var widgetHTML = '<div style="position: relative;"><img src="' + imageURL + '">',
            badgeHTML = '<span style="position: absolute; top: 3px; left: 8px; display: inline-block; background-color: orangered; border: 1px solid darkgrey; border-radius: 50%; min-width: 10px; min-height: 10px; font-size: 8px; color: white; text-align: center;">' + badge + '</span>';
        if (badge) {
            widgetHTML += badgeHTML;
        }
        widgetHTML += '</div>';

        var widgetSanitizedHTML = 'data:text/html,' + parser.sanitize(widgetHTML, parser.SanitizerAllowStyle);

        return widgetSanitizedHTML;
    };

    this.updateBadge = function (badge) {
        widget.contentURL = this.makeContentURL(options.imageURL, badge);
    };

    options.contentURL = this.makeContentURL(options.imageURL);
    var widget = widgets(options);
};

exports.BadgedWidget = BadgedWidget;