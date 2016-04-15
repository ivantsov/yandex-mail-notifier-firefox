import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import Notification from './notification';
import Header from './header';
import List from './list';

const App = React.createClass({
    propTypes: {
        user: PropTypes.string.isRequired,
        messages: PropTypes.shape({
            unreadCount: PropTypes.number.isRequired,
            items: PropTypes.arrayOf(PropTypes.object).isRequired,
            loading: PropTypes.bool.isRequired,
            error: PropTypes.bool.isRequired
        }).isRequired,
        notification: PropTypes.number.isRequired,
        loadMessages: PropTypes.func.isRequired,
        updateMessageStatus: PropTypes.func.isRequired
    },
    componentWillMount() {
        this.props.loadMessages();
    },
    render() {
        const {
            user,
            messages: {
                unreadCount,
                items,
                loading,
                error
            },
            notification,
            loadMessages,
            updateMessageStatus
        } = this.props;

        return (
            <div className="container">
                <Notification id={notification}/>
                <Header
                    user={user}
                    unreadCount={unreadCount}
                    loading={loading}
                    onReload={loadMessages}
                />
                <List
                    items={items}
                    loading={loading}
                    error={error}
                    onUpdateMessageStatus={updateMessageStatus}
                />
            </div>
        );
    }
});

export default {
    Component: App,
    ConnectedComponent: connect(
        state => state,
        actions
    )(App)
};
