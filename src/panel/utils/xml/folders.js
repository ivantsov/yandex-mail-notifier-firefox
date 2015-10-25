const xml = require('./parser');

function parse(xmlDoc) {
    const folders = xml.selectAll('folder', xmlDoc);

    return [...folders].map(folder => {
        return {
            id: xml.getText(folder, 'fid'),
            symbol: xml.getText(folder, 'symbol'),
            name: xml.getText(folder, 'name').split('|').pop()
        };
    });
}

module.exports = parse;
