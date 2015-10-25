const xml = {
    select(selector, parent = document) {
        return parent.querySelector(selector);
    },
    selectAll(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },
    getText(element, selector) {
        if (element && selector) {
            element = this.select(selector, element);
        }

        return element ? (element.textContent || (element.firstChild && element.firstChild.data) || '') : '';
    },
    getAttr(element, selector, attr) {
        if (arguments.length === 2) {
            attr = selector;
            selector = null;
        }

        if (element && selector) {
            element = this.select(selector, element);
        }

        return element && element.getAttribute(attr) || '';
    }
};

module.exports = xml;