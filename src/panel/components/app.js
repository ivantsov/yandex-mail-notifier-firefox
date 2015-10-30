import React, {PropTypes} from 'react';
const {connect} = require('react-redux');
const {loadMessages, updateMessageStatus} = require('../actions');
const Spinner = require('./spinner');
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

        return loading ? <Spinner/> : (
            <div className="container">
				<Notification id={notification}/>
                <Header user={user} unreadCount={unreadCount}/>
                <List items={items}
					  error={error}
					  onUpdateMessageStatus={data => dispatch(updateMessageStatus(data))}/>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return state;
}

module.exports = connect(mapStateToProps)(App);
