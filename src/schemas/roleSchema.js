import mongoose from "mongoose";

export const roleSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true, 
            unique: true 
        },

        description: {
            type: String,
            trim: true,
            maxlength: 200,
        },
    },
    {
        timestamps: true,
        strict: "throw",
    }
);