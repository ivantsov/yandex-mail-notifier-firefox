import React, {PropTypes} from 'react';
const {connect} = require('react-redux');
const {loadMessages} = require('../actions');
const Spinner = require('./spinner');
const Header = require('./header');
const List = require('./list');

const App = React.createClass({
    propTypes: {
        dispatch: PropTypes.func.isRequired,
        user: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
        messages: PropTypes.arrayOf(PropTypes.object).isRequired
    },
    componentWillMount() {
        this.props.dispatch(loadMessages());
    },
    render() {
        const {
            loading,
            user,
            unreadCount,
            messages
        } = this.props;

        return loading ? <Spinner/> : (
            <div className="container">
                <Header user={user} unreadCount={unreadCount}/>
                <List items={messages}/>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return state;
}

module.exports = connect(mapStateToProps)(App);
