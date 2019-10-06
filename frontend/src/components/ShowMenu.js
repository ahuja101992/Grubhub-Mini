import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "react-cookies";
import Basket from "./Basket";
import { getBuyMenu } from "../actions/orderAction";
import "./ShowMenu.css";

function mapStateToProps(store) {
  return {
    success: store.order.success,
    getBuyDishSuccess: store.order.getBuyDishSuccess,
    errMsg: store.order.errMsg,
    dishesBuy: store.order.dishesBuy,
    err: store.order.err,
    proceedChecout: false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBuyMenu: data => dispatch(getBuyMenu(data))
  };
}
class ShowMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rest_name: "",
      rest_id: null,
      cartItems: []
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }
  handleAddToCart(e, product) {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach(item => {
        if (item.DISH_ID === product.DISH_ID) {
          productAlreadyInCart = true;
          item.count++;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    });
  }
  handleRemoveFromCart(e, items) {
    console.log("testing");
    this.setState(state => {
      const cartItems = state.cartItems.filter(
        element => element.DISH_ID != items.DISH_ID
      );
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    });
  }

  componentDidMount() {
    // console.log("cmponent mount");
    // const email = sessionStorage.getItem("email_idRes")
    console.log("props value" + this.props.location.data);
    let rest_id, rest_name;
    if (this.props.location.data === undefined) {
      rest_id = sessionStorage.getItem("res-order");
      rest_name = sessionStorage.getItem("res-name");
    } else {
      rest_id = this.props.location.data.rest_id;
      rest_name = this.props.location.data.rest_name;
    }

    // let rest_id = 3;
    // let rest_name = "abc";
    sessionStorage.setItem("res-order", rest_id);
    sessionStorage.setItem("res-name", rest_name);
    this.setState({
      rest_name: rest_name
    });
    console.log(rest_id + "   " + rest_name);
    const data = {
      rest_id: rest_id
    };
    this.props.getBuyMenu(data);
    if (sessionStorage.getItem("cartItems")) {
      //   let Items = JSON.parse();
      this.setState({
        cartItems: JSON.parse(sessionStorage.getItem("cartItems"))
      });
    }
  }
  render() {
    let redirectVar;
    if (!cookie.load("cookieBuy")) {
      redirectVar = <Redirect to="/login" />;
    }
    console.log("props form link", this.props.location.data);
    let dishDetails = null;
    let obj = {},
      redirectCheckout;
    if (this.state.proceedChecout) {
      redirectCheckout = (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    }
    if (this.props.getBuyDishSuccess === "true") {
      let dishType = [...new Set(this.props.dishesBuy.map(x => x.TYPE))];
      console.log(dishType);

      for (let i = 0; i < dishType.length; i++) {
        let tempArray = this.props.dishesBuy.filter(
          dish => dish.TYPE == dishType[i]
        );

        obj[dishType[i]] = {
          items: tempArray
        };
      }

      dishDetails = Object.keys(obj).map(currObj => {
        return (
          <div class="category">
            <h4>{currObj}</h4>
            {obj[currObj].items.map(items => {
              return (
                <div class="dish-row flex col-sm-12">
                  <div class="dish-left">
                    <img
                      class="dish-image-container"
                      alt="No Image Available"
                    />
                    <div class="dish-details">
                      <div class="col-sm">{items.DISH_NAME}</div>
                      <div class="col-sm">{items.DISH_DESC}</div>
                      <div class="col-sm">$ {items.DISH_PRICE}</div>
                    </div>
                  </div>
                  <div class="dish-right">
                    <input
                      type="button"
                      class="btn btn-primary"
                      value="Add to Cart"
                      onClick={e => this.handleAddToCart(e, items)}
                      id={"add-" + items.DISH_ID}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
    }
    return (
      <div class="dish-list-wrapper col-sm-10">
        {redirectVar}
        {redirectCheckout}
        <Basket
          cartItems={this.state.cartItems}
          handleRemoveFromCart={this.handleRemoveFromCart}
        ></Basket>
        <h2>{this.state.rest_name}</h2>
        <div class="col-sm-12 list-container">{dishDetails}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowMenu);
