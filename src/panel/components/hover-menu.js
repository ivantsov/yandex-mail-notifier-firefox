import React, {PropTypes} from 'react';
import l10n from '../utils/l10n';

const HoverMenu = ({
    id,
    onUpdateMessageStatus
}) => {
    const params = {
        markRead(e) {
            e.stopPropagation();

            onUpdateMessageStatus({id, oper: 'mark_read'});
        },
        remove(e) {
            e.stopPropagation();

            onUpdateMessageStatus({id, oper: 'delete'});
        },
        spam(e) {
            e.stopPropagation();

            onUpdateMessageStatus({id, oper: 'tospam'});
        }
    };

    const items = Object.keys(params).map((key, index) => (
        <div
            key={index}
            className="hover-menu__item"
            onClick={params[key]}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hover-menu__icon"
            >
                <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref={`#${key}`}
                />
            </svg>
            <div className="hover-menu__text">{l10n.text(key)}</div>
        </div>
    ));

    return <div className="hover-menu">{items}</div>;
};

HoverMenu.propTypes = {
    id: PropTypes.string.isRequired,
    onUpdateMessageStatus: PropTypes.func.isRequired
};

export default HoverMenu;
