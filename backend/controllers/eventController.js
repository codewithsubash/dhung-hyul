import asyncHandler from "express-async-handler";
import { generateSlug } from "../utils/generateSlug.js";
import Event from "../models/EventModel.js";

export const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    registrationStartDate,
    registrationEndDate,
    startDate,
    endDate,
    location,
    image,
    description,

    status,
  } = req.body;

  const event = new Event({
    title,
    category,
    registrationStartDate,
    registrationEndDate,
    startDate,
    endDate,
    location,
    image,
    description,

    status,
    createdBy: req.user._id,
  });

  await event.generateEventSlug();
  await event.save();

  if (!event) throw new Error("Something went Wrong");

  res.status(201).json(event);
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

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate("category", "name")
    .populate("createdBy", "name");

  if (!event) throw new Error("Event Not Found");

  res.status(200).json(event);
});

export const getEventBySlug = asyncHandler(async (req, res) => {
  const event = await Event.findOne({ slug: req.params.slug })
    .populate("category", "name")
    .populate("createdBy", "name");

  if (!event) throw new Error("Event Not Found");

  res.status(200).json(event);
});

export const updateEvent = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    registrationStartDate,
    registrationEndDate,
    startDate,
    endDate,
    location,
    image,
    description,

    status,
  } = req.body;

  const existingEvent = await Event.findById(req.params.id);
  if (!existingEvent) {
    res.status(404);
    throw new Error("Event not found");
  }

  const updateData = {
    title,
    category,
    registrationStartDate,
    registrationEndDate,
    startDate,
    endDate,
    location,
    image,
    description,

    status,
  };

  if (title && title !== existingEvent.title) {
    const baseSlug = generateSlug(title);
    updateData.slug = `${baseSlug}`;
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
    }
  ).populate("category", "name");

  res.status(200).json(updatedEvent);
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await Event.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Event deleted successfully" });
});

// Additional helper endpoints

export const getUpcomingEvents = asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  const events = await Event.find({
    status: "Published",
    startDate: { $gte: new Date() },
  })
    .sort({ startDate: 1 })
    .limit(parseInt(limit))
    .populate("category", "name")
    .populate("createdBy", "name");

  res.status(200).json(events);
});

export const getFeaturedEvents = asyncHandler(async (req, res) => {
  const { limit = 3 } = req.query;

  const events = await Event.find({
    status: "Published",
    startDate: { $gte: new Date() },
  })
    .sort({ startDate: 1 })
    .limit(parseInt(limit))
    .populate("category", "name");

  res.status(200).json(events);
});

export const getPastEvents = asyncHandler(async (req, res) => {
  const { limit = 6, page = 1 } = req.query;

  const events = await Event.aggregate([
    {
      $match: {
        status: "Completed",
        endDate: { $lt: new Date() },
      },
    },
    {
      $facet: {
        data: [
          { $sort: { endDate: -1 } },
          { $skip: (parseInt(page) - 1) * parseInt(limit) },
          { $limit: parseInt(limit) },
        ],
        count: [{ $count: "total" }],
      },
    },
  ]);

  const populateEvents = await Event.populate(events[0].data, [
    { path: "category", select: "name" },
  ]);

  res.status(200).json({
    data: populateEvents,
    totalItems: events[0]?.count[0]?.total ?? 0,
  });
});
