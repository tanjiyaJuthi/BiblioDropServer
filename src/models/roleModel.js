import mongoose from "mongoose";
import { roleSchema } from "../schemas/roleSchema.js";

export const Role = mongoose.model("Role", roleSchema);