const express = require("express");
const router = express.Router();

const Message = require("../models/message");
const User = require("../models/user");

const Filter = require("bad-words");
      filter = new Filter();

console.log("Routes loaded.");


router.get("/api/messages", (req, res) => {
    Message.find()
           .then(messages => res.json({status: "success", messages}))
           .catch(err => res.json({status: "error", err}));
});

router.get("/api/online", (req, res) => {
    User.find()
        .then(users => res.json({status: "success", users}))
        .catch(err => res.json({status: "error", err}));
});



router.post("/api/send", (req, res) => {
    const {content, author} = req.body; 

    const message = new Message({
        content: filter.clean(content),
        author: author
    });

    message.save()
           .then(message => res.json({ status: "success", message }))
           .catch(err => res.json({status: "error", err}));
});

router.post("/api/online", (req, res) => {
    const {name} = req.body; 

    const user = new User({
        name: name
});

    user.save()
        .then(user => res.json({ status: "success", user }))
        .catch(err => res.json({status: "error", err}));
});


router.patch("/api/online", (req, res) => {
    const {name} = req.body;

    User.findOneAndUpdate({name : name}, {useTime: Date.now()})
        .then(result => { res.json({status: result !== null ? "success" : "failure"}); })
        .catch(err => res.json({status: "error", err}))
});


router.delete("/api/online", (req, res) => { 
    User.deleteOne({name: req.body.name})
        .then(result => { res.json(`Deleted ${result.deletedCount} item.`); })
        .catch(err => res.json(`Delete failed with error: ${err}`))
});

module.exports = router;