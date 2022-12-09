import React from "react";
// javascript plugin used to create scrollbars on windows
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

/**
 * Load admin CSS
 */
import DemoNavbar from "components/admin/Navbars/DemoNavbar.jsx";
import Footer from "components/admin/Footer/Footer.jsx";
import Sidebar from "components/admin/Sidebar/Sidebar.jsx";

import routes from "../routes/admin.routes";
// import UserStore from 'contexts/user';
// import "assets/admin/scss/paper-dashboard.scss?v=1.3.0";

export const UserContext = React.createContext();

function Dashboard(props) {
  const [backgroundColor] = React.useState("black");
  const [activeColor] = React.useState("success");
  const mainPanel = React.useRef();
  const location = useLocation();

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    // <UserStore>
    <div className="wrapper">
      <div className="main-panel" ref={mainPanel} style={{ minHeight: "100vh" }}>
        <DemoNavbar {...props} />
        <Routes>
          {routes.map((prop, key) => {
            const Component = prop.component;
            return <Route path={prop.layout + prop.path} element={<Component />} key={key} exact />;
          })}
          {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
          {/* <Navigate
            // from={props.location}
            // exact
            // to="/login"
            to={{
              pathname: "/404",
              state: {
                from: props.location,
              },
            }}
          /> */}
        </Routes>
        <Footer fluid />
      </div>
      <Sidebar {...props} routes={routes} bgColor={backgroundColor} activeColor={activeColor} />
    </div>
    // </UserStore>
  );
}

export default Dashboard;
