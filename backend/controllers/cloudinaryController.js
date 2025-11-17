import asyncHandler from "express-async-handler";
import { deleteFile, uploadFile } from "../utils/cloudinaryFileUpload.js";

export const cloudinaryFileUpload = asyncHandler(async (req, res) => {
  const { filePath } = req.body; // entityId not used in bucket, but kept for fallback
  const uploadedFile = req.file;

  if (!uploadedFile || !filePath) {
    // No longer need entityId for bucket
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Pass entityId as optional prefix for public_id if needed, but use filePath directly
    const upload = await uploadFile(filePath, uploadedFile);
    res.status(201).json(upload);
  } catch (error) {
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
});

export const cloudinaryFileDelete = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  // No entityId needed for delete—publicId is unique across cloud
  // But if you want to validate prefix, you could add: const entityId = req.viewEntity._id.toString();

  if (!publicId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const delFile = await deleteFile(publicId); // Simplified—no account param
    res.status(200).json(delFile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "File deletion failed", error: error.message });
  }
});
