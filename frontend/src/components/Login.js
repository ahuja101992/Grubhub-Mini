import React, { Component } from "react";
import "./login.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { fetchLogin, toSignUp } from "../actions/loginActions";

// import cookie from "react-cookies";
// import { Redirect } from "react-router";

function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    authFlag: store.login.authFlag,
    toSignup: store.login.toSignup
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLogin: data => dispatch(fetchLogin(data)),
    toSignUp: data => dispatch(toSignUp(data))
  };
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginBuyer = this.loginBuyer.bind(this);
    this.toSignUpBuy = this.toSignUpBuy.bind(this);
  }
  toSignUpBuy(e) {
    e.preventDefault();
    console.log("test 1");
    this.props.toSignUp();
  }
  loginBuyer(e) {
    e.preventDefault();
    // console.log("inside" + e.target.length);
    const formdata = new FormData(e.target);
    const data = {
      username: formdata.getAll("username")[0],
      password: formdata.getAll("password")[0]
    };
    // for (let i = 0; i < e.target.length; i++) {
    //   console.log("testing" + e.target[i].name);
    // }
    this.props.fetchLogin(data);
  }
  render() {
    console.log("testing auth flag: " + this.props.authFlag);
    var redirectVar, dispMsg;
    if (this.props.toSignup == true) {
      redirectVar = <Redirect to="/SignUpBuyer" />;
    } else if (this.props.authFlag === true) {
      redirectVar = <Redirect to="/home" />;
    }
    if (this.props.authFlag == false && this.props.errMsg != "") {
      dispMsg = (
        <div class="text-center">
          <p>{this.props.errMsg}</p>
        </div>
      );
    }
    // let redirectVar = null;
    if (cookie.load("cookieBuy")) {
      redirectVar = <Redirect to="/home" />;
    } else {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card my-5">
                <div class="card-body">
                  <h3 class="card-title">Sign in with your Grubhub account</h3>
                  {dispMsg}
                  <form id="loginForm" onSubmit={this.loginBuyer}>
                    <div class="form-label-group">
                      <label class="label-new" for="inputEmail">
                        Email
                      </label>
                      <input
                        class=""
                        type="email"
                        id="inputEmail"
                        class="form-control"
                        placeholder=""
                        name="username"
                        required
                        autofocus
                        maxLength="50"
                      />
                    </div>

                    <div class="form-label-group">
                      <label class="label-new" for="inputPassword">
                        Password
                      </label>
                      <input
                        type="password"
                        id="inputPassword"
                        class="form-control"
                        name="password"
                        placeholder=""
                        required
                        maxLength="30"
                      />
                    </div>

                    <div class="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        class="custom-control-label input-area label-new"
                        for="customCheck1"
                      >
                        Keep me signed in
                      </label>
                    </div>
                    <button class="btn btn-lg btn-danger btn-block">
                      Sign in
                    </button>
                    <div class="text-center">
                      <p> </p>
                      <p>or</p>
                    </div>

                    <div class="text-center">
                      <Link
                        value="Create your account"
                        to={{ pathname: "/SignUpBuyer" }}
                      >
                        Create Your Account
                      </Link>
                    </div>
                  </form>
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
)(Login);
