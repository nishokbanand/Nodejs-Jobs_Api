const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      maxlength: 15,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "interview", "declined"],
        msg: "please select any one of the options",
      },
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
