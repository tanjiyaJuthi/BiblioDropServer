import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import {role} from "../middleware/role.js";

import { 
    createRating,
    getBookRatings,
    updateRating,
    deleteRating
} from '../controllers/ratingController.js';

const ratingRoutes = express.Router();

ratingRoutes.post(
    "/",
    verifyToken,
    role('user'),
    createRating
);

ratingRoutes.get(
    "/",
    verifyToken,
    getBookRatings
);

ratingRoutes.patch(
    "/",
    verifyToken,
    role('user'),
    updateRating
);

ratingRoutes.delete(
    "/",
    verifyToken,
    role('user'),
    deleteRating
);

export default ratingRoutes;