import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import {role} from "../middleware/role.js";

import { 
    getMyProfile, 
    updateProfileImage,
    getAllUsers,
    deleteUser,
    updateUserRole,
} from '../controllers/profileController.js';

export const profileRoutes =  express.Router();

profileRoutes.get(
    "/my-profile",
    verifyToken,
    getMyProfile
);

profileRoutes.patch(
    "/update-image",
    verifyToken,
    updateProfileImage
);

profileRoutes.patch(
  "/:id/role",
  verifyToken,
  role("admin"),
  updateUserRole
);

profileRoutes.get(
  "/",
  verifyToken,
  role("admin"),
  getAllUsers
);

profileRoutes.delete(
  "/:id",
  verifyToken,
  role("admin"),
  deleteUser
);

export default profileRoutes;