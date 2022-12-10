import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProtectedAdminRoute from "components/Routes/ProtectedAdminRoute";
// import ProtectedClientRoute from "components/Routes/ProtectedClientRoute";
// css
import Error404Page from "views/public/errors/404";
import UnAuthPage from "views/public/unauth";

import "./assets/admin/scss/paper-dashboard.scss?v=1.3.0";

import "./assets/client/assets/css/meanmenu.min.css";
import "./assets/client/assets/css/barfiller.css";
import "./assets/client/assets/css/style.css";
import "./assets/client/assets/css/responsive.css";
import "./assets/client/assets/css/rtl.css";
import "./assets/client/assets/fonts/font.css";
import "./assets/admin/css/locations.css";
import "./assets/admin/css/sub.css";
import "./assets/admin/css/search.css";
//layouts (admin, client)

// import AdminLayout from 'layouts/Admin';
import PublicLayout from "layouts/Public";
import GeneralFallBack from "components/general/GeneralFallBack/GeneralFallBack.jsx";
import UserStore from "contexts/user";
import AdminLayout from "layouts/Admin";
// const AdminLayout = React.lazy(() => import("layouts/Admin"));
// const ClientLayout = React.lazy(() => import("layouts/Client"));
// const SellCrops = React.lazy(() => import("layouts/SellCrops/SellCrops"));
// const BuyCrops = React.lazy(() => import("layouts/BuyCrops/BuyCrops"));
// const BuyCropsEnglish = React.lazy(() => import("layouts/BuyCropsEnglish/BuyCrops"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<GeneralFallBack />}>
      <UserStore>
        <Routes>
          <Route path="/404" element={<Error404Page />} />
          <Route path="/unauth" element={<UnAuthPage />} />
          <Route path="/login/*" element={<PublicLayout />} />
          <Route path="/*" element={<ProtectedAdminRoute component={AdminLayout} />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </UserStore>
    </Suspense>
  </BrowserRouter>
);
