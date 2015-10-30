import React, {PropTypes} from 'react';
const {NOTIFICATION_TIMEOUT} = require('../../config');
const l10n = require('../utils/l10n');

const Notification = React.createClass({
	getInitialState() {
		return {
			isShown: false
		};
	},
	componentWillReceiveProps({id}) {
		clearTimeout(this.timer);

		this.setState({isShown: true});

		this.timer = setTimeout(() => {
			if (this.isMounted()) {
				this.setState({isShown: false})
			}
		}, NOTIFICATION_TIMEOUT);
	},
	render() {
		const className = `notification ${this.state.isShown ? 'notification_open' : ''}`;

		return <div className={className}>{l10n.text('operationError')}</div>;
	}
});

Notification.propTypes = {
	id: PropTypes.number.isRequired
};

module.exports = Notification;
