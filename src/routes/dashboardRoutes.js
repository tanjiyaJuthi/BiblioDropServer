import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import {role} from "../middleware/role.js";

import { 
    getReaderDashboard,
    getLibrarianDashboard,
    getAdminDashboard
} from '../controllers/dashboardController.js';

const dashboardRoutes = express.Router();

dashboardRoutes.get(
    "/reader",
    verifyToken,
    role("reader"),
    getReaderDashboard
);

dashboardRoutes.get(
    "/librarian",
    verifyToken,
    role("librarian"),
    getLibrarianDashboard
);

dashboardRoutes.get(
    "/admin",
    verifyToken,
    role("admin"),
    getAdminDashboard
);

export default dashboardRoutes;