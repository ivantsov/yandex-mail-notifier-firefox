import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadMessages} from '../actions';
import Spinner from './spinner';
import Header from './header';
import List from './list';

const App = React.createClass({
    propTypes: {
        dispatch: PropTypes.func.isRequired,
        messages: PropTypes.arrayOf(PropTypes.object).isRequired
    },
    componentDidMount() {
        this.props.dispatch(loadMessages());
    },
	componentWillReceiveProps(newProps) {
		if (newProps.date !== this.props.date) {
			this.props.dispatch(loadMessages());
		}
	},
    render() {
        const {loading, messages} = this.props;

        return loading ? <Spinner/> : (
            <div className="container">
                <Header/>
                <List items={messages}/>
            </div>
        );
    }
});

//TODO: maybe use reselect (https://github.com/faassen/reselect) instead
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);
