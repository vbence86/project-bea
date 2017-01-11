import React from 'react';
import { HorizontalSplit } from 'neal-react';

export class CustomerFeedback extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    imageUrl: React.PropTypes.string.isRequired,
  };

  renderRating() {
    if (!this.props.rating) this.props.rating = 5;
    const ratings = [];
    for (let i = 0; i < this.props.rating; i += 1) {
      ratings.push(<i class="fa fa-star" aria-hidden="true" />);
    }
    return (
      <p className="ratings">
        { ratings }
      </p>
    )
  }

  render() {
    const _style = {};
    if (this.props.imageUrl) {
      // for protocol free urls 
      if (this.props.imageUrl.indexOf('http:') === -1) {
        this.props.imageUrl = 'http:' + this.props.imageUrl; 
      }
      _style.backgroundImage = `url(${this.props.imageUrl})`;
    }      
    return (
      <div className="neal-customer-quote">
        <div className="neal-customer-quote-quote">
            <p>{ this.props.text }</p>
            { this.renderRating() }
            <p>{ this.props.children }</p>
        </div>
        <div className="neal-customer-quote-profile">
          <div className="neal-customer-quote-img img-responsive" style={_style} />
          <span className="neal-customer-quote-name">{this.props.name}</span>
          <span className="neal-customer-quote-title">{this.props.title ? `, ${this.props.title}` : null}</span>
        </div>
      </div>
    );
  }

}

export class CustomerFeedbacks extends React.Component {

  static propTypes = {
    // TODO: Enforce CustomerQuote type
    children: React.PropTypes.arrayOf(React.PropTypes.element),
  };

  render() {
    return (
      <div className="neal-customer-quotes">
        <HorizontalSplit>
          {this.props.children}
        </HorizontalSplit>
      </div>
    );
  }
}

CustomerFeedbacks.CustomerFeedback = CustomerFeedback;
