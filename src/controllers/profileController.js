import { Profile } from "../models/profileModel.js";

export const getMyProfile = async (req, res) => {
    try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await Profile.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",

      data: {
        user,
      },
    });
  } catch (error) {
    console.error("GET /my-profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { image } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!image || typeof image !== "string") {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    const isValidUrl = /^https?:\/\/.+/i.test(image);

    if (!isValidUrl) {
      return res.status(400).json({
        success: false,
        message: "Invalid image URL",
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      userId,
      { $set: { image } },
      { returnDocument: "after" }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("updateProfileImage error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "librarian"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await Profile.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("name email role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Profile.find({})
      .select("name email role")
      .lean();

    res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteUser = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};