import express from "express";

import {role} from "../middleware/role.js";
import {verifyToken} from "../middleware/verifyToken.js";

import { 
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getCategoriesWithCounts,
} from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.get(
    "/with-counts",
    getCategoriesWithCounts
);

categoryRoutes.get(
    "/",
    getCategories
);

categoryRoutes.get(
    "/:id",
    getCategoryById
);

categoryRoutes.post(
    "/",
    verifyToken, 
    role('admin'),
    createCategory
);

categoryRoutes.patch(
    "/:id",
    verifyToken,
    role('admin'),
    updateCategory
);

categoryRoutes.delete(
    "/:id", 
    verifyToken,
    role('admin'),
    deleteCategory
);


export default categoryRoutes;