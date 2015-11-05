import React, {PropTypes} from 'react';
const {ERROR_NOTIFICATION_TIMEOUT} = require('../../config');
const l10n = require('../utils/l10n');

const Notification = React.createClass({
    propTypes: {
        id: PropTypes.number.isRequired
    },
    getInitialState() {
        return {
            isShown: false
        };
    },
    componentWillReceiveProps(newProps) {
        if (newProps.id !== this.props.id) {
            clearTimeout(this.timer);

            this.setState({isShown: true});

            this.timer = setTimeout(() => {
                if (this.isMounted()) {
                    this.setState({isShown: false});
                }
            }, ERROR_NOTIFICATION_TIMEOUT);
        }
    },
    render() {
        const className = `notification ${this.state.isShown ? 'notification_open' : ''}`;

        return <div className={className}>{l10n.text('operationError')}</div>;
    }
});

module.exports = Notification;
