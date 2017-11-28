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
            wrongCredentials: false,
            credentials: {}
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.passwordsAreEqual = this.passwordsAreEqual.bind(this);
    }

    
    componentDidMount() {
        const credentials = queryString.parse(this.props.location.search);
        axios.get(`${API_BASE_URL_LOCAL}/introduce-new-password/${credentials.email}/${credentials.token}`)
        .then((res) => {
            console.log(res);
            this.setState({ loading: false, credentials });
        })
        .catch((err) => {
            console.log(err)
            this.setState({ loading: false, wrongCredentials: true });
        });
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit() {
        if (this.passwordsAreEqual()) {
            const newPass = { password: this.state.password };
            axios.post(`${API_BASE_URL_LOCAL}/introduce-new-password/${this.state.credentials.email}/${this.state.credentials.token}`, newPass)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }

    passwordsAreEqual() {
        return this.state.password === this.state.passwordConf;
    }

    render() {
        const { loading, wrongCredentials } = this.state;
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
                        disabled={wrongCredentials} />
                    <Form.Input
                        type="password"
                        value={this.state.passwordConf}
                        name="passwordConf"
                        label="Enter new password again"
                        placeholder="supersecret"
                        onChange={this.onChange}
                        disabled={wrongCredentials} />
                    <Button type="submit" disabled={wrongCredentials}>Set new password!</Button>
                </Form>
                {wrongCredentials && <Message negative>
                    <Message.Header>Error!</Message.Header>
                    <p>Your credentials are incorrect.</p>
                </Message>}
            </div>
        )
    }
}

export default ChangePassword;
