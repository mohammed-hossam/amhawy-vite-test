import React from 'react';

function pricingPage(props) {
  return (
    <>
      <section className="uni-banner">
        <div className="container">
          <div className="uni-banner-text-area">
            <h1>انظمة الاسعار</h1>
            <ul>
              <li>
                <a href="/">الرئيسية</a>
              </li>
              <li>الأسعار</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pricing pt-70 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="pricing-card">
                <h5>أساسي</h5>
                <h2>
                  EGP 50 <sub>Per Month</sub>
                </h2>
                <p>$249 Billed Annually</p>
                <p>
                  Create your first Bootstrap website with Startup - 100%
                  Secure.
                </p>
                <ul>
                  <li>
                    <i className="far fa-check-circle"></i> No credit card
                    needed
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> Full access to all
                    features
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> Demo components
                  </li>
                  <li className="disabled">
                    <i className="far fa-check-circle"></i> Free Figma sources
                  </li>
                  <li className="disabled">
                    <i className="far fa-check-circle"></i> 24/7 Support
                  </li>
                </ul>
                <a
                  className="default-button default-button-2"
                  href="contact.html"
                >
                  Start For Free <i className="fas fa-arrow-left"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="pricing-card p-active">
                <span>Save $99</span>
                <h5>إقتصادي</h5>
                <h2>
                  $39 <sub>Per Month</sub>
                </h2>
                <p>$249 Billed Annually</p>
                <p>Need to build a few Bootstrap sites? Choose business.</p>
                <ul>
                  <li>
                    <i className="far fa-check-circle"></i> No credit card
                    needed
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> Full access to all
                    features
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> Demo components
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> Free Figma sources
                  </li>
                  <li className="disabled">
                    <i className="far fa-check-circle"></i> 24/7 Support
                  </li>
                </ul>
                <a
                  className="default-button default-button-2"
                  href="contact.html"
                >
                  Start For Free <i className="fas fa-arrow-left"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="pricing-card">
                <span>Save $199</span>
                <h5>مميز</h5>
                <h2>
                  $49 <sub>Per Month</sub>
                </h2>
                <p>$349 Billed Annually</p>
                <p>
                  Frequently generate Bootstrap websites for clients? Pick this
                  plan.
                </p>
                <ul>
                  <li>
                    <i className="far fa-check-circle"></i> No credit card
                    needed
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> Full access to all
                    features
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> Demo components
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> Free Figma sources
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i> 24/7 Support
                  </li>
                </ul>
                <a
                  className="default-button default-button-2"
                  href="contact.html"
                >
                  Start For Free <i className="fas fa-arrow-left"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default pricingPage;
