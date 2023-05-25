const { Schema, model, default: mongoose } = require("mongoose");

const toDoSchema = new Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("ToDo", toDoSchema);
