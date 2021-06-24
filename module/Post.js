const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const PostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
  number: {
    type: Number,
    unique: true,
  },
  location : {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  reason: {
    type: String,
  },
  spent: {
    type: Number,
    default: 0.0,
  },
  total: {
    type: Number,
  },
  end: {
    type: Date,
  },
  cost: [
    {
      activity: {
        type: String,
      },
      amount: {
        type: Number,
      },
    },
  ],
  finnance: [
    {
      activity: {
        type: String,
      },
      amount: {
        type: Number,
      },
    },
  ],
  schedule: [
    {
      activity: {
        type: String,
      },
      amount: {
        type: Date,
      },
    },
  ],
  other: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});
PostSchema.plugin(AutoIncrement, { inc_field: "number" });
module.exports = Post = mongoose.model("post", PostSchema);
