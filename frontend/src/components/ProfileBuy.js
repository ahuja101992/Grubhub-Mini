import React, { Component } from "react";
import "./profile.css";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { getProfile, toProfileedit } from "../actions/loginActions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    authFlag: store.login.authFlag,
    toSignup: store.login.toSignup,
    first_name: store.login.first_name,
    last_name: store.login.last_name,
    email_id: store.login.email_id,
    phone_num: store.login.phone_num,
    profile_image: store.login.profile_image,
    toProfilePage: store.login.toProfileEdit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: data => dispatch(getProfile(data)),
    toProfileEditPage: data => dispatch(toProfileedit())
  };
}

class Profilebuy extends Component {
  constructor(props) {
    super(props);
    // this.getProfile = this.getProfile.bind(this);
  }
  componentDidMount() {
    const email = sessionStorage.getItem("email_id");
    const data = {
      email_id: email
    };
    console.log("data" + JSON.stringify(data));
    this.props.getProfile(data);
    // axios.get("http://localhost:3010/getProfile").then(response => {
    //   //update the state with the response data
    //   this.setState({
    //     books: this.state.books.concat(response.data)
    //   });
    // });
  }

  gotoEditProfile = e => {
    e.preventDefault();
    console.log("test 1");
    this.props.toProfileEditPage();
  };
  render() {
    var redirectVar;
    if (!cookie.load("cookieBuy")) {
      redirectVar = <Redirect to="/login" />;
    }

    return (
      <div>
        {redirectVar}

        <div
          class="profile-container col-sm-12"
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div class="modal-body row" style={{ height: "100%" }}>
            <div class="col-md-4 border">
              <span>
                <div class="list-group">
                  <h4>Your Account</h4>
                  <a
                    href="#"
                    class=" list-group-item-action disabled boder-1 profile-tab label"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    class=" list-group-item-action disabled boder-1 profile-tab label"
                  >
                    Saved Resurants
                  </a>
                </div>
              </span>
            </div>
            <div class="col-md-8">
              <div class="container emp-profile">
                <div class="row profile-container">
                  <div>
                    <img
                      src={
                        this.props.profile_image
                          ? this.props.profile_image
                          : require("./profilepic.png")
                      }
                      class="rounded profile-image"
                      alt="avatar"
                    />
                  </div>

                  <div class="col-md-6">
                    <div class="profile-head">
                      <h5>
                        {this.props.first_name + " " + this.props.last_name}
                      </h5>
                      <h7>Registered Email: {this.props.email_id}</h7>
                      <h3>Profile</h3>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <Link
                      type="button"
                      class="profile-edit-btn"
                      name="btnAddMore"
                      value="Edit Profile"
                      to={{ pathname: "/Profilebuyedit" }}
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div class="row">
                          <div class="col-md-6">
                            <label>Name</label>
                          </div>
                          <div class="col-md-6">
                            <p>
                              {this.props.first_name +
                                " " +
                                this.props.last_name}
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Email</label>
                          </div>
                          <div class="col-md-6">
                            <p>{this.props.email_id}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Phone Number</label>
                          </div>
                          <div class="col-md-6">
                            <p>{this.props.phone_num}</p>
                          </div>
                        </div>
                      </div>
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
)(Profilebuy);
