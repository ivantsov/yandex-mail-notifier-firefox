import React, {PropTypes} from 'react';
const {connect} = require('react-redux');
const {loadMessages, updateMessageStatus} = require('../actions');
const Notification = require('./notification');
const Header = require('./header');
const List = require('./list');

const App = React.createClass({
    propTypes: {
        dispatch: PropTypes.func.isRequired,
        user: PropTypes.string.isRequired,
        messages: PropTypes.shape({
            unreadCount: PropTypes.number.isRequired,
            items: PropTypes.arrayOf(PropTypes.object).isRequired,
            loading: PropTypes.bool.isRequired,
            error: PropTypes.bool.isRequired
        }).isRequired,
        notification: PropTypes.number.isRequired
    },
    componentWillMount() {
        this.props.dispatch(loadMessages());
    },
    render() {
        const {
            dispatch,
            user,
            messages: {
                unreadCount,
                items,
                loading,
                error
            },
            notification
        } = this.props;

        return (
            <div className="container">
                <Notification id={notification}/>
                <Header user={user}
                        unreadCount={unreadCount}
                        loading={loading}
                        onReload={() => dispatch(loadMessages())}/>
                <List items={items}
                      loading={loading}
                      error={error}
                      onUpdateMessageStatus={data => dispatch(updateMessageStatus(data))}/>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return state;
}

module.exports = {
    Component: App,
    ConnectedComponent: connect(mapStateToProps)(App)
};
