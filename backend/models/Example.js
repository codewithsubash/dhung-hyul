import mongoose from "mongoose";

const ExampleSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Example", ExampleSchema);
