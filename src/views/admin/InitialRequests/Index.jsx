/*!

*/

import React from "react";
// reactstrap components

import { Route, Routes } from "react-router-dom";
import routes from "./routes";

function Tables() {
  return (
    <>
      <Routes>
        {routes.map((prop, key) => {
          return (
            <Route exact path={prop.layout + prop.path} component={prop.component} key={key} />
          );
        })}
      </Routes>
    </>
  );
}
export default Tables;
