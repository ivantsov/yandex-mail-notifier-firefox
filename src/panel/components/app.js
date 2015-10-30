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
		unreadCount: PropTypes.number.isRequired,
        messages: PropTypes.arrayOf(PropTypes.object).isRequired,
        loading: PropTypes.bool.isRequired,
		loadingError: PropTypes.bool.isRequired,
		operationError: PropTypes.bool.isRequired
    },
    componentWillMount() {
        this.props.dispatch(loadMessages());
    },
    render() {
        const {
			dispatch,
            user,
            unreadCount,
            messages,
            loading,
			loadingError,
			operationError
        } = this.props;

        return loading ? <Spinner/> : (
            <div className="container">
				<Notification error={operationError}/>
                <Header user={user} unreadCount={unreadCount}/>
                <List items={messages}
					  loadingError={loadingError}
					  onUpdateMessageStatus={data => dispatch(updateMessageStatus(data))}/>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return state;
}

module.exports = connect(mapStateToProps)(App);
