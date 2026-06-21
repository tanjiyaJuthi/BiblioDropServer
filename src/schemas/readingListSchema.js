import mongoose from "mongoose";

export const readingListSchema = new mongoose.Schema(
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
        deliveryId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Delivery",
            required: true
        }
    },
    {
        timestamps: true,
        strict: "throw",
    }
);

readingListSchema.index({
    bookId: 1,
});