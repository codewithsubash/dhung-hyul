import mongoose from "mongoose";

const listSchema = mongoose.Schema(
  {
    type: { type: String }, // Static Option types

    name: { type: String }, // label/value of the list option
    status: { type: String, default: "Active" },

    serialNumber: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

export default List;
