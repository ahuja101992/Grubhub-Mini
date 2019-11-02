const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const Chat = require("../models/ChatSchema");
var kafka = require("../kafka/client");

saveMessage = (namespace, message) => {
  console.log("Test success" + namespace + " " + message);
  let chat = {};
  let chatId = null;
  Chat.findOne({ namespace: namespace })
    .then(chat => {
      if (!chat) {
        let nsSplit = namespace.split("-");
        let user_email = nsSplit[0];
        let owner_email = nsSplit[1];
        const newChat = new Chat({
          namespace: namespace,
          user_email: user_email,
          owner_email: owner_email,
          user_name: "test name",
          owner_name: "test name "
        });
        newChat
          .save()
          .then(chat => {
            chatId = newChat._id;
            console.log("new chat created :" + chatId);
          })
          .catch(err => {
            console.log("An error occurred while creating new chat" + err);
          });
      } else {
        chatId = chat._id;
      }
      console.log("Message is :" + message);
      Chat.findOneAndUpdate(
        { _id: chatId },
        {
          $push: {
            messages: message
          }
        }
      )
        .then(msg => {
          console.log("Inserted" + msg);
        })
        .catch(err => {
          console.log("err" + err);
        });
    })

    .catch(err => {
      console.log("An error occurred" + err);
    });
};

module.exports = { saveMessage: saveMessage };
