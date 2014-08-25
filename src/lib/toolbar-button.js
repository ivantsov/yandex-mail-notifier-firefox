var {Cu} = require('chrome'),
    utils = require('sdk/window/utils'),
    unload = require('sdk/system/unload');

var ToolbarButtton = function (options) {
    var badge, tooltiptext, button, listen;

    listen = {
        onWidgetBeforeDOMChange: function (tbb) {
            if (tbb.id != options.id) return;
            if (tbb.installed) return;
            tbb.installed = true;

            if (badge) {
                tbb.setAttribute('value', badge);
                tbb.setAttribute('length', badge.length);
            }
            if (tooltiptext) {
                tbb.setAttribute('tooltiptext', tooltiptext);
            }
            if (options.onClick) {
                tbb.addEventListener('click', options.onClick, false);
            }
        }
    };

    Cu.import('resource:///modules/CustomizableUI.jsm');
    CustomizableUI.addListener(listen);

    button = CustomizableUI.createWidget({
        id: options.id,
        defaultArea: CustomizableUI.AREA_NAVBAR,
        tooltiptext: options.tooltiptext
    });

    unload.when(function () {
        CustomizableUI.removeListener(listen);
        CustomizableUI.destroyWidget(options.id);
    });

    return {
        destroy: function () {
            CustomizableUI.destroyWidget(options.id);
        },
        get badge() badge,
        set badge(value) {
            if ((value + '').length > 4) {
                value = '9999';
            }
            badge = value;
            button.instances.forEach(function (i) {
                var tbb = i.anchor.ownerDocument.defaultView.document.getElementById(options.id);
                tbb.setAttribute('value', value ? value : '');
                tbb.setAttribute('length', value ? (value + '').length : 0);
            });
        },
        get tooltiptext() button.tooltiptext,
        set tooltiptext(value) {
            button.instances.forEach(function (i) {
                tooltiptext = value;
                var tbb = i.anchor.ownerDocument.defaultView.document.getElementById(options.id);
                tbb.setAttribute('tooltiptext', value);
            });
        },
        get object () {
            return utils.getMostRecentBrowserWindow().document.getElementById(options.id);
        }
    }
}

exports.ToolbarButton = ToolbarButtton;