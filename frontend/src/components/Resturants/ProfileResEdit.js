import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { connect } from "react-redux";
import axios from "axios";
import "./profile.css";
import connectionUrl from "../../config/config";
import { getResProfile, updateResProfile } from "../../actions/loginActions";

function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    authFlag: store.login.authFlag,
    toSignup: store.login.toSignup,
    first_name: store.login.first_name,
    last_name: store.login.last_name,
    email_id: store.login.email_id,
    rest_name: store.login.rest_name,
    rest_zip: store.login.rest_zip,
    cuisine: store.login.cuisine,
    phone_num: store.login.phone_num,
    success: store.login.success,
    profile_image: store.login.profile_image
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getResProfile: data => dispatch(getResProfile(data)), /////This has to be fixed
    updateResProfile: data => dispatch(updateResProfile(data))
  };
}

class Profileresedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      profile_image: ""
    };
    this.updateProfile = this.updateProfile.bind(this);
  }
  componentDidMount() {
    const email = localStorage.getItem("email_idRes");
    const data = {
      email_id: email
    };
    console.log("data    " + JSON.stringify(data));
    this.props.getResProfile(data);
  }
  onFileChange(files) {
    if (files == null || files.length == 0) return;
    let file = files[0];
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    const data = new FormData();
    data.append("image", file, file.name);

    let email_id = sessionStorage.getItem("email_idRes");
    axios
      .post(
        `http://` + connectionUrl + `/image/${email_id}/resimgupload`,
        data,
        {
          headers: headers
        }
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({ profile_image: res.data.imageUrl.imageUrl });
          console.log("success", this.state.profile_image);
        }
      })
      .catch(err => console.error(err));
  }

  updateProfile(e) {
    e.preventDefault();
    console.log("inside" + e.target.length);
    const formdata = new FormData(e.target);
    // if (formdata.getAll("confirmpassword") != formdata.getAll("password")) {
    //   console.log("raise error");
    // } else
    {
      const data = {
        first_name: formdata.getAll("first_name")[0],
        last_name: formdata.getAll("last_name")[0],
        phone_num: formdata.getAll("phone_num")[0],
        // currentpassword: formdata.getAll("currentpassword"),
        email_id: formdata.getAll("email_id")[0],
        password: formdata.getAll("newpassword")[0],
        rest_zip: formdata.getAll("rest_zip")[0],
        rest_name: formdata.getAll("rest_name")[0],
        cuisine: formdata.getAll("cuisine")[0],
        confirmpassword: formdata.getAll("confirmpassword")[0]
      };
      let pass = formdata.getAll("confirmpassword")[0],
        confPass = formdata.getAll("confirmpassword")[0];

      if (pass === confPass) {
        console.log("update data " + JSON.stringify(data));
        this.props.updateResProfile(data);
        console.log("yes");
      } else {
        console.log(
          "kkjkjjkj" +
            formdata.getAll("newpassword") +
            " " +
            formdata.getAll("confirmpassword")
        );
        this.setState({ errMsg: "Passwords do not match. " });
      }
    }
  }
  render() {
    let redirectVar;
    if (!cookie.load("cookieRes")) {
      redirectVar = <Redirect to="/reslogin" />;
    }
    console.log(this.props.success + " " + this.props.errMsg);
    if (
      this.props.success == true &&
      this.props.errMsg == "updated successfully "
    ) {
      redirectVar = <Redirect to="/profileres" />;
    }
    return (
      <div>
        {redirectVar}

        <div class="container">
          <h1>Edit Profile</h1>
          <hr />
          <div class="row">
            <div class="col-md-3">
              <div class="text-center">
                <img
                  src={
                    this.state.profile_image
                      ? this.state.profile_image
                      : require("./profilepic.png")
                  }
                  class="rounded profile-image"
                  alt="avatar"
                />

                <input
                  className="btn btn-default"
                  type="file"
                  accept="image/*"
                  onChange={e => this.onFileChange(e.target.files)}
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-md-9 personal-info">
              {/* <div class="alert alert-info alert-dismissable">
                <a class="panel-close close" data-dismiss="alert">
                  ×
                </a>
                <i class="fa fa-coffee"></i>
                This is an <strong>.alert</strong>. Use this to show important
                messages to the user.
              </div> */}
              <h4>{this.state.errMsg}</h4>
              <h3>Personal info</h3>

              <form class="form-horizontal" onSubmit={this.updateProfile}>
                <div class="form-group">
                  <label class="col-lg-3 control-label">First name:</label>
                  <div class="col-lg-8">
                    <input
                      name="first_name"
                      class="form-control"
                      type="text"
                      placeholder="firstname"
                      value={this.props.first_name}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Last name:</label>
                  <div class="col-lg-8">
                    <input
                      name="last_name"
                      class="form-control"
                      type="text"
                      placeholder="lastname"
                      value={this.props.last_name}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Email:</label>
                  <div class="col-lg-8">
                    <input
                      readOnly
                      class="form-control"
                      name="email_id"
                      type="text"
                      placeholder="email@gmail.com"
                      value={this.props.email_id}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Phone Number :</label>
                  <div class="col-lg-8">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="999999999"
                      name="phone_num"
                      value={this.props.phone_num}
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Resturant Name</label>
                  <div class="col-lg-8">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="999999999"
                      name="rest_name"
                      value={this.props.rest_name}
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">
                    Resturant Zipcode
                  </label>
                  <div class="col-lg-8">
                    <input
                      readOnly
                      class="form-control"
                      type="text"
                      placeholder="999999999"
                      name="rest_zip"
                      value={this.props.rest_zip}
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Cuisine</label>
                  <div class="col-lg-8">
                    <input
                      class="form-control"
                      type="text"
                      value={this.props.cuisine}
                      name="cuisine"
                      required
                    />
                  </div>
                </div>
                {/* <div class="form-group">
                  <label class="col-md-3 control-label">
                    Current Password:
                  </label>
                  <div class="col-md-8">
                    <input
                      class="form-control"
                      name="currentpassword"
                      type="password"
                      placeholder="********"
                      required
                    />
                  </div>
                </div> */}
                <div class="form-group">
                  <label class="col-md-3 control-label">Password:</label>
                  <div class="col-md-8">
                    <input
                      class="form-control"
                      name="newpassword"
                      type="password"
                      placeholder="********"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">
                    Confirm password:
                  </label>
                  <div class="col-md-8">
                    <input
                      class="form-control"
                      type="password"
                      name="confirmpassword"
                      placeholder="********"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label"></label>
                  <div class="col-md-8">
                    <input
                      type="button"
                      class="btn btn-primary"
                      type="submit"
                    />
                    <span></span>
                    <Link
                      to={{ pathname: "/profileres" }}
                      className="btn btn-default"
                      value="Cancel"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profileresedit);
