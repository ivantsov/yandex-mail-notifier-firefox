import React, {PropTypes} from 'react';
const Item = require('./item');

const List = React.createClass({
    propTypes: {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired
        })).isRequired
    },
    render() {
        const items = this.props.items.map(item => <Item key={item.id} {...item}/>);

        return <div className="content">{items}</div>;
    }
});

module.exports = List;
