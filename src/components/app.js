import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom'; 
import appStyles from './app.css';
import Login from './login/Login';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isChecked: false};
	}

	render() {
		return (
			<Container>
				<h1>Heee</h1>
				<Route path="/login" component={Login} />
			</Container>
		);
	}
}

export default App;
