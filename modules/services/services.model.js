const { Schema, model, default: mongoose } = require("mongoose");

const servicesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
    review: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
    },
    images: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Service", servicesSchema);
