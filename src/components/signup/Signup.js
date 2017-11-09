import React from 'react';
import { Form, Header, Button } from 'semantic-ui-react';

class Signup extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            email: '',
            name: '',
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const loading = this.state.loading;

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
                        onChange={this.onChange} />
                    <Form.Input
                        type="password"
                        label="Password"
                        name="password"
                        onChange={this.onChange} />
                    <Form.Input
                        type="password"
                        label="Confirm password"
                        name="confPassword"
                        onChange={this.onChange} />
                    <Form.Input
                        type="text"
                        value={this.state.name}
                        name='name'
                        label='Name'
                        placeholder='John Doe'
                        onChange={this.onChange} />
                    <Button type="submit">Signup</Button>
                </Form>
            </div>
        )
    }
}

export default Signup;
