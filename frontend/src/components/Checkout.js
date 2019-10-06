import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { placeOrder } from "../actions/orderAction";
import { throwStatement } from "@babel/types";

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
        dish_id: item.DISH_ID,
        count: item.count
      });
    });
    let totalPrice = cart.reduce((a, c) => a + c.DISH_PRICE * c.count, 0);
    let rest_id = sessionStorage.getItem("res-order");
    let buy_email = sessionStorage.getItem("email_id");
    // buy_email = "admin@admin.com";
    order = {
      total_price: totalPrice,
      status: "New",
      rest_email_id: rest_id,
      buy_email_id: buy_email,
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
    if (this.props.orderSuccess === "true") {
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
          <div>
            <div className="row col-sm-12">{item.DISH_NAME}</div>
            <div className="row col-sm-12">{item.DISH_PRICE}</div>
            <div className="row col-sm-12">{item.count}</div>
            <div>
              <p> </p>
            </div>
          </div>
        );
      });

      sTotal = cartItems.reduce((a, c) => a + c.DISH_PRICE * c.count, 0);
    }
    return (
      <div>
        {redirectVar}
        {this.props.orderSuccess === "true" ? successMsg : ""}
        {cartItemsDisplay}
        {this.props.orderSuccess === "true" ? "" : <div>Total : {sTotal}</div>}

        <button className="btn btn-primary" onClick={this.submitOrder}>
          Place Order
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
