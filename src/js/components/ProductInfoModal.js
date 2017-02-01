/* global $ */ 
import React from 'react';

export default class ProductInfoModal extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    modelId: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    title: 'Product Info',
    description: 'Product Description',
    modalId: 'product-info-modal'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    $(document).on('click/product', function(evt, data) {
      this.setState(data);
      $(`#${this.props.modalId}`).modal('show');
    }.bind(this));
  }

  render() {
    return (
      <div className="modal fade neal-signup-modal product-info-modal" key={this.props.modalId} id={this.props.modalId}
      tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h3>{ this.state.title }</h3>
            </div>
            <div className="modal-body">
                <p>{ this.state.description }</p>
            </div>
          </div>
        </div>
      </div>      
    );
  }

}
