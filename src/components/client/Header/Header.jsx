/*!

*/
/*eslint-disable*/
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from 'contexts/user';
import './clientHeader.css';
// used for making the prop types of this component
function Header(props) {
  const [state, dispatch] = useContext(UserContext);
  // const [account, setAccount] = useState(() => {
  //   const saved = localStorage.getItem('user');
  //   return saved || 'تسجيل الدخول';
  // });
  // console.log(state);
  const [accountPath, setAccountPath] = useState(() => {
    const saved = localStorage.getItem('_r');
    if (saved === '954VC58412cH1M') return '/client';
    if (saved === '324FC5612ce4E') return '/admin/dashboard';
    return '/login';
  });

  const location = useLocation();
  let headerClassName = '';
  location.pathname === '/'
    ? (headerClassName = 'header-area header-1')
    : (headerClassName = 'header-area header-2');
  return (
    <>
      <div className={headerClassName}>
        <div className="topbar">
          <div className="container">
            <div className="topbar-content topbar-content-1 bg-071327">
              <div className="row align-items-center">
                <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="topbar-left-side">
                    <ul>
                      <li>
                        <i className="fas fa-phone"></i>
                        <a href="tel:+201111984555"> تليفون: 01111984555</a>
                      </li>
                      <li>
                        <i className="fas fa-map-marker-alt"></i>
                        <a href="https://goo.gl/maps/yZCFQhBogXJ5n8Jf8">
                          31 شارع ايران الدقي , الجيزه , مصر
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-envelope"></i>{' '}
                        <a href="#">
                          البريد الالكتروني:
                          <span data-cfemail="">info@mahaseel.net</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="topbar-right-area">
                    <div className="topbar-social-icons">
                      <ul>
                        <li>
                          <a
                            href="https://www.facebook.com/Mahaseelmasr"
                            target="_blank"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/company/mahaseel-masr/"
                            target="_blank"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://twitter.com/mahaseel_masr"
                            target="_blank"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/mahaseel_masr"
                            target="_blank"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-area">
          <div className="main-responsive-nav">
            <div className="container">
              <div className="mobile-nav">
                <ul className="menu-sidebar menu-small-device">
                  <li>
                    <Link className="default-button" to={accountPath}>
                      {state.user} <i className="fas fa-arrow-left"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="main-nav">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link className="navbar-brand" to="/">
                  <img
                    src="/assets/images/logo.png"
                    alt="logo"
                    // style={{ height: '2.6em' }}
                  />
                </Link>
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item ">
                      <Link to="/" className="nav-link">
                        الرئيسية
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link to="/search" className="nav-link">
                        خدمة البحث الإليكترونية
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link to="/posts" className="nav-link">
                        المجلة الاخباريه
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/crops" className="nav-link dropdown-toggle">
                        المحاصيل التصديرية
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link to="/crop/02" className="nav-link">
                            الموالح
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/04" className="nav-link">
                            العنب
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/07" className="nav-link">
                            المانجو
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/01" className="nav-link">
                            الرمان
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/03" className="nav-link">
                            الفراولة
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/10" className="nav-link">
                            الخوخ
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/08" className="nav-link">
                            البصل
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/12" className="nav-link">
                            البرقوق
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/05" className="nav-link">
                            الجوافة
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/06" className="nav-link">
                            الفلفل
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/11" className="nav-link">
                            المشمش
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/09" className="nav-link">
                            الطماطم
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/crop/14" className="nav-link">
                            البطاطس
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item ">
                      <Link to="/countries" className="nav-link">
                        الدول المستوردة
                      </Link>
                    </li>
                  </ul>
                  <div className="menu-sidebar">
                    <Link className="default-button" to={accountPath}>
                      {state.user} <i className="fas fa-arrow-left"></i>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
