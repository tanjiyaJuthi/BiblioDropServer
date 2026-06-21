import mongoose from "mongoose";

export const ratingSchema = new mongoose.Schema(
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
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
        strict: "throw",
    }
);

ratingSchema.index({
    bookId: 1,
});