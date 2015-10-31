import React, {PropTypes} from 'react';
const l10n = require('../utils/l10n');
const {openTab} = require('../utils/tab');

const Header = ({user, unreadCount, loading, onReload}) => {
    return (
        <div className="header">
            <a href="#" onClick={() => openTab()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="header__icon-mail">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#logo"></use>
                </svg>
            </a>
            <div>
                {user} (<strong>{unreadCount}</strong>)
                <button className="header__reload" disabled={loading} onClick={onReload}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="header__icon-reload">
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#reload"></use>
                    </svg>
                </button>
            </div>
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
    unreadCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    onReload: PropTypes.func.isRequired
};

module.exports = Header;
