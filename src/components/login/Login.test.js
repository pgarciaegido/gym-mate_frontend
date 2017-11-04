/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {

    it('Should have loginForm container', () => {

        const wrapper = shallow(<Login />);
        expect(wrapper.find('.loginForm').length).toEqual(1);
    });

    it('Should have one Form', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('Form').length).toEqual(1);
    });

    it('Should have no messages at first', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('Message').length).toEqual(0);
    });

    /* it('Should change state on typing email input', () => {
        const wrapper = shallow(<Login />);
        const emailInput = wrapper.find('[type="email"]');

        emailInput.props.value = 'pablo@pablo.com';

        emailInput.simulate('change', {name: 'email', value: 'pablo@pablo.com'});

        expect(wrapper.state('email')).toBe('pablo@pablo.com');
        
    }) */

    it('Should display Success message if login successful', () => {
        const wrapper = shallow(<Login />);
        wrapper.setState({ successWarning: true });

        expect(wrapper.find('Message').prop('success')).toBe(true);
    });

    it('Should display Error message if login not successfull', () => {
        const wrapper = shallow(<Login />);
        wrapper.setState({ errorWarning: true });

        expect(wrapper.find('Message').prop('negative')).toBe(true);
    });


})