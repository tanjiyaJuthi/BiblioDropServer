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
    role('reader'),
    addToReadingList
);

readingListRoutes.get(
    "/my-list",
    verifyToken,
    role('reader'),
    getMyReadingList
);

readingListRoutes.delete(
    "/:id",
    verifyToken,
    role('reader'),
    removeFromReadingList
);


export default readingListRoutes;