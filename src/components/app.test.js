/* eslint-disable */
import React from 'react';
import App from './app';
import {shallow} from 'enzyme';

describe('Easy one', () => {
    
    it('Should sum 2 + 2', () => {
        expect(2 + 2).toBe(4);
    })
})

describe('Dom Testing', () => {

    it('should render', () => {

        const checkbox = shallow(
            <App labelOn="On" labelOff="Off" />
        );

        expect(checkbox.text()).toEqual('Off');

        checkbox.find('input').simulate('change');
        
        expect(checkbox.text()).toEqual('On');        
    })
})