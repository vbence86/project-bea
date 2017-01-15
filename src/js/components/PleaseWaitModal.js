import React from 'react';

export default class PleaseWaitModal extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    modelId: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    title: 'Please wait',
    modalId: 'please-wait-modal'
  };

  render() {
    const modalId = this.props.modalId;
    return (
      <div className="modal fade neal-signup-modal please-wait-modal" key={modalId} id={modalId}
      tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{ this.props.title }</h3>
            </div>
            <div className="modal-body">
                <img src="/resources/images/ajax-loader.gif" alt="Loading animation" />
            </div>
          </div>
        </div>
      </div>      
    );
  }

}
