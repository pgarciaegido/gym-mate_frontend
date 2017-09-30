import React from 'react';

export default class App extends React.Component {

	constructor() {
		super();
		this.prueba = 1;
	}

	tryout() {
		return true;
	}

	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<h1> Hello World</h1>
			</div>
		);
	}
}
