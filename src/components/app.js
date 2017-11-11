/* eslint-disable */

import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom'; 
import Login from './login/Login';
import Signup from './signup/Signup';

import './app.scss';

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Link to="/login"><h1>Login</h1></Link>
				<Link to="/signup"><h1>Signup</h1></Link>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
			</Container>
		);
	}
}

export default App;
