import React from 'react';
import { Header } from 'semantic-ui-react';
import appStyles from './app.css';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isChecked: false};
		
		this.onChange = this.onChange.bind(this);
	}

	onChange() {
		this.setState({ isChecked: !this.state.isChecked });
	}

	render() {
		return (
			<Header>Hoola</Header>
		);
	}
}

export default App;
