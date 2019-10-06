import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import "./AddDish.css";
import { addDish } from "../../actions/orderAction";

function mapStateToProps(store) {
  return {
    dishSuccess: store.order.dishSuccess,
    success: store.order.success,
    errMsg: store.order.errMsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDish: data => dispatch(addDish(data))
  };
}

class AddDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishName: "",
      dishDesc: "",
      type: "",
      price: "",
      disp: "",
      dishSuccess: "",
      dishAdd: false
    };
    this.nameChange = this.nameChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.addDish = this.addDish.bind(this);
  }
  nameChange = e => {
    this.setState({
      dishName: e.target.value
    });
  };
  descChange = e => {
    this.setState({
      dishDesc: e.target.value
    });
  };
  typeChange = e => {
    this.setState({
      type: e.target.value
    });
  };
  priceChange = e => {
    this.setState({
      price: e.target.value
    });
  };
  addDish = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      dish_name: this.state.dishName,
      dish_desc: this.state.dishDesc,
      type: this.state.type,
      dish_price: this.state.price,
      email_id: sessionStorage.getItem("email_idRes")
    };
    this.props.addDish(data);
    this.setState({ dishAdd: true });
  };

  render() {
    let dispMsg;
    console.log("success 123" + this.props.success);
    // if (this.props.getRest == "true")
    if (this.props.success === "true") {
      dispMsg = (
        <div class="text-center">
          <p>{this.props.errMsg}</p>
        </div>
      );
    }
    if (this.props.success == "true") {
      console.log("test success");
    }

    return (
      <div class="add-dish-wrapper">
        <div class="col-sm-11 add-container">
          <div class="left-container col-sm-4">
            <h6>Photo</h6>
            <div class="image-container"></div>
            <div class="image-description">Image description goes here</div>
          </div>
          <form class="col-sm-5" onSubmit={this.addDish}>
            <p>{this.props.errMsg}</p>
            <div class="right-container">
              <h6>Name</h6>
              <input
                required
                type="text"
                class="form-control"
                placeholder="Dish Name"
                onChange={this.nameChange}
              />
              <h6>Description</h6>
              <input
                required
                type="text"
                class="form-control"
                placeholder="Dish Description"
                onChange={this.descChange}
              />
              <h6>Menu Section</h6>

              <select class="form-control" required onChange={this.typeChange}>
                <option></option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Appetizers">Appetizers</option>
              </select>

              <h6>Price</h6>
              <input
                required
                type="number"
                class="form-control col-sm-3"
                placeholder="Price"
                onChange={this.priceChange}
              />
            </div>
            <button class="col-sm-8 update-btn btn btn-primary" type="submit">
              Add / Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDish);
