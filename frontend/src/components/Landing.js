import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toSignin: false
    };
  }
  toSignIn = e => {
    e.preventDefault();
    console.log("clicked login.");
    this.setState({
      toSignin: true
    });
  };
  state = {};
  render() {
    var redirectVar;
    if (this.state.toSignin == true) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="home-container">
          <div class="row">
            <div class="col-sm-6 background"></div>
            <div class="col-sm-6 text-container">
              <div class="header-row row flex sign-in">
                <div class="col-sm-3">
                  <a class="btn-signin" onClick={this.toSignIn}>
                    Sign in
                  </a>
                </div>
              </div>
              <div class="row delivery-love">
                <h1>Order food delivery you'll love</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
