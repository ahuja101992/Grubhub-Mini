import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutBuy = this.handleLogoutBuy.bind(this);
    this.handleLogoutRes = this.handleLogoutRes.bind(this);
  }
  handleLogoutBuy = () => {
    cookie.remove("cookieBuy", { path: "/" });
    sessionStorage.removeItem("email_id");
    sessionStorage.removeItem("last_name");
    sessionStorage.removeItem("first_name");
    sessionStorage.removeItem("token");
  };
  handleLogoutRes = () => {
    cookie.remove("cookieRes", { path: "/" });
    sessionStorage.removeItem("email_idRes");
    sessionStorage.removeItem("Rest-name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("nameRes");
  };
  render() {
    let navLogin = null;

    let redirectVar = null,
      homeLink = null;
    if (cookie.load("cookieBuy")) {
      redirectVar = <Redirect to="/home" />;
      homeLink = "/home";
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogoutBuy}>
              <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else if (cookie.load("cookieRes")) {
      redirectVar = <Redirect to="/homeR" />;
      homeLink = "/homeR";
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogoutRes}>
              <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand">
            <Link to={homeLink}>
              <img
                src={require("./grubhub.png")}
                width="100"
                height="21"
                alt=""
              />
            </Link>
          </a>
          {navLogin}
        </nav>
      </div>
    );
  }
}

export default Navbar;
