import asyncHandler from "express-async-handler";

import List from "../models/ListModel.js";
import { listOptions } from "../constants/listOptions.js";

//@desc Add new list
//@route POST /api/app/list/add
//@access Private/Account-level Users
export const addList = asyncHandler(async (req, res) => {
  const { type, name, status = "Active", serialNumber } = req.body;

  // check if this option matches with the static list
  // if so, this might break the app functionality
  // so, don't allow matching optin
  if (listOptions.find((o) => o.value === name)) {
    throw new Error(
      "Option name cannot match with one of the predefined parent category name"
    );
  }

  const list = new List({
    type,
    name,
    status,
    serialNumber,
  });

  const savedList = await list.save();

  return res.json(savedList);
});

//@desc Edit list detail
//@route PUT /api/app/list/edit/:type
//@access Private/Account-level Users

export const editList = asyncHandler(async (req, res) => {
  const { name, status, serialNumber } = req.body;
  // REMOVED type from body - don't allow changing the type of an existing item

  const existingList = await List.findById(req.params.id);
  if (!existingList) {
    res.status(404);
    throw new Error("List not found");
  }

  // Only check name conflict if name is being changed
  if (name && name !== existingList.name) {
    if (listOptions.find((o) => o.value === name)) {
      throw new Error(
        "Option name cannot match with one of the predefined parent category name"
      );
    }
  }

  // Build update object with only provided fields
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (status !== undefined) updateData.status = status;
  if (serialNumber !== undefined) updateData.serialNumber = serialNumber;

  const savedList = await List.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  return res.json(savedList);
});
//@desc List all lists
//@route GET /api/app/list
//@access Private/Account-level Users
export const listList = asyncHandler(async (req, res) => {
  const {
    status = "Active",
    type,
    sortBy = "serialNumber",
    sortDirection = 1,
  } = req.query;

  const lists = await List.aggregate([
    {
      $match: {
        type,
        status,
      },
    },
    {
      $facet: {
        data: [{ $sort: { [sortBy]: parseInt(sortDirection) } }],
        count: [{ $count: "total" }],
      },
    },
  ]);

  res.status(200).json({
    data: lists[0].data,
    totalItems: lists[0]?.count[0]?.total ?? 0,
  });
});

//@desc List single list detail
//@route GET /api/app/list/detail/:type
//@access Private/Account-level Users
export const detailList = asyncHandler(async (req, res) => {
  const {
    status,
    type,
    sortBy = "serialNumber",
    sortDirection = 1,
  } = req.query;

  const lists = await List.aggregate([
    {
      $match: {
        type,
        ...(status && status),
      },
    },
    {
      $facet: {
        data: [{ $sort: { [sortBy]: parseInt(sortDirection) } }],
        count: [{ $count: "total" }],
      },
    },
  ]);

  res.status(200).json({
    data: lists[0].data,
    totalItems: lists[0]?.count[0]?.total ?? 0,
  });
});

export const getListDDL = asyncHandler(async (req, res) => {
  const { type } = req.query;

  if (!type) {
    res.status(400);
    throw new Error("Type parameter is required");
  }

  // Find all lists of this type that are Active
  // Sort by createdAt (first created = top) and serialNumber as fallback
  const lists = await List.find({
    type,
    status: "Active",
  })
    .sort({ createdAt: 1, serialNumber: 1 }) // 1 = ascending (oldest first)
    .select("name _id") // Select name and _id fields
    .lean(); // Convert to plain JS objects for better performance

  // Return array of objects with name and _id
  const ddlOptions = lists.map((item) => ({
    name: item.name,
    _id: item._id,
  }));
  return res.json(ddlOptions);
});
