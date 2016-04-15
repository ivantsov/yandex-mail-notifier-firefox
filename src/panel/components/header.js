import React, {PropTypes} from 'react';
import l10n from '../utils/l10n';
import openTab from '../utils/tab';

const Header = ({
    user,
    unreadCount,
    loading,
    onReload
}) => (
    <div className="header">
        <a
            href="#"
            className="header__item"
            onClick={() => openTab()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="header__icon-mail"
            >
                <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#logo"
                />
            </svg>
        </a>
        <div className="header__item">
            <a
                href="#"
                onClick={() => openTab()}
            >
                {user} (<strong>{unreadCount}</strong>)
            </a>
            <button
                className="header__reload"
                disabled={loading}
                onClick={onReload}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header__icon-reload"
                >
                    <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#reload"
                    />
                </svg>
            </button>
        </div>
        <a
            href="#"
            className="header__item"
            onClick={() => openTab('#compose')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="header__icon-compose"
            >
                <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#compose"
                />
            </svg>
            {l10n.text('compose')}
        </a>
    </div>
);

Header.propTypes = {
    user: PropTypes.string.isRequired,
    unreadCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    onReload: PropTypes.func.isRequired
};

export default Header;
