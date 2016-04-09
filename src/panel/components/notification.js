import React, {PropTypes} from 'react';
import {ERROR_NOTIFICATION_TIMEOUT} from '../../config';
import l10n from '../utils/l10n';

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

export default Notification;
