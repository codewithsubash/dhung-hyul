import dotenv from "dotenv";
dotenv.config(); // Load immediately, before any other imports!

import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import listRoutes from "./routes/listRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/customize-list", listRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB Connected");
    } else {
      console.log("⚠️ No MONGO_URI in .env — Skipping DB connection");
    }

    app.listen(PORT, () => console.log(`🚀 Backend Running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server Start Error", err);
    process.exit(1);
  }
}

start();
