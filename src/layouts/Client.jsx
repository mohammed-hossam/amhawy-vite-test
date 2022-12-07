import React from 'react';
// javascript plugin used to create scrollbars on windows
import {
  Route,
  Switch,
  useLocation,
  Redirect,
  NavLink,
} from 'react-router-dom';

import Header from 'components/client/Header/Header';
import Footer from 'components/client/Footer/Footer';
/**
 * import CSS files here
 */
// import 'assets/client/assets/css/meanmenu.min.css';
// import 'assets/client/assets/css/barfiller.css';
// import 'assets/client/assets/css/style.css';
// import 'assets/client/assets/css/responsive.css';
// import 'assets/client/assets/css/rtl.css';
// import 'assets/client/assets/fonts/font.css';
import routes from '../routes/client.routes';
// import UserStore from 'contexts/user';
// export const UserContext = React.createContext();

function Client(props) {
  const location = useLocation();

  React.useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    // <UserStore>
    <div className="">
      <Header {...props} />

      <div className="container">
        <div className="row ptb-100">
          <div className="col-sm-2">
            <div className="list-group">
              <NavLink
                to="/client"
                className="list-group-item list-group-item-action"
                activeClassName="activeRoute"
                activeStyle={{ fontWeight: 'bold' }}
              >
                حسابي
              </NavLink>
              <NavLink
                to="/client/requests"
                className="list-group-item list-group-item-action"
                activeClassName="activeRoute"
                activeStyle={{ fontWeight: 'bold' }}
              >
                المحاصيل المكودة
              </NavLink>
              <NavLink
                to="/client/waiting"
                className="list-group-item list-group-item-action"
                activeClassName="activeRoute"
                activeStyle={{ fontWeight: 'bold' }}
              >
                طلبات الإنتظار
                {/* <i className="fas fa-paper-plane mr-3"></i> */}
                {/* <span className="badge bg-primary rounded-pill">2</span> */}
              </NavLink>
              <NavLink
                to="/client/farms"
                className="list-group-item list-group-item-action"
                activeClassName="activeRoute"
                activeStyle={{ fontWeight: 'bold' }}
              >
                المزارع المكودة
              </NavLink>
              <NavLink
                to="/client/code"
                className="list-group-item list-group-item-action"
                activeClassName="activeRoute"
                activeStyle={{ fontWeight: 'bold' }}
              >
                طلب تكويد محصول
              </NavLink>

              {/* <NavLink
                to="/client/Loan"
                className="list-group-item list-group-item-action"
                activeClassName="activeRoute"
                activeStyle={{ fontWeight: 'bold' }}
              >
                طلب قرض
              </NavLink> */}
              <NavLink
                to="/client/mail"
                className="list-group-item list-group-item-action"
                activeClassName="activeRoute"
                activeStyle={{ fontWeight: 'bold' }}
              >
                البريد الخاص
                {/* <i className="fas fa-paper-plane mr-3"></i> */}
                {/* <span className="badge bg-primary rounded-pill">2</span> */}
              </NavLink>
            </div>
          </div>
          <div className="col-sm-10">
            <Switch>
              {routes.map((prop, key) => {
                return (
                  <Route
                    exact
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
              <Redirect to="/404" />
            </Switch>
          </div>
        </div>
      </div>
      <Footer fluid />
    </div>
    // </UserStore>
  );
}
export default Client;
