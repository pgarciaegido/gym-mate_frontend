import React from 'react';
// import appStyles from './app.css';

/**
 *  App component... Super cool
 */
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isChecked: false};
		
		this.onChange = this.onChange.bind(this);
	}

	/**
	 * @description Changes state
	 * @returns {String} Nothing. Just sets state
	 */
	onChange() {
		this.setState({ isChecked: !this.state.isChecked });
	}

	render() {
		return (
			<h1>Hoola</h1>
		);
	}
}

export default App;
