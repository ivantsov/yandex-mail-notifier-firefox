import React, {PropTypes} from 'react';
const l10n = require('../utils/l10n');
const Item = require('./item');

const List = ({items, loadingError, onUpdateMessageStatus}) => {
	if (!loadingError && items.length) {
		const messages = items.map(item => <Item key={item.id} onUpdateMessageStatus={onUpdateMessageStatus} {...item}/>);

		return <div className="content">{messages}</div>;
	}
	else {
		return <div className="content content_empty">{l10n.text(loadingError ? 'loadingError' : 'emptyList')}</div>;
	}
};

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
    })).isRequired,
	loadingError: PropTypes.bool.isRequired,
	onUpdateMessageStatus: PropTypes.func.isRequired
};

module.exports = List;
