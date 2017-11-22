import React from 'react';
import { Form, Header, Segment, Button, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { API_BASE_URL_LOCAL } from '../../constants/api';

class PasswordRecovery extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            loading: false,
            errorWarning: false,
            successWarning: false
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.success = this.success.bind(this);
        this.showError = this.showError.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    showError() {
        this.setState({ errorWarning: true, loading: false });
    }

    success() {
        this.setState({ loading: false, successWarning: true }); 
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        const { email } = this.state;

        axios.post(`${API_BASE_URL_LOCAL}/recover-password`, { email })
            .then(() => this.success())
            .catch(() => this.showError());
    }

    render() {
        const { loading, errorWarning, successWarning, email } = this.state;

        return(
            <div className="gm_form">
                <Header>Password Recovery Service</Header>
                <Segment>This is the password recovery service. Please, introduce your email and you'll be sent a link where to choose a new password</Segment>
                <Form loading={loading} onSubmit={this.handleSubmit}>
                    <Form.Input
                        type="email"
                        value={this.state.email}
                        name='email'
                        label='Email'
                        placeholder='joe@doe.com'
                        onChange={this.onChange} />
                    <Button type="submit">Send it to me!</Button>
                </Form>
                {successWarning && <Message 
                    success
                    header='Awesome!'
                    content={`An email has been sent to ${email}. Please check it out.`} />
                }
                {errorWarning && <Message negative>
                    <Message.Header>Error!</Message.Header>
                    <p>This email is not registered</p>
                </Message>}
            </div>
        )
    }
}

export default PasswordRecovery;
