const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    quadrant: {
      type: Number,
      default: 2, // 1, 2, 3, or 4
    },
    dueDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
