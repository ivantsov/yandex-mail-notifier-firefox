const xml = require('./parser');

function parse(xmlDoc) {
    const error = xml.select('error', xmlDoc);

    if (error) {
        throw new Error(`Error occurred while parsing user xml ${xml.getAttr(error, 'code')}`);
    }

    const body = xml.select('body', xmlDoc);

    return xml.getText(body, 'default_email');
}

module.exports = parse;
