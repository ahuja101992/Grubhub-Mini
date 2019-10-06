import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./../login.css";
import { connect } from "react-redux";
import { sign_up_res } from "../../actions/loginActions";

function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    success: store.login.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sign_up: data => dispatch(sign_up_res(data))
  };
}

class SignUpRes extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   f_name: "",
    //   l_name: "",
    //   email: "",
    //   phone: "",
    //   rest_name: "",
    //   rest_zip: ""
    // };
    // this.fnameHandler = this.fnameHandler.bind(this);
    // this.lnameHandler = this.lnameHandler.bind(this);
    // this.emailHandler = this.emailHandler.bind(this);
    // this.phoneHandler = this.phoneHandler.bind(this);
    // this.rnameHandler = this.rnameHandler.bind(this);
    // this.rzipHandler = this.rzipHandler.bind(this);

    this.signupRest = this.signupRest.bind(this);
  }

  signupRest = e => {
    console.log("step1");
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = {
      f_name: formdata.getAll("f_name")[0],
      l_name: formdata.getAll("l_name")[0],
      email: formdata.getAll("email")[0],
      rest_name: formdata.getAll("rest_name")[0],
      rest_zip: formdata.getAll("rest_zip")[0],
      phone: formdata.getAll("phone")[0]
    };
    this.props.sign_up(data);
  };
  render() {
    let dispMsg;
    if (this.props.errMsg != "") {
      dispMsg = (
        <div class="text-center">
          <p>{this.props.errMsg}</p>
        </div>
      );
    }
    return (
      <div>
        <div class="row justify-content-center">
          <div class="col-sm-9 col-md-7 col-lg-3 mx-auto">
            <div class="card">
              <header class="card-body">
                <h4 class="card-title mt-2">Create your account</h4>
              </header>
              <p>{dispMsg}</p>
              <article class="card-body">
                <form onSubmit={this.signupRest}>
                  <div class="form-group">
                    <label class="label-new">First name </label>
                    <input
                      type="text"
                      name="f_name"
                      class="form-control"
                      placeholder=""
                      required
                      autofocus
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-new">Last name</label>
                    <input
                      type="text"
                      name="l_name"
                      class="form-control"
                      placeholder=""
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label class="label-new">Email</label>
                    <input
                      onChange={this.emailHandler}
                      type="email"
                      name="email"
                      class="form-control"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-new">Phone</label>
                    <input
                      class="form-control"
                      type="text"
                      required
                      name="phone"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-new">Resturant Name</label>
                    <input
                      class="form-control"
                      type="text"
                      name="rest_name"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-new">Resturant Zip Code</label>
                    <input
                      class="form-control"
                      type="text"
                      name="rest_zip"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">
                      Create your account
                    </button>
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
)(SignUpRes);
