import mongoose from "mongoose";
import { wishListSchema } from "../schemas/wishListSchema.js";

export const WishList = mongoose.model("WishList", wishListSchema);