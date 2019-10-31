const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const Chat = require("../models/ChatSchema");
var kafka = require("../kafka/client");

saveMessage = (namespace, message) => {
  let chat = {};
  let chatId = "";
  Chat.findOne({ namespace: namespace })
    .then(chat => {
      if (!chat) {
        let nsSplit = namespace.split("-");
        let user_id = nsSplit[0];
        let owner_id = nsSplit[1];
        const newChat = new Chat({
          user_id: user_id,
          owner_id: owner_id,
          user_name: "test_user",
          owner_name: "test_owner"
        });
        newChat
          .save()
          .then(chat => {
            chatId = newChat._id;
            console.log("new chat created :" + chatId);
          })
          .catch(err => {
            console.log("An error occurred while creating new chat");
          });
      }
      conslole.log("Message is :" + message);
      Chat.updateOne(
        { _id: chatId },
        {
          $push: {
            messages: { message: message }
          }
        }
      );
    })
    .catch(err => {
      console.log("An error occurred");
    });
};
module.exports = router;
