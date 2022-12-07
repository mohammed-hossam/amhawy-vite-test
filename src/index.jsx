import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProtectedAdminRoute from "components/Routes/ProtectedAdminRoute";
// import ProtectedClientRoute from "components/Routes/ProtectedClientRoute";
// css

import "./assets/admin/scss/paper-dashboard.scss?v=1.3.0";
import "./assets/admin/css/locations.css";
import "./assets/admin/css/sub.css";
import "./assets/client/assets/css/meanmenu.min.css";
import "./assets/client/assets/css/barfiller.css";
import "./assets/client/assets/css/style.css";
import "./assets/client/assets/css/responsive.css";
import "./assets/client/assets/css/rtl.css";
import "./assets/client/assets/fonts/font.css";

//layouts (admin, client)

// import AdminLayout from 'layouts/Admin';
import PublicLayout from "layouts/Public";
import GeneralFallBack from "components/general/GeneralFallBack/GeneralFallBack.jsx";
import UserStore from "contexts/user";
const AdminLayout = React.lazy(() => import("layouts/Admin"));
// const ClientLayout = React.lazy(() => import("layouts/Client"));
// const SellCrops = React.lazy(() => import("layouts/SellCrops/SellCrops"));
// const BuyCrops = React.lazy(() => import("layouts/BuyCrops/BuyCrops"));
// const BuyCropsEnglish = React.lazy(() => import("layouts/BuyCropsEnglish/BuyCrops"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<GeneralFallBack />}>
      <UserStore>
        <Switch>
          <ProtectedAdminRoute path="/admin" component={AdminLayout} />
          {/* <ProtectedClientRoute path="/client" component={ClientLayout} /> */}
          {/* <Route path="/MahaseelMasr-sellcrops" exact component={SellCrops} /> */}
          {/* <Route path="/MahaseelMasr-buycrops" exact component={BuyCrops} /> */}
          {/* <Route path="/MahaseelMasr-buycrops-worldwide" exact component={BuyCropsEnglish} /> */}
          {/* <Route
          path="/sellcrops"
          exact
          render={() =>
            (window.location = 'https://www.mahaseel.org/quotation')
          }
        /> */}

          <Route path="/" render={(props) => <PublicLayout {...props} />} />
        </Switch>
      </UserStore>
    </Suspense>
  </BrowserRouter>
);
