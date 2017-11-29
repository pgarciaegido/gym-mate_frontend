import React from 'react';
import { Form, Header, Segment, Button, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import { API_BASE_URL_LOCAL } from '../../constants/api';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            password: '',
            passwordConf: '',
            error: false,
            unauthorized: false,
            errorMessage: '',
            credentials: {},
            buttonDisabled: true,
            success: false
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.passwordsAreEqual = this.passwordsAreEqual.bind(this);
    }

    
    componentDidMount() {
        // Check first that new password has been requested using these credentials.
        const credentials = queryString.parse(this.props.location.search);
        axios.get(`${API_BASE_URL_LOCAL}/introduce-new-password/${credentials.email}/${credentials.token}`)
        .then(() => {
            this.setState({ loading: false, credentials });
        })
        .catch(() => {
            this.setState({ loading: false, error: true, unauthorized: true, errorMessage: 'Unauthorized! Your token is invalid.' });
        });
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit() {
        this.setState({ loading: true });
        const newPass = { password: this.state.password };
        axios.post(`${API_BASE_URL_LOCAL}/introduce-new-password/${this.state.credentials.email}/${this.state.credentials.token}`, newPass)
            .then(() => {
                this.setState({ success: true, error: false, loading: false })
            })
            .catch(() => {
                this.setState({ error: true, errorMessage: 'Error saving your new password', success: false, loading: false });
            });     
    }

    passwordsAreEqual() {
        if (this.state.password === this.state.passwordConf) {
            this.setState({ buttonDisabled: false, error: false });
        }
        else {
            this.setState({ buttonDisabled: true, error: true, errorMessage: 'Passwords are not equal'});
        }
    }

    render() {
        const { loading, error, errorMessage, buttonDisabled, unauthorized, success } = this.state;
        return(
            <div className="gm_form" onSubmit={this.handleSubmit}>
                <Form loading={loading}>
                    <Header>Change your password</Header>
                    <Form.Input
                        type="password"
                        value={this.state.password}
                        name="password"
                        label="Enter new password"
                        placeholder="supersecret"
                        onChange={this.onChange}
                        disabled={unauthorized} />
                    <Form.Input
                        type="password"
                        value={this.state.passwordConf}
                        name="passwordConf"
                        label="Enter new password again"
                        placeholder="supersecret"
                        onChange={this.onChange}
                        disabled={unauthorized}
                        onBlur={this.passwordsAreEqual} />
                    <Button type="submit" disabled={buttonDisabled}>Set new password!</Button>
                </Form>
                {error && <Message negative>
                    <Message.Header>Error!</Message.Header>
                    <p>{errorMessage}</p>
                </Message>}
                {success && <Message success>
                    <Message.Header>Success!</Message.Header>
                    <p>Your password has been changed</p>
                </Message>}
            </div>
        )
    }
}

export default ChangePassword;
