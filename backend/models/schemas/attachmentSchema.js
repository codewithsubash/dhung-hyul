import mongoose from "mongoose";

export const attachmentSchema = mongoose.Schema({
  name: { type: String, trim: true },
  type: { type: String, trim: true },
  size: { type: String, trim: true },
  publicId: { type: String, trim: true }, //Do space asset's public id - useful for deleting the attachment
  secureUrl: { type: String, trim: true },
});
