/* global $, ga */
import React from 'react';
import { HorizontalSplit, Navbar, NavItem, Page, Section, SignupModal } from 'neal-react';
import { ContentProvider } from '../components/ContentProvider';
import GoogleAnalytics from '../components/GoogleAnalytics';
import HeroVideo from '../components/HeroVideo';
import ProductPlan from '../components/ProductPlan';
import { CustomerFeedbacks, CustomerFeedback } from '../components/CustomerFeedback';
import { Footer } from '../components/Footer';
import PleaseWaitModal from '../components/PleaseWaitModal';
import ErrorModal from '../components/ErrorModal';
import ProductInfoModal from '../components/ProductInfoModal';
import { Team, TeamMember } from '../components/Team';
import '../components/SignupModal.Textarea';

const heroVideo = {
  poster: '/resources/images/first-frame-hero.jpg',
  source: {
    url: '/resources/videos/shutterstock_v17053459.m4v',
    type: 'video/mp4'
  }
};

function registerGAEvents() {
  $('[data-target=#request-appointment-modal]').click(() => {
    $(document).trigger('request/open');
  });
  
  $(document).on('request/open', trackOpenRequestModal);
  $(document).on('request/submit', trackSubmitEvent);
  $(document).on('request/submit/happy-path', trackSubmitSuccess);
  $(document).on('request/submit/sad-path', trackSubmitFailure);
  $(document).on('click/product', trackProductEvent);
}

function trackOpenRequestModal() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Request an appointment',
    eventAction: 'click',
    eventLabel: 'Open'
  });
}

function trackSubmitEvent() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Request an appointment',
    eventAction: 'click',
    eventLabel: 'Submit'
  });      
}

function trackSubmitSuccess() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Request an appointment',
    eventAction: 'click',
    eventLabel: 'Success'
  });
}

function trackSubmitFailure() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Request an appointment',
    eventAction: 'click',
    eventLabel: 'Error'
  });
}    

function trackProductEvent(evt, data) {
  var title = data.title || 'Invalid product';
  ga('send', {
    hitType: 'event',
    eventCategory: 'Product',
    eventAction: 'click',
    eventLabel: title
  });
}

