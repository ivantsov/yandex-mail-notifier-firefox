import React, {PropTypes} from 'react';
import l10n from '../utils/l10n';
import Spinner from './spinner';
import Item from './item';

const List = ({
    items,
    loading,
    error,
    onUpdateMessageStatus
}) => {
    if (loading) {
        return <Spinner/>;
    }

    if (error || !items.length) {
        return <div className="center content_empty">{l10n.text(error ? 'loadingError' : 'emptyList')}</div>;
    }

    const messages = items.map(item => (
        <Item
            key={item.id}
            onUpdateMessageStatus={onUpdateMessageStatus}
            {...item}
        />
    ));

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

export default List;
