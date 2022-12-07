import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Nav } from "reactstrap";
import "./sidebar.css";
import Logo from "./tree.png";

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
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
          {props.routes.map((prop, key) => {
            return (
              <li className={activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key}>
                <NavLink to={prop.layout + prop.path} className="nav-link" activeClassName="active">
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
