import React from 'react';
import { Form, Header, Button, Message } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { SIGNUP_DIFFERENT_PASSWORDS } from '../../constants/messages';
import { API_BASE_URL_LOCAL } from '../../constants/api';

import './Signup.scss';

class Signup extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            emailError: false,
            passwordError: false,
            nameError: false,
            errorWarning: false,
            errorMessage: '',
            successWarning: false,
            buttonDisabled: true
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.everythingAlright = this.everythingAlright.bind(this);
        this.apiError = this.apiError.bind(this);
    }

    onChange(e) {
        const updater = { [e.target.name]: e.target.value };
        this.setState(updater, () => {
            if (this.state.email && this.state.password && this.state.confirmPassword && this.state.name) {
                return this.setState({ buttonDisabled: false})
            }
            return this.setState({ buttonDisabled: true })
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // Passwords are not the same
        if (!this.comparePasswords()) {
            return this.setState({errorWarning: true, errorMessage: SIGNUP_DIFFERENT_PASSWORDS, passwordError: true, successWarning: false});
        }
        const { name, email, password } = this.state;

        return axios.post(`${API_BASE_URL_LOCAL}/signup`, { name, email, password })
        .then(() => this.everythingAlright())
        .catch(({ response }) => this.apiError(response));
    }

    comparePasswords() {
        return this.state.password === this.state.confirmPassword;
    }

    everythingAlright() {
        this.setState({
            errorWarning: false,
            successWarning: true,
            emailError: false,
            passwordError: false,
            nameError: false,
            loading: false
        })
    }

    apiError(response) {
        this.setState({
            successWarning: false,
            errorWarning: true,
            errorMessage: response.data.message
        })
    }

    render() {
        const { loading, errorMessage, errorWarning, name, successWarning, emailError, passwordError, nameError, buttonDisabled } = this.state;
        return(
            <div className="gm_form" onSubmit={this.handleSubmit}>
                <Form loading={loading}>
                    <Header>Signup</Header>
                    <Form.Input
                        type="email"
                        value={this.state.email}
                        name='email'
                        label='Email'
                        placeholder='joe@doe.com'
                        onChange={this.onChange}
                        className={ (emailError ? 'gm_formInputError' : '') } />
                    <Form.Input
                        type="password"
                        label="Password"
                        name="password"
                        onChange={this.onChange}
                        className={ passwordError ? 'gm_formInputError' : '' } />
                    <Form.Input
                        type="password"
                        label="Confirm password"
                        name="confirmPassword"
                        onChange={this.onChange}
                        className={ passwordError ? 'gm_formInputError' : '' } />
                    <Form.Input
                        type="text"
                        value={this.state.name}
                        name='name'
                        label='Name'
                        placeholder='John Doe'
                        onChange={this.onChange}
                        className={ (nameError ? 'gm_formInputError' : '') } />
                    <Button type="submit" disabled={buttonDisabled}>Signup</Button>
                    <p className="gm_formTextBellow">If you already have an account,
                        <Link to="/login"> Log in here!</Link>
                    </p>
                </Form>
                {successWarning && <Message
                    success
                    header='Signup successfully!'
                    content={`Welcome ${name}! We are glad to have you here`}
                />}
                {errorWarning && <Message negative>
                    <Message.Header>Error on Signup!</Message.Header>
                    <p>{errorMessage}</p>
                </Message>}
            </div>
        )
    }
}

export default Signup;
