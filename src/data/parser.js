var selector = document.querySelector('.b-folders__folder_current .b-folders__folder__num'),
    unreadMsgCount = 0;

if (selector) {
    unreadMsgCount = parseInt(selector.innerHTML, 10);
}

self.postMessage(unreadMsgCount);