// javascript plugin used to create scrollbars on windows
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
// import Header from "components/client/Header/Header";
// import Footer from "components/client/Footer/Footer";
// import MobileFooter from "components/client/MobileFooter";

/**
 * import CSS files here
 */
// import 'assets/client/assets/fonts/font.css';
// import UserStore from 'contexts/user';

import routes from "../routes/public.routes";
// export const UserContext = React.createContext();

function Public() {
  const location = useLocation();
  console.log("public layout");

  // React.useEffect(() => {
  //   document.scrollingElement.scrollTop = 0;
  // }, [location]);
  return (
    // <UserStore>
    <div className="">
      {/* <Header {...props} /> */}

      <Routes>
        {/* <Route path="/login" element={<PublicLayout />} /> */}
        {routes.map((prop, key) => {
          const Component = prop.component;
          return <Route path={prop.layout + prop.path} element={<Component />} key={key} />;
        })}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      {/* <MobileFooter /> */}

      {/* <Footer fluid /> */}
    </div>
    // </UserStore>
  );
}

export default Public;
