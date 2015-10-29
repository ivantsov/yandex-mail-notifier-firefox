import React, {PropTypes} from 'react';
const l10n = require('../utils/l10n');
const {openTab} = require('../utils/tab');

const HoverMenu = ({id}) => {
	const params = {
		markRead(e) {
			e.stopPropagation();
			console.log('mark as read');
		},
		remove(e) {
			e.stopPropagation();
			console.log('remove');
		},
		spam(e) {
			e.stopPropagation();
			console.log('spam');
		}
	};

	const items = Object.keys(params).map((key, index) => (
		<div className="hover-menu__item" key={index} onClick={params[key]}>
			<svg xmlns="http://www.w3.org/2000/svg" className="hover-menu__icon">
				<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`#${key}`}></use>
			</svg>
			<div className="hover-menu__text">{l10n.text(key)}</div>
		</div>
	));

	return <div className="hover-menu">{items}</div>;
};

HoverMenu.propTypes = {
	id: PropTypes.string.isRequired
};

module.exports = HoverMenu;
