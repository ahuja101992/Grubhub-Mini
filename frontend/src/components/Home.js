import React, { Component } from "react";
import axios from "axios";
import "./home.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toProfile, getSearchRes } from "../actions/loginActions";

function mapStateToProps(store) {
  return {
    errMsg: store.login.errMsg,
    authFlag: store.login.authFlag,
    toSignup: store.login.toSignup,
    toProfile: store.login.toProfile,
    getRest: store.login.getRest,
    restaurants: store.login.restaurants,
    filterList: store.login.restaurants
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toProfilePage: () => dispatch(toProfile()),
    searchrest: data => dispatch(getSearchRes(data))
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false
    };
    this.gotoProfile = this.gotoProfile.bind(this);
    this.searchrest = this.searchrest.bind(this);
    this.filterCuisine = this.filterCuisine.bind(this);
    this.getMenu = this.getMenu.bind(this);
  }

  gotoProfile = e => {
    e.preventDefault();
    // console.log("test 1");
    this.props.toProfilePage();
  };
  searchrest = e => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const data = {
      rest_zip: formdata.getAll("restaurant_zipcode"),
      dish_name: formdata.getAll("dish_name")
    };
    this.props.searchrest(data);
  };
  getMenu = e => {
    console.log("testing");
    let getIdArr = e.target.id.split("-");
    let id = parseInt(getIdArr[1]);
    // console.log("id obtained is " + resId.id);
  };
  filterCuisine = e => {
    e.preventDefault();
    this.setState({
      filter: true
    });
    // let selcted = "All foods";
    // let newList = this.props.restaurants;
    // let filteredList = newList.filter(rest => rest.cuisine == selcted);
    // console.log(filteredList);
  };
  render() {
    let redirectVar = null;

    if (cookie.load("cookieBuy")) {
      redirectVar = <Redirect to="/home" />;
    } else {
      redirectVar = <Redirect to="/login" />;
    }
    let details = null,
      cuisines = null;
    let restTable = null;
    if (this.props.getRest == "true") {
      if (this.state.filter) {
        let cuisineList = [];
        let checkBoxes = document.getElementsByName("checkBox");
        // console.log("chcekbox" + checkBoxes);
        for (let i = 0; i < checkBoxes.length; i++) {
          if (checkBoxes[i].checked == true) {
            console.log("chcek " + checkBoxes[i].value);
            cuisineList.push(checkBoxes[i].value);
          }
        }
        console.log("cuisineList" + cuisineList);
        let newList = this.props.filterList.filter(
          rest => cuisineList.indexOf(rest.cuisine) > -1
        );
        console.log("Filter clicked +" + details);
        details = newList.map(rest => {
          return (
            <div class="col-sm-4 restaurant">
              <div class="rest-name" id={"rest-" + rest.restaurant_id}>
                {rest.resturant_name}
              </div>
              <div class="rest-cuisine">{rest.cuisine}</div>
            </div>
          );
        });
      } else {
        console.log("rest  0" + JSON.stringify(this.props.restaurants));
        details = this.props.restaurants.map(rest => {
          let rest_id = rest.restaurant_id;

          return (
            <div class="col-sm-4 restaurant">
              <div class="rest-name">{rest.resturant_name}</div>
              <div class="rest-cuisine">{rest.cuisine}</div>
              <Link
                className="btn btn-primary"
                to={{
                  pathname: "/showmenu",
                  data: {
                    rest_id: rest.restaurant_id,
                    rest_name: rest.resturant_name
                  }
                }}
              >
                Checkout Restaurant
              </Link>
            </div>
          );
        });
      }
      let distCuisine = [
        ...new Set(this.props.restaurants.map(x => x.cuisine))
      ];
      cuisines = distCuisine.map(cuisine => {
        return (
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id={cuisine}
              value={cuisine}
              name="checkBox"
            />
            <label class="form-check-label" for={cuisine}>
              {cuisine}
            </label>
          </div>
        );
      });
      restTable = (
        <div class="restaurant-list col-sm-12 row">
          <div class="col-sm-4 filter-container">
            <h3>Filters</h3>
            <h6>Cuisines</h6>
            <div class="col-sm-12">{cuisines}</div>
            <button
              class="btn btn-primary btn-lg btn-block"
              onClick={this.filterCuisine}
            >
              Filter
            </button>
          </div>
          <div class="col-sm-8 restaurants-container">{details}</div>
        </div>
      );
    }

    return (
      <div>
        {redirectVar}
        <h3>hi {sessionStorage.getItem("email_id")}</h3>
        <div class="page-container">
          <div class="card" width="18rem">
            <div class="search-container">
              <img
                class="card-img-top"
                src={require("./home_1.png")}
                width="100%"
                height="100%"
                alt=""
              />
              <form onSubmit={this.searchrest}>
                <div class="input-wrapper col-sm-6">
                  <input
                    type="text"
                    title="Only numbers"
                    class="input-search zipcode"
                    name="restaurant_zipcode"
                    placeholder="Zipcode - only numbers"
                    required
                    maxLength="11"
                    pattern="[0-9]{1,9}"
                  />
                  <input
                    type="text"
                    class="input-search search"
                    name="dish_name"
                    placeholder="Search eg. Pasta, Pizza"
                    required
                  />
                  <button class="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div class="main-wrapper col-sm-11">
              <div class="card-body">
                <div style={{ width: "50%", float: "left" }}>
                  <div class="card" style={{ width: "18rem" }}>
                    <div class="card-body">
                      <h5 class="card-title">Your Orders</h5>

                      <p class="card-text">
                        Mix it up! Try a new restaurant today
                      </p>
                      <Link
                        class="card-link"
                        value="My Orders"
                        to={{ pathname: "/buyerorders" }}
                      >
                        My Orders
                      </Link>
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
                      <p class="card-text"> </p>

                      <Link
                        href="#"
                        class="card-link"
                        to={{ pathname: "/profilebuy" }}
                      >
                        My Account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {restTable}
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
)(Home);
