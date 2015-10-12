if (window.location.host.indexOf('mail') === -1) {
    self.port.emit('notAuth');
}
else {
    let folders = {};

    [...document.querySelectorAll('.b-folders .b-folders__folder')].some(item => {
        let linkSelector = item.querySelector('.b-folders__folder__link');
        let countSelector = item.querySelector('.b-folders__folder__num');
        let nameSelector = item.querySelector('.b-folders__folder__name');

        if (linkSelector.href.indexOf('sent') !== -1) {
            return true;
        }

        if (countSelector) {
            let name = nameSelector.textContent.toLowerCase().replace(/\s+/g, '');

            folders[name] = parseInt(countSelector.textContent, 10);
        }
    });

    self.port.emit('newMessages', folders);
}
