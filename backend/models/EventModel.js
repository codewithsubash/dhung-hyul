import mongoose from "mongoose";
import { generateSlug } from "../utils/generateSlug.js";
import { attachmentSchema } from "./schemas/attachmentSchema.js";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    image: attachmentSchema,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },

    registrationStartDate: {
      type: Date,
      required: true,
    },
    registrationEndDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Draft", "Published", "Cancelled", "Completed"],
      default: "Draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.methods.generateEventSlug = async function () {
  const baseSlug = generateSlug(this.title);
  this.slug = `${baseSlug}`;

  this.markModified("slug");
};

const Event = mongoose.model("Event", eventSchema);

export default Event;
