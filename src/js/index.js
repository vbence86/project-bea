'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

const root = document.getElementById('root');

class HelloMessage extends React.Component {
    render() {
        return <div><div>Hello {this.props.name}</div><Button bsStyle="primary">Primary</Button></div>
    }
}

ReactDOM.render(<HelloMessage name="Juane" />, root);