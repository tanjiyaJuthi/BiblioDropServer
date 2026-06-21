import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        bookId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Book",
            required: true
        },
        commentText: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
        strict: "throw",
    }
);