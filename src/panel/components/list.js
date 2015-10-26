import React, {PropTypes} from 'react';
const Item = require('./item');

const List = (props) => {
    const items = props.items.map(item => <Item key={item.id} {...item}/>);

    return <div className="content">{items}</div>;
};

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
    })).isRequired
};

module.exports = List;
