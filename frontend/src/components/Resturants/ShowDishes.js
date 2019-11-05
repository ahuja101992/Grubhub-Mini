import React, { Component, useState } from "react";
import "./ShowDishes.css";
import { getDishes, deleteDish, updateDishes } from "../../actions/orderAction";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import connectionUrl from "../../config/config";
// or less ideally
// import { Button } from "react-bootstrap";

function mapStateToProps(store) {
  return {
    success: store.order.success,
    getDishSuccess: store.order.getDishSuccess,
    errMsg: store.order.errMsg,
    dishes: store.order.dishes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDish: data => dispatch(getDishes(data)),
    deleteDish: data => dispatch(deleteDish(data)),
    updateDishes: data => dispatch(updateDishes(data))
  };
}

class ShowDishes extends Component {
  constructor(props) {
    super(props);
    this.editDish = this.editDish.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.submitDelete = this.submitDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.nameChange = this.nameChange.bind(this);

    // this.cancelDelete = this.cancelDelete.bind(this);
    // this.cancelDelete = this.cancelDelete.bind(this);
    // this.cancelDelete = this.cancelDelete.bind(this);

    this.state = {
      dishes: [],
      show: false,
      showDelete: false,
      currDish_id: null,
      currDish_Name: null,
      CurrDish_price: null,
      currDish_DESC: null,
      currSection_name: null,
      currDish_image: require("./profilepic.png"),
      dish_image: "",
      delId: null
    };
  }
  nameChange = e => {
    this.setState({
      currDish_Name: e.target.value
    });
  };
  descChange = e => {
    this.setState({
      currDish_DESC: e.target.value
    });
  };
  typeChange = e => {
    this.setState({
      type: e.target.value
    });
  };
  priceChange = e => {
    this.setState({
      CurrDish_price: e.target.value
    });
  };

  submitEdit = e => {
    const data = {
      email_id: sessionStorage.getItem("email_idRes"),
      dish_id: this.state.currDish_id,
      dish_name: this.state.currDish_Name,
      dish_desc: this.state.currDish_DESC,
      dish_price: this.state.CurrDish_price,
      section_name: this.state.currSection_name
    };
    console.log("submit data to update :" + data);
    this.setState({ show: false });
    this.props.updateDishes(data);
  };
  cancelEdit = e => {
    this.setState({ show: false });
  };
  confirmDelete = e => {
    let getIdArr = e.target.id.split("-");
    let id = getIdArr[1];

    this.setState({ showDelete: true, delId: id });
  };
  submitDelete = e => {
    console.log("id obtained is " + this.state.delId);

    const data = {
      email_id: sessionStorage.getItem("email_idRes"),
      dish_id: this.state.delId
    };
    console.log(data);
    this.setState({ showDelete: false, delId: null });
    this.props.deleteDish(data);
  };
  cancelDelete = e => {
    this.setState({ showDelete: false });
  };
  editDish = e => {
    e.preventDefault();
    // console.log("inside" + e.target.id);
    this.setState({ show: true });
    let getIdArr = e.target.id.split("-");
    let id = getIdArr[1];
    console.log("id obtained is " + id);
    let retDishes = this.props.dishes;
    let dishes1 = retDishes.map(section => {
      let dish = section.rest_dish.map(dish => {
        if (dish._id === id) {
          // console.log("test section name  :" + section.section_name);
          this.setState({
            email_id: sessionStorage.getItem("email_idRes"),
            currDish_Name: dish.dish_name,
            currDish_DESC: dish.dish_desc,
            currDish_id: dish._id,
            CurrDish_price: dish.dish_price,
            currDish_image: dish.dish_image,
            currSection_name: section.section_name
          });
        }
        console.log("dishes" + JSON.stringify(dish));
      });
    });
  };
  onFileChange(files) {
    if (files == null || files.length == 0) return;
    let file = files[0];
    const data = new FormData();
    data.append("image", file, file.name);
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    let dish_name = this.state.currDish_Name;
    console.log(
      "dish_name" + dish_name + "section Name" + this.state.currSection_name
    );
    let email_id = sessionStorage.getItem("email_idRes");
    axios
      .post(
        "http://" +
          connectionUrl +
          "/image/dishimgupload?dish_id=" +
          this.state.currDish_id +
          `&email_id=` +
          email_id +
          `&section_name=` +
          this.state.currSection_name,
        data,
        { headers: headers }
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({ dish_image: res.data.imageUrl.imageUrl });
          console.log("success", this.state.dish_image);
        }
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    // console.log("cmponent mount");
    const email = sessionStorage.getItem("email_idRes");
    // const email = "ahuja@gmail.com";
    const data = {
      email_id: email
    };
    // console.log("data    " + JSON.stringify(data));
    this.props.getDish(data);
  }

