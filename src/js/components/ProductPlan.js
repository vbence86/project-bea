import React from 'react';
import classNames from 'classnames';
import { HorizontalSplit } from 'neal-react';

export class ProductTable extends React.Component {
  render() {
    return (
      <div className="neal-pricing-table">
        <HorizontalSplit>{this.props.children}</HorizontalSplit>
      </div>
    );
  }
}

export class ProductPlan extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    price: React.PropTypes.node.isRequired,
    period: React.PropTypes.string,
    features: React.PropTypes.objectOf(React.PropTypes.bool),
    buttonText: React.PropTypes.string,
    onClick: React.PropTypes.func,
  };

  render() {
    return (
      <div className="card">
        <div className="card-header neal-pricing-plan-name">
          {this.props.name}
        </div>
        <div className="card-block">
          <div className="text-xs-center neal-pricing-plan-price">
            <h4 className="card-title neal-pricing-plan-price-amount">{this.props.price}</h4>
          </div>
        </div>
        <div className="card-block neal-pricing-plan-features">
          <ul className="list-group list-group-flush">
            {Object.keys(this.props.features).map((name, idx) => {
              const isEnabled = this.props.features[name];
              const _className = classNames('neal-pricing-plan-feature', { isEnabled, 'isDisabled': !isEnabled });
              return <li key={idx} className={_className}>{name}</li>;
            })}
          </ul>
        </div>
        <div>
          <p className="card-text text-xs-center neal-pricing-plan-action">
            <button className="btn btn-ghost btn-primary btn-lg" onClick={this.props.onClick}>
              {this.props.buttonText}
            </button>
          </p>
        </div>
      </div>
    );
  }

}
