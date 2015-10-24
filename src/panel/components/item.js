import React, {PropTypes} from 'react';

const Item = React.createClass({
    propTypes: {
		from: PropTypes.string.isRequired,
		firstline: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
		subject: PropTypes.string
    },
    render() {
		const {
			from,
			firstline,
			date,
			subject
		} = this.props;

        return (
            <a className="email" href="#">
                <p className="email__header">
                    <span className="email__title">{from}</span>
                    <span className="email__date">{date}</span>
                </p>
                <p className="email__subject">{subject}</p>
                <p className="email__content">{firstline}</p>
            </a>
        );
    }
});

module.exports = Item;
