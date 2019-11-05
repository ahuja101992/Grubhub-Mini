import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "react-cookies";
import Basket from "./Basket";
// import Pagination from "./pagination";
import Pagination from "react-js-pagination";
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
      cartItems: [],
      currentPage: 1,
      setCurrentPage: 1,
      postPerPage: 1,
      setPostPerPage: 1,
      activePage: 1
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  handleAddToCart(e, product) {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach(item => {
        if (item._id === product._id) {
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
    // let cartItems = ;
    let cartItems = this.state.cartItems.filter(
      element => element._id != items._id
    );
    this.setState({ cartItems: cartItems }, () => {
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
    // this.setState(state => {
    //   const cartItems = state.cartItems.filter(
    //     element => element._id != items._id
    //   );
    //   sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    //   return cartItems;
    // });
  }

  componentDidMount() {
    // console.log("cmponent mount");
    // const email = sessionStorage.getItem("email_idRes")
    console.log("props value" + this.props.location.data);
    let rest_id, rest_name, rest_email_id;
    if (this.props.location.data === undefined) {
      rest_id = sessionStorage.getItem("res-order");
      rest_name = sessionStorage.getItem("res-name");
      rest_email_id = sessionStorage.getItem("rest-email-id");
    } else {
      rest_id = this.props.location.data.rest_id;
      rest_email_id = this.props.location.data.rest_email;
      rest_name = this.props.location.data.rest_name;
    }

    // let rest_id = 3;
    // let rest_name = "abc";
    sessionStorage.setItem("res-order", rest_id);
    sessionStorage.setItem("res-name", rest_name);
    sessionStorage.setItem("rest-email-id", rest_email_id);

    this.setState({
      rest_name: rest_name
    });
    console.log(rest_id + "   " + rest_name + "   " + rest_email_id);
    const data = {
      rest_id: rest_id,
      email_id: rest_email_id
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
    let dishDetails = null,
      paginate = null;
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
    if (this.props.getBuyDishSuccess === true) {
      // // let dishType = (this.props.dishesBuy.map(x => x.TYPE))];
      // console.log(dishType);

      // for (let i = 0; i < dishType.length; i++) {
      //   let tempArray = this.props.dishesBuy.filter(
      //     dish => dish.TYPE == dishType[i]
      //   );

      //   obj[dishType[i]] = {
      //     items: tempArray
      //   };
      // }
      var retDishes = this.props.dishesBuy;
      var len = retDishes.length;
      const indexOfLastPost = this.state.activePage * this.state.postPerPage;
      const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
      const currentPosts = retDishes.slice(indexOfFirstPost, indexOfLastPost);
      paginate = (
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.postPerPage}
          totalItemsCount={len}
          pageRangeDisplayed
          onChange={this.handlePageChange}
        ></Pagination>
      );

      dishDetails = currentPosts.map(currObj => {
        return (
          <div class="category">
            <h4>{currObj.section_name}</h4>
            {currObj.rest_dish.map(items => {
              return (
                <div class="dish-row flex col-sm-12">
                  <div class="dish-left">
                    <img
                      src={
                        items.dish_image
                          ? items.dish_image
                          : require("./dish_image.jpg")
                      }
                      class="dish-image-container"
                      alt="No Image Available"
                    />
                    <div class="dish-details">
                      <div class="col-sm">{items.dish_name}</div>
                      <div class="col-sm">{items.dish_desc}</div>
                      <div class="col-sm">$ {items.dish_price}</div>
                    </div>
                  </div>
                  <div class="dish-right">
                    <input
                      type="button"
                      class="btn btn-primary"
                      value="Add to Cart"
                      onClick={e => this.handleAddToCart(e, items)}
                      id={"add-" + items._id}
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
        <div class="pagination-showmenu">{paginate}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowMenu);
