/*!

*/
/*eslint-disable*/
import React from 'react';
import { Container, Row } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

function Footer(props) {
  return (
    <>
      <section className="footer ptb-100  bg-071327">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="footer-logo-area">
                <a href="index.html">
                  <img src="/assets/images/mahaseel-logo.png" alt="image" />
                </a>
                <p>محاصيل مصر رائده في خدمه القطاع الزراعي والتحول الرقمي.</p>
                <div className="footer-social-icons">
                  <ul>
                    <li style={{ padding: '5px' }}>
                      <a
                        href="https://www.facebook.com/Mahaseelmasr"
                        target="_blank"
                        className="p-0"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li style={{ padding: '5px' }}>
                      <a
                        href="https://www.linkedin.com/company/mahaseel-masr/"
                        target="_blank"
                        className="p-0"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li style={{ padding: '5px' }}>
                      <a
                        href="https://twitter.com/mahaseel_masr"
                        target="_blank"
                        className="p-0"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li style={{ padding: '5px' }}>
                      <a
                        href="https://www.instagram.com/mahaseel_masr"
                        target="_blank"
                        className="p-0"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="footer-links footer-news-area pr-20">
                <div className="footer-news-card mt-0">
                  <h5>
                    <a href="/privacy">سياية الخصوصيه</a>
                  </h5>
                </div>
                <div className="footer-news-card">
                  <h5>
                    <a href="/">الشروط والأحكام</a>
                  </h5>
                </div>
                <div className="footer-news-card">
                  <h5>
                    <a href="/">المحاصيل التصديرية</a>
                  </h5>
                </div>
                <div className="footer-news-card">
                  <h5>
                    <a href="/contact">تواصل معنا</a>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="footer-links footer-contact">
                <ul>
                  <li>
                    <span>عنوان المكتب:</span>{' '}
                    <a
                      href="https://goo.gl/maps/yZCFQhBogXJ5n8Jf8"
                      target="_blank"
                    >
                      31 شارع ايران الدقي , الجيزه , مصر
                    </a>
                  </li>

                  <li>
                    <span>تيليفون:</span>
                    <a href="tel:+201111984555">01111984555</a>
                  </li>
                  <li>
                    <span>مواعيد العمل:</span> 09:00 - 17:00
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="footer-links footer-newsletter">
                <h3>النشره الاخباريه</h3>

                <form className="newsletter-form" data-toggle="validator">
                  <input
                    type="email"
                    className="input-newsletter form-control"
                    placeholder="اكتب بريدك الاليكتروني هنا .."
                    name="EMAIL"
                    required
                    autoComplete="off"
                  />
                  <div id="validator-newsletter" className="form-result"></div>
                  <button className="default-button">
                    إشتراك <i className="fas fa-arrow-left"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="copyright bg-071327">
        <div className="container">
          <p>
            جميع الحقوق محفوظه لدي شركه محاصيل مصر &copy;{' '}
            {new Date().getFullYear()}.{' '}
          </p>
        </div>
      </div>

      <div className="go-top go-top-3">
        <i className="fas fa-chevron-up"></i>
      </div>
    </>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
