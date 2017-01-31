import React from 'react';
import { Container, Row, Col } from './Helper';

export class Footer extends React.Component {

  static propTypes = {
    brandName: React.PropTypes.node.isRequired,
    facebookUrl: React.PropTypes.string,
    twitterUrl: React.PropTypes.string,
    githubUrl: React.PropTypes.string,
    email: React.PropTypes.node,
    address: React.PropTypes.node,
  };

  render() {
    return (
      <footer className="neal-footer navbar">
        <Container>
          <Row>
            <Col size={['xs-12', 'md-8']}>
              <p className="neal-footer-copyright">
                © {new Date().getFullYear()}, {this.props.brandName}
              </p>
              { this.renderBusinessDetails(this.props.phone1, 'phone') }
              { this.renderBusinessDetails(this.props.whatsup, 'whatsapp') }
              { this.renderBusinessDetails(this.props.phone2, 'phone2') }
              { this.renderBusinessDetails(this.props.skype, 'skype') }
              { this.renderBusinessDetails(this.props.email, 'google', `mailto:${this.props.email}`) }
              { this.renderBusinessDetails(this.props.address, 'map-marker') }              
            </Col>
            <Col className="social-icons-container" size={['xs-12', 'md-4']}>
              {this.renderSocialIcons()}
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }

  renderBusinessDetails(text, icon, href) {
    if (!text) return null;
    const iconClass = `fa fa-${icon}`;
    if (href) {
      return (
        <p>
           <i className={ iconClass } aria-hidden="true" /> <a href={ href }>{ text }</a>
        </p>        
      );
    } else {
      return (
        <p>
          <i className={ iconClass } aria-hidden="true" /> { text }
        </p>    
      );
    }
  }

  renderSocialIcons() {
    return (
      <ul className="nav navbar-nav neal-footer-social pull-right">
        { this.renderSocialIcon('fa-twitter', this.props.twitterUrl) }
        { this.renderSocialIcon('fa-facebook', this.props.facebookUrl) }
        { this.renderSocialIcon('fa-skype', this.props.skype) }
				{ this.renderSocialIcon('fa-whatsapp', this.props.whatsup) }
				{ this.renderSocialIcon('fa-google', this.props.email) }
      </ul>
    );
  }


  renderSocialIcon(iconClass, url) {
    if (!url || !iconClass) { return null; }
    return (
     <li className={`nav-item neal-footer-social-icon ${iconClass.replace('fa-', '')}`}>
        <a href={url} target="_blank">
          <span className="fa-stack">
            <i className="fa fa-circle fa-stack-2x" />
            <i className={`fa ${iconClass} fa-stack-1x fa-inverse`} />
          </span>
        </a>
      </li>
    );
  }
}
