var {Cc, Ci} = require('chrome'),
    data = require('sdk/self').data,
    tabs = require('sdk/tabs'),
    prefs = require('sdk/simple-prefs'),
    timers = require('sdk/timers'),
    userstyles = require('./userstyles'),
    toolbarButton = require('./toolbar-button').ToolbarButton,
    config = require('./config'),
    request = require('./request'),
    notifications = require('./notifications'),
    parser = data.url('parser.js');

var sound = Cc['@mozilla.org/sound;1'].createInstance(Ci.nsISound),
    ioSvc = Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService),
    soundFile = ioSvc.newURI(data.url('notification.wav'), null, null);

var msgCountBefore = 0,
    msgEndinds = {
        newWord: [' новое ', ' новых ', ' новых '],
        msgWord: ['сообщение!', 'сообщения!', 'сообщений!']
    },
    yaButton, timer;

function formatEndingByCount(count, endings) {
    var endingIndex;

    count = count % 100;

    if (count >= 11 && count <= 19) {
        endingIndex = 2;
    }
    else {
        count = count % 10;

        if (count === 1) {
            endingIndex = 0;
        }
        else if (count >= 2 && count <= 4) {
            endingIndex = 1;
        }
        else {
            endingIndex = 2;
        }
    }

    return endings[endingIndex];
}

function showNotification(msgCount) {
    notifications.notify({
        title: 'Новое сообщение',
        text: 'У вас ' + msgCount + formatEndingByCount(msgCount, msgEndinds.newWord) + formatEndingByCount(msgCount, msgEndinds.msgWord)
    }, function (data) {
        tabs.open(config.urlForOpen);
    });
}

function checkMail() {
    request.get(config.urlForParse, parser, function (unreadMsgCount) {
        var msgCountCurrent = unreadMsgCount;

        if (prefs.prefs.notifyType === 'new') {
            msgCountCurrent = unreadMsgCount - msgCountBefore;
        }

        msgCountBefore = unreadMsgCount;

        if (msgCountCurrent > 0) {
            yaButton.badge = msgCountCurrent;

            showNotification(msgCountCurrent);

            if (prefs.prefs.sound) {
                sound.play(soundFile);
            }
        }
        else {
            yaButton.badge = 0;
        }
    });
}

function setCheckInterval() {
    timers.clearInterval(timer);
    timer = timers.setInterval(checkMail, prefs.prefs.checkInterval);
}

prefs.on('checkInterval', function () {
    setCheckInterval();
});

(function () {
    userstyles.load(data.url(config.cssFile));

    yaButton = toolbarButton({
        id: config.id,
        tooltiptext: config.label,
        onClick: function () {
            tabs.open(config.urlForOpen)
        }
    });

    setCheckInterval();
})();