module.exports = function (xml) {
    const error = xml.querySelector('error');

    if (error) {
        throw new Error(`Error occurred while parsing user xml ${error.getAttribute('code')}`);
    }

    return xml.querySelector('body').querySelector('default_email').textContent;
};
