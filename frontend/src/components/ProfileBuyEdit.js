import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { getProfile, updateProfile } from "../actions/loginActions";
import axios from "axios";
import "./profile.css";
import connectionUrl from "../config/config";
function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    authFlag: store.login.authFlag,
    toSignup: store.login.toSignup,
    first_name: store.login.first_name,
    last_name: store.login.last_name,
    email_id: store.login.email_id,
    phone_num: store.login.phone_num,
    success: store.login.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: data => dispatch(getProfile(data)),
    updateProf: data => dispatch(updateProfile(data))
  };
}

class Profilebuyedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      profile_image: ""
    };
    this.updateProfile = this.updateProfile.bind(this);
    // this.imageUpload = this.imageUpload.bind(this);
  }
  componentDidMount() {
    const email = localStorage.getItem("email_id");
    const data = {
      email_id: email
    };
    console.log("data    " + JSON.stringify(data));
    this.props.getProfile(data);
    // axios.get("http://localhost:3010/getProfile").then(response => {
    //   //update the state with the response data
    //   this.setState({
    //     books: this.state.books.concat(response.data)
    //   });
    // });
  }
  onFileChange(files) {
    if (files == null || files.length == 0) return;
    let file = files[0];

    const data = new FormData();
    data.append("image", file, file.name);
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    let email_id = sessionStorage.getItem("email_id");
    axios
      .post(`http://` + connectionUrl + `/image/${email_id}/imgupload`, data, {
        headers: headers
      })
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
    let formdata = new FormData(e.target);
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
        confirmpassword: formdata.getAll("confirmpassword")[0]
      };
      // let sendData = new FormData();
      // // console.log(this.state.file);
      // // console.log(data);
      // sendData.append("picture", this.state.file);
      // sendData.append("body", JSON.stringify(data));
      // const config = {
      //   headers: {
      //     "content-type": "multipart/form-data"
      //   }
      // };
      // console.log("test data " + sendData.getAll("pictures"));
      this.props.updateProf(data);
    }
  }
  render() {
    let redirectVar;
    if (!cookie.load("cookieBuy")) {
      redirectVar = <Redirect to="/login" />;
    }
    console.log(this.props.success + " " + this.props.errMsg);
    if (
      this.props.success == true &&
      this.props.errMsg == "updated successfully "
    ) {
      redirectVar = <Redirect to="/profilebuy" />;
    }
    return (
      <div>
        {redirectVar}
        <h1>Hi {this.props.first_name}</h1>
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
                  // className={("height:150px", "width:150px", "padding: 10px")}
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
              <h3>Personal info</h3>

              <form class="form-horizontal" onSubmit={this.updateProfile}>
                <div class="form-group">
                  <label class="col-lg-3 control-label">First name:</label>
                  <div class="col-lg-8">
                    <input
                      name="first_name"
                      class="form-control"
                      type="text"
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
                      ReadOnly
                      class="form-control"
                      type="text"
                      placeholder="999999999"
                      name="phone_num"
                      value={this.props.phone_num}
                      required
                    />
                  </div>
                </div>

                <div class="password-wrapper">
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
                        to={{ pathname: "/profilebuy" }}
                        className="btn btn-default"
                        value="Cancel"
                      >
                        Cancel
                      </Link>
                    </div>
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
)(Profilebuyedit);
