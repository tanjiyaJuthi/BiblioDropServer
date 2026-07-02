import mongoose from "mongoose";

import { ReadingList } from "../models/readingListModel.js";
import { Delivery } from "../models/deliveryModel.js";
import { Transaction } from "../models/transactionModel.js";
import { Book } from "../models/bookModel.js";
import { Profile } from "../models/profileModel.js";

export const getReaderDashboard = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const [
            booksRead,
            pendingDeliveries,
            spent,
            monthlyRead,
            deliveryStatus,
        ] = await Promise.all([

            ReadingList.countDocuments({
                userId,
            }),

            Delivery.countDocuments({
                userId,
                deliveryStatus: {
                    $ne: "Delivered",
                },
            }),

            Delivery.aggregate([
                {
                    $match: {
                        userId,
                        paymentStatus: "Paid",
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$deliveryFee",
                        },
                    },
                },
            ]),

            ReadingList.aggregate([
                {
                    $match: {
                        userId,
                    },
                },
                {
                    $group: {
                        _id: {
                            month: {
                                $month: "$createdAt",
                            },
                        },
                        total: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $sort: {
                        "_id.month": 1,
                    },
                },
            ]),

            Delivery.aggregate([
                {
                    $match: {
                        userId,
                    },
                },
                {
                    $group: {
                        _id: "$deliveryStatus",
                        value: {
                            $sum: 1,
                        },
                    },
                },
            ]),
        ]);

        res.json({
            success: true,
            data: {
                booksRead,
                pendingDeliveries,
                totalSpent: spent[0]?.total || 0,
                monthlyRead,
                deliveryStatus,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getLibrarianDashboard = async (req, res) => {
    try {
        const librarianId = new mongoose.Types.ObjectId(req.user.id);

        const [
            totalBooks,
            totalEarnings,
            pendingRequests,
            topRequestedBooks,
            monthlyEarnings,
            requestStatus,
        ] = await Promise.all([
            Book.countDocuments({
                librarianId,
            }),

            Transaction.aggregate([
                {
                    $match: {
                        librarianId,
                        paymentStatus: "Paid",
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount",
                        },
                    },
                },
            ]),

            Delivery.countDocuments({
                librarianId,
                deliveryStatus: "Pending",
            }),

            Delivery.aggregate([
                {
                    $match: {
                        librarianId,
                    },
                },
                {
                    $group: {
                        _id: "$bookId",
                        requests: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $sort: {
                        requests: -1,
                    },
                },
                {
                    $limit: 5,
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "_id",
                        foreignField: "_id",
                        as: "book",
                    },
                },
                {
                    $unwind: "$book",
                },
                {
                    $project: {
                        title: "$book.title",
                        coverImage: "$book.coverImage",
                        requests: 1,
                    },
                },
            ]),

            Transaction.aggregate([
                {
                    $match: {
                        librarianId,
                        paymentStatus: "Paid",
                    },
                },
                {
                    $group: {
                        _id: {
                            month: {
                                $month: "$createdAt",
                            },
                        },
                        earnings: {
                            $sum: "$amount",
                        },
                    },
                },
                {
                    $sort: {
                        "_id.month": 1,
                    },
                },
            ]),

            Delivery.aggregate([
                {
                    $match: {
                        librarianId,
                    },
                },
                {
                    $group: {
                        _id: "$deliveryStatus",
                        value: {
                            $sum: 1,
                        },
                    },
                },
            ]),
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalBooks,
                totalEarnings: totalEarnings[0]?.total || 0,
                pendingRequests,
                topRequestedBooks,
                monthlyEarnings,
                requestStatus,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAdminDashboard = async (req, res) => {
    try {
        const [
            totalUsers,
            totalBooks,
            totalDeliveries,
            revenue,
            booksByCategory,
        ] = await Promise.all([
            Profile.countDocuments(),

            Book.countDocuments(),

            Delivery.countDocuments(),

            Transaction.aggregate([
                {
                    $match: {
                        paymentStatus: "Paid",
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount",
                        },
                    },
                },
            ]),

            Book.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category",
                    },
                },
                {
                    $unwind: "$category",
                },
                {
                    $group: {
                        _id: "$category.name",
                        value: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        name: "$_id",
                        value: 1,
                    },
                },
                {
                    $sort: {
                        value: -1,
                    },
                },
            ])
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalBooks,
                totalDeliveries,
                totalRevenue: revenue[0]?.total || 0,
                booksByCategory,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};