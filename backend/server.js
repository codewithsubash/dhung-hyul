import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.js";

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Health route
app.get("/health", (req, res) => res.json({ status: "ok" }));

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
