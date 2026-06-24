import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import {role} from "../middleware/role.js";

import { 
    addToWishlist,
    getMyWishlist,
    removeFromWishlist,
    checkWishlist 
} from '../controllers/wishListController.js';

const wishListRoutes = express.Router();

wishListRoutes.post(
    "/",
    verifyToken,
    role('user'),
    addToWishlist
);

wishListRoutes.get(
    "/my",
    verifyToken,
    role('user'),
    getMyWishlist
);

wishListRoutes.delete(
    "/:bookId",
    verifyToken,
    role('user'),
    removeFromWishlist
);

wishListRoutes.get(
    "/check/:bookId",
    verifyToken,
    role('user'),
    checkWishlist
);

export default wishListRoutes;