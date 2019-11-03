import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { addSections } from "../../actions/orderAction";
import React, { Component } from "react";

function mapStateToProps(store) {
  return {
    errMsg: store.order.errMsg,
    success: store.order.success,
    err: store.order.err,
    result: store.order.result,
    addSecSuccess: store.order.addSecSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSec: data => dispatch(addSections(data))
  };
}

class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = { sectionName: "" };
    this.sectionChangeHandle = this.sectionChangeHandle.bind(this);
  }
  sectionChangeHandle = e => {
    this.setState({
      sectionName: e.target.value
    });
  };
  submitSection = e => {
    e.preventDefault();
    let rest_email = sessionStorage.getItem("email_idRes");
    // let rest_email = "akshit@gmail.com";
    const data = {
      section_name: this.state.sectionName,
      email_id: rest_email
    };
    console.log("test " + JSON.stringify(data));
    this.props.addSec(data);
  };
  render() {
    let dispMsg = "";
    if (this.props.addSecSuccess === true) {
      dispMsg = (
        <div class="text-center">
          <p>Section added successfully</p>
        </div>
      );
    }
    return (
      <div>
        <div class="section-container col-sm-11">
          <form onSubmit={this.submitSection}>
            <h3>Add Section</h3>
            {dispMsg}
            <div class="col-sm-4 input-container">
              <span class="section-name">Section Name:</span>
              <input
                type="text"
                name="section"
                onChange={this.sectionChangeHandle}
                required
              />
            </div>
            <button class="btn btn-primary col-sm-2 add-section" type="submit">
              Add
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
)(AddSection);
