const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    subscription: {
      type: Object,
      default: {
        start: "",
        end: "",
      },
    },
    toDos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ToDo",
    },
    interests: {
      type: Array,
      default: [],
    },
    history: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ToDo",
    },
    otp: {
      type: String,
    },
    newUser: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
