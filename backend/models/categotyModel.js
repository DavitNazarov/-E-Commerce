import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: "string",
    trim: true,
    required: true,
    maxLength: 32,
    uniqe: true,
  },
});

export default mongoose.model("Category", categorySchema);
