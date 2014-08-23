var {Cc, Ci} = require('chrome');
var data = require('sdk/self').data;
var tabs = require('sdk/tabs');
var prefs = require('sdk/simple-prefs');
var timers = require('sdk/timers');
var BadgedWidget = require('./badged-widget').BadgedWidget;
var request = require('./request');
var notifications = require('./notifications');
var parser = data.url('parser.js');

var ID = 'yandex-mail-link',
    URL_FOR_PARSE = 'https://mail.yandex.ru/lite/inbox',
    URL_FOR_OPEN = 'https://mail.yandex.ru/',
    ICON_FILENAME = 'icon-16.png';

var sound = Cc["@mozilla.org/sound;1"].createInstance(Ci.nsISound),
    ioSvc = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService),
    soundFile = ioSvc.newURI(data.url("notification.wav"), null, null);

var msgCountBefore = 0,
    timer;

function formatEndByCount(count) {
    var formattedString;

    if (count === 1) {
        formattedString = ' новое сообщение!';
    }
    else if (count >= 2 && count <= 4) {
        formattedString = ' новых сообщения!';
    }
    else if (count >= 5) {
        formattedString = ' новых сообщений!';
    }

    return formattedString;
}

function showNotification(msgCount) {
    notifications.notify({
        title: 'Новое сообщение',
        text: 'У вас ' + msgCount + formatEndByCount(msgCount)
    }, function (data) {
        tabs.open(URL_FOR_OPEN);
    });
}

function checkMail() {
    request.get(URL_FOR_PARSE, parser, function (unreadMsgCount) {
        var msgCountCurrent = unreadMsgCount;

        if (prefs.prefs.notifyType === 'new') {
            msgCountCurrent = unreadMsgCount - msgCountBefore;
        }
        msgCountBefore = unreadMsgCount;

        widget.updateBadge(msgCountCurrent >= 0 ? msgCountCurrent : 0);
        if (msgCountCurrent > 0) {
            showNotification(msgCountCurrent);

            if (prefs.prefs.sound) {
                sound.play(soundFile);
            }
        }
    });
}

function setCheckInterval() {
    timers.clearInterval(timer);
    timer = timers.setInterval(checkMail, prefs.prefs.checkInterval);
}

var widget = new BadgedWidget({
    id: ID,
    label: 'Перейти на Яндекс.почта',
    width: 30,
    imageURL: data.url(ICON_FILENAME),
    onClick: function () {
        tabs.open(URL_FOR_OPEN)
    }
});

prefs.on('checkInterval', function () {
    setCheckInterval();
});

setCheckInterval();