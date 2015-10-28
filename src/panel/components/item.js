import React, {PropTypes} from 'react';
const l10n = require('../utils/l10n');
const {openTab} = require('../utils/tab');

const Item = ({id, from, subject, firstline, date}) => {
    return (
        <a className="email" href="#" onClick={() => openTab(`#message/${id}`)}>
            <p className="email__header">
                <span className="email__title">{from}</span>
                <span className="email__date">{l10n.date(date)}</span>
            </p>

            <p className="email__subject">{subject}</p>

            <p className="email__content">{firstline}</p>
        </a>
    );
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    firstline: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired
};

module.exports = Item;
