import React from 'react';
import { Form, Header, Button, Message } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { API_BASE_URL_LOCAL } from '../../constants/api';
import { UNEXPECTED_PROBLEM } from '../../constants/messages';
import './Login.scss';

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
        this.everythingAlright = this.everythingAlright.bind(this);
        this.apiError = this.apiError.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        const { email, password } = this.state;

        axios.post(`${API_BASE_URL_LOCAL}/login`, { email, password })
            .then(() => this.everythingAlright())
            .catch(({response}) => this.apiError(response));
    }

    everythingAlright() {
        this.setState({
            loading: false,
            errorWarning: false,
            successWarning: true
        })
    }

    apiError(response) {
        const st = {
            loading: false,
            errorWarning: true,
            successWarning: false
        }
        st.errorMessage = response ?  response.data.message : UNEXPECTED_PROBLEM;
        this.setState(st);
    }

    render() {
        const { successWarning, errorWarning, userName, errorMessage, loading } = this.state;

        return (
            <div className="gm_form">
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
                    <p className="gm_formTextBellow">If you don't have an account,
                        <Link to="/signup"> Signup here!</Link>
                    </p>
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
