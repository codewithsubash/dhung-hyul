import asyncHandler from "express-async-handler";
import Blog from "../models/BlogModel.js";
import { generateSlug } from "../utils/generateSlug.js";

export const createBlog = asyncHandler(async (req, res) => {
  const {
    image,
    title,
    content,
    author,
    isActive,
    isFeatured,
    category,
    tags,
  } = req.body;

  const blog = new Blog({
    image,
    title,
    content,
    author,
    isActive,
    isFeatured,
    category,
    createdBy: req.user._id,
    tags,
  });

  await blog.generateBlogSlug();
  await blog.save();

  if (!blog) throw new Error("Something went Wrong");

  res.status(201).json(blog);
});

export const listBlog = asyncHandler(async (req, res) => {
  const {
    active = "true",
    limit = 10,
    page = 1,
    search = "",
    sortBy = "createdAt",
    sortDirection = -1,
  } = req.query;

  const blogs = await Blog.aggregate([
    {
      $match: {
        title: { $regex: new RegExp(search, "i") },
        isActive: active === "true",
      },
    },
    {
      $facet: {
        data: [
          { $sort: { [sortBy]: parseInt(sortDirection) } },
          { $skip: (parseInt(page) - 1) * parseInt(limit) },
          { $limit: parseInt(limit) },
        ],
        count: [{ $count: "total" }],
      },
    },
  ]);

  const populateBlogs = await Blog.populate(blogs[0].data, [
    { path: "category", select: "name" },
    { path: "createdBy", select: "name" },
  ]);

  res.status(200).json({
    data: populateBlogs,
    totalItems: blogs[0]?.count[0]?.total ?? 0,
  });
});

export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) throw new Error("Blog Not Found");

  res.status(200).json(blog);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const {
    image,
    title,
    content,
    author,
    isActive,
    isFeatured,
    category,
    tags,
  } = req.body;

  const existingBlog = await Blog.findById(req.params.id);
  if (!existingBlog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const updateData = {
    image,
    title,
    content,
    author,
    isActive,
    isFeatured,
    category,
    tags,
  };

  if (title && title !== existingBlog.title) {
    const baseSlug = generateSlug(title);
    updateData.slug = `${baseSlug}`;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  res.status(200).json(updatedBlog);
});
