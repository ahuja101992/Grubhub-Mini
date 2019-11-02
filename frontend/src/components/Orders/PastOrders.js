import React, { Component } from "react";
import "./BuyerOrders.css";
import { bPastOrders, getItems } from "../../actions/orderAction";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { Modal, Button } from "react-bootstrap";
function mapStateToProps(store) {
  return {
    errMsg: store.order.errMsg,
    getBPastSuccess: store.order.getBPastSuccess,
    success: store.order.success,
    err: store.order.err,
    bpastOrds: store.order.bpastOrds,
    items: store.order.items,
    getSuccessItems: store.order.getSuccessItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // rPastOrders: data => dispatch(rPastOrders(data)),
    bPastOrd: data => dispatch(bPastOrders(data)),
    getItems: data => dispatch(getItems(data))
  };
}

class PastOrders extends Component {
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
    let id = getIdArr[1];
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
    this.props.bPastOrd(data);
    // this.props.rPastOrders(data);
  }
  render() {
    let pastOrders, ordItems;
    // console.log("getBPastSuccess " + this.props.getBPastSuccess);
    if (this.props.getBPastSuccess === true) {
      let orders = this.props.bpastOrds;

      pastOrders = orders.map(ord => {
        return (
          <div class="current-list">
            <div class="order-wrapper">
              <div class="order-header">
                <div class="left">
                  <div class="image"></div>
                  <div class="details-container">
                    <div class="rest-name">
                      Restaurant : {ord.restaurant_name}
                    </div>
                    <div class="order-num">Order Num : {ord._id}</div>
                    <div class="order-status">Status : {ord.status}</div>
                    <div class="order-total">
                      Order Total: {ord.total_price}
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
        <div class="row">
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
)(PastOrders);
