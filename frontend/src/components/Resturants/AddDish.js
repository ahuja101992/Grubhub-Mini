import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import "./AddDish.css";
import axios from "axios";
import { addDish, getSections } from "../../actions/orderAction";

function mapStateToProps(store) {
  return {
    dishSuccess: store.order.dishSuccess,
    success: store.order.success,
    errMsg: store.order.errMsg,
    sections: store.order.sections,
    getSecSuccess: store.order.getSecSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDish: data => dispatch(addDish(data)),
    getSec: data => dispatch(getSections(data))
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
    this.enableAddImage = this.enableAddImage.bind(this);
  }
  componentDidMount() {
    let email_id = sessionStorage.getItem("email_idRes");
    // let email_id = "akshit@gmail.com";
    const data = {
      email_id: email_id
    };
    // console.log("data" + JSON.stringify(data));
    this.props.getSec(data);
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
    console.log(data);
    this.props.addDish(data);
    this.setState({ dishAdd: true });
  };
  enableAddImage() {
    const { dishName, dishDesc } = this.state;
    return dishName.length > 0;
  }
  // onFileChange(files) {
  //   if (files == null || files.length == 0) return;
  //   let file = files[0];

  //   const data = new FormData();
  //   data.append("image", file, file.name);
  //   let dish_name = this.state.dishName;
  //   console.log("dish_name" + dish_name);
  //   let email_id = sessionStorage.getItem("email_idRes");
  //   axios.post(
  //     `http://localhost:3010/image/dishimgupload?dishname=` +
  //       dish_name +
  //       `&email_id=` +
  //       email_id,
  //     data
  //   )
  //   .then(res => {
  //     if (res.status === 200) {
  //       this.setState({ profile_image: res.data.imageUrl });
  //       console.log("success", this.state.profile_image);
  //     }
  //   })
  //   .catch(err => console.error(err));
  // }
  render() {
    let dispMsg, currSections;
    // console.log("success 123" + this.props.success);
    if (this.props.success === true) {
      dispMsg = (
        <div class="text-center">
          <p>Dish Added</p>
        </div>
      );
    }
    if (this.props.getSecSuccess == true) {
      currSections = this.props.sections;
      currSections = currSections.map(section => {
        return (
          <option value={section.section_name}>{section.section_name}</option>
        );
      });
    }

    return (
      <div class="add-dish-wrapper">
        <div class="col-sm-11 add-container">
          <div class="left-container col-sm-4">
            <h6>Photo</h6>
            <div class="image-container text-center">
              Add image after ading dish
            </div>
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
                {currSections}
              </select>

              <h6>Price</h6>
              <input
                pattern="[/^\d*\.?\d*$/]{1,5}"
                type="text"
                class="form-control col-sm-3"
                placeholder="Price"
                onChange={this.priceChange}
                required
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
