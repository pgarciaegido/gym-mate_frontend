import React from 'react';
import appStyles from './app.css';

class App extends React.Component {

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
				<h1 className={appStyles.titulo}>Hello World</h1>
			</div>
		);
	}
}

export default App;
