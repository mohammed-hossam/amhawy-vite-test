import React from "react";
import { Route, Navigate, Routes, useLocation } from "react-router-dom";

const CheckAuth = ({ children }) => {
  console.log(children);
  const location = useLocation();
  if (
    localStorage.getItem("token") &&
    localStorage.getItem("user")
    // localStorage.getItem("_r") === "324FC5612ce4E"
  ) {
    return children;
  } else {
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

const ProtectedAdminRoute = ({ component: Component, user, ...rest }) => {
  console.log("proteced admin");
  console.log(Component);
  return (
    <Routes>
      <Route
        {...rest}
        path="/*"
        element={
          <CheckAuth>
            <Component />
          </CheckAuth>
        }
        // element={
        //   localStorage.getItem("token") &&
        //   localStorage.getItem("user") &&
        //   localStorage.getItem("_r") === "324FC5612ce4E" ? (
        //     <Component />
        //   ) : (
        //     <Navigate to="/login" state={{ from: location }} replace />
        //   )
        // }
        // render={(props) => {
        //   if (
        //     localStorage.getItem("token") &&
        //     localStorage.getItem("user") &&
        //     localStorage.getItem("_r") === "324FC5612ce4E"
        //   ) {
        //     return <Component {...rest} {...props} />;
        //   } else {
        //     return (
        //       <Navigate
        //         // from={props.location}
        //         // exact
        //         // to="/404"
        //         to={{
        //           pathname: "/login",
        //           state: {
        //             from: props.location,
        //           },
        //         }}
        //       />
        //     );
        //   }
        // }}
      />
    </Routes>
  );
};

export default ProtectedAdminRoute;
