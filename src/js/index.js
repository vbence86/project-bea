'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(<HelloMessage name="Juane" />, root);