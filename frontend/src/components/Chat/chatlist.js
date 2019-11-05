import React, { Component } from "react";
import axios from "axios";
import { getOwnerChats } from "../../actions/orderAction";
import { connect } from "react-redux";
import "./chat.css";
import Chat from "./chat";
import { Link } from "react-router-dom";
function mapStateToProps(store) {
  return {
    errMsg: store.order.errMsg,
    getChatSuccess: store.order.getchatSuccess,
    success: store.order.success,
    chat: store.order.chat,
    err: store.order.errMsg
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
      chatList: [],
      enableChat: false,
      chatForOrder: {},
      namespace: ""
    };
    this.connectChat = this.connectChat.bind(this);
  }
  connectChat = (chatForOrder, namespace) => {
    console.log("To test" + JSON.stringify(chatForOrder) + "  " + namespace);
    this.setState({
      enableChat: true,
      chatForOrder: chatForOrder,
      namespace: namespace
    });

    console.log(
      "state" + this.state.enableChat + "  " + this.state.chatForOrder
    );
  };
  componentDidMount() {
    let email_id = sessionStorage.getItem("email_idRes");
    // email_id = "test@gmail.com";
    const data = { email_id: email_id };
    this.props.getChats(data);
  }
  render() {
    let chats = "",
      chatWindow = "";
    if (this.props.getChatSuccess === true) {
      console.log("chat" + JSON.stringify(this.props.chat));
      chats = this.props.chat.map(chat => {
        return (
          <div className="chat-contact">
            <div className="owner-name">{chat.owner_name}</div>
            <div className="owner-msg">{chat.messages[0].message}</div>
            <Link
              onClick={() => this.connectChat(chat, chat.namespace)}
              // to={{
              //   pathname: "/Chat",
              //   namespace: chat.namespace
              // }}
            >
              Chat Now
            </Link>
          </div>
        );
      });
    }
    if (this.state.enableChat) {
      let chat = this.state.chatForOrder;
      let namespace = this.state.namespace;
      console.log("chat details: " + JSON.stringify(chat) + "  " + namespace);
      chatWindow = (
        <div>
          <Chat namespace={namespace}></Chat>
        </div>
      );
    }

    return (
      <div className="col-sm-12 container row chat-wrapper">
        {chatWindow}
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
