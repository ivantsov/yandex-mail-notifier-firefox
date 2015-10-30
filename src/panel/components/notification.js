import React, {PropTypes} from 'react';
const {NOTIFICATION_TIMEOUT} = require('../../config');
const l10n = require('../utils/l10n');

const Notification = React.createClass({
	getInitialState() {
		return {
			isShown: false
		};
	},
	componentWillReceiveProps({error}) {
		console.log('will receive props', error);
		console.log('will receive props', this.state);
		clearTimeout(this.timer);

		this.setState({isShown: error});

		if (error) {
			this.timer = setTimeout(() => {
				console.log('inside timeout', this.isMounted());
				if (this.isMounted()) {
					this.setState({isShown: false})
				}
			}, NOTIFICATION_TIMEOUT);
		}
	},
	render() {
		const className = `notification ${this.state.isShown ? 'notification_open' : ''}`;

		console.log('redener', this.state);

		return <div className={className}>{l10n.text('operationError')}</div>;
	}
});

Notification.propTypes = {
	error: PropTypes.bool.isRequired
};

module.exports = Notification;
