import React from 'react';
import { Form, Header, Button, Message } from 'semantic-ui-react';
import axios from 'axios';

import { API_BASE_URL_LOCAL } from '../../constants/api';
import { LOGIN_EMAIL_IS_NOT_REGISTERED, LOGIN_WRONG_PASSWORD } from '../../constants/messages';
import './Login.css';

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            userName: '',
            errorWarning: false,
            errorMessage: '',
            successWarning: false,
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        const { email, password } = this.state;

        axios.post(`${API_BASE_URL_LOCAL}/login`, { email, password })
            .then(({ data }) => {
                this.setState({ loading: false });

                const st = {};

                switch (data) {
                    case 'USER_DOES_NOT_EXIST':
                        st.errorWarning = true;
                        st.errorMessage = LOGIN_EMAIL_IS_NOT_REGISTERED;
                        break;
                    case 'WRONG_PASSWORD':
                        st.errorWarning = true;
                        st.errorMessage = LOGIN_WRONG_PASSWORD;
                        break;
                    default:
                        st.successWarning = true;
                        st.userName = data.name;
                        st.errorWarning = false;
                }

                this.setState(st);
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    errorWarning: true,
                    successWarning: false,
                    errorMessage: "There is been an error. Please try again."
                });
            });
    }

    render() {
        const { successWarning, errorWarning, userName, errorMessage, loading } = this.state;

        return (
            <div className="loginForm">
                <Form loading={loading} onSubmit={this.handleSubmit}>
                    <Header>Login</Header>
                    <Form.Input
                        type="email"
                        value={this.state.email}
                        name='email'
                        label='Email'
                        placeholder='joe@doe.com'
                        onChange={this.onChange} />
                    <Form.Input
                        type="password"
                        label="Password"
                        name="password"
                        onChange={this.onChange} />
                    <Button type="submit">Log in!</Button>
                </Form>
                {successWarning && <Message
                    success
                    header='Login successfully!'
                    content={`Welcome back ${userName}`}
                />}
                {errorWarning && <Message negative>
                    <Message.Header>Error on login!</Message.Header>
                    <p>{errorMessage}</p>
                </Message>}
            </div>
        )
    }
}

export default Login;
