import React, {PropTypes} from 'react';
const {DOMAIN} = require('../../config');
const l10n = require('../utils/l10n');

const Item = React.createClass({
    propTypes: {
        id: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        firstline: PropTypes.string.isRequired,
        date: PropTypes.object.isRequired
    },
    render() {
        const {
            id,
            from,
            subject,
            firstline,
            date,
        } = this.props;

        return (
            <a className="email" href={`${DOMAIN}/#message/${id}`}>
                <p className="email__header">
                    <span className="email__title">{from}</span>
                    <span className="email__date">{l10n.date(date)}</span>
                </p>

                <p className="email__subject">{subject}</p>

                <p className="email__content">{firstline}</p>
            </a>
        );
    }
});

module.exports = Item;
