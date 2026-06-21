import mongoose from "mongoose";
import { bookSchema } from "../schemas/bookSchema.js";

export const Book = mongoose.model("Book", bookSchema);