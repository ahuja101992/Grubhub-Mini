import React, { Component } from "react";
import "./ShowDishes.css";
import { rPastOrders, getItems } from "../../actions/orderAction";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import cookie from "react-cookies";
import { Modal, Button } from "react-bootstrap";

function mapStateToProps(store) {
  return {
    success: store.order.success,
    getPastSuccess: store.order.getPastSuccess,
    errMsg: store.order.errMsg,
    currOrds: store.order.currOrds,
    pastOrds: store.order.pastOrds,
    items: store.order.items,
    err: store.order.err,
    getSuccessItems: store.order.getSuccessItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rPastOrders: data => dispatch(rPastOrders(data)),
    getItems: data => dispatch(getItems(data))
  };
}

class ShowRPastOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      reload: 0
    };
    this.getGetails = this.getGetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
  }
  getGetails = e => {
    let getIdArr = e.target.id.split("-");
    let id = getIdArr[1];
    console.log("id obtained is " + id);
    // id = 12;
    const ordData = {
      ORDER_ID: id
    };
    this.props.getItems(ordData);
    this.setState({ show: true });
  };
  closeDetails = e => {
    this.setState({ show: false });
  };
  componentDidMount() {
    const email = sessionStorage.getItem("email_idRes");
    // const email = "ahuja@gmail.com";
    const data = {
      email_id: email
    };
    // console.log("data    " + JSON.stringify(data));
    // this.props.rCurrOrders(data);
    this.props.rPastOrders(data);
  }
  render() {
    // console.log("props" + JSON.stringify(this.props));
    let redirectVar;
    if (!cookie.load("cookieRes")) {
      redirectVar = <Redirect to="/reslogin" />;
    }
    let pastOrders, ordItems;
    if (this.props.getPastSuccess == true) {
      // console.log(JSON.stringify(orders));
      let orders = this.props.pastOrds;
      //   console.log(JSON.stringify(orders));
      pastOrders = orders.map(ord => {
        return (
          <div class="current-list">
            <div class="order-wrapper">
              <div class="order-header">
                <div class="left">
                  <div class="image"></div>
                  <div class="details-container">
                    <div class="order-num">{ord._id}</div>
                    <div class="buyer-name">
                      {"Name : " + ord.user.first_name}
                    </div>
                    <div class="buyer-address">
                      {"Address : " + ord.address}
                    </div>

                    <div class="order-price">
                      {"Price : " + ord.total_price}
                    </div>
                    <div class="order-status">{"Status : " + ord.status}</div>
                  </div>
                </div>
                <div class="right">
                  <div
                    class="btn btn-primary more-details"
                    id={"showItem-" + ord._id}
                    onClick={this.getGetails}
                  >
                    Details
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    if (this.props.getSuccessItems) {
      let items = this.props.items;
      ordItems = items.map(item => {
        return (
          <div class="item-modal-row row">
            <div class="col-sm-4 flex">
              <div>{item.item_name}</div>
            </div>
            <div class="col-sm-4 flex">
              <div>{item.item_price}</div>
            </div>
            <div class="col-sm-4 flex">
              <div>{item.count}</div>
            </div>
          </div>
        );
      });
    } else {
      ordItems = (
        <div>
          <p>No items are present in this order</p>
        </div>
      );
    }
    return (
      <div class="col-sm-11 order-container">
        {/* {redirectVar} */}
        <div class="row">
          <div class="col-sm-3 order-menu">
            <ul>
              <li>Your Previous orders</li>
            </ul>
            <Link value="Your past Orders" to={{ pathname: "/showrorders" }}>
              Back to current orders
            </Link>
          </div>
          <div class="col-sm-9 order-lists">
            <div class="current-container">
              <h4>Past Orders</h4>
              {pastOrders}
            </div>
          </div>
        </div>
        <Modal
          show={this.state.show}
          onHide={this.closeDetails}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Order item details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="col-sm-12">
              <div class="item-modal-row row">
                <div class="col-sm-4 flex">
                  <h5>Items</h5>
                </div>
                <div class="col-sm-4 flex">
                  <h5>Price</h5>
                </div>
                <div class="col-sm-4 flex">
                  <h5>Quantity</h5>
                </div>
              </div>
              {ordItems}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowRPastOrders);
