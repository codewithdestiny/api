import mongoose from "mongoose";

const waitListSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please add a valid email, got {VALUE}",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.WaitList ||
  mongoose.model("WaitList", waitListSchema);
