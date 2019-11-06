import React, { Component } from "react";
import "./ShowDishes.css";
import {
  rPastOrders,
  rCurrOrders,
  getItems,
  cancelOrder,
  updateStatus
} from "../../actions/orderAction";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { Modal, Button } from "react-bootstrap";

// or less ideally
// import { Button } from "react-bootstrap";

function mapStateToProps(store) {
  return {
    success: store.order.success,
    getCurrSuccess: store.order.getCurrSuccess,
    errMsg: store.order.errMsg,
    currOrds: store.order.currOrds,
    pastOrds: store.order.pastOrds,
    items: store.order.items,
    err: store.order.err,
    getSuccessItems: store.order.getSuccessItems,
    cancelSuccess: store.order.cancelSuccess,
    cancelRes: store.order.cancelRes,
    updateSuccess: store.order.updateSuccess,
    updateRes: store.order.updateRes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rPastOrders: data => dispatch(rPastOrders(data)),
    rCurrOrders: data => dispatch(rCurrOrders(data)),
    getItems: data => dispatch(getItems(data)),
    cancelOrder: data => dispatch(cancelOrder(data)),
    updateStatus: data => dispatch(updateStatus(data))
  };
}

class ShowRRest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      reload: 0
    };
    this.getGetails = this.getGetails.bind(this);
    this.cancelOr = this.cancelOr.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.ReadyOrd = this.ReadyOrd.bind(this);
    this.prepOrd = this.prepOrd.bind(this);
    this.deliverOrd = this.deliverOrd.bind(this);
  }

  ReadyOrd = e => {
    let getIdArr = e.target.id.split("-");
    let id = getIdArr[1];
    console.log("id obtained is " + id);
    const ordData = {
      order_id: id,
      order_status: "Ready"
    };
    this.props.updateStatus(ordData);
  };
  prepOrd = e => {
    let getIdArr = e.target.id.split("-");
    let id = getIdArr[1];
    console.log("id obtained is " + id);
    const ordData = {
      order_id: id,
      order_status: "Preparing"
    };
    this.props.updateStatus(ordData);
  };
  deliverOrd = e => {
    let getIdArr = e.target.id.split("-");
    let id = getIdArr[1];
    console.log("id obtained is " + id);
    const ordData = {
      order_id: id,
      order_status: "Delivered"
    };
    this.props.updateStatus(ordData);
  };
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
  cancelOr = e => {
    let getIdArr = e.target.id.split("-");
    let id = getIdArr[1];

    // id = 12;
    const ordData = {
      order_id: id,
      order_status: "Cancelled"
    };
    console.log("id obtained is " + JSON.stringify(ordData));

    this.props.cancelOrder(ordData);
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
    console.log("data    " + JSON.stringify(data));
    this.props.rCurrOrders(data);
    // this.props.rPastOrders(data);
  }
  render() {
    let redirectVar;
    if (!cookie.load("cookieRes")) {
      redirectVar = <Redirect to="/reslogin" />;
    }
    let currOrders, ordItems;
    // if (this.props.cancelSuccess == "true") {

    //   console.log("testing");
    //   let rand = Math.random() * 100;
    //   this.setState({ reload: rand });
    //   console.log("kksjj" + this.state.reload);
    // }
    console.log(JSON.stringify(this.props.currOrds));
    if (this.props.getCurrSuccess == true) {
      //
      let orders = this.props.currOrds;
      currOrders = orders.map(ord => {
        console.log(ord);
        let cancelflg = true,
          prep = true,
          ready = true,
          deliver = true;
        if (ord.status == "New") {
          cancelflg = false;
          prep = false;
          ready = true;
          deliver = true;
        } else if (ord.status == "Preparing") {
          cancelflg = false;
          prep = true;
          ready = false;
          deliver = true;
        } else if (ord.status == "Ready") {
          cancelflg = false;
          prep = true;
          ready = true;
          deliver = false;
        }
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
                    <div class="flex button-container">
                      <input
                        type="button"
                        class="btn btn-danger btn-sm"
                        value="Cancel Order"
                        id={"cancelOr-" + ord._id}
                        disabled={cancelflg}
                        onClick={this.cancelOr}
                      />
                      <input
                        type="button"
                        class="btn btn-primary btn-sm"
                        value="Preparing"
                        disabled={prep}
                        id={"statusCh-" + ord._id}
                        onClick={this.prepOrd}
                      />
                      <input
                        type="button"
                        class="btn btn-primary btn-sm"
                        value="Ready"
                        id={"statusCh-" + ord._id}
                        disabled={ready}
                        onClick={this.ReadyOrd}
                      />
                      <input
                        type="button"
                        class="btn btn-primary btn-sm"
                        value="Deliver"
                        disabled={deliver}
                        id={"statusCh-" + ord._id}
                        onClick={this.deliverOrd}
                      />
                    </div>
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
        {redirectVar}
        <div class="row">
          <div class="col-sm-3 order-menu">
            <ul>
              <li>Orders</li>
            </ul>
            <Link
              value="Your past Orders"
              to={{ pathname: "/showrpastorders" }}
            >
              Your Past Orders
            </Link>
          </div>
          <div class="col-sm-9 order-lists">
            <div class="current-container">
              <h4>Current Orders</h4>
              {currOrders}
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
)(ShowRRest);
