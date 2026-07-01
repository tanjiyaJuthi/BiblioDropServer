import mongoose from "mongoose";

export const wishListSchema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true,
        strict: "throw",
    }
);

wishListSchema.index(
    {
        userId: 1,
        bookId: 1,
    },
    {
        unique: true,
    }
);