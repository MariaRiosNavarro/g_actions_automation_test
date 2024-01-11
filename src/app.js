import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import { router as jokesRouter } from "./jokes/jokes.routes.js";

await mongoose.connect(process.env.MONGODB_URI);

export const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/jokes", jokesRouter);
