import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../models/UserModel.js";
import EventRegistration from "../models/EventRegistrationModel.js";
import Blog from "../models/BlogModel.js";
import Event from "../models/EventModel.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const { timeRange = "30" } = req.query; // days: 7, 30, 90, 365, or 'all'

  // Calculate date range
  const dateFilter =
    timeRange !== "all"
      ? {
          createdAt: {
            $gte: new Date(
              Date.now() - parseInt(timeRange) * 24 * 60 * 60 * 1000
            ),
          },
        }
      : {};

  // Get total counts
  const [
    totalUsers,
    totalEvents,
    totalBlogs,
    totalRegistrations,
    activeUsers,
    publishedEvents,
    activeBlogs,
  ] = await Promise.all([
    User.countDocuments(),
    Event.countDocuments(),
    Blog.countDocuments(),
    EventRegistration.countDocuments(),
    User.countDocuments({ isActive: true }),
    Event.countDocuments({ status: "Published" }),
    Blog.countDocuments({ isActive: true }),
  ]);

  // Get event statistics by status
  const eventsByStatus = await Event.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Get user growth over time (last 12 months)
  const userGrowth = await User.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    { $limit: 12 },
  ]);

  // Get event registrations over time (last 12 months)
  const registrationTrend = await EventRegistration.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    { $limit: 12 },
  ]);

  // Get top events by registration count
  const topEvents = await EventRegistration.aggregate([
    {
      $group: {
        _id: "$event",
        registrationCount: { $sum: 1 },
      },
    },
    { $sort: { registrationCount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "events",
        localField: "_id",
        foreignField: "_id",
        as: "eventDetails",
      },
    },
    { $unwind: "$eventDetails" },
    {
      $project: {
        _id: 1,
        registrationCount: 1,
        title: "$eventDetails.title",
        status: "$eventDetails.status",
        startDate: "$eventDetails.startDate",
      },
    },
  ]);

  // Get recent activities (last 10)
  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name email createdAt");

  const recentEvents = await Event.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title status startDate createdAt")
    .populate("category", "name");

  const recentBlogs = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title author createdAt isActive")
    .populate("category", "name");

  // Get events by category
  const eventsByCategory = await Event.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "lists",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        count: 1,
        name: { $ifNull: ["$categoryDetails.name", "Uncategorized"] },
      },
    },
    { $sort: { count: -1 } },
  ]);

  // Get blogs by category
  const blogsByCategory = await Blog.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "lists",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        count: 1,
        name: { $ifNull: ["$categoryDetails.name", "Uncategorized"] },
      },
    },
    { $sort: { count: -1 } },
  ]);

  // Get user role distribution
  const usersByRole = await User.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);

  // Get upcoming events
  const upcomingEvents = await Event.find({
    startDate: { $gte: new Date() },
    status: "Published",
  })
    .sort({ startDate: 1 })
    .limit(5)
    .select("title startDate location")
    .populate("category", "name");

  res.status(200).json({
    summary: {
      totalUsers,
      totalEvents,
      totalBlogs,
      totalRegistrations,
      activeUsers,
      publishedEvents,
      activeBlogs,
    },
    charts: {
      eventsByStatus,
      userGrowth,
      registrationTrend,
      eventsByCategory,
      blogsByCategory,
      usersByRole,
    },
    topEvents,
    upcomingEvents,
    recentActivity: {
      users: recentUsers,
      events: recentEvents,
      blogs: recentBlogs,
    },
  });
});
