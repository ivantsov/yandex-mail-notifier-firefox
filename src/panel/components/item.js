import React, {PropTypes} from 'react';
import l10n from '../utils/l10n';
import openTab from '../utils/tab';
import HoverMenu from './hover-menu';

const Item = ({
    id,
    from,
    subject,
    firstline,
    date,
    onUpdateMessageStatus
}) => (
    <a
        href="#"
        className="email"
        onClick={() => openTab(`#message/${id}`)}
    >
        <p>
            <span className="email__from">{from}</span>
            <span className="email__date">{l10n.date(date)}</span>
        </p>

        <p>{subject}</p>

        <p className="email__content">{firstline}</p>

        <HoverMenu
            id={id}
            onUpdateMessageStatus={onUpdateMessageStatus}
        />
    </a>
);

Item.propTypes = {
    id: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    firstline: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    onUpdateMessageStatus: PropTypes.func.isRequired
};

export default Item;
