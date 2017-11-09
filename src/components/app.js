/* eslint-disable */

import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom'; 
import appStyles from './app.css';
import Login from './login/Login';
import Signup from './signup/Signup';

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<h1>Heee</h1>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
			</Container>
		);
	}
}

export default App;
