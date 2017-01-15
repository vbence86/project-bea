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
							<p>
								<i class="fa fa-phone" aria-hidden="true" /> {this.props.phone1}
							</p>
							<p>
								<i class="fa fa-phone" aria-hidden="true" /> {this.props.phone2}
							</p>
              <p>
                <i class="fa fa-map-marker" aria-hidden="true" /> {this.props.address}
              </p>
              <p>
                <i class="fa fa-skype" aria-hidden="true" /> {this.props.skype}
              </p>
              <p>
                <i class="fa fa-whatsapp" aria-hidden="true" /> {this.props.whatsup}
              </p>
              <p>
                 <i class="fa fa-google" aria-hidden="true" /> <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
              </p>
            </Col>
            <Col className="social-icons-container" size={['xs-12', 'md-4']}>
              {this.renderSocialIcons()}
            </Col>
          </Row>
        </Container>
      </footer>
    );
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
