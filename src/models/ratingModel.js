import mongoose from "mongoose";
import { ratingSchema } from "../schemas/ratingSchema.js";

export const Rating = mongoose.model("Rating", ratingSchema);