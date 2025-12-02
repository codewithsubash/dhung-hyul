import asyncHandler from "express-async-handler";
import { sendEmail } from "../email/sendMail.js";
import Blog from "../models/BlogModel.js";
import Event from "../models/EventModel.js";
import mongoose from "mongoose";

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

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).populate(
    "category",
    "name"
  );

  if (!blog) throw new Error("Blog Not Found");

  res.status(200).json(blog);
});

export const listEvent = asyncHandler(async (req, res) => {
  const {
    status = "Published",
    limit = 10,
    page = 1,
    search = "",
    sortBy = "createdAt",
    sortDirection = -1,
    category = "",
  } = req.query;

  const matchQuery = {
    title: { $regex: new RegExp(search, "i") },
  };

  // Add status filter if provided
  if (status) {
    matchQuery.status = status;
  }

  // Add category filter if provided
  if (category) {
    matchQuery.category = new mongoose.Types.ObjectId(category);
  }

  const events = await Event.aggregate([
    {
      $match: matchQuery,
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

  const populateEvents = await Event.populate(events[0].data, [
    { path: "category", select: "name" },
    { path: "createdBy", select: "name" },
  ]);

  res.status(200).json({
    data: populateEvents,
    totalItems: events[0]?.count[0]?.total ?? 0,
  });
});

export const getEventBySlug = asyncHandler(async (req, res) => {
  const event = await Event.findOne({ slug: req.params.slug })
    .populate("category", "name")
    .populate("createdBy", "name");

  if (!event) throw new Error("Event Not Found");

  res.status(200).json(event);
});

export const contactFormSubmission = asyncHandler(async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  let messageContent = `
  <p>Name: ${name}</p>
  <p>Phone: ${phone}</p>
  <p>Email: ${email}</p>
 
  <p>Message: </p>
  <p>${message}
  </p>
  `;

  await sendEmail({
    subject,
    toRecipients: ["sales@gatewayx.tech"],
    messageContent,
  });

  res.status(200).json("Message sent!");
});
