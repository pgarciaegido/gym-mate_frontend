import React from 'react';
import App from './app.jsx';
// Gets DOM from render()
import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
// Access constructor variables and methods from component
const shallow = Enzyme.shallow;

test('prueba is 1', () => {
    const component = shallow(<App />);
    console.log('*++++*+****+*+++**' + JSON.stringify(component));
    expect(component.props.prueba).toBe(1);
});
