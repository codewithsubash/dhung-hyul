import mongoose from "mongoose";
import EventRegistration from "../models/EventRegistrationModel.js";
import asyncHandler from "express-async-handler";

export const createEventRegistration = asyncHandler(async (req, res) => {
  const { user, event } = req.body;

  const alreadyRegistered = await EventRegistration.findOne({
    event,
    user,
  });

  if (alreadyRegistered) {
    return res.status(400).json({
      success: false,
      message: "User already registered in this event",
    });
  }

  const eventRegistration = await EventRegistration.create({
    event,
    user,
  });

  if (!eventRegistration) throw new Error("Something went Wrong");

  res.status(201).json(eventRegistration);
});

export const listEventRegistration = asyncHandler(async (req, res) => {
  const {
    limit = 10,
    page = 1,
    sortBy = "createdAt",
    eventId,
    search,
    sortDirection = -1,
  } = req.query;

  const eventRegistration = await EventRegistration.aggregate([
    {
      $match: {
        event: new mongoose.Types.ObjectId(eventId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $unwind: {
        path: "$userData",
        preserveNullAndEmptyArrays: true,
      },
    },
    ...(search
      ? [
          {
            $match: {
              "userData.name": { $regex: search, $options: "i" },
            },
          },
        ]
      : []),
    {
      $project: {
        userData: 0,
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

  const populateEventRegistration = await EventRegistration.populate(
    eventRegistration[0].data,
    [
      { path: "event", select: "title" },
      { path: "user", select: "name email" },
    ]
  );

  res.status(200).json({
    data: populateEventRegistration,
    totalItems: eventRegistration[0]?.count[0]?.total ?? 0,
  });
});

export const deleteRegisterUser = asyncHandler(async (req, res) => {
  const { eventId, userId } = req.params;

  // Find and delete registration
  const deletedRegistration = await EventRegistration.findOneAndDelete({
    event: eventId,
    user: userId,
  });

  if (!deletedRegistration)
    throw new Error("Registration not found for this user and event");

  res.status(200).json(deletedRegistration);
});
