import mongoose from "mongoose";
import { readingListSchema } from "../schemas/readingListSchema.js";

export const ReadingList = mongoose.model("ReadingList", readingListSchema);