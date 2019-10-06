import React, { Component } from "react";
import "./BuyerOrders.css";
import CurrentOrders from "./CurrentOrders";
import * as Types from "./index";
import {
  rPastOrders,
  rCurrOrders,
  getItems,
  cancelOrder,
  updateStatus
} from "../../actions/orderAction";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { Modal, Button } from "react-bootstrap";
function mapStateToProps(store) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    // rPastOrders: data => dispatch(rPastOrders(data)),
    // rCurrOrders: data => dispatch(rCurrOrders(data)),
  };
}

class BuyerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: ""
    };
    this.selectOrderType = this.selectOrderType.bind(this);
  }

  selectOrderType = e => {
    return (
      <div className="form-group top-margin-small">
        <label className="card-selector-label">Select Type</label>
        <select
          className="card-selector form-control"
          onChange={e => {
            this.setState({ selectedType: e.target.value });
          }}
        >
          <option>CurrentOrders</option>
          <option>PastOrders</option>
        </select>
      </div>
    );
  };
  renderSelectedType(selectedType) {
    console.log("mmmm " + selectedType);
    let Type = Types["CurrentOrders"];
    if (selectedType === "" || selectedType === null) {
      Type = Types["CurrentOrders"];
    } else {
      Type = Types[selectedType];
    }

    return <Type />;
  }

  render() {
    let redirectVar,
      successMsg = "";
    if (!cookie.load("cookieBuy")) {
      redirectVar = <Redirect to="/login" />;
    }
    console.log("mmm" + this.state.selectedType);
    return (
      <div class="col-sm-11 order-container">
        {redirectVar}
        <div class="row">
          <div class="col-sm-3 order-menu">{this.selectOrderType()}</div>
          <div class="col-sm-9 order-lists">
            <div class="current-container">
              {this.renderSelectedType(this.state.selectedType)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerOrders);
