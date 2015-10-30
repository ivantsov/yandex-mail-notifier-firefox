import React, {PropTypes} from 'react';
const l10n = require('../utils/l10n');
const {openTab} = require('../utils/tab');

const Header = ({user, unreadCount}) => {
    return (
        <div className="header">
            <a href="#" onClick={() => openTab()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="header__icon-mail">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#logo"></use>
                </svg>
            </a>
            <span>{user} (<strong>{unreadCount}</strong>)</span>
            <a href="#" onClick={() => openTab('#compose')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="header__icon-compose">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#compose"></use>
                </svg> {l10n.text('compose')}
            </a>
        </div>
    );
};

Header.propTypes = {
    user: PropTypes.string.isRequired,
    unreadCount: PropTypes.number.isRequired
};

module.exports = Header;
