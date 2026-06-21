import { Category } from '../models/categoryModel.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category
            .find({})
            .select({ _id: 0, name: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};