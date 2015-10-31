import React, {PropTypes} from 'react';
const l10n = require('../utils/l10n');
const Spinner = require('./spinner');
const Item = require('./item');

const List = ({items, loading, error, onUpdateMessageStatus}) => {
    if (loading) {
        return <Spinner/>;
    }

    if (error || !items.length) {
        return <div className="content content_empty">{l10n.text(error ? 'loadingError' : 'emptyList')}</div>;
    }

    const messages = items.map(item => <Item key={item.id} onUpdateMessageStatus={onUpdateMessageStatus} {...item}/>);

    return <div className="content">{messages}</div>;
};

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
    })).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    onUpdateMessageStatus: PropTypes.func.isRequired
};

module.exports = List;
