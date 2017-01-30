import React from 'react';
import { Row, Col } from './Helper';

export class TeamMember extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    imageUrl: React.PropTypes.string.isRequired,
  };

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
      <div className="neal-team-member">
        <div className="neal-team-member-img img-responsive" style={_style} />
        <div className="card-block neal-team-member-profile">
          <h4 className="card-title lead neal-team-member-name">
            {this.props.name}
            {this.props.title ? `, ${this.props.title}` : null}
          </h4>
          <br />
          <div className="neal-team-member-description">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class Team extends React.Component {

  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element),
  };

  render() {
    return (
      <div className="card-deck-wrapper neal-team">
        <Row>
          <div className="card-deck">
            {this.props.children.map((member, idx) => {
              return (
                <Col size={['xs-12', 'sm-6', 'lg-6']} key={idx}>{member}</Col>
              );
            })}
          </div>
        </Row>
      </div>
    );
  }

}
