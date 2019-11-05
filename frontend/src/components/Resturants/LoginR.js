import React, { Component } from "react";
import "./../login.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { sign_in_res } from "../../actions/loginActions";

function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    success: store.login.success,
    authFlag: store.login.authFlag
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sign_in: data => dispatch(sign_in_res(data))
  };
}

class ResLogin extends Component {
  constructor(props) {
    super(props);
    this.loginResturant = this.loginResturant.bind(this);
  }
  loginResturant(e) {
    console.log("step1");
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = {
      username: formdata.getAll("username")[0],
      password: formdata.getAll("password")[0]
    };
    this.props.sign_in(data);
  }

  render() {
    var redirectVar, dispMsg;
    if (this.props.authFlag === true) {
      redirectVar = <Redirect to="/homeR" />;
      cookie.save("cookieRes", {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
    } else {
      redirectVar = <Redirect to="/reslogin" />;
    }
    if (this.props.authFlag == false) {
      console.log("got this");
      dispMsg = (
        <div class="text-center">
          <p>Invalid username or password</p>
        </div>
      );
    }
    return (
      <div class="bg-light login-container">
        <div class="container">
          {redirectVar}
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-4 mx-auto border border-light">
              <div class="card my-5 border border-light">
                <div class="card-body bg-light">
                  <div class="titleImg"></div>
                  {dispMsg}
                  <form onSubmit={this.loginResturant}>
                    <div class="form-label-group">
                      <label class="label-new" for="inputEmail">
                        Username or email address
                      </label>
                      <input
                        class=""
                        name="username"
                        type="email"
                        id="inputEmail"
                        class="form-control"
                        placeholder=""
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
                        name="password"
                        id="inputPassword"
                        class="form-control"
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
                        Remember me
                      </label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block">
                      Sign in
                    </button>
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
)(ResLogin);
