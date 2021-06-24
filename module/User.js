const mongoose = require("mongoose");

const Usershcema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  updates: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      text: { type: String },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
      seen: { type: Boolean, default: false },
      date: { type: Date },
    },
  ],
  role: { type: String },
});

module.exports = User = mongoose.model("user", Usershcema);
