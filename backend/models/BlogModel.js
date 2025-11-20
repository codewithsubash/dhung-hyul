import mongoose from "mongoose";
import { attachmentSchema } from "./schemas/attachmentSchema.js";
import { generateSlug } from "../utils/generateSlug.js";

const blogSchema = mongoose.Schema(
  {
    image: attachmentSchema,
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    tags: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

blogSchema.methods.generateBlogSlug = async function () {
  const baseSlug = generateSlug(this.title);
  this.slug = `${baseSlug}`;

  this.markModified("slug");
};

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
