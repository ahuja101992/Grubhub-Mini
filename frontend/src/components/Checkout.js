import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { placeOrder } from "../actions/orderAction";
import { throwStatement } from "@babel/types";
import "./Checkout.css";

function mapStateToProps(store) {
  return {
    success: store.order.success,
    orderSuccess: store.order.orderSuccess,
    errMsg: store.order.errMsg,
    orderResult: store.order.orderResult,
    err: store.order.err
  };
}

function mapDispatchToProps(dispatch) {
  return {
    placeOrder: data => dispatch(placeOrder(data))
  };
}

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      items: []
    };
    this.submitOrder = this.submitOrder.bind(this);
  }
  submitOrder = e => {
    let cart = JSON.parse(sessionStorage.getItem("cartItems"));
    let items = [];
    let order = {};
    let cartIterate = cart.map(item => {
      items.push({
        dish_id: item._id,
        count: item.count,
        item_name: item.dish_name,
        item_price: item.dish_price,
        item_description: item.dish_desc,
        item_image: item.dish_image
      });
    });
    let totalPrice = cart.reduce((a, c) => a + c.dish_price * c.count, 0);
    let rest_email = sessionStorage.getItem("rest-email-id");
    let buy_email = sessionStorage.getItem("email_id");
    let restuarant_name = sessionStorage.getItem("res-name");
    let first_name = sessionStorage.getItem("first_name");
    // buy_email = "admin@admin.com";
    order = {
      total_price: totalPrice,
      status: "New",
      rest_email_id: rest_email,
      buy_email_id: buy_email,
      restuarant_name: restuarant_name,
      first_name: first_name,
      items: items
    };
    console.log("order" + JSON.stringify(order));
    this.props.placeOrder(order);
  };

  render() {
    let redirectVar,
      successMsg = "";
    if (!cookie.load("cookieBuy")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.props.orderSuccess === true) {
      sessionStorage.setItem("cartItems", "[]");

      successMsg = (
        <div>
          Your order has been placed. Go to My orders to check your order
        </div>
      );
    }
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    let cartItemsDisplay, sTotal;

    if (cartItems.length > 0) {
      console.log(cartItems.length);
      cartItemsDisplay = cartItems.map(item => {
        return (
          <div class="row">
            <div className="col-sm-4 flex">{item.dish_name}</div>
            <div className="col-sm-4 flex">{item.dish_price}</div>
            <div className="col-sm-4 flex">{item.count}</div>
          </div>
        );
      });

      sTotal = cartItems.reduce((a, c) => a + c.dish_price * c.count, 0);
    }
    return (
      <div class="col-sm-10 confirm-container">
        {redirectVar}
        {this.props.orderSuccess === true ? successMsg : ""}
        <div class="row header-row">
          <div className="col-sm-4 flex">Dish Name</div>
          <div className="col-sm-4 flex">Price</div>
          <div className="col-sm-4 flex">Quantity</div>
        </div>
        {cartItemsDisplay}
        {this.props.orderSuccess === true ? (
          ""
        ) : (
          <div class="total-row">Total : {sTotal}</div>
        )}
        {this.props.orderSuccess === true ? (
          ""
        ) : (
          <button
            className="btn btn-primary col-sm-4 submit-btn"
            onClick={this.submitOrder}
          >
            Place Order
          </button>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
