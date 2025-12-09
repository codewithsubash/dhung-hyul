import asyncHandler from "express-async-handler";
import { sendEmail, sendWelcomeEmail } from "../email/sendMail.js";
import Blog from "../models/BlogModel.js";
import Event from "../models/EventModel.js";
import mongoose from "mongoose";
import EventRegistration from "../models/EventRegistrationModel.js";
import User from "../models/UserModel.js";
import { randomString } from "../utils/randomString.js";

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
    limit = 10,
    page = 1,
    search = "",
    sortBy = "createdAt",
    sortDirection = -1,
    category = "",
  } = req.query;

  const matchQuery = {
    title: { $regex: new RegExp(search, "i") },
    status: { $nin: ["Cancelled", "Draft"] },
  };

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

export const createEventRegistrationAndUser = asyncHandler(async (req, res) => {
  const { name, email, phone, event } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let existingUser = await User.findOne({ email }).session(session);
    let user;

    // If user does not exist → create new user
    if (!existingUser) {
      let _newUserPassword = randomString(8);

      const [createdUser] = await User.create(
        [
          {
            name,
            email,
            password: _newUserPassword,
            phone,
            role: "Member",
          },
        ],
        { session }
      );

      user = createdUser;

      const hostName = `${req.protocol}://${req.headers.host}`;

      await sendWelcomeEmail({
        user,
        hostName,
      });
    } else {
      user = existingUser;
    }

    // 🔍 Check if user is already registered in this event
    const alreadyRegistered = await EventRegistration.findOne({
      event,
      user: user._id,
    }).session(session);

    if (alreadyRegistered) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "User already registered in this event",
      });
    }

    // Create new event registration
    const [eventRegistration] = await EventRegistration.create(
      [
        {
          event,
          user: user._id,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      data: eventRegistration,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});
