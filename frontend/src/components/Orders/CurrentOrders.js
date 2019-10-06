import React, { Component } from "react";
import "./BuyerOrders.css";
import { bCurrOrders, getItems } from "../../actions/orderAction";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { Modal, Button } from "react-bootstrap";
function mapStateToProps(store) {
  return {
    errMsg: store.order.errMsg,
    getBCurrSuccess: store.order.getBCurrSuccess,
    success: store.order.success,
    err: store.order.err,
    bcurrOrds: store.order.bcurrOrds,
    items: store.order.items,
    getSuccessItems: store.order.getSuccessItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // rPastOrders: data => dispatch(rPastOrders(data)),
    bCurrOrd: data => dispatch(bCurrOrders(data)),
    getItems: data => dispatch(getItems(data))
  };
}

class CurrentOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.getGetails = this.getGetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
  }
  getGetails = e => {
    let getIdArr = e.target.id.split("-");
    let id = parseInt(getIdArr[1]);
    console.log("id obtained is " + id);
    // id = 12;
    const ordData = {
      ORDER_ID: id
    };
    console.log(ordData);
    this.props.getItems(ordData);
    this.setState({ show: true });
  };
  closeDetails = e => {
    this.setState({ show: false });
  };
  componentDidMount() {
    const email = sessionStorage.getItem("email_id");
    // const email = "namanagrawal@gmail.com";
    const data = {
      email_id: email
    };
    console.log("data    " + JSON.stringify(data));
    this.props.bCurrOrd(data);
    // this.props.rPastOrders(data);
  }
  render() {
    let currOrders, ordItems;
    console.log("getBCurrSuccess " + this.props.getBCurrSuccess);
    if (this.props.getBCurrSuccess === "true") {
      let orders = this.props.bcurrOrds;

      currOrders = orders.map(ord => {
        return (
          <div class="current-list">
            <div class="order-wrapper">
              <div class="order-header">
                <div class="left">
                  <div class="image"></div>
                  <div class="details-container">
                    <div class="rest-name">
                      Restaurant : {ord.resturant_name}
                    </div>
                    <div class="order-num">Order Num : {ord.ORDER_NUM}</div>
                    <div class="order-status">Status : {ord.STATUS}</div>
                    <div class="order-total">
                      Order Total: {ord.TOTAL_PRICE}
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div
                    class="btn btn-primary more-details"
                    id={"showItem-" + ord.ORDER_ID}
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
              <div>{item.DISH_NAME}</div>
            </div>
            <div class="col-sm-4 flex">
              <div>{item.PRICE}</div>
            </div>
            <div class="col-sm-4 flex">
              <div>{item.QUANTITY}</div>
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
        <div class="row">
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
)(CurrentOrders);
