import React from 'react';
import { Link } from 'react-router';
import {
  CustomerQuote, CustomerQuotes,
  DropdownMenu, DropdownToggle,
  Footer,
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

const pricingPlan1 = {
  name: 'Personal',
  description: 'Describe your plans with easy-to-use pricing tables. Each plan provides callbacks to handle visitor clicks.',
  price: '$99',
  features: {
    'Describe pricing plans as JSON': true,
    'Features can be active/inactive': true,
    'Works on mobile': true,
    'Custom callbacks': true,
    'Extra Feature 1': false,
    'Extra Feature 2': false,
  },
  onClick: onSignup,
};

const pricingPlan2 = Object.assign({}, pricingPlan1, {
  price: '$499',
  name: 'Startup',
  features: Object.assign({}, pricingPlan1.features, {
    'Extra Feature 1': true,
  }),
});

const pricingPlan3 = Object.assign({}, pricingPlan2, {
  price: '$999',
  name: 'Enterprise',
  features: Object.assign({}, pricingPlan2.features, {
    'Extra Feature 2': true,
  }),
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

  render() {
    return (
      <Page>
        <Navbar brand={this.state.business.title}>
          <NavItem><Link to="Home" className="nav-link">Home</Link></NavItem>
          <NavItem dropdown={true}>
            <DropdownToggle>Github</DropdownToggle>
            <DropdownMenu>
              <a href="https://github.com/dennybritz/neal-react" className="dropdown-item" target="_blank">
                Neal React
              </a>
              <a href="https://github.com/dennybritz/neal-sample" className="dropdown-item" target="_blank">
                Sample Page
              </a>
            </DropdownMenu>
          </NavItem>
        </Navbar>

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
          {(() => {
            return this.renderProductList();
          })()}
        </Section>

        <Section>
          <CustomerQuotes>
            <CustomerQuote name="Paul Graham" title="YC" imageUrl="img/people/paulgraham.jpg">
              <p>What I tell founders is not to sweat the business model too much at first. The most important task at first is to build something people want. If you don't do that, it won't matter how clever your business model is.</p>
            </CustomerQuote>
            <CustomerQuote name="Elon Musk" imageUrl="img/people/elonmusk.jpg">
              <p>I came to the conclusion that we should aspire to increase the scope and scale of human consciousness in order to better understand what questions to ask. Really, the only thing that makes sense is to strive for greater collective enlightenment.</p>
            </CustomerQuote>
            <CustomerQuote name="Reid Hoffman" title="Linkedin" imageUrl="img/people/reidhoffman.jpg">
              <p>If you are not embarrassed by the first version of your product, you've launched too late.</p>
            </CustomerQuote>
          </CustomerQuotes>
        </Section>

        <Section>
          <Team>
            <TeamMember name="Member 1" title="Co-founder" imageUrl="img/people/grumpycat.jpg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </TeamMember>
            <TeamMember name="Member 2" title="Co-founder" imageUrl="img/people/boo.jpg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </TeamMember>
            <TeamMember name="Member 3" title="Co-founder" imageUrl="img/people/panda.jpg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </TeamMember>
          </Team>
        </Section>

        <SignupModal modalId="request-appointment-modal" onSubmit={onSignup}>
          <div>
            <SignupModal.Input name="name" required label="Name" placeholder="Name" />
            <SignupModal.Input type="email" required name="email" label="Email" placeholder="Email" />
            <SignupModal.Input required name="age" label="Age" placeholder="Age" />
            <SignupModal.Input type="password" required name="password" label="Password" placeholder="Password" />
          </div>
        </SignupModal>

        <Footer brandName={this.state.business.title}
          facebookUrl="http://www.facebook.com"
          twitterUrl="http://www.twitter.com/dennybritz"
          githubUrl="https://github.com/dennybritz/neal-react"
          address={this.state.business.address} />
      </Page>
    );
  }

}

