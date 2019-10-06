import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import "./AddDish.css";
import { getCurrentDish } from "../../actions/orderAction";

function mapStateToProps(store) {
  return {
    success: store.order.success,
    getSuccess: store.order.getSuccess,
    errMsg: store.order.errMsg,
    dishDetails: store.order.dishDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrDish: data => dispatch(getCurrentDish(data))
  };
}

class UpdateDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishName: "",
      dishDesc: "",
      type: "",
      price: "",

      dishAdd: false
    };
    this.nameChange = this.nameChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.priceChange = this.priceChange.bind(this);
  }
  componentDidMount() {
    // console.log("cmponent mount");
    // const email = localStorage.getItem("email_idRes");
    const data = {
      dish_id: 14
    };
    // console.log("data    " + JSON.stringify(data));
    this.props.getCurrDish(data);
  }
  nameChange = e => {
    console.log("jjjjjjjj");
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

  render() {
    // console.log(JSON.stringify(this.props.dishDetails));
    let dish_name = null,
      dish_desc = null,
      dish_price = null,
      dish_type = null;
    if (this.props.success === "true") {
      console.log("test");
      // this.setState({
      //   dishName: this.props.dishDetails.DISH_NAME,
      //   dishDesc: this.props.dishDetails.DISH_DESC,
      //   type: this.props.dishDetails.DISH_PRICE,
      //   price: this.props.dishDetails.TYPE
      // });
      // dish_name = this.props.dishDetails.DISH_NAME;
      // dish_desc = this.props.dishDetails.DISH_DESC;
      // dish_price = this.props.dishDetails.DISH_PRICE;
      // dish_type = this.props.dishDetails.TYPE;
    }
    // let a = this.props.dishDetails;
    // console.log(a.DISH_NAME);
    return (
      <div class="add-dish-wrapper">
        <div class="text-center">
          <h5>Update Form</h5>
        </div>
        <div class="col-sm-11 add-container">
          <div class="left-container col-sm-4">
            <h6>Photo</h6>
            <div class="image-container"></div>
            <div class="image-description">Image description goes here</div>
          </div>
          <form class="col-sm-5">
            <p>{this.props.errMsg}</p>
            <div class="right-container">
              <h6>Name</h6>
              <input
                required
                value={this.state.dishName}
                type="text"
                class="form-control"
                placeholder="Dish Name"
                onChange={this.nameChange}
              />
              <h6>Description</h6>
              <input
                required
                value={dish_desc}
                type="text"
                class="form-control"
                placeholder="Dish Description"
                onChange={this.descChange}
              />
              <h6>Menu Section</h6>

              <select
                class="form-control"
                value={dish_type}
                required
                onChange={this.typeChange}
              >
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
                value={dish_price}
                onChange={this.priceChange}
              />
            </div>
            <button class="col-sm-8 update-btn btn btn-primary" type="submit">
              Update
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
)(UpdateDish);
