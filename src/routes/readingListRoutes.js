import express from "express";

import {role} from "../middleware/role.js";
import {verifyToken} from "../middleware/verifyToken.js";

import { 
    addToReadingList,
    getMyReadingList,
    removeFromReadingList
} from '../controllers/readingListController.js';

const readingListRoutes = express.Router();

readingListRoutes.post(
    "/",
    verifyToken,
    role('user'),
    addToReadingList
);

readingListRoutes.get(
    "/my-list",
    verifyToken,
    role('user'),
    getMyReadingList
);

readingListRoutes.delete(
    "/:id",
    verifyToken,
    role('user'),
    removeFromReadingList
);


export default readingListRoutes;