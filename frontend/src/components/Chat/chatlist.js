import React, { Component } from "react";
import axios from "axios";
import { getOwnerChats } from "../../actions/orderAction";
import { connect } from "react-redux";
import "./chat.css";
import { Link } from "react-router-dom";
function mapStateToProps(store) {
  return {
    errMsg: store.order.errMsg,
    getChatSuccess: store.order.getchatSuccess,
    success: store.order.success,
    chat: store.order.chat,
    err: store.order.err
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getChats: data => dispatch(getOwnerChats(data))
  };
}
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: []
    };
  }
  componentDidMount() {
    let email_id = sessionStorage.getItem("res_emailid");
    email_id = "test@gmail.com";
    const data = { email_id: email_id };
    this.props.getChats(data);
  }
  render() {
    let chats = "";
    if (this.props.getChatSuccess === true) {
      console.log("chat" + JSON.stringify(this.props.chat));
      chats = this.props.chat.map(chat => {
        return (
          <div className="chat-contact">
            <div className="owner-name">{chat.owner_name}</div>
            <div className="owner-msg">{chat.messages[0].message}</div>
            <Link
              to={{
                pathname: "/Chat",
                namespace: chat.namespace
              }}
            >
              Chat Now
            </Link>
          </div>
        );
      });
    }

    return (
      <div className="col-sm-12 container row chat-wrapper">
        <div className="col-sm-4 name-container">{chats}</div>
        <div className="col-sm-8"></div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
