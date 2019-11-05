import React, { Component } from "react";
import "./BuyerOrders.css";
import { bCurrOrders, getItems } from "../../actions/orderAction";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import cookie from "react-cookies";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import connectionUrl from "../../config/config";
import Chat from "../Chat/chat";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
/////// code for draggable cards
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class CurrentOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      items: null,
      getBCurrSuccess: false,
      enableChat: false,
      orderToChat: {},
      chatOwnerEmail: ""
    };
    this.getGetails = this.getGetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.connectChat = this.connectChat.bind(this);
  }
  connectChat = (ord, rest_email_id) => {
    this.setState({
      enableChat: true,
      orderToChat: ord,
      chatOwnerEmail: rest_email_id
    });
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items: items
    });
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
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://" + connectionUrl + "/orders/getcurrorders/" + data.email_id,
        {
          headers: headers
        }
      )
      .then(response => {
        console.log("testing res" + JSON.stringify(response));
        this.setState({
          items: response.data.result.response.result,
          getBCurrSuccess: response.data.result.response.getSuccess
        });
      });
    console.log(this.state.items);

    // this.props.bCurrOrd(data);
    // this.props.bCurrOrd(data).then(() => {
    //   this.setState({
    //     items: this.props.bcurrOrds
    //   });
    // });
  }
  render() {
    let currOrders, ordItems, draggable, chatWindow;
    // console.log("getBCurrSuccess " + JSON.stringify(this.props.bcurrOrds));
    // if (this.props.getBCurrSuccess === true) {
    if (this.state.getBCurrSuccess === true) {
      let orders = this.props.bcurrOrds;

      // currOrders = orders.map(ord => {
      //   return (
      //     <div></div>
      //   );
      // });
      draggable = (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((ord, index) => (
                  <Draggable key={ord._id} draggableId={ord._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style
                        // )}
                      >
                        <div class="current-list">
                          <div class="order-wrapper">
                            <div class="order-header">
                              <div class="left">
                                <div class="image"></div>
                                <div class="details-container">
                                  <div class="rest-name">
                                    Restaurant : {ord.restuarant_name}
                                  </div>
                                  <div class="order-num">
                                    Order Num : {ord._id}
                                  </div>
                                  <div class="order-status">
                                    Status : {ord.status}
                                  </div>
                                  <div class="order-total">
                                    Order Total: {ord.total_price}
                                  </div>
                                </div>
                                <Link
                                  // to={{
                                  //   pathname: "/Chat",
                                  //   owner_email: ord.rest_email_id
                                  // }}
                                  onClick={() =>
                                    this.connectChat(ord, ord.rest_email_id)
                                  }
                                >
                                  Chat Now
                                </Link>
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
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    }
    if (this.props.getSuccessItems) {
      let items = this.props.items;
      // console.log(JSON.stringify(items));
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
    if (this.state.enableChat) {
      let ord = this.state.orderToChat;
      let owner_email = this.state.chatOwnerEmail;
      console.log("order details: " + JSON.stringify(ord) + "  " + owner_email);
      chatWindow = (
        <div>
          <Chat owner_email={owner_email}></Chat>
        </div>
      );
    }

    return (
      <div class="col-sm-11 order-container">
        {chatWindow}
        <div class="row">
          <div class="col-sm-9 order-lists">
            <div class="current-container">
              <h4>Current Orders</h4>
              {draggable}
              {/* {currOrders} */}
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
