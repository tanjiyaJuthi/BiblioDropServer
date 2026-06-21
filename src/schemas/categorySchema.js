import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema(
    {
        categoryName: { 
            type: String, 
            required: true, 
            unique: true 
        },
        
        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        image: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        strict: "throw",
    }
);