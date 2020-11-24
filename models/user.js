const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    useTime: {
        type: Date,
        expires: 30,
        default: Date.now
    }

});

module.exports = mongoose.model("User", userSchema);