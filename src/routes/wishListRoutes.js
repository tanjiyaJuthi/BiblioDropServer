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
    role('reader'),
    addToWishlist
);

wishListRoutes.get(
    "/my",
    verifyToken,
    role('reader'),
    getMyWishlist
);

wishListRoutes.delete(
    "/:bookId",
    verifyToken,
    role('reader'),
    removeFromWishlist
);

wishListRoutes.get(
    "/check/:bookId",
    verifyToken,
    role('reader'),
    checkWishlist
);

export default wishListRoutes;