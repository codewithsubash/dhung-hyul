import { v2 as cloudinary } from "cloudinary";
import path from "path";
import mime from "mime";

import { CLOUDINARY_CONFIG } from "../config/cloudinary.config.js";

cloudinary.config(CLOUDINARY_CONFIG);
export const uploadFile = async (filePath, uploadedFile) => {
  // Build public_id: entityId/folderName/timestamped-filename
  const timestamp = Date.now();
  const ext = path.extname(uploadedFile.originalname);
  const filename = `${timestamp}${ext}`;
  const publicId = `${filePath}/${filename}`;

  const uploadOptions = {
    resource_type: "auto",
    public_id: publicId, // Remove the 'folder' option - use only public_id
    overwrite: true,
  };

  try {
    // Use buffer if available (memory storage), otherwise use path (disk storage)
    const fileToUpload = uploadedFile.buffer
      ? `data:${uploadedFile.mimetype};base64,${uploadedFile.buffer.toString(
          "base64"
        )}`
      : uploadedFile.path;

    const result = await cloudinary.uploader.upload(
      fileToUpload,
      uploadOptions
    );

    return {
      name: uploadedFile.originalname,
      publicId: result.public_id,
      size: uploadedFile.size,
      type: uploadedFile.mimetype || mime.getType(ext),
      secureUrl: result.secure_url,
    };
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
};

export const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: result.result === "ok" };
  } catch (error) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
};
