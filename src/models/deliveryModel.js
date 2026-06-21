import mongoose from "mongoose";
import { deliverySchema } from "../schemas/deliverySchema.js";

export const Delivery = mongoose.model("Delivery", deliverySchema);