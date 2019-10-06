import React, { Component, useState } from "react";
import "./ShowDishes.css";
import { getDishes, deleteDish, updateDishes } from "../../actions/orderAction";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

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
    this.setState({ show: false });
    const data = {
      dish_id: this.state.currDish_id,
      dish_name: this.state.currDish_Name,
      dish_desc: this.state.currDish_DESC,
      dish_price: this.state.CurrDish_price
    };
    console.log("submit data to update :" + data);
    this.props.updateDishes(data);
  };
  cancelEdit = e => {
    this.setState({ show: false });
  };
  confirmDelete = e => {
    let getIdArr = e.target.id.split("-");
    let id = parseInt(getIdArr[1]);

    this.setState({ showDelete: true, delId: id });
  };
  submitDelete = e => {
    console.log("id obtained is " + this.state.delId);

    const data = {
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
    let id = parseInt(getIdArr[1]);
    console.log("id obtained is " + id);
    let rec = this.props.dishes.filter(dish => dish.DISH_ID == id);
    console.log(JSON.stringify(rec));
    this.setState({
      currDish_Name: rec[0].DISH_NAME,
      currDish_DESC: rec[0].DISH_DESC,
      currDish_id: rec[0].DISH_ID,
      CurrDish_price: rec[0].DISH_PRICE
    });
  };
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
    // console.log("response data :" + JSON.stringify(this.props.dishes));
    if (this.props.getDishSuccess === "true") {
      let distType = [...new Set(this.props.dishes.map(x => x.TYPE))];
      for (let i = 0; i < distType.length; i++) {
        let tempArray = this.props.dishes.filter(
          dish => dish.TYPE == distType[i]
        );

        obj[distType[i]] = {
          items: tempArray
        };
      }
      dishDetails = Object.keys(obj).map(currObj => {
        return (
          <div>
            <h4>{currObj}</h4>
            {obj[currObj].items.map(items => {
              return (
                <div class="dish-row row">
                  <div class="col-sm">{items.DISH_NAME}</div>
                  <div class="col-sm">{items.DISH_PRICE}</div>
                  <div class="col-sm">
                    <div
                      class="btn btn-primary"
                      name="edit_btn"
                      id={"edit-" + items.DISH_ID}
                      onClick={this.editDish}
                    >
                      Edit
                    </div>
                  </div>
                  <div class="col-sm">
                    <div
                      class="btn btn-danger"
                      name="edit_btn"
                      id={"delete-" + items.DISH_ID}
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
