import React, {PropTypes} from 'react';

const Header = React.createClass({
    propTypes: {
        dispatch: PropTypes.func.isRequired
    },
    componentDidMount() {

    },
    render() {
        return (
            <div className="header">
                <a className="header__open" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 34" className="header__icon-mail">
                        <path
                            d="M56.4 0h-56.4v34h56.4l5.6-17-5.6-17zm-1.2 31h-53.3v-28h53.3l4.6 14-4.6 14zm-15.3-19.9c-.5 0-.9.4-.9.9 0 .6.5.9.9.9.5 0 1-.4 1-.9 0-.4-.4-.9-1-.9zm-17.3 7.3l-3-7.4h-2.2v11.9h1.6v-9.9l3.1 7.7h.9l3.1-7.7v9.9h1.6v-11.9h-2.2l-2.9 7.4zm20.6-7.4h1.4v11.9h-1.4v-11.9zm-6.7 9.4v-2.8c0-.6 0-1.5-.6-2.2-.4-.4-1.1-.8-2.4-.8-1 0-2.1.2-3.1.9l.7 1c.4-.2.7-.4 1.1-.5.4-.1.8-.2 1.3-.2.4 0 .9.1 1.2.4.4.3.4 1 .4 1.4v.1c-.7 0-1.6.1-2.3.2-.6.1-1.6.3-2.2.9-.3.3-.7.9-.7 1.7 0 .8.4 1.4.7 1.8.6.6 1.3.7 2 .7s1.3-.2 1.7-.4c.4-.2.8-.5 1-.8.1.3.3.7.5.9.3.2.8.4 1.4.2l.2-1.2c-.1 0-.2.1-.4 0l-.2-.1c-.1 0-.1-.1-.2-.2l-.1-.3v-.7zm-1.4.2c-.3.4-.9.8-1.3 1-.4.2-.7.2-1 .2s-.7 0-1-.3c-.1-.1-.3-.4-.3-.8s.3-.7.4-.9c.5-.6 1.2-.7 1.4-.7.6-.1 1.2-.1 1.8-.1v1.6zm4.1-5.7h1.4v7.9h-1.4v-7.9zm-5.2 5.2"/>
                    </svg>
                </a>
                <span className="header__account">alexivantsov@ya.ru</span>
                <a className="header__compose" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 841.9 18 18" className="header__icon-compose">
                        <path
                            d="M5.4,855.5l3.7-1.4l8.4-8.4c0.6-0.6,0.6-1.7,0-2.3c-0.6-0.6-1.7-0.6-2.3,0l-8.4,8.4L5.4,855.5z M16,857.9H2v-14h6.5l2-2H0v18h18v-9.6l-2,2L16,857.9L16,857.9z"/>
                    </svg> Compose
                </a>
            </div>
        );
    }
});

module.exports = Header;