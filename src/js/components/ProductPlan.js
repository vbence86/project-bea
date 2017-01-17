import React from 'react';

export default class ProductPlan extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    price: React.PropTypes.node.isRequired,
    features: React.PropTypes.objectOf(React.PropTypes.bool),
    buttonText: React.PropTypes.string,
    onClick: React.PropTypes.func,
  };

  render() {
    return (
        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <div class="panel price panel-red">
            <div class="panel-heading  text-center">
            <h3>{ this.props.name }</h3>
            </div>
            <div class="panel-body text-center">
              <p class="lead" style="font-size:40px"><strong>{ this.props.price }</strong></p>
            </div>
            <ul class="list-group list-group-flush text-center">
              {Object.keys(this.props.features).map((name, idx) => {
                return <li data-idx={idx} class="list-group-item"><i class="icon-ok text-danger" />{name}</li>
              })}            
            </ul>
            <div class="panel-footer">
              <a class="btn btn-lg btn-block btn-danger" href="#" onClick={this.props.onClick}>{this.props.buttonText}</a>
            </div>
          </div>
        </div>
    );
  }

}
