import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { toProfile } from "../../actions/loginActions";

function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    authFlag: store.login.authFlag,
    toSignup: store.login.toSignup
    // toProfile: store.login.toProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // toProfilePage: data => dispatch(toProfile())
  };
}

class HomeR extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let redirectVar = null;
    // console.log(this.props.toProfile);
    if (!cookie.load("cookieRes")) {
      redirectVar = <Redirect to="/reslogin" />;
    }
    return (
      <div>
        {redirectVar}
        <h3>hi {sessionStorage.getItem("email_idres")}</h3>
        <div class="container">
          <div class="card" width="18rem">
            <img
              class="card-img-top"
              src={require("../home_1.png")}
              width="100%"
              height="100%"
              alt=""
            />
            <div class="card-body">
              <div style={{ width: "50%", float: "left" }}>
                <div class="card" style={{ width: "18rem" }}>
                  <div class="card-body">
                    <h5 class="card-title">Your Orders</h5>

                    <p class="card-text">
                      Mix it up! Try a new restaurant today
                    </p>
                    <div class="link-container">
                      <Link
                        value="Your Orders"
                        to={{ pathname: "/showrorders" }}
                      >
                        Your Orders
                      </Link>
                    </div>
                    <div class="link-container">
                      <Link
                        value="Show Dishes"
                        to={{ pathname: "/showdishes" }}
                      >
                        Show Dishes
                      </Link>
                    </div>
                    <div class="link-container">
                      <Link value="Add Dish" to={{ pathname: "/adddish" }}>
                        Add Dish
                      </Link>
                    </div>
                    <div class="link-container">
                      <Link
                        value="Add Section"
                        to={{ pathname: "/addsection" }}
                      >
                        Add Section
                      </Link>
                    </div>
                    <div class="link-container">
                      <Link
                        value="Show Section"
                        to={{ pathname: "/showsection" }}
                      >
                        Show Section
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: "50%", float: "left" }}>
                <div class="card" style={{ width: "18rem" }}>
                  <div class="card-body">
                    <h5 class="card-title">Account</h5>
                    <p class="card-text">
                      Check and edit your profile details instantly
                    </p>
                    <p class="card-text"></p>
                    <div class="link-container">
                      <Link
                        name="MyAccount-Owner"
                        value="My Account"
                        to={{ pathname: "/Profileres" }}
                      >
                        My Account
                      </Link>
                    </div>
                    <div class="link-container">
                      <Link
                        name="MyAccount-Owner"
                        value="My Chats"
                        to={{ pathname: "/chatlist" }}
                      >
                        My Chats
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeR);
