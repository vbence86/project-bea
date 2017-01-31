import React from 'react';
import { SignupModal } from 'neal-react';

SignupModal.Textarea = class Textarea extends React.Component {
  static propTypes = {
    rows: React.PropTypes.integer,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    rows: 2,
  };

  render() {
    return (
      <div className="form-group signup-modal-input">
        <label className="sr-only" htmlFor={this.props.name}>{this.props.label}</label>
        <textarea className="form-control" rows={this.props.rows} name={this.props.name}
          placeholder={this.props.placeholder} {... this.props} />
      </div>
    );
  }
};