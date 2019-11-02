import React, { Component } from "react";
import io from "socket.io-client";
import cookie from "react-cookies";
import { Launcher } from "react-chat-window";
import axios from "axios";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      ns: "",
      user_id: "",
      owner_id: "",
      messageList: []
    };
  }
  _onMessageWasSent(message) {
    console.log("here message " + JSON.stringify(message));
    if (message.data.text.length > 0) {
      console.log("ns id :" + this.state.ns);
      let msg = {
        message: message.data.text,
        sender: "test"
        // sender: sessionStorage.getItem("res-name")
      };
      console.log(msg + " " + JSON.stringify(msg));
      this.state.socket.emit(this.state.ns, JSON.stringify(msg));
      // let msg = message.data.text;
      // this.state.socket.on(this.state.ns, msg => {
      //   console.log("message " + msg);
      //   msg = JSON.parse(msg);
      //   this.state.messageList.push(msg);
      //   this.setState({
      //     messageList: this.state.messageList
      //   });
      // });
      // this.state.socket.on(this.state.ns, message => {
      //   this.state.messageList.push(message);
      //   this.setState({
      //     messageList: this.state.messageList
      //   });
      // });
      // socket.emit("ns_id", "123");
      // this.setState({
      //   messageList: [
      //     ...this.state.messageList,
      //     {
      //       author: "them",
      //       type: "text",
      //       data: msg
      //     }
      //   ]
      // });
    }
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text }
          }
        ]
      });
    }
  }
  componentDidMount() {
    let ns_id, owner_id, user_id;
    let propsLoc = this.props.location;
    const socket = io("http://localhost:3011");
    let first_name = sessionStorage.getItem("first_name");
    first_name = "test";
    let ns = "";
    /// to be deleted
    owner_id = "test@gmail.com";
    user_id = "chets@gmil.com";
    ns_id = user_id + "-" + owner_id;
    console.log("props value" + propsLoc.data);
    if (cookie.load("cookieBuy")) {
      if (propsLoc === undefined)
        owner_id = sessionStorage.getItem("owner_email");
      else owner_id = propsLoc.owner_email;
      sessionStorage.setItem("owner_email", owner_id);
      user_id = sessionStorage.getItem("email_id");
      owner_id = "test@gmail.com";
      user_id = "chets@gmil.com";
      ns_id = user_id + "-" + owner_id;
      // ns_id = ns;
    } else if (cookie.load("cookieRes")) {
      if (propsLoc === undefined) {
        ns = sessionStorage.getItem("namespace");
      } else {
        ns_id = propsLoc.namespace;
      }
    }
    sessionStorage.setItem("namespace", ns_id);
    this.setState(
      {
        socket: socket,
        user_id: user_id,
        owner_id: owner_id,
        ns: ns_id
      },
      () => {
        socket.emit("ns_id", this.state.ns);
        const messageList = this.state.messageList;
        socket.on(this.state.ns, msg => {
          console.log("message in component didmount" + msg);
          msg = JSON.parse(msg);
          // console.log("message after parse " + msg);
          messageList.push({
            author: "them",
            type: "text",
            data: { text: msg.message }
          });
          this.setState({
            messageList: messageList
          });
          // this.setState({
          //   messageList: [
          //     ...this.state.messageList,
          //     {
          //       author: "them",
          //       type: "text",
          //       data: { text: msg.msg }
          //     }
          //   ]
          // });
        });
      }
    );
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    console.log("ns_id=" + ns_id);
    axios
      .get("http://localhost:3010/chats/getchatdetails/" + ns_id)
      .then(response => {
        // console.log("map data " + JSON.stringify(response.data.chat));

        this.setState({
          messageList: response.data.chat.map(msg => ({
            author: msg.sender === first_name ? "me" : "then",
            type: "text",
            data: { text: msg.message }
          }))
        });
      })
      .catch(err => {
        console.log("Error getting data." + err);
      });
  }
  render() {
    return (
      <div>
        <p>test</p>
        <Launcher
          agentProfile={{
            teamName: "owner-buyerChatWindow",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji={false}
        />
      </div>
    );
  }
}

export default Chat;