export default class Homepage extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      business: ContentProvider.get('business'),
      homepage: ContentProvider.get('homepage'),
      pleaseWaitModal: ContentProvider.get('pleaseWaitModal'),
      defaultErrorModal: ContentProvider.get('defaultErrorModal')
    };
  }

  componentDidMount() {
    registerGAEvents();
  }

  renderHeaderNavigation() {
    const menus = this.state.homepage.headerNavigation.map(item => {
      const props = {
        title: item.title,
        url: item.url
      };
      return (
        <NavItem>
          <a className="nav-link" href={ props.url } target="_blank">{ props.title }</a>
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
    const productList = this.state.homepage.productList;
    const numberOfFeaturesOfPremiumProduct = (products => {
      const premium = products[products.length - 1];
      if (premium && premium.features) {
        return premium.features.length || 0;
      } else {
        return 0;
      }
    })(productList);

    const products = productList.map(item => {
      const pricing = {
        name: item.title,
        description: item.description,
        price: item.prize,
        buttonText: item.ctaLabel,
        color: item.color,
        bestSeller: item.bestSeller,
        features: (() => {
          if (item.features && item.features.length) {
            const diff = numberOfFeaturesOfPremiumProduct - item.features.length;
            if (item.features.length < numberOfFeaturesOfPremiumProduct) {
              for (let i = 0; i < diff; i += 1) {
                item.features.push('');
              }
            }
          }
          return item.features;
        })(),
        onClick: evt => {
          evt.preventDefault();
          $(document).trigger('click/product', item);
        }
      };
      return (
        <ProductPlan {... pricing} />
      );
    });

    return (
      <div className="row">
        { products }
      </div>

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

    const modalId = 'request-appointment-modal';
    const messageServiceUrl = process.env.MESSAGE_SERVICE;
    const content = this.state.homepage.requestAppointmentModal;

    function onSendRequest() {
      Promise
        .resolve()
        .then(emitSubmitEvent)
        .then(hide.bind(null, 'request-appointment-modal'))
        .then(show.bind(null, 'please-wait-modal'))
        .then(sendFormDataToMessageService)
        .then(hide.bind(null, 'please-wait-modal'))
        .then(happyPath)
        .catch(sadPath);
    }

    function emitSubmitEvent() {
      $(document).trigger('request/submit');
    }

    function hide(modalId) {
      const $modal = $(`#${modalId}`);
      return new Promise(resolve => {
        $modal.one('hidden.bs.modal', () => {
          resolve();
        });
        $modal.modal('hide');
      });
    }

    function show(modalId) {
      const $modal = $(`#${modalId}`);
      return new Promise(resolve => {
        $modal.one('shown.bs.modal', () => {
          resolve();
        });
        $modal.modal('show');
      });      
    }

    function sendFormDataToMessageService() {
      const $form = $(`#${modalId} form`);
      const json = JSON.stringify(serializeFormData($form));
      return new Promise((resolve, reject) => {
        $.ajax({
          method: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          data: json,
          url: messageServiceUrl,
          success: resolve,
          error: reject
        });
      });
    }

    function serializeFormData($form) {
      if (!$form) throw 'Invalid input!';
      return $form.serializeArray().reduce((m, o) => { 
        m[o.name] = o.value; 
        return m;
      }, {});
    }

    function happyPath() {
      $(document).trigger('request/submit/happy-path');
      return show('request-confirmation-modal');
    }

    function sadPath() {
      $(document).trigger('request/submit/sad-path');
      return hide('please-wait-modal')
        .then(show.bind(null, 'error-modal'));
    }

    return (
      <SignupModal title={content.title} buttonText={content.buttonLabel} modalId={modalId} onSubmit={onSendRequest}>
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
          <SignupModal.Textarea required name="request" rows="3" label="Request" placeholder={content.request} />
        </div>
      </SignupModal>
    );
  }

  renderRequestConfirmationModal() {
    const content = this.state.homepage.requestAppointmentModal.confirmationModal;
    const modalId = 'request-confirmation-modal';

    function hideModal() {
      $(`#${modalId}`).modal('hide');
    }

    return (
      <SignupModal title={content.title} buttonText={ content.buttonLabel } modalId={ modalId } onSubmit={hideModal}>
        <div>
          <p>{ content.text }</p>
        </div>
      </SignupModal>      
    );
  }

  renderPleaseWaitModal() {
    const content = this.state.pleaseWaitModal;
    return (
      <PleaseWaitModal title={content.text} modalId="please-wait-modal" />   
    );
  }

  renderErrorModal() {
    const content = this.state.defaultErrorModal;
    return (
      <ErrorModal title={content.title} text={content.text} buttonText={content.buttonText} modalId="error-modal" />
    );
  }

  renderProductInfoModal() {
    return (
      <ProductInfoModal modalId="product-info-modal" />
    );
  }

  render() {
    return (
      
      <Page>
        
        <GoogleAnalytics account="UA-90406705-1" />

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

        <Section className="who-why-how">
          <HorizontalSplit padding="md">
            <div>
              <div className="sprite girl" title="Made by Feepik at Flaticons.com" />
              <p className="lead">{ this.state.homepage.whoSection.title }</p>
              <p>{ this.state.homepage.whoSection.text }</p>
            </div>
            <div>
              <div className="sprite like" title="Made by Madebyoliver at Flaticons.com" />
              <p className="lead">{ this.state.homepage.whySection.title }</p>
              <p>{ this.state.homepage.whySection.text }</p>
            </div>
            <div>
              <div className="sprite skype" title="Made by Madebyoliver at Flaticons.com" />
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

        <Section className="inline-cta gray">
          <p>
            <a data-toggle="modal" data-target="#request-appointment-modal" className="btn btn-ghost btn-primary btn-lg">
              {this.state.homepage.mainCta.title}
            </a>
          </p>          
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
        { this.renderErrorModal() }
        { this.renderProductInfoModal() }

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