  render() {
    let dishDetails = null;
    let obj = {};

    if (this.props.getDishSuccess === true) {
      /*let distType = [...new Set(this.props.dishes.map(x => x.TYPE))];
      for (let i = 0; i < distType.length; i++) {
        let tempArray = this.props.dishes.filter(
          dish => dish.TYPE == distType[i]
        );

        obj[distType[i]] = {
          items: tempArray
        };
      }*/
      obj = this.props.dishes;
      // console.log("response data :" + JSON.stringify(obj));
      dishDetails = obj.map(currObj => {
        return (
          <div>
            <h4>{currObj.section_name}</h4>
            {currObj.rest_dish.map(items => {
              return (
                <div class="dish-row row">
                  <div class="col-sm">
                    <img
                      src={items.dish_image}
                      class="rounded dish-image"
                      alt="avatar"
                    />
                  </div>
                  <div class="col-sm">{items.dish_name}</div>
                  <div class="col-sm">{items.dish_price}</div>
                  <div class="col-sm">
                    <div
                      class="btn btn-primary"
                      name="edit_btn"
                      id={"edit-" + items._id}
                      onClick={this.editDish}
                    >
                      Edit
                    </div>
                  </div>
                  <div class="col-sm">
                    <div
                      class="btn btn-danger"
                      name="edit_btn"
                      id={"delete-" + items._id}
                      onClick={this.confirmDelete}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
    }
    return (
      <div>
        <div class="dish-container col-sm-10">
          <div class="col-sm-8 list-container">
            <div class="dish-section">
              <div class="header-row row">
                <div class="col-sm">Dish</div>
                <div class="col-sm">Price</div>
                <div class="col-sm">Edit</div>
                <div class="col-sm">Delete</div>
              </div>
              {dishDetails}
            </div>
          </div>
        </div>

        <Modal
          show={this.state.show}
          onHide={this.cancelEdit}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Dish Edit form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="col-sm-12">
              <div class="modal-row">
                <label>Name</label>
                <input
                  value={this.state.currDish_Name}
                  onChange={this.nameChange}
                ></input>
              </div>

              <div class="modal-row">
                <label>Description</label>
                <input
                  value={this.state.currDish_DESC}
                  onChange={this.descChange}
                ></input>
              </div>

              <div class="modal-row">
                <label>Price</label>
                <input
                  value={this.state.CurrDish_price}
                  onChange={this.priceChange}
                ></input>
              </div>

              <div class="modal-row">
                <label>Photo:</label>
                <img
                  src={
                    this.state.dish_image
                      ? this.state.dish_image
                      : this.state.currDish_image
                  }
                  class="rounded dish-image"
                  alt="avatar"
                />

                <input
                  className="btn btn-default"
                  type="file"
                  accept="image/*"
                  onChange={e => this.onFileChange(e.target.files)}
                  class="form-control"
                />
              </div>

              <div class="modal-row"></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cancelEdit}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.submitEdit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showDelete}
          onHide={this.cancelDelete}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the dish?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cancelDelete}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.submitDelete}>
              Delete
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
)(ShowDishes);
