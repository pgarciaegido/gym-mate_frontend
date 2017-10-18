import React from 'react';

export default class App extends React.Component {

	constructor() {
		super();
		this.prueba = 1;
	}

	tryout() {
		this.tryout = true;
	}
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<h1> Hello World</h1>
			</div>
		);
	}
}
