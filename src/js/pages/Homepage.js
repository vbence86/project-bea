/* global $ */
import React from 'react';
import { Link } from 'react-router';
import {
  HorizontalSplit,
  Navbar, NavItem,
  Page,
  Section,
  SignupModal,
  Stripe,
  Team,
  TeamMember,
} from 'neal-react';
import { ContentProvider } from '../components/ContentProvider';
import HeroVideo from '../components/HeroVideo';
import { ProductTable, ProductPlan } from '../components/ProductPlan';
import { CustomerFeedbacks, CustomerFeedback } from '../components/CustomerFeedback';
import { Footer } from '../components/Footer';
import PleaseWaitModal from '../components/PleaseWaitModal';
import '../components/SignupModal.Textarea';

const heroVideo = {
  poster: '/resources/images/test.jpg',
  source: {
    url: '/resources/videos/test.mp4',
    type: 'video/mp4'
  }
};

const onSignup = ({ name: name, email: email, password: password }) => Stripe.StripeHandler.open({
  name: 'Stripe Integration Included',
  description: 'Like this? Donate $5 <3',
  panelLabel: 'Donate {{amount}}',
  email: email,
  amount: 500,
});

export default class Homepage extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      business: ContentProvider.get('business'),
      homepage: ContentProvider.get('homepage')
    };
    console.log(this.state);
  }

  renderHeaderNavigation() {
    const menus = this.state.homepage.headerNavigation.map(item => {
      const props = {
        title: item.title,
        url: item.url
      };
      return (
        <NavItem>
          <Link className="nav-link" to={ props.url }>{ props.title }</Link>
        </NavItem>
      );
    });

    return (
      <Navbar brand={this.state.business.title}>
        { menus }
      </Navbar>
    );

  }

  renderProductList() {
    const products = this.state.homepage.productList.map(item => {
      const pricing = {
        name: item.title,
        description: item.description,
        price: item.prize,
        buttonText: item.ctaLabel,
        features: (() => {
          const features = {};
          if (item.features && item.features.length) {
            item.features.forEach(feature => {
              features[feature] = true;
            });
          }
          return features;
        })()
      };
      return (
        <ProductPlan {... pricing} />
      );
    });

    return (
      <ProductTable>   
        { products }       
      </ProductTable>
    );
  }

  renderFeedbackList() {

    const feedbacks = this.state.homepage.feedbacks.map(item => {
      const props = {
        text: item.text,
        rating: item.rating,        
        name: item.customerName
      };
      if (item.customerPortrait && item.customerPortrait.file) {
        props.imageUrl = 'http:' + item.customerPortrait.file.url;
      }
      return (
        <CustomerFeedback {... props} />
      );
    });

    return (
      <CustomerFeedbacks>
        { feedbacks }
      </CustomerFeedbacks>
    );
  }

  renderMemberList() {

    const members = this.state.homepage.memberList.map(member => {
      const props = {
        name: member.name,
        title: member.title,
      };
      if (member.picture && member.picture.file) {
        props.imageUrl = 'http:' + member.picture.file.url;
      }
      return (
        <TeamMember {... props}>
          { member.introduction }
        </TeamMember>
      );
    });

    return (
      <Team>
        { members }
      </Team>
    );
  }

  renderRequestModal() {

    const $ = window.$;

    function showPleaseWaitModal() {
      $('#please-wait-modal').modal()
    }

    function hidePleaseWaitModal() {
      $('#please-wait-modal').modal('hide');
    }

    function hideRequestAppointmentModal() {
      $('#request-appointment-modal').modal('hide');
    }

    function happyPath() {
      $('#request-confirmation-modal').modal();
    }

    function sadPath() {
      alert('Something went wrong!');
    }

    function onSendRequest() {
      Promise
        .resolve()
        .then(hideRequestAppointmentModal)
        .then(showPleaseWaitModal)
        .then(() => {
          return new Promise(resolve => {
            setTimeout(resolve, 2000);
          });
        })
        .then(hidePleaseWaitModal)
        .then(happyPath)
        .catch(sadPath);
    }

    const content = this.state.homepage.requestAppointmentModal;
    return (
      <SignupModal title={content.title} buttonText={content.buttonLabel} modalId="request-appointment-modal" onSubmit={onSendRequest}>
        <div>
          <p>
            {content.description}
          </p>
        </div>
        <div>
          <SignupModal.Input name="name" required label={content.name} placeholder={content.name} />
          <SignupModal.Input name="age" required label="Age" placeholder={content.age} />
          <SignupModal.Input type="email" required name="email" label={content.email} placeholder={content.email} />
          <SignupModal.Textarea required name="intro" label="Introduction" placeholder={content.intro} />
          <SignupModal.Textarea required name="request" row="3" label="Request" placeholder={content.request} />
        </div>
      </SignupModal>
    );
  }

  renderRequestConfirmationModal() {
    const content = this.state.homepage.requestAppointmentModal.confirmationModal;
    return (
      <SignupModal title={content.title} buttonText={ content.buttonLabel } modalId="request-confirmation-modal">
        <div>
          <p>{ content.text }</p>
        </div>
      </SignupModal>      
    );
  }

  renderPleaseWaitModal() {
    const content = this.state.homepage.pleaseWaitModal;
    return (
      <PleaseWaitModal title="Please wait..." modalId="please-wait-modal" />   
    );
  }

  render() {
    return (
      <Page>
        
        { this.renderHeaderNavigation() }

        <HeroVideo {... heroVideo}>
          <h1 className="display-4 animated fadeInDown">{this.state.homepage.missionStatement}</h1>
          <p className="lead animated fadeInDown">{this.state.homepage.elevatorPitch}</p>
          <p>
            <a data-toggle="modal" data-target="#request-appointment-modal" className="btn btn-white">
              {this.state.homepage.mainCta.title}
            </a>
          </p>
        </HeroVideo>

        <Section className="subhero gray">
          <h3>{ this.state.homepage.subHeroTitle }</h3>
        </Section>

        <Section>
          <HorizontalSplit padding="md">
            <div>
              <p className="lead">{ this.state.homepage.whoSection.title }</p>
              <p>{ this.state.homepage.whoSection.text }</p>
            </div>
            <div>
              <p className="lead">{ this.state.homepage.whySection.title }</p>
              <p>{ this.state.homepage.whySection.text }</p>
            </div>
            <div>
              <p className="lead">{ this.state.homepage.howSection.title }</p>
              <p>{ this.state.homepage.howSection.text }</p>
            </div>
          </HorizontalSplit>
        </Section>        

        <Section className="inline-cta gray">
          <p>
            <a data-toggle="modal" data-target="#request-appointment-modal" className="btn btn-ghost btn-primary btn-lg">
              {this.state.homepage.mainCta.title}
            </a>
          </p>          
        </Section>

        <Section>
          { this.renderProductList() }
        </Section>

        <Section>
          { this.renderFeedbackList() }
        </Section>

        <Section>
          { this.renderMemberList() }
        </Section>

        { this.renderRequestModal() }
        { this.renderRequestConfirmationModal() }
        { this.renderPleaseWaitModal() }

        <Footer brandName={this.state.business.title}
          facebookUrl={this.state.business.facebookUrl}
          twitterUrl={this.state.business.twitterUrl}
          skype={this.state.business.skype}
          whatsup={this.state.business.whatsup}
          email={this.state.business.emailAddress}
          phone1={this.state.business.phoneNumber}
          phone2={this.state.business.phoneNumberOptional}
          address={this.state.business.address} />

      </Page>
    );
  }

}

