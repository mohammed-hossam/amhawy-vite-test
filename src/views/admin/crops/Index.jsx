import React from "react";
// reactstrap components

import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";

function Tables() {
  return (
    <>
      <Routes>
        {routes.map((prop, key) => {
          return <Route path={prop.layout + prop.path} element={<prop.component />} key={key} />;
        })}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}
export default Tables;
