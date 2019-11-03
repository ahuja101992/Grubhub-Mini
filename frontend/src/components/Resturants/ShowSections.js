import React, { Component } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { getSections, delSections } from "../../actions/orderAction";

function mapStateToProps(store) {
  return {
    errMsg: store.order.errMsg,
    success: store.order.success,
    err: store.order.err,
    sections: store.order.sections,
    getSecSuccess: store.order.getSecSuccess,
    delSecSuccess: store.order.delSecSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSec: data => dispatch(getSections(data)),
    delSec: data => dispatch(delSections(data))
  };
}

class ShowSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: null,
      secDelMsg: ""
    };
    this.delSection = this.delSection.bind(this);
  }
  delSection = e => {
    let getIdArr = e.target.id.split("-");
    let type = getIdArr[1];
    let data = {
      type: type,
      email_id: sessionStorage.getItem("email_idRes")
    };
    this.props.delSec(data);
    if (this.props.delSecSuccess === "true") {
      this.setState({ secDelMsg: "deleted" });
    }
  };
  componentDidMount() {
    let email_id = sessionStorage.getItem("email_idRes");
    // let email_id = "akshit@gmail.com";
    const data = {
      email_id: email_id
    };
    console.log("data" + JSON.stringify(data));
    this.props.getSec(data);
  }
  render() {
    let currSections,
      delmsg = "";
    if (this.props.delSecSuccess === true) {
      delmsg = (
        <div class="text-center">
          <p>Section Deleted</p>
        </div>
      );
    }
    if (this.props.getSecSuccess === true) {
      currSections = this.props.sections;
      currSections = currSections.map(section => {
        return (
          <div class="section-row row">
            <div class="col-sm-6">Section Title : {section.section_name}</div>
            <div class="col-sm-6">
              <div
                class="btn btn-danger"
                id={"delSec-" + section.section_name}
                onClick={this.delSection}
              >
                Delete
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <div class="section-wrapper col-sm-11">
          <h2>Sections:</h2>
          <h2>{delmsg}</h2>
          <div class="col-sm-6 delete-section-wrapper">{currSections}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowSections);
