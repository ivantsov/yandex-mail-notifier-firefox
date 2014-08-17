const { Trait } = require('sdk/deprecated/traits');
const widgets = require('sdk/widget');

const BadgedWidget = Trait.compose({
    constructor: function(options) {
        this._imageURL = options.contentURL;
        options.contentURL = this._makeContentURL(this._imageURL, this._badge);
        this._widget = widgets.Widget(options);
        this._widget.width += 15;
    },

    get widget() this._widget,
    get badge() this._badge,
    set badge(props) {
        this._badge = props;
        this._updateWidget();
    },

    _badge: {},

    _updateWidget: function _updateWidget() {
        this._widget.contentURL = this._makeContentURL(this._imageURL, this._badge);
    },

    _makeContentURL: function _makeContentURL(imageURL, badge) {
        let str = 'data:text/html,<html><body style="margin:0; padding:0;"><div style="position: relative;">' +
            '<img src="' + imageURL + '">' +
            '<span style="font-size: 13px; position: absolute; top: -2px; left: 20px; padding: 0; margin: 0;">' +
            (badge.text || '') + '</span></div></body></html>';

        return str;
    }
})

exports.BadgedWidget = function(options) BadgedWidget(options);