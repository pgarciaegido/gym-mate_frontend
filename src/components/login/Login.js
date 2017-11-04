/* eslint-disable */

import React from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import axios from 'axios';

import { API_BASE_URL_LOCAL } from '../../constants';
import './Login.css';

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
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
        debugger;

       /*  axios.post(`${API_BASE_URL_LOCAL}/login`, { email, password })
            .then(res => {
                debugger;
                console.log(res);
            })
            .catch(err => {
                debugger;
                console.log(err);
            }) */
    }

    render() {
        let loading = this.state.loading;
        return (
            <Form loading={loading} onSubmit={this.handleSubmit} className="loginForm">
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
        )
    }
}



export default Login;
