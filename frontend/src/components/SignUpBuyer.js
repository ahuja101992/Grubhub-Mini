import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
import "./login.css";
import { connect } from "react-redux";
import { sign_in, toLogin } from "../actions/loginActions";

function mapDispatchToProps(dispatch) {
  return {
    toLogin: data => dispatch(toLogin(data)),
    sign_in: data => dispatch(sign_in(data))
  };
}

function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    success: store.login.authFlag,
    toLoginPage: store.login.toLogin
  };
}

class SignUpBuyer extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   toLoginPage: false,
    //   f_name: "",
    //   l_name: "",
    //   email_id: "",
    //   password: ""
    // };
    this.signIn = this.signIn.bind(this);
    this.signupBuy = this.signupBuy.bind(this);
    this.successmessage = this.successmessage.bind(this);
  }
  signIn(e) {
    e.preventDefault();
    console.log("clicked login.");
    this.props.toLogin();
  }
  successmessage = e => {
    console.log("method invoked");
    return this.props.errMsg;
  };

  signupBuy(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = {
      f_name: formdata.getAll("first_name")[0],
      l_name: formdata.getAll("last_name")[0],
      email_id: formdata.getAll("email_id")[0],
      password: formdata.getAll("password")[0]
    };
    this.props.sign_in(data);
  }
  render() {
    var redirectVar, dispMsg;
    if (this.props.toLoginPage == true) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.props.errMsg != "") {
      dispMsg = (
        <div class="text-center">
          <p>{this.props.errMsg}</p>
        </div>
      );
    }

    return (
      <div>
        {redirectVar}
        <div class="row justify-content-center">
          <div class="col-sm-9 col-md-7 col-lg-3 mx-auto">
            <div class="card">
              <header class="card-body">
                <h4 class="card-title mt-2">Create your account</h4>
              </header>
              <p>{dispMsg}</p>
              <article class="card-body">
                <form onSubmit={this.signupBuy}>
                  <div class="form-row">
                    <div class="col form-group">
                      <label class="label-new">First name </label>
                      <input
                        name="first_name"
                        type="text"
                        class="form-control"
                        placeholder=""
                        required
                        autofocus
                      />
                    </div>
                    <div class="col form-group">
                      <label class="label-new">Last name</label>
                      <input
                        name="last_name"
                        type="text"
                        class="form-control"
                        placeholder=" "
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label-new">Email</label>
                    <input
                      type="email"
                      name="email_id"
                      class="form-control"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-new">
                      Password (8 character minimum)
                    </label>
                    <input
                      class="form-control"
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">
                      Create your account
                    </button>
                  </div>

                  <div class="card-body text-center">
                    Have an account?
                    <Link value="login" to={{ pathname: "/login" }}>
                      login
                    </Link>
                  </div>
                  <div class="text-center">
                    <small class="text-muted">
                      By creating your Grubhub account, you agree to the Terms
                      of Use and Privacy Policy
                    </small>
                  </div>
                </form>
              </article>
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
)(SignUpBuyer);
