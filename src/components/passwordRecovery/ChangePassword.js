/* eslint-disable */
import React from 'react';
import { Form, Header, Segment, Button, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { API_BASE_URL_LOCAL } from '../../constants/api';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        debugger;
        console.log(props);
    }

    render() {
        console.log('it renders')
        return(
            <h1>Hola</h1>
        )
    }
}

export default ChangePassword;