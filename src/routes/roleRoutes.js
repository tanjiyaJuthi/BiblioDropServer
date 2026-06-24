import express from "express";

import {role} from "../middleware/role.js";
import {verifyToken} from "../middleware/verifyToken.js";

import { 
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
} from '../controllers/roleController.js';

const roleRoutes = express.Router();

roleRoutes.get(
    "/",
    verifyToken,
    getAllRoles
);

roleRoutes.get(
    "/:id",
    verifyToken,
    role('admin'),
    getRoleById
);

roleRoutes.post(
    "/",
    verifyToken,
    role('admin'),
    createRole
);

roleRoutes.patch(
    "/:id",
    verifyToken,
    role('admin'),
    updateRole
);

roleRoutes.delete(
    "/:id",
    verifyToken,
    role('admin'),
    deleteRole
);

export default roleRoutes;