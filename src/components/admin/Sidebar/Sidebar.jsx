import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button, Nav } from "reactstrap";
import "./sidebar.css";
import Logo from "./tree.png";
function reactRouterActiveClass({ isActive, isPending }) {
  console.log(isActive);
  return isActive ? "nav-link active" : isPending ? "nav-link pending" : "nav-link";
}
function Sidebar(props) {
  const sidebar = React.useRef();
  const location = useLocation();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    const slicedPathName =
      location.pathname !== "/" ? location.pathname.slice(1) : location.pathname;
    // console.log(location.pathname);
    // console.log(routeName);
    // console.log(location.pathname.indexOf(routeName));
    // return slicedPathName === routeName ? "active" : "";

    if (routeName === "/") return slicedPathName === routeName ? "active" : "";

    return location.pathname.indexOf(routeName.slice(1)) > -1 ? "active" : "";
  };

  function emptySessionStorage() {
    sessionStorage.clear();
  }

  return (
    <div className="sidebar" data-color={props.bgColor} data-active-color={props.activeColor}>
      <div className="logo removeUnderlineAdminSidebar">
        <Link to="/" className="simple-text logo-mini">
          <div className="logo-img">
            <img src={Logo} alt="react-logo" />
          </div>
        </Link>
        <Link to="/" className="simple-text logo-normal">
          برنامج تكويد
        </Link>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes
            .filter((route) => route.roles.includes(localStorage.getItem("_r")))
            .map((prop, key) => {
              return (
                <li className={activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key}>
                  <NavLink
                    to={prop.layout + prop.path}
                    className={"nav-link" + reactRouterActiveClass}
                  >
                    <i className={prop.icon} />
                    <p style={{ color: "#dfdcdc" }}>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
        </Nav>
        <Link to="/login">
          <Button block color="danger" onClick={emptySessionStorage}>
            تسجيل الخروج
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
