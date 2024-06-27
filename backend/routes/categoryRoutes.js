import express from "express";
const router = express.Router();
import {
  createCategoty,
  updateCategory,
  deleteCategory,
  listOfCategories,
  readCategory,
} from "../controllers/categoryController.js";
import { authentication, admin } from "../middlewares/authMidleware.js";

// user shuld have authentication and also as an admin to be able to have access with category
router.route("/").post(authentication, admin, createCategoty);
router.route("/:categoryId").put(authentication, admin, updateCategory);
router.route("/:categoryId").delete(authentication, admin, deleteCategory);
router.route("/categories").get(listOfCategories);
router.route("/:id").get(readCategory);

export default router;
