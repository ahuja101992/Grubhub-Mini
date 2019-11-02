import React, { Component } from "react";
import { Link } from "react-router-dom";
class Basket extends Component {
  state = {};
  render() {
    const { cartItems } = this.props;
    console.log("to do " + JSON.stringify(this.props));
    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "cart is empty"
        ) : (
          <div>You have {cartItems.length} items in the cart</div>
        )}
        {cartItems.length > 0 && (
          <div>
            <ul>
              {cartItems.map(item => (
                <li>
                  <b>{item.dish_name}</b>X {item.count}={" "}
                  {item.dish_price * item.count}
                  <button
                    className="btn btn-danger"
                    onClick={e => this.props.handleRemoveFromCart(e, item)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            Total: {cartItems.reduce((a, c) => a + c.dish_price * c.count, 0)}
          </div>
        )}
        {cartItems.length > 0 ? (
          <Link className="btn btn-primary" to={{ pathname: "/checkout" }}>
            Proceed to check out
          </Link>
        ) : null}
      </div>
    );
  }
}

export default Basket;
