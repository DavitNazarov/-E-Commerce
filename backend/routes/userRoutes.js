import express from "express";
import {
  createUser,
  logInUser,
  logOutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  UpdateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authentication, admin } from "../middlewares/authMidleware.js";

const router = express.Router();

router.route("/").post(createUser).get(authentication, admin, getAllUsers);

router.post("/auth", logInUser);
router.post("/logOut", logOutCurrentUser);
router
  .route("/profile")
  .get(authentication, getCurrentUserProfile)
  .put(authentication, UpdateCurrentUserProfile);

// ADMIN ROUTES 😎
router
  .route("/:id")
  .delete(authentication, admin, deleteUserById)
  .get(authentication, admin, getUserById)
  .put(authentication, admin, updateUserById);

export default router;
